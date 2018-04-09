import * as CC from "./coreconsts";
import * as types from "./types";

/**
 * Makes an Error() initialized with message
 * @param { String } m
 */
export const AVERMENT_FAILURE = (m) => Error(`Averment failure: ${m}`);

/**
 * Provides a textual representation of a value, suitable for report in error logs etc.
 * @param {String} a 
 * @param {int} mlen
 */
export function describeValue(v, mlen = 64){
  if (v===undefined) return CC.UNDEFINED;
  if (v===null) return CC.NULL;
  //todo: Finish, show the type, and a piece of data itself
  return "aaaa"+mlen;
}

const d = (v) => describeValue(v);


/**
 * Performs strict test undefined
 * @param {Object} a 
 */
export function isUndefined(a){
  if (a===undefined) return;
  throw AVERMENT_FAILURE(`isUndefined(${d(a)})`);
}

/**
 * Performs strict test not undefined
 * @param {Object} a 
 */
export function isDefined(a){
  if (a!==undefined) return;
  throw AVERMENT_FAILURE(`isDefined(${d(a)})`);
}

/**
 * Performs strict test for being defined null
 * @param {Object} a 
 */
export function isNull(a){
  if (a!==undefined && a===null) return;
  throw AVERMENT_FAILURE(`isNull(${d(a)})`);
}

/**
 * Performs strict test for being defined not-null
 * @param {Object} a 
 */
export function isNotNull(a){
  if (a!==undefined && a!==null) return;
  throw AVERMENT_FAILURE(`isNotNull(${d(a)})`);
}

/**
 * Performs strict test for object (not a primitive, array or function)
 * @param {Object} a 
 */
export function isObject(a){
  if (types.isObject(a)) return;
  throw AVERMENT_FAILURE(`isObject(${d(a)})`);
}

/**
 * Performs strict test for array (not a primitive, object or function)
 * @param {Object} a 
 */
export function isArray(a){
  if (types.isArray(a)) return;
  throw AVERMENT_FAILURE(`isArray(${d(a)})`);
}

/**
 * Performs strict test for function (not a primitive, object or array)
 * @param {Object} a 
 */
export function isFunction(a){
  if (types.isFunction(a)) return;
  throw AVERMENT_FAILURE(`isFunction(${d(a)})`);
}


/**
 * Performs strict test for false
 * @param {bool} a 
 */
export function isFalse(a){
  if (a===false) return;
  throw AVERMENT_FAILURE(`isFalse(${d(a)})`);
}

/**
 * Performs strict test for true
 * @param {bool} a 
 */
export function isTrue(a){
  if (a===true) return;
  throw AVERMENT_FAILURE(`isTrue(${d(a)})`);
}

/**
 * Expects that function thows a message optionaly containing the msg
 * @param {*} f function to call
 * @param {*} msg? optional message to expect in the error 
 */
export function throws(f, msg){
  try {
    f();
    throw AVERMENT_FAILURE(`throws(${d(f)})`);
  } 
  catch(e){
    if (!msg) return;
    //  console.log(e);
    
    let got = e.toString().toLowerCase();
    msg = msg.toLowerCase();
    
    if (got.indexOf(msg)==-1)
      throw AVERMENT_FAILURE(`throws(${d(f)}, expect '${msg}' but was '${got}')`);
  }
}