import * as types from "./types";
import * as str from "./strings";

/**
 * Makes an Error() initialized with message
 * @param {string} m message
 */
export function AVERMENT_FAILURE(m){
  return Error(`Averment failure: ${m}`);
}

const dv = (v) => str.describe(v);//shortcut


/**
 * Performs strict test for undefined
 * @param {*} a 
 */
export function isUndefined(a){
  if (a===undefined) return;
  throw AVERMENT_FAILURE(`isUndefined(${dv(a)})`);
}

/**
 * Performs strict test for not undefined
 * @param {*} a 
 */
export function isDefined(a){
  if (a!==undefined) return;
  throw AVERMENT_FAILURE(`isDefined(${dv(a)})`);
}

/**
 * Performs strict test for being defined null
 * @param {*} a 
 */
export function isNull(a){
  if (a!==undefined && a===null) return;
  throw AVERMENT_FAILURE(`isNull(${dv(a)})`);
}

/**
 * Performs strict test for being defined not-null
 * @param {*} a 
 */
export function isNotNull(a){
  if (a!==undefined && a!==null) return;
  throw AVERMENT_FAILURE(`isNotNull(${dv(a)})`);
}

/**
 * Performs strict test for object (not a primitive, array or function)
 * @param {*} a 
 */
export function isObject(a){
  if (types.isObject(a)) return;
  throw AVERMENT_FAILURE(`isObject(${dv(a)})`);
}

/**
 * Performs strict test for array (not a primitive, object or function)
 * @param {*} a 
 */
export function isArray(a){
  if (types.isArray(a)) return;
  throw AVERMENT_FAILURE(`isArray(${dv(a)})`);
}

/**
 * Performs strict test for object or array (not a primitive or function)
 * @param {*} a 
 */
export function isObjectOrArray(a){
  if (types.isObjectOrArray(a)) return;
  throw AVERMENT_FAILURE(`isObjectOrArray(${dv(a)})`);
}

/**
 * Performs strict test for function (not a primitive, object or array)
 * @param {*} a 
 */
export function isFunction(a){
  if (types.isFunction(a)) return;
  throw AVERMENT_FAILURE(`isFunction(${dv(a)})`);
}

/**
 * Performs strict test for function or object (not a primitive or array)
 * @param {*} a 
 */
export function isObjectOrFunction(a){
  if (types.isObjectOrFunction(a)) return;
  throw AVERMENT_FAILURE(`isObjectOrFunction(${dv(a)})`);
}

/**
 * Performs strict test for Iterable protocol
 * @param {*} a 
 */
export function isIterable(a){
  if (types.isIterable(a)) return;
  throw AVERMENT_FAILURE(`isIterable(${dv(a)})`);
}

/**
 * Performs strict test for date
 * @param {*} a 
 */
export function isDate(a){
  if (types.isDate(a)) return;
  throw AVERMENT_FAILURE(`isDate(${dv(a)})`);
}

/**
 * Performs strict test for number
 * @param {*} a 
 */
export function isNumber(a){
  if (types.isNumber(a)) return;
  throw AVERMENT_FAILURE(`isNumber(${dv(a)})`);
}

/**
 * Performs strict test for string
 * @param {*} a 
 */
export function isString(a){
  if (types.isString(a)) return;
  throw AVERMENT_FAILURE(`isString(${dv(a)})`);
}

/**
 * Performs strict test for bool
 * @param {*} a 
 */
export function isBool(a){
  if (types.isBool(a)) return;
  throw AVERMENT_FAILURE(`isBool(${dv(a)})`);
}

/**
 * Performs strict test for symbol
 * @param {*} a 
 */
export function isSymbol(a){
  if (types.isSymbol(a)) return;
  throw AVERMENT_FAILURE(`isSymbol(${dv(a)})`);
}

/**
 * Performs strict test for false
 * @param {bool} a 
 */
export function isFalse(a){
  if (a===false) return;
  throw AVERMENT_FAILURE(`isFalse(${dv(a)})`);
}

/**
 * Performs strict test for true
 * @param {bool} a 
 */
export function isTrue(a){
  if (a===true) return;
  throw AVERMENT_FAILURE(`isTrue(${dv(a)})`);
}

/**
 * Performs strict equality check using ===
 * @param {*} a 
 * @param {*} b 
 */
export function areEqual(a, b){
  if (a===b) return;
  throw AVERMENT_FAILURE(`areEqual(${dv(a)}, ${dv(b)})`);
}

/**
 * Performs strict inequality check using !==
 * @param {*} a 
 * @param {*} b 
 */
export function areNotEqual(a, b){
  if (a!==b) return;
  throw AVERMENT_FAILURE(`areNotEqual(${dv(a)}, ${dv(b)})`);
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
      throw AVERMENT_FAILURE(`throws(${dv(f)}, expect '${msg}' but was '${got}')`);

    return;
  }

  throw AVERMENT_FAILURE(`throws(${dv(f)})`);
}

/**
 * Performs strict instanceof check on object and function args
 * @param {Object} o 
 * @param {type-function} t 
 */
export function isOf(o, t){
  if (types.isObject(o) && types.isFunction(t))
    if (o instanceof t) return;

  throw AVERMENT_FAILURE(`isOf(${dv(o)}, ${dv(t)})`);
}


/**
 * Performs strict !instanceof check on object and function args
 * @param {Object} o 
 * @param {type-function} t 
 */
export function isNotOf(o, t){
  if (types.isObject(o) && types.isFunction(t))
    if (!(o instanceof t)) return;

  throw AVERMENT_FAILURE(`isNotOf(${dv(o)}, ${dv(t)})`);
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

/** Used for internal derivation testing */
export class MockB extends MockBase{ constructor(a,b){ super(a, b); } }

/** Used for internal derivation testing */
export class MockBC extends MockB{ constructor(a,b){ super(a, b); } }