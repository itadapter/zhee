import * as CC from "./coreconsts";
import * as types from "./types";
import * as loclz from "./localization";

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
 * Truncates/caps a string at the specified maxLen optionally adding ellipsis at the end.
 * The non-string input values are coerced to string
 * @param {string} str Original string source
 * @param {int} maxLen The maximum length
 * @param {string} [ending] The ending of the capped string, ellipsis is used by default
 */
export function truncate(str, maxLen, ending){
  if (!str) return str;
  str = str.toString();
  if (!(maxLen>0)) return str;//!!!not the same maxLength<=0
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
  
  let t = types.isArray(v) ? "Array" : typeof(v);
  let subs = v.length ? `[${v.length}]` : "";
  
  let d = "";
  if (types.isObjectOrArray(v))
    d = JSON.stringify(v);
  else if (types.isString(v))
    d = `"${v}"`;
  else if (types.isDate(v))
    d = loclz.formatDateTime(v);
  else
    d = v.toString();

  d = truncate(d, maxLen, CC.ELLIPSIS);
  return `(${t}${subs})${d}`;
}
