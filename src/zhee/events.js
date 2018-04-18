import * as types from "./types";

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
 * An archetype of all events dispatched via EventEmitter
 */
export class Event{
  constructor(sender, bag){ 
    this.m_sender = sender; 
    this.m_handled = false; 
    this.m_bag = bag===undefined ? null : bag;
  }

  /** Returns the sender of this event. Once set to true the event propagation stops */
  get sender(){ return this.m_sender; }

  /** Gets data bag of this event or null */
  get bag(){ return this.m_bag; }
  
  /** Sets data bag of this event or null */
  set bag(v){ this.m_bag = v===undefined ? null : v; }
  
  /** Returns true if the event is handled already  */
  get handled( ){ return this.m_handled; }
  
  /** Sets event handled property. Once set to true the event propagation stops */
  set handled(v){ this.m_handled = types.asBool(v); }

  /** 
   * Override to return true if this event matches the specified listener.
   * The EventEmitter tries to match an event to every listener registered to its 
   * type then calls this function. Used to limit the event dipatching to some sub-system/type;
   * @returns {boolean} True if match is made
   */
  match(listener){
    return true;  //zachem eto voobshe nado??
  }
}

export class EventEmitter{

}

class TeztEvent extends Event{
  constructor(sender, happy, age){
    super(sender, {happy: happy, age: age, marked: false});
  }
}

function tezt(){

  let evt = new TeztEvent(this, true, 234);
  this.emitter.emit(evt);
  if (evt.bag.marked) doSomething();

  recordModel.eventSubscribe(uiHandler, DataEvent, UIEvent );
}


/**
 * Listeners are either functions of "function(event)" or objects 
 * that have "eventHandler(event)" function
 */
export const EventEmitterFacadeMixin = {

  eventSubscribe: function(listener, ...events){
  },

  eventUnsubscribe: function(listener, ...events){

  }
};