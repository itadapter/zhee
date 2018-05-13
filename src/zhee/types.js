import * as CC from "./coreconsts";
import * as strings from "./strings";

/**
 * Returns true if the argument is assigned - not undefined non-null value, even an empty string is assigned
 * @param {*} v value
 */
export function isAssigned(v){
  return v !== undefined && v !== null;//warning:  if (!v) is not the same test!
}

/**
 * Shortcut to hasOwnProperty()
 * @param {*} obj object to test
 * @param {string|symbol} prop property to test
 */
export function hown(obj, prop){
  return obj ? hasOwnProperty.call(obj, prop) : false;
}

/**
 * Returns all object values as an array. Empty array for undefined or null.
 * Does NOT return values from prototype, only values on this object itself
 * Note: object.values() is not widely supported yet
 */
export function allObjectValues(o){
  if (!isAssigned(o)) return [];
  return Object.keys(o).map(k => o[k]);
}

/**
 * Deletes the first occurence of the element in array.
 * Warning: this is an "unsafe" method as it does not do any args checks for speed
 * @param {Array} array to delete from
 * @param {*} elm element to delete 
 * @returns {boolean} true if element was found and deleted
 */
export function arrayDelete(array, elm){
  const idx = array.indexOf(elm);
  if (idx === -1) return false;
  array.splice(idx, 1);
  return true;
}

/**
 * Creates a shallow copy of the array.
 * Warning: this is an "unsafe" method as it does not do any args checks for speed
 */
export function arrayCopy(array){
  return array.slice();
}

/**
 * Clears the array contents in-place.
 * Warning: this is an "unsafe" method as it does not do any args checks for speed
 * @param {Array} array to clear
 */
export function arrayClear(array){
  array.length=0;
  return array;
}

/**
 * Returns true if the argument is a non null string
 * @param {*} v
 */
export function isString(v){
  return Object.prototype.toString.call(v) === "[object String]";
}

/**
 * Returns true if the argument is a non null date
 * @param {*} v
 */
export function isDate(v){
  return Object.prototype.toString.call(v) === "[object Date]";
}

/**
 * Returns true when the passed parameter is an array, not a map or function
 * @param {*} v
 */
export function isArray(v){
  return Object.prototype.toString.call(v) === "[object Array]";
}

/**
 * Returns true when the passed parameter is an object, not an array or function
 * @param {*} v
 */
export function isObject(v){
  return v === Object(v) && !isArray(v) && !isFunction(v);
}

/**
 * Returns true when the passed parameter is an array, or object but not a function
 * @param {*} v
 */
export function isObjectOrArray(v){
  return  v === Object(v)  && !isFunction(v);
}

/**
 * Returns true when poassed parameter is a function, not a map object or an array
 * @param {*} v
 */
export function isFunction(v){
  const t = Object.prototype.toString.call(v);
  return t === "[object Function]" || t === "[object GeneratorFunction]";
}

/**
 * Returns true when the passed parameter is a function, or object but not an array or primitive
 * @param {*} v
 */
export function isObjectOrFunction(v){
  return  v === Object(v)  && !isArray(v);
}

/**
 * Returns true when the passed value implements Iterable protocol
 * @param {*} v 
 */
export function isIterable(v){
  return isAssigned(v) && isFunction(v[Symbol.iterator]);
}


/**
 * Returns true if the argument is an int32 value
 * @param {*} v 
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
 * @param {*} v Value to check 
 */
export function isNumber(v){
  return Object.prototype.toString.call(v) === "[object Number]";
}

/**
 * Return true if the value is a boolean
 * @param {*} v Value to check 
 */
export function isBool(v){
  return Object.prototype.toString.call(v) === "[object Boolean]";
}

/**
 * Return true if the value is a symbol
 * @param {*} v Value to check 
 */
export function isSymbol(v){
  return Object.prototype.toString.call(v) === "[object Symbol]";
}


/**
 * Describes the type of value returning the string description, not type moniker.
 * Keep in mind that in JS typeof(new String|Date|Number|Boolean(x)) is object, not the actual type, hence this method :)
 * @param {*} v 
 */
export function describeTypeOf(v){
  if(v === undefined) return CC.UNDEFINED;
  if(v === null) return CC.NULL;

  // typeof( Boolean(true)) === 'boolean' 
  // typeof( new Boolean(true)) === 'object'
  // same for Date, Number, String, [] === object etc


  if (isDate(v))     return "date";
  if (isFunction(v)) return "function";
  if (isString(v))   return "string";
  if (isArray(v))    return "array";
  if (isNumber(v))   return "number";
  if (isBool(v))     return "boolean";
  if (isIterable(v)) return typeof(v)+"+Iterable";

  return typeof(v);
}

