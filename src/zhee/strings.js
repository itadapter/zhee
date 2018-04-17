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
 * Ensures that the result is always a string representation of a primitive v, an empty one for null or undefined.
 * Non-string values are coerced using v.toString(), objects are NOT JSONized
 * @param {Object} v Value 
 */
export function asString(v){
  if (!types.isAssigned(v)) return "";
  if ( typeof(v) === "string") return v;//do not use types.isString as new String("abc")!=="abc" :)
  return v.toString();
}


/**
 * Trims whitespace and CR LF from string ends. The non-string values are coerced to string
 * @param {string} str to trim
 */
export function trim(str){
  str = asString(str);
  if (str.trim) return str.trim();
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

/**
 * Trims whitespace and CR LF from the left side of the string. The non-string values are coerced to string
 * @param {string} str to trim
 */
export function trimLeft(str){
  str = asString(str);
  return str.replace(/^\s+/, "");
}

/**
 * Trims whitespace and CR LF from the right side of the string.  The non-string values are coerced to string
 * @param {string} str to trim
 */
export function trimRight(str){
  str = asString(str);
  return str.replace(/\s+$/, "");
}

/**
 * Returns true if the string equals one of the strings in the list of values supplied either as an array or '|' or ';' separated string
 * @param {string} str string to test. other types are coerced to string
 * @param {[string]|string} values array of values to test against, or a '|' or ';' delimited string of values
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
 * @param {string} str Original string source
 * @param {int} maxLen The maximum length
 * @param {string} [ending] The ending of the capped string, ellipsis is used by default
 */
export function truncate(str, maxLen, ending){
  str = asString(str);
  if (!(maxLen>0)) return str;// not the same maxLength<=0
  let len = str.length;
  if (len <= maxLen) return str;
  ending = ending || "";
  return str.substr(0, maxLen - ending.length) + ending;
}


/**
 * Provides a textual representation of a value, suitable for report in error logs, exceptions, etc.
 * @param {string} v value to describe
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
