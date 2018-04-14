import * as CC from "./coreconsts";

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
  return Array.isArray
    ? Array.isArray(v)
    : Object.prototype.toString.call(v) === "[object Array]";
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
  return typeof v === "function";
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
  return typeof(v) === "number";
}


/**
 * Return true if the value is a boolean
 * @param {Object} v Value to check 
 */
export function isBool(v){
  return typeof(v) === "boolean";
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


