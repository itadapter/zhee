import * as CC from "./coreconsts";
import * as types from "./types";
import * as lcl from "./localization";

/**
 * Returns true if the argument is an undefined, null, zero length or an empty string.
 * Treats non-string types as coerced, e.g. isEmpty(false)===false because false.toString()==="false"
 * @param {string} str String to test
 */
export function isEmpty(str){
  if (!types.isAssigned(str)) return true;// (!str) is NOT the same test i.e. str=(bool)false is a valid "string"
  return (str.length === 0 || /^\s*$/.test(str)); 
}

/**
 * Returns either a string or dflt if empty. Coerces other types
 */
export function dflt(str, ...dflt){
  str = asString(str);
  if (isEmpty(str)){
    for(let ds of dflt){
      const d = asString(ds);
      if (!isEmpty(d)) return d;
    }
  }
  return str;
}

/**
 * Ensures that the result is always a string representation of a primitive v, an empty one for null or undefined (unless canUndef is true).
 * Non-string values are coerced using v.toString(), objects are NOT JSONized
 * @param {*} v Value
 * @param {boolean} canUndef True to preserve undefined
 */
export function asString(v, canUndef = false){
  if (v===undefined) return canUndef ? undefined : "";
  if (v===null) return "";
  if ( typeof(v) === "string") return v;//do not use types.isString as new String("abc")!=="abc" :)
  return v.toString();
}

/**
 * Trims whitespace and CR LF from string ends. The non-string values are coerced to string
 * @param {*} str to trim
 */
