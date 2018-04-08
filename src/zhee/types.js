
/**
 * Returns true if the argument is assigned - not undefined non-null value, even empty string is assigned
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
 * Returns true when the passed parameter is an array, or map but not a function
 * @param { Object } obj
 */
export function isMapOrArray(obj) {
  if (obj === undefined || obj === null) return false;
  return obj === Object(obj) && !isFunction(obj);
};

/**
 * Returns true when poassed parameter is a function, not a map object or an array
 * @param { Object } obj
 */
export function isFunction(obj) {
  return typeof obj === "function";
}

//export default { isString, isArray, isObject, isFunction };