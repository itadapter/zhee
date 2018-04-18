/**
 * Provides base for models
 */
export class Model{
  constructor(json){
    this.m_fields = [];
  }

  /** Returns all fields */
  get fields(){ return null; }

}



export class Field{
  constructor(model, json){
    this.m_model = model;
    this.m_name = "aaa";
    this.m_value = null;
  }

  /** Model tha this field is a part of */
  get model( ) { return this.m_model; }

  /** Immutable field name - unique within a model */
  get name( ) { return this.m_name; }

  get value( ){ return this.m_value; }
  set value(v){ this.m_value = v; }

  onValueChange(event){ this.m_model.emitter.emit(event); }


}