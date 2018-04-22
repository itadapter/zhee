import * as types from "./types";


export class ValidationError{
  constructor(){

  }

  get code (){ return 0;}
}



/**
 * Provides base for models: Objects, Arrays, and Fields
 */
export class Base{

  constructor(parent, name){
    this.m_parent = parent;
    this.m_name = name;
    this.m_version = 0;
    this.m_updated = false;
    this.m_validated = false;
    this.m_valError = null;

    if (parent===null){
      this.m_enabled  = true;
      this.m_visible  = true;
      this.m_required = false;
      this.m_readOnly = false;
    } else {
      this.m_enabled  = undefined;
      this.m_visible  = undefined;
      this.m_required = undefined;
      this.m_readOnly = undefined;
    }
  }


  /** Immutable parent of this object, a model for field */
  get parent( ) { return this.m_parent; }

  /** Immutable field name - unique within a model */
  get name( ) { return this.m_name; }

  /** Returns the current version of this model state */
  get version(){ return this.m_version; }

  /** 
   * Increases the version of this model state 
   * The system increases the state version automatically on any change, so this method
   * may rarely if ever need to be called manually to force some UI updates
   */
  touch(){ 
    this.m_version++; 
    this.m_validated = false;
    this.m_updated = false;

    if (this.m_parent)
      thi.m_parent.touch();//propagate up the tree to parent
  }

  /** True when this was validated after last changes */
  get validated(){ return this.m_validated; }

  /** Returns validation error set by last validation */
  get validationError(){ return this.m_valError; }

  /** True when this model is valid: it was validated after last changes and does not have any errors*/
  get valid(){ return this.m_validated && this.m_valError===null; }

  /**
   * Validates the model state
   * @param {*} [target] Optional validation context passed down the chain
   * @returns {boolean} True if model was validates without errors
   */
  validate(target){
    try{
      this._doValidate(target);
      this.m_validated = true;
      this.m_valError = null;
      return true;
    }catch(e){
      this.m_validated = true;
      this.m_valError = e;
      return false;
    }
  }

  /**
   * Protected: override to perform actual validation. Throw exceptions throw ValidationError()
   * @param {*} target 
   */
  _doValidate(target){
    //does nothing on this level
  }


  /** True if this model was updated after last changes */
  get updated() { return this.m_updated; }

  /** Override to perform actions on the model, such as ensure business invariants.
   * This method is to be called before validate()
   * @example 
   *  Suppose that field "age" is required if the field "alcohol_sale" is set to true
   *  this method is where the code is set to ensure this business invariant condition:
   *   this.fldAge.required = this.fldAlcoholSale.boolValue;
   * @param {symbol} cause The cause of the change to the model, such as CAUSE_DATA
   */
  update(){
    this.m_updated = true;
  }


  /** Returns enabled for this entity
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get enabled( ){ return this.m_enabled;}
  set enabled(v){
    v = types.asTriBool(v);
    if (v===this.m_enabled) return;
    this.m_enabled = v;
    this.touch();
  }

  /** 
   *  Returns the effective enabled, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isEnabled( ) { 
    return this.m_enabled!==undefined ? this.m_enabled : this.m_parent ? this.m_parent.isEnabled() : true;
  }

  /** Returns visible for this entity
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get visible( ){ return this.m_visible;}
  set visible(v){
    v = types.asTriBool(v);
    if (v===this.m_visible) return;
    this.m_visible = v;
    this.touch();
  }

  /** 
   *  Returns the effective visible, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isVisible( ) { 
    return this.m_visible!==undefined ? this.m_visible : this.m_parent ? this.m_parent.isVisible() : true;
  }

  /** Returns required for this entity
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get required( ){ return this.m_required;}
  set required(v){
    v = types.asTriBool(v);
    if (v===this.m_required) return;
    this.m_required = v;
    this.touch();
  }

  /** 
   *  Returns the effective required, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isRequired( ) { 
    return this.m_required!==undefined ? this.m_required : this.m_parent ? this.m_parent.isRequired() : false;
  }

  /** Returns readOnly for this entity
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get readOnly( ){ return this.m_required;}
  set readOnly(v){
    v = types.asTriBool(v);
    if (v===this.m_readOnly) return;
    this.m_readOnly = v;
    this.touch();
  }

  /** 
   *  Returns the effective readOnly, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isReadOnly( ) { 
    return this.m_readOnly!==undefined ? this.m_readOnly : this.m_parent ? this.m_parent.isReadOnly() : false;
  }
}

// nado proverit na set chto to chto stavim ne izmenilos, esli poenyalos, call touch()

// zachem cascading?   Na urovne modeli ustanovka doljna touchat vsex detei, i ustanavliavt u vsex version++
// mojet ostavit cascading tolko na visible, enable, required, readonly? 




/**
 * Model Object - derive your object from this class
 */
export class Model extends Base{
  constructor(parent, name){
    super(parent, name);
    this.m_fields = {};
  }

  /** Returns all fields */
  get fields(){ return Object.values(this.m_fields); }

  /** Internal method that registers a field with model*/
  __addField(field){
    if (field.parent!==this) throw Error(`Wrong field parent for model '${this.name}'`);
    const nm = field.name;
    if (types.hown(this.m_fields, nm)) throw Error(`Model '${this.name}' already has field '${nm}'`);
    this.m_fields[nm] = field;
    this.touch();
  }

  fieldByName(name){
    name = strings.asString(name);
    return this.m_fields[name];
  }

}



/**
 * Can derive custom field from this class, however it is not expected to be needed
 */
export class Field extends Base{
  constructor(parent, name){
    super(parent, name);
    
    this.m_value = null;

    parent.__addField(this);
  }


  get value( ){ return this.m_value; }
  set value(v){ this.m_value = v; } //nado proverit na change, takje preformat value from gui gde budet (phone, dates etc?)

  onValueChange(event){ this.m_model.emitter.emit(event); }
}