export function trim(str){
  str = asString(str);
  if (str.trim) return str.trim();
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

/**
 * Trims whitespace and CR LF from the left side of the string. The non-string values are coerced to string
 * @param {*} str to trim
 */
export function trimLeft(str){
  str = asString(str);
  return str.replace(/^\s+/, "");
}

/**
 * Trims whitespace and CR LF from the right side of the string.  The non-string values are coerced to string
 * @param {*} str to trim
 */
export function trimRight(str){
  str = asString(str);
  return str.replace(/\s+$/, "");
}

/**
 * Returns true if the string equals one of the strings in the list of values supplied either as an array or '|' or ';' separated string
 * @param {string} str string to test. other types are coerced to string
 * @param {string[]|string} values array of values to test against, or a '|' or ';' delimited string of values
 */
export function isOneOf(str, values, senseCase = false){
  if (!types.isAssigned(str)) return false;
  if (!types.isAssigned(values)) return false;

  str = trim(str);

  if (types.isString(values)){
    values = values.split(/[|,;]/).filter(s => s.length>0);
  }
  
  if (!senseCase) str = str.toLowerCase();
  
  for(let i in values){
    let e = trim(values[i]);
    if (!senseCase) e = e.toLowerCase();
    if (str===e) return true;
  }

  return false;
}

/**
 * Truncates/caps a string at the specified maxLen optionally adding ellipsis at the end.
 * The non-string input values are coerced to string
 * @param {*} str Original string source
 * @param {int} maxLen The maximum length
 * @param {*} [ending] The ending of the capped string, ellipsis is used by default
 */
export function truncate(str, maxLen, ending){
  str = asString(str);
  if (!(maxLen>0)) return str;// not the same maxLength<=0
  let len = str.length;
  if (len <= maxLen) return str;
  ending = asString(ending);
  return str.substr(0, maxLen - ending.length) + ending;
}


/**
 * Provides a textual representation of a value, suitable for report in error logs, exceptions, etc.
 * @param {*} v value to describe
 * @param {int} [maxLen=64] impose maximum length on the resulting description 
 */
export function describe(v, maxLen = 64){
  if (v===undefined) return CC.UNDEFINED;
  if (v===null) return CC.NULL;
  
  let t = types.describeTypeOf(v);
  let subs = v.length ? `[${v.length}]` : "";
  
  let d = CC.UNKNOWN;
  if (types.isDate(v))
    d = lcl.INVARIANT.formatDateTime(v);
  else if (types.isString(v))
    d = `"${v}"`;
  else if (types.isObjectOrArray(v))
    d = JSON.stringify(v);
  else
    d = v.toString();

  d = truncate(d, maxLen, CC.ELLIPSIS);
  return `(${t}${subs})${d}`;
}

/** Regular expression that parses out <<format tokens>> */
export const REXP_FORMAT = /<<(.*?)>>/g;

/**
 * Expands formatting arguments
 * @param {*} v A format string with tokens: <<path[::format[{format-args-json}]>>. Path is the same as used in types.nav() to address sub/properties of the args object
 * @param {*} args Arguments object: either a map or array
 * @example 
 *  format(`DOB is: <<dob::ld{"dtFormat": "'ShortDate"}>> Salary: <<salary::lm{"iso": "?salary_iso"}>>`, {dob: new Date(1980, 1, 1), salary: 120000, salary_iso: "usd"})
 *  returns "DOB is: 01/01/1980 Salary: $120,000.00"
 */
export function format(v, args, localizer = null){
  v = asString(v);
  if (!args) return v;
  if (!types.isObjectOrArray(args)) 
    throw new Error(".format(args) must be null, object or array"); 

  const fmap = (s, token) => {
    let key = token;
    let fmt = "";
    let fmta = null;
    const i =token.indexOf("::");
    if (i>0){
      key = token.substr(0, i);
      fmt = token.substr(i+2);
      const j = fmt.indexOf("{");
      if (j>1){
        try{
          fmta = JSON.parse( fmt.substr(j) );
        }catch(e){
          throw new Error(`.format('.. ${fmt} ..') Error parsing token format fragment: ${e.message}`);
        }
        fmt = fmt.substr(0, j);
      }
    }

    const get = (path) => types.nav(args, path).result;


    let tv = get(key);

    switch(fmt){
      case "ld": { //localized date-time
        if (!localizer) localizer = lcl.currentLocalizer();
        if (fmta===null) fmta={}; 
        fmta.dt = tv; 
        return localizer.formatDateTime(fmta);
      }
      case "lm": { //localized money
        if (!localizer) localizer = lcl.currentLocalizer();
        if (fmta===null) fmta={}; 
        fmta.amt = tv; 
        if (isEmpty(fmta.iso)) throw new Error(".format() is missing currency iso arg: lm{iso: 'currency-code' | '?key'}"); 
        if (fmta.iso.startsWith("?")){
          fmta.iso = asString( get(fmta.iso.substr(1)) );
        }
        return localizer.formatCurrency(fmta);
      }
      case "tc": { //type cast
        if (fmta===null) throw new Error(".format() is missing typecast arg: tc{tm: 'type-moniker'}"); 
        tv = types.cast(tv, fmta.tm);
      }
    }
    return asString(tv);
  };

  return v.replace(REXP_FORMAT, fmap);
}

/**
 * Returns true if the value represents a valid email address.
 * 2014 Note: for now we only accept latin, diacritics, greek and cyryllic chars for emails.
 * @param {*} v Email Address
 */
export function isValidEMail(v){
  v = asString(v);
  if (isEmpty(v)) return false;
  const iat=v.indexOf("@");
  if (iat<1 || iat===v.length-1) return false;

  if (v.indexOf("@", iat+1)>=0) return false;//duplicate @

  const ldot=v.lastIndexOf(".");
  const pass =  (ldot>iat+2) && (ldot+2<=v.length);
  if (!pass) return false;

  let wasDot = false;
  for(let i=0; i<v.length; i++){
    const c = v[i];
    if (c==="."){
      if (wasDot) return false;
      wasDot = true;
      continue;
    } else wasDot = false;

    if (c==="@"||c==="-"||c==="_") continue;
    if (!isValidScreenNameLetterOrDigit(c)) return false;
  }

  return true;
}

const SCREEN_NAME_EXTRA =
  "ёЁÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥ";

function isValidScreenNameLetter(c){
  return ((c>="A" && c<="Z") ||
          (c>="a" && c<="z") ||
          (c>="Α" && c<="Ω") ||
          (c>="α" && c<="ω") ||
          (c>="А" && c<="Я") ||
          (c>="а" && c<="я") ||
          (SCREEN_NAME_EXTRA.indexOf(c)>=0));
}

function isValidScreenNameLetterOrDigit(c){
  return isValidScreenNameLetter(c) || (c>="0" && c<="9"); 
}

function isValidScreenNameSeparator(c){
  return c==="." || c==="-" || c==="_";
}

/**
 * Returns true if the string contains a valid Screen Name.
 * Screen names are used for making primary actor (user/room/group etc...) IDS(names)
 * which are always visible (hence the name "screen/stage name of a person") and can be used for emails, 
 * for example "my-name" => "my-name@domain.com". 
 * Screen names are defined as strings starting from a letter, then followed by letters or digints separated by a single
 * hyphen, dot or underscore
 * @param {*} v A string value representing a s Screen Name
 * @example 
 *  Valid names: "my-name", "name1980", "my.name", "alex-bobby-1980" 
 *  Invalid names: "-my-name", "1980name", "my-.name", "name."
 */
export function isValidScreenName(v){
  v = asString(v);
  if (isEmpty(v)) return false;
  v = trim(v);
  if (v.length===0) return false;
  var wasSeparator = false;
  for(let i=0; i<v.length; i++)
  {
    const c = v[i];
    if (i===0){
      if (!isValidScreenNameLetter(c)) return false;
      continue;
    }

    if (isValidScreenNameSeparator(c)){
      if (wasSeparator) return false;
      wasSeparator = true;
      continue;
    }
    if (!isValidScreenNameLetterOrDigit(c)) return false;
    wasSeparator = false;
  }
  return !wasSeparator;
}



