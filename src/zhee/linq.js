import * as types from "./types";

/**
 * Provides lazy functional enumeration over iterable source a-la LINQ in C#
 */
export class ${
  constructor(iterable){
    this.m_src = iterable;
  }

  get source(){ return this.m_src;}

  [Symbol.iterator](){
    return this.m_src[Symbol.iterator](); 
  }


  /** Materializes the sequence into an array */
  toArray(){ return [...this.m_src]; }

  /** Maps values */
  select(f){
    const self = this;
    const it = {
      [Symbol.iterator]: function* (){
        for(let e of self.m_src) yield f(e);
      }
    };

    return new $(it);
  }

  /** Filters values */
  where(f){
    const self = this;
    const it = {
      [Symbol.iterator]: function* (){
        for(let e of self.m_src) if (f(e)) yield e;
      }
    };

    return new $(it);
  }

  /** Only takes N elements */
  take(n){
    return null;
  }

  /** orders by function */
  order(f){
    return null;
  }

  count(f){
    const ass = types.isFunction(f);
    let result = 0;
    for(let e of this.m_src)
      if (!ass || f(e)) return result++;
    return result;
  }

  any(f){
    const ass = types.isFunction(f);
    for(let e of this.m_src)
      if (!ass || f(e)) return true;
    return false;
  }

  all(f){
    if (!types.isFunction(f)) return true;
    for(let e of this.m_src)
      if (!f(e)) return false;
    return true;
  }

}

