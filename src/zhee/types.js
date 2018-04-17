import * as CC from "./coreconsts";
import * as strings from "./strings";

/**
 * Returns true if the argument is assigned - not undefined non-null value, even an empty string is assigned
 * @param { Object } v
 */
export function isAssigned(v) {
  return v !== undefined && v !== null;//warning:  if (!v) is not the same test!
}

/**
 * Returns true if the argument is a non null string
 * @param { Object } v
 */
export function isString(v) {
  return Object.prototype.toString.call(v) === "[object String]";
}

/**
 * Returns true if the argument is a non null date
 * @param { Object } v
 */
export function isDate(v) {
  return Object.prototype.toString.call(v) === "[object Date]";
}

/**
 * Returns true when the passed parameter is an array, not a map or function
 * @param { Object } v
 */
export function isArray(v) {
  return Object.prototype.toString.call(v) === "[object Array]";
}

/**
 * Returns true when the passed parameter is an object, not an array or function
 * @param { Object } v
 */
export function isObject(v) {
  return v === Object(v) && !isArray(v) && !isFunction(v);
}

/**
 * Returns true when the passed parameter is an array, or object but not a function
 * @param { Object } v
 */
export function isObjectOrArray(v) {
  return  v === Object(v)  && !isFunction(v);
}

/**
 * Returns true when poassed parameter is a function, not a map object or an array
 * @param { Object } v
 */
export function isFunction(v) {
  return Object.prototype.toString.call(v) === "[object Function]";
}


/**
 * Returns true if the argument is an int32 value
 * @param {int32} v 
 */
export function isInt32(v){
  if (Number.isInteger) return Number.isInteger(v);
  return v === (v|0);
}

/**
 * Returns true if the value is either integer number or a string representing an integer number
 * @param {int|string} v Value to check 
 */
export function isIntValue(v){
  if (isNaN(v)) return false;
  let x = parseFloat(v);
  return x === (x|0);
}

/**
 * Return true if the value is a Number
 * @param {Object} v Value to check 
 */
export function isNumber(v){
  return Object.prototype.toString.call(v) === "[object Number]";
}


/**
 * Return true if the value is a boolean
 * @param {Object} v Value to check 
 */
export function isBool(v){
  return Object.prototype.toString.call(v) === "[object Boolean]";
}


/**
 * Describes the type of value returning the string description, not type moniker
 * @param {Object} v 
 */
export function describeTypeOf(v){
  if(v === undefined) return CC.UNDEFINED;
  if(v === null) return CC.NULL;

  if (isDate(v)) return "date";
  if (isFunction(v)) return "function";
  if (isString(v)) return "string";
  if (isArray(v)) return "array";
  if (isNumber(v)) return "number";
  if (isBool(v)) return "boolean";
  return typeof(v);
}


/**
 * Mixes in an extension's own keys into an object, conditionally keeping existing keys even if null
 * @param {Object} obj An object to mix into
 * @param {Object} ext An extension to mix into obj
 * @param {boolean} [keepExisting=false] True to keep existing props even if they are null
 */
export function mixin(obj, ext, keepExisting = false){
  if (!isAssigned(obj)) return null;
  if (!isAssigned(ext)) return obj;

  if (!keepExisting) {
    for (let prop in ext)
      if (ext.hasOwnProperty(prop))
        obj[prop] = ext[prop];
  } else {
    for (let prop in ext)
      if (ext.hasOwnProperty(prop) && !obj.hasOwnProperty(prop))
        obj[prop] = ext[prop];
  }
  return obj;
}


/**
  * @typedef {Object} NavResult
  * @property {Object} orig origin, the first object in a chain of navigation
  * @property {Object} root the root to which this path is applied
  * @property {boolean} full True if full path match was made
  * @property {Object} value the value of navigation, may be undefined and is set to however far the func could navigate
  * @property {Object} result only sett on full path match, may be undefined if that is what was matched, check .full
  * @property {Object} nav chain call function does curries the current object
  */


/**
 * Tries to navigate the path as fas a s possible starting at root object 
 * @param {Object|Array} obj Required root object of navigation
 * @param {String|Array} path Rquired path as '.' delimited segments, or array of strings
 * @param {Object} org Optional origin of the chain, used by chain nav() calls
 * @returns {NavResult} Navigation result object
 */
export function nav(obj, path, org){
  let result = {
    orig: isAssigned(org) ? org : obj,
    root: obj,
    full: undefined, 
    value: undefined,
    result: undefined,
    nav: (p) => nav(result.value, p, result.orig)
  };

  if (!isAssigned(obj)) return result;
  if (!isAssigned(path)) return result;
  
  if (isString(path)){
    path = path.split(".").filter(s => s.length>0);
  }
  
  result.full = false;
  result.value = obj;
  for(let i in path){
    if (!isObjectOrArray(result.value)) return result;
   
    let seg = path[i];
    if (!(seg in result.value)) return result;
    let sub = result.value[seg];
   
    result.value = sub;
  }

  result.full = true;
  result.result = result.value;
  return result;
}


/**
 * Ensures that the result is always a string representation of a primitive v, an empty one for null or undefined.
 * Non-string values are coerced using v.toString(), objects are NOT JSONized
 * @param {Object} v Value 
 */
export function asString(v){ return strings.asString(v); }

/**
 * Converts primitives into bool. Uses asBoolean() on objects
 * @param {Object} v object to test 
 */
export function asBoolean(v){ return asBool(v); }

/**
 * Converts primitives into bool. Uses asBoolean() on objects
 * @param {Object} v object to test 
 */
export function asBool(v){
  if (!isAssigned(v)) return false;
  if (isBool(v)) return v;
  if (v.asBoolean) return v.asBoolean();
  if (isNumber(v)) return v!==0;
  var s = strings.asString(v);
  return strings.isOneOf(s, ["true", "t", "yes", "1", "ok"]);
}