/**
 * Returns the class function(constructor) of the instance or null if not an object
 * @param {Object} obj object instance to get a class function from
 * @returns Constructor function of the object or null
 */
export function classOf(obj){
  if (!isObject(obj)) return null;
  let result = obj.constructor;
  return result;
}

/**
 * Returns the parent class (prototype) of the specified class (function) or null if the class is the top-most class
 * @param {function} cls class to get a parent of
 */
export function parentOfClass(cls){
  if (!isFunction(cls)) return null;
  let result = Object.getPrototypeOf(cls);
  return result.name === "" ? null : result;
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
      if (hown(ext, prop))
        obj[prop] = ext[prop];
  } else {
    for (let prop in ext)
      if (hown(ext, prop) && !hown(obj, prop))
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
 * Tries to navigate the path as far a s possible starting at the root object 
 * @param {Object|Array} obj Required root object of navigation
 * @param {string|string[]} path Rquired path as '.' delimited segments, or array of strings
 * @param {Object|Array} org Optional origin of the chain, used by chain nav() calls
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
 * Returns false only if an iterable was supplied and it yields at least one value, true in all other cases
 */
export function isEmptyIterable(iterable){
  if (!isIterable(iterable)) return true;
  const iterator = iterable[Symbol.iterator]();
  return iterator.next().done === true;
}

/**
 * Ensures that the result is always a string representation of a primitive v, an empty one for null or undefined (unless canUndef is true).
 * Non-string values are coerced using v.toString(), objects are NOT JSONized
 * @param {*} v Value
 * @param {boolean} canUndef True to preserve undefined
 */
export function asString(v, canUndef = false){ return strings.asString(v, canUndef); }


/** Character cases */
export const CHAR_CASE = { ASIS:  "asis", UPPER: "upper", LOWER: "lower", CAPS: "caps", CAPSNORM: "capsnorm"};
const ALL_CHAR_CASES = allObjectValues(CHAR_CASE);

/** Data Entry field kinds */
export const DATA_KIND = {
  TEXT:          "text", 
  SCREENNAME:    "screenname", 
  COLOR:         "color", 
  DATE:          "date", 
  DATETIME:      "datetime",
  DATETIMELOCAL: "datetime-local", 
  EMAIL:   "email", 
  MONTH:   "month", 
  NUMBER:  "number", 
  RANGE:   "range", 
  SEARCH:  "search", 
  TEL:     "tel", 
  TIME:    "time", 
  URL:     "url", 
  WEEK:    "week", 
  MONEY:   "money"
};
const ALL_DATA_KINDS = allObjectValues(DATA_KIND);

/**
 * Converts value to CHAR_CASE coercing it to lowercase string if needed
 * @param {*} v value to convert
 * @returns {CHAR_CASE}
 */
export function asCharCase(v){
  v = strings.asString(v).toLowerCase();
  if (strings.isOneOf(v, ALL_CHAR_CASES, true)) return v;
  return CHAR_CASE.ASIS;
}


/**
 * Converts value to DATA_KIND coercing it to lowercase string if needed
 * @param {*} v value to convert
 * @returns {DATA_KIND}
 */
export function asDataKind(v){
  v = strings.asString(v).toLowerCase();
  if (strings.isOneOf(v, ALL_DATA_KINDS, true)) return v;
  return DATA_KIND.TEXT;
}


export const AS_BOOLEAN_FUN = Symbol("asBoolean");
const TRUISMS = ["true", "t", "yes", "1", "ok"];

/**
 * Converts primitives into bool. Uses AS_BOOLEAN_FUN on objects.
 * Yields true only on (bool)true, 1, or ["true", "t", "yes", "1", "ok"]
 * @param {any} v object to test 
 */
export function asBool(v){
  if (!v) return false;
  if (v===true || v===1) return true;
  if (isFunction(v[AS_BOOLEAN_FUN])) return v[AS_BOOLEAN_FUN]() === true;
  return strings.isOneOf(v, TRUISMS);
}

/**
 * Converts primitives into a tri-state bool. Tri state bool values are {undefined|false|true}
 * Uses AS_BOOLEAN_FUN on objects, respecting undefined value.
 * Yields true only on (bool)true, 1, or ["true", "t", "yes", "1", "ok"]. Undefined input is returned as-is
 * @param {any} v object to test 
 */
export function asTriBool(v){
  if (v===undefined) return undefined;
  if (!v) return false;
  if (v===true || v===1) return true;
  if (isFunction(v[AS_BOOLEAN_FUN])){
    const r = v[AS_BOOLEAN_FUN]();
    if (r===undefined) return undefined;
    return r===true;
  }
  return strings.isOneOf(v, TRUISMS);
}

export const AS_INTEGER_FUN = Symbol("asInt");

export const REXP_HEX = /^[0-9, a-f, A-F]+$/;
export const REXP_BIN = /^[0-1]+$/;
export const REXP_NUMBER = /^[-+]?(?:[0-9]{0,30}\.)?[0-9]{1,30}(?:[Ee][-+]?[1-2]?[0-9])?$/;


/**
 * Converts value to and integer number. Respects 0x and 0b prefixes for hex and binary.
 * Unlike parseInt() does NOT allow trailing non-convertible characters.
 * Throws if string conversion is not possible
 * Uses AS_INTEGER_FUN on objects, respecting undefined value.
 * @param {*} v value to convert.
 * @param {boolean} [canUndef=false] Whether undefined is allowed 
 */
export function asInt(v, canUndef=false){
  if (v===undefined) return canUndef ? undefined : 0;
  if (v===null) return 0;
  
  if (isFunction(v[AS_INTEGER_FUN])){
    const r = v[AS_INTEGER_FUN]();
    if (r===undefined) return canUndef ? undefined : 0;
    if (r===null) return 0;
    return r | 0;
  }

  if (isString(v)){
    const ov = v;
    v = strings.trim(v);
    if (v.startsWith("0x")){
      v = v.substring(2);
      v = (REXP_HEX.test(v)) ? parseInt(v, 16) : NaN;
    } else if (v.startsWith("0b")){
      v = v.substring(2);
      v = (REXP_BIN.test(v)) ? parseInt(v, 2) : NaN;
    } else {
      v = (REXP_NUMBER.test(v)) ? parseFloat(v) : NaN;
    }
    if (isNaN(v)) throw Error(`Cast error: asInt("${strings.truncate(ov, 16)}")`);
  }

  return v | 0;
}

/**
 * Converts value to real number (contrast with toInt())
 * @param {*} v value to convert.
 * @param {boolean} [canUndef=false] Whether undefined is allowed 
 */
export function asReal(v, canUndef=false){
  if (v===undefined) return canUndef ? undefined : 0;
  if (v===null) return 0;
  return 1.0 * v;
}

/** Multiplier used for money operations */
export const MONEY_MULT = 10000;

/**
 * Converts value to 4-decimal point fixed number without rounding of 5th digit
 * @param {*} v value to convert.
 * @param {boolean} [canUndef=false] Whether undefined is allowed
 */
export function asMoney(v, canUndef=false){
  v = asReal(v, canUndef);
  if (v===undefined) return undefined;
  return ((v * MONEY_MULT) | 0) / MONEY_MULT;
}

/**
 * Converts value to Date
 * @param {*} v value to convert.
 * @param {boolean} [canUndef=false] Whether undefined is allowed
 */
export function asDate(v, canUndef=false){
  if (v===undefined) return canUndef ? undefined : new Date(0);
  if (v===null) return new Date(0);
  if (isDate(v)) return v;
  
  if (isString(v)){
    //try parse
    //const p =Date.parse(v);
    //if (isNaN(p)) // thorw?
  }

  return new Date(asInt(v));
}


/** Data Type Monikers */
export const TYPE_MONIKER = {
  STRING:   "str",
  INT:      "int",
  REAL:     "real",
  MONEY:    "money",
  BOOL:     "bool",
  DATE:     "date",
  OBJECT:   "object",
  ARRAY:    "array"
};
const ALL_TYPE_MONIKERS = allObjectValues(TYPE_MONIKER);

/**
 * Converts value into a valid TYPE_MONIKER member
 * @param {*} v string moniker
 * @returns {TYPE_MONIKER} .STRING as default
 */
export function asTypeMoniker(v){
  v = strings.asString(v).toLowerCase();
  if (strings.isOneOf(v, ALL_TYPE_MONIKERS, true)) return v;
  return TYPE_MONIKER.STRING;
}

/**
 * Performs value type cast per type moniker
 * @param {*} v Value to cast
 * @param {TYPE_MONIKER} tmon type moniker
 * @param {boolean} [canUndef] true to allow undefined values
 */
export function cast(v, tmon, canUndef=false){
  if (arguments.length<2) throw Error("cast(v, tmon) missing 2 req args");
  tmon = asTypeMoniker(tmon);
  
  switch(tmon){
    case TYPE_MONIKER.STRING:   return asString(v, canUndef);
    case TYPE_MONIKER.INT:      return asInt(v, canUndef);
    case TYPE_MONIKER.REAL:     return asReal(v, canUndef);
    case TYPE_MONIKER.MONEY:    return asMoney(v, canUndef);
    case TYPE_MONIKER.BOOL:     return canUndef ? asTriBool(v) : asBool(v);
    case TYPE_MONIKER.DATE:     return asDate(v, canUndef);
    case TYPE_MONIKER.OBJECT:   return asObject(v, canUndef);
    case TYPE_MONIKER.ARRAY:    return asArray(v, canUndef);
    default: return asString(v);
  }
}