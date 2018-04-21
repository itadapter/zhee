import * as types from "./types";
import * as aver from "./aver";

/*
 DESIGN NOTES:

 Events are classes for the following reason:

 - classes allow to better formalize event properties/parameters, there is no need for
    string constants and worse yet unpredictable function argument list which is easy
    to get wrong in different subscribers (i.e. handler arity and arg order)

 - class type and prototypical derivation serves as a measure of event
   subscription specificity, for example:
     Event -> UIEvent -> MyControlEvent -> TreeRowCollapsedEvent
     a consumer may subscribe to UiEvent whereas the emitter emits the most detailed event types

 - in future use async processing model with promises passing events objects
   as arguments, this would have been impossible with plain function call, for example:
    ... emitter.emit(event).then(...) 
   return Promise.resolve(event);
*/


/**
 * An archetype for all events dispatched via EventEmitter
 */
export class Event{
  constructor(sender, bag){ 
    this.m_sender = sender; 
    this.m_handled = false; 
    this.m_bag = bag===undefined ? null : bag;
  }

  /** Returns the sender of this event */
  get sender(){ return this.m_sender; }

  /** Gets data bag of this event or null */
  get bag(){ return this.m_bag; }
  
  /** Sets data bag of this event or null */
  set bag(v){ this.m_bag = v===undefined ? null : v; }
  
  /** Returns true if the event is handled already  */
  get handled( ){ return this.m_handled; }
  
  /** Sets event handled property. Once set to true the event propagation stops */
  set handled(v){ this.m_handled = types.asBool(v); }
}

/** Defines a function symbol for event handlers attached to objects*/
export const EVENT_HANDLER_FUN = Symbol("eventHandler");

/**
 * Emits event objects to subscribers, having all events derive from Event class.
 * Subscribers/handlers attach to specified event classes. Subscribers are either functions or 
 * objects with [EVENT_HANDLER_FUN](Event) function.
 * The event propagation stops once 'event.handled' is set to true.
 * The system ensures that if a handler is subscribed to more than one type which are derived,
 * the system will only call the handler once per emit() using the most specific event type match.
 * Attention: you must unsubscribe from EventEmitter to prevent memory leaks.
 */
export class EventEmitter{
  constructor(ctx){
    this.m_ctx = ctx===undefined ? null : ctx;
    this.m_map = new Map();
    this.m_emitSet = new Set();
  }

  /** Event call context, such as an object that owns the emitter. It is
   * passed as this to function subscribers. May be null
   */
  get context(){ return this.m_ctx; }

  /**
   * Starts anew by unsubscribing all subscriptions
   */
  clear(){
    this.m_map.clear();//remove all event mappings
  }

  /**
   * Emits the event synchronously - the call returns after all handlers have processed.
   * The handlers are processed in the order of specificity - the more specific handlers get processed first.
   * The system ensures that per every emit() call, every handler is called only once with the most specific match, even if
   * multiple matches could be made
   * @param {Event} event to emit
   * @returns {boolean} true if emit matched at least one listener
   */
  emit(event){
    aver.isOf(event, Event);

    let result = false;

    const map = this.m_map;
    const set = this.m_emitSet;
    const ctx = this.m_ctx;

    try
    {
      let etp = types.classOf(event);

      while(etp != null){
        
        let subs = map.get(etp);

        if (subs!==undefined){
          //go through all subscribers
          for(let i=0, len=subs.length; i<len; i++){
            result = true;
            
            const sub = subs[i];

            if (set.has(sub)) continue;
            set.add(sub);

            //--- Call event ---  By design: shall surface the exception and terminate the event processing
            if (types.isFunction(sub))
              sub.call(ctx, event);
            else{
              const fhandler = sub[EVENT_HANDLER_FUN];
              if (types.isFunction(fhandler))
                fhandler.call(sub, event);
            }
            //------------------
            if (event.handled) return true; 
          }
        }

        etp = types.parentOfClass(etp);//get to more generic type
      }
    }
    finally
    {
      set.clear();
    }

    return result;
  }

  /**
   * Subscribes a listener to this emitter
   * @param {function|object} listener a function that takes an event or object with eventHandler(event) function
   * @param {Iterable<function>} etypes subscribed-to event class types
   * @returns {boolean} true if at least one was subscribed, false if the listener was already subscribed
   */
  subscribe(listener, ...etypes){
    aver.isObjectOrFunction(listener);
    aver.isIterable(etypes);
    
    const map = this.m_map;

    let result = false;
    for(let type of etypes){
      let subs = map.get(type);
      if (subs===undefined){
        subs = [listener];
        map.set(type, subs);
        result = true;
      }else{
        const idx = subs.indexOf(listener);
        if (idx===-1){
          subs.push(listener);
          result = true;
        }
      }
    }
    return result;
  }

  /**
   * Unsubscribes a listener from this emitter
   * @param {function|object} listener a function that takes an event or object with eventHandler(event) function
   * @param {Iterable<function>} [etypes] subscribed-to event class types
   * @returns {boolean} true if at least one was found and unsubscribed, otherwise false
   */
  unsubscribe(listener, ...etypes){
    aver.isObjectOrFunction(listener);
    
    const map = this.m_map;

    if (types.isEmptyIterable(etypes)) etypes = map.keys();

    let result = false;
    for(let type of etypes){
      const subs = map.get(type);
      if (subs){
        if (types.arrayDelete(subs, listener)) 
        {
          result = true;
          if (subs.length===0){
            map.delete(type);
          }
        }
      }
    }
    return result;
  }

}
