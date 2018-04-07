
import * as CC from "coreconsts";

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
}

const d = (v) => describeValue(v);


/**
 * Performs strict test for false
 * @param {bool} a 
 */
export function isFalse(a){
  if (a===false) return true;
  throw AVERMENT_FAILURE(`isFalse(${d(a)})`);
}

/**
 * Performs strict test for true
 * @param {bool} a 
 */
export function isTrue(a){
  if (a===true) return true;
  throw AVERMENT_FAILURE(`isTrue(${d(a)})`);
}