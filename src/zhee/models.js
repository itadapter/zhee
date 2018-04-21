/**
 * Provides base for models: Objects, Arrays, and Fields
 */
export class Base{

  constructor(parent, name){
    this.m_parent = parent;
    this.m_name = name;
    this.m_version = 0;
    this.m_isValidated = false;
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
   * may rarely if ever need to be called manually to force some updates
   * @param {boolean} resetVal Pass true to reset validation flags
   */
  touch(resetVal){ 
    this.m_version++; 
    if (resetVal===true){
      this.m_isValidated = false;
    }
  }

  /** True when this was validated after last change */
  get isValidated(){ return this.m_isValidated; }

  /** Returns validation error set by last validation */
  get validationError(){ return this.m_valError; }

  /** True when this model is valid: it was validated after l;ast change and does not have any errors*/
  get isValid(){ return this.m_isValidated && this.m_valError===null; }

  /**
   * Validates the model
   */
  validate(){

  }

  /** Returns enabled for this entitiy
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get enabled( ){ return this.m_enabled;}

  /** 
   *  Returns the effective enabled, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isEnabled( ) { 
    return this.m_enabled!==undefined ? this.m_enabled : this.m_parent!==null ? this.m_parent.isEnabled() : true;
  }

  /** Returns visible for this entitiy
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get visible( ){ return this.m_visible;}

  /** 
   *  Returns the effective enabled, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isVisible( ) { 
    return this.m_visible!==undefined ? this.m_visible : this.m_parent!==null ? this.m_parent.isVisible() : true;
  }

  /** Returns required for this entitiy
   * @returns {boolean|undefined} Undefined is returned if parameter is not set on this level
   */
  get required( ){ return this.m_required;}

  /** 
   *  Returns the effective enabled, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get isRequired( ) { 
    return this.m_required!==undefined ? this.m_required : this.m_parent!==null ? this.m_parent.isRequired() : true;
  }
}

zachem cascading?   Na urovne modeli ustanovka doljna touchat vsex detei, i ustanavliavt u vsex version++
mojet ostavit cascading tolko na visible, enable, required, readonly? 




/**
 * Model Object - derive your object from this class
 */
export class Model extends Base{
  constructor(parent, name){
    super(parent, name);
    this.m_ver = 0;
    this.m_fields = {};
  }

  /** Returns all fields */
  get fields(){ return null; }

}



/**
 * Can derive custom field from this class, however it is not expected to be needed
 */
export class Field extends Base{
  constructor(parent, name){
    super(parent, name);
    
    this.m_value = null;

    

  }


  get value( ){ return this.m_value; }
  set value(v){ this.m_value = v; }

  onValueChange(event){ this.m_model.emitter.emit(event); }
}
