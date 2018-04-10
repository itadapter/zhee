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
 * Performs strict equality check using ===
 * @param {Object} a 
 * @param {Object} b 
 */
export function areEqual(a, b){
  if (a===b) return;
  throw AVERMENT_FAILURE(`areEqual(${d(a)}, ${d(b)})`);
}

/**
 * Performs strict inequality check using !==
 * @param {Object} a 
 * @param {Object} b 
 */
export function areNotEqual(a, b){
  if (a!==b) return;
  throw AVERMENT_FAILURE(`areNotEqual(${d(a)}, ${d(b)})`);
}


/**
 * Expects that function thows a message optionaly containing the msg
 * @param {function} f function to call
 * @param {string} [msg] optional message to expect in the error 
 */
export function throws(f, msg){
  try{
    f();
  } 
  catch(e){
    if (!msg) return;
    //  console.log(e);
    
    let got = e.toString().toLowerCase();
    msg = msg.toLowerCase();
    
    if (got.indexOf(msg)==-1)
      throw AVERMENT_FAILURE(`throws(${d(f)}, expect '${msg}' but was '${got}')`);
      
    return;
  }

  throw AVERMENT_FAILURE(`throws(${d(f)})`);
}

/**
 * Used for internal derivation testing
 */
export class MockBase{
  constructor(a,b){
    this.m_A = a | 0;
    this.m_B = b | 0;
  }
  get a( ) { return this.m_A; }  set a(v) { this.m_A = v; }
  get b( ) { return this.m_B; }  set b(v) { this.m_B = v; }

  virt(){ return "base"; }

  describe(){
    return `${this.virt()}(a: ${this.a}, b: ${this.b})`;
  }

}

/**
 * Used for internal derivation testing
 */
export class MockA extends MockBase{
  constructor(a,b){
    super(a, b);
  }
  virt(){ return "MockA"; }
}

/**
 * Used for internal derivation testing
 */
export class MockB extends MockBase{
  constructor(a,b){
    super(a, b);
  }
}