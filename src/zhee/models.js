import * as types from "./types";
import * as strings from "./strings";
import * as aver from "./aver";
import * as linq from "./linq";
import * as lcl from "./localization";


/**
 * Thrown by model validation logic
 */
export class ValidationError extends Error{
  constructor(msg, model, ...details){
    aver.isNotNull(msg);
    aver.isOf(model, Base);
    super(msg);
    this.m_model = model;
    this.m_details = details;
  }
  /** Model that this error was generated from */
  get model   (){ return this.m_model; }

  /** Detail errors, such as fields that generated errors */
  get details (){ return this.m_details; }
}

/**
 * Provides base for models: Models and Fields
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
      this.m_title = "";
      this.m_description = "";
      this.m_enabled  = true;
      this.m_visible  = true;
      this.m_required = false;
      this.m_readOnly = false;
    } else {
      this.m_title       = undefined;
      this.m_description = undefined;
      this.m_enabled     = undefined;
      this.m_visible     = undefined;
      this.m_required    = undefined;
      this.m_readOnly    = undefined;
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
      this.m_parent.touch();//propagate up the tree to parent
  }

  /** True when this was validated after last changes */
  get validated(){ return this.m_validated; }

  /** Returns validation error set by last validation */
  get validationError(){ return this.m_valError; }

  /** True when this model is valid: it was validated after last changes and does not have any errors*/
  get valid(){ return this.m_validated && this.m_valError===null; }


  /**
   * Validates the model state
   * @async
   * @param {*} [target] Optional validation context/target passed down the chain, e.g. the name of backend for which validation to be performed
   * @param {boolean} [force=false] True to force validation even if the model has not changed
   * @returns {Promise<boolean>} True if valid
   */
  async validate(target, force = false){
    if (this.m_validated && !force) return this.valid();

    try{
      await this._doValidate(target, force);
      this.m_validated = true;
      this.m_valError = null;
      return true;
    }catch(e){
      this.m_validated = true;
      this.m_valError = e;
      return false;
    }
  }

  /*eslint-disable no-unused-vars*/
  /**
   * Protected: override to perform actual validation. Throw  ValidationError()
   * @param {*} target Optional validation context passed down the chain, e.g. the name of backend for which validation to be performed
   * @param {boolean} force True to force validation even if the model has not changed
   * @async
   * @returns {Promise} Promise that resolves on validation
   */
  async _doValidate(target, force){
    //does nothing on this level
  }
  /*eslint-enable no-unused-vars*/


  /** True if this model was updated after last changes */
  get updated() { return this.m_updated; }

  /** Ensures business invariants.
   * This method is to be called before validate(). This is an async method because it may perform lengthy service calls.
   * @async
   * @param {*} [target] Optional update context/target passed down the chain, e.g. the name of backend for which validation to be performed after update
   * @param {boolean} [force=false] True to force update even if the model has not changed
   * @returns {Promise} Promise that resolves on update
   */
  async update(target, force = false){
    if (this.m_updated && !force) return;
    await _doUpdate(target, force);
    this.m_updated = true;
  }

  /*eslint-disable no-unused-vars*/
  /**
   * Protected: override to perform actions on the model, such as ensure business invariants.
   * @param {*} target Optional update context passed down the chain, e.g. the name of backend for which validation to be performed after update
   * @param {boolean} force True to force update even if the model has not changed
   * @example 
   *  Suppose that field "age" is required if the field "alcohol_sale" is set to true
   *  this method is where the code is set to ensure this business invariant condition:
   *   this.fldAge.required = this.fldAlcoholSale.boolValue;
   * @async
   * @returns {Promise} Promise that resolves on update
   */
  async _doUpdate(target, force){
    //does nothing on this level
  }
  /*eslint-enable no-unused-vars*/


  /** Returns title for this entity
   * @returns {string|undefined} Undefined is returned if parameter is not set on this level
   */
  get title( ){ return this.m_title; }
  set title(v){
    v = types.asString(v, true);
    if (v===this.m_title) return;
    this.m_title = v;
    this.touch();
  }

  /** 
   *  Returns the factual title, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {string} Never returns undefined
   */
  get factTitle( ) { return this.m_title!==undefined ? this.m_title : this.m_parent ? this.m_parent.factTitle() : ""; }



  /** Returns description for this entity
   * @returns {string|undefined} Undefined is returned if parameter is not set on this level
   */
  get description( ){ return this.m_description;}
  set description(v){
    v = types.asString(v, true);
    if (v===this.m_description) return;
    this.m_description = v;
    this.touch();
  }

  /** 
   *  Returns the factual description, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {string} Never returns undefined
   */
  get factDescription( ) { return this.m_description!==undefined ? this.m_description : this.m_parent ? this.m_parent.factDescription() : ""; }


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
   *  Returns the factual enabled, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get factEnabled( ) { 
    return this.m_enabled!==undefined ? this.m_enabled : this.m_parent ? this.m_parent.factEnabled() : true;
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
   *  Returns the factual visible, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get factVisible( ) { return this.m_visible!==undefined ? this.m_visible : this.m_parent ? this.m_parent.factVisible() : true; }

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
   *  Returns the factual required, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get factRequired( ) { return this.m_required!==undefined ? this.m_required : this.m_parent ? this.m_parent.factRequired() : false; }


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
   *  Returns the factual readOnly, if the setting is not defined on this level, 
   *  the parent chain will be consulted
   * @returns {boolean} Never returns undefined
   */
  get factReadOnly( ) { return this.m_readOnly!==undefined ? this.m_readOnly : this.m_parent ? this.m_parent.factReadOnly() : false; }
}



/**
 * Model Object - derive your custom business domain models from this class
 */
export class Model extends Base{
  constructor(parent, name){
    super(parent, name);
    this.m_fields = {};
  }

  /** Returns all fields */
  get fields(){ return types.allObjectValues(this.m_fields); }
  [Symbol.iterator](){ return this.fields[Symbol.iterator](); }


  /** Internal method that registers a field with this model */
  __addField(field){
    if (field.parent!==this) throw Error(`Wrong field parent for model '${this.name}'`);
    const nm = field.name;
    if (types.hown(this.m_fields, nm)) throw Error(`Model '${this.name}' already has field '${nm}'`);
    this.m_fields[nm] = field;
    this.touch();
  }

  /** Internal method that deletes/unregisters a field with this model */
  __dropField(field){
    if (field.parent!==this) throw Error(`Wrong field parent for model '${this.name}'`);
    const nm = field.name;
    if (types.hown(this.m_fields, nm)){
      delete this.m_fields[nm];
      this.touch();
      return true;
    }
    return false;
  }

  /** Returns true if this model has the specified named field */
  hasField(name){
    name = types.asString(name);
    return types.hown(this.m_fields, name);
  }

  /** Returns field by name or throws if not found */
  fieldByName(name){
    name = types.asString(name);
    if (!types.hown(this.m_fields, name)) throw Error(`Model '${this.name}' does not have field '${name}'`);
    return this.m_fields[name];
  }

  /** Cascades validation on child fields. Override to perform model-wide cross-field validation.
   *  Throw ValidationError
   */
  async _doValidate(target, force){
    let errors = null;
    for(var fld of this.fields){
      await fld.validate(target, force);
      const fve = fld.validationError;
      if (fve!=null){
        if (errors==null)
          errors = [fve];
        else 
          errors.push(fve);
      }
    }

    if (errors!=null) throw new ValidationError("Invalid", this, errors);
  }

  /**
   * Returns an object containing only this models' data values - suitable for JSON serialization.
   * It is a simple {filedNameN: fieldValueN,...} object, where values are recursively converted using .data
   */
  get data(){
    let result = {};
    for(let fld of this){
      const fd = fld.data;
      result[fld.name] = fd;
    }
    return result;
  }
}




/**
 * Can derive custom field from this class, however it is not expected to be needed
 */
export class Field extends Base{
  constructor(parent, name){
    aver.isOf(parent, Model);
    aver.isNonEmptyString(name);

    super(parent, name);
    
    this.m_placeholder = "";

    this.m_key = false;
    this.m_type = types.TYPE_MONIKER.STRING;
    this.m_value = null;
    this.m_dfltValue = null;
    this.m_kind = types.DATA_KIND.TEXT;
    this.m_case = types.CHAR_CASE.ASIS;
    this.m_password = false;
    this.m_minSize = 0;
    this.m_maxSize = 0;
    this.m_ctlType = "auto";

    this.m_lookup = null;

    parent.__addField(this);
  }

  /**
   * Removes the field from parent Model; return true if found and removed
   */
  drop(){
    return this.parent.__dropField(this);
  }

  /**
   * Returns this field value suitable for JSON serialization, that is: if this object value is Model
   * it will it will convert it to map using .data(); an array will be converted element-by element using .data()
   * Plain js objects (non-models) and scalar values are kept as-is
   */
  get data(){

    function map(v){
      if (v===undefined) return null;
      if (v instanceof Model){
        v = v.data;
      } else if (types.isArray(v)){
        v = linq.$(v).select(e => map(e)).toArray();
      }
      return v;
    }

    const fv = this.value;
    return map(fv);
  }

  /** Field Value. The value is type cast per this.type moniker  */
  get value( ){ return this.m_value; }
  set value(v){ 
    v = types.cast(v, this.m_type, true);
    if (v===this.m_value) return;
    this.m_value = v; 
    this.touch();
  }


  /** Paceholder text
   * @returns {string} Placeholder aka "watermark" usually displyed in text fields
   */
  get placeholder( ){ return this.m_placeholder;}
  set placeholder(v){
    v = types.asString(v);
    if (v===this.m_placeholder) return;
    this.m_placeholder = v;
    this.touch();
  }

  /** True when this field is a key field
   * @returns {boolean}
   */
  get key( ){ return this.m_key;}
  set key(v){
    v = types.asBool(v);
    if (v===this.m_key) return;
    this.m_key = v;
    this.touch();
  }

  /** Field data type
   * @returns {type_moniker}
   */
  get type( ){ return this.m_type;}
  set type(v){
    v = types.asTypeMoniker(v);
    if (v===this.m_type) return;
    this.m_type = v;
    this.value = types.cast(this.value, v);//typecast value to new type
    this.touch();
  }

  /** Default value for field
   * @returns {*}
   */
  get dfltValue( ){ return this.m_dfltValue;}
  set dfltValue(v){
    v = types.cast(v, this.type);
    if (v===this.m_dfltValue) return;
    this.m_dfltValue = v;
    this.touch();
  }

  /** Field data kind, such as: phone, zip etc.
   * @returns {string}
   */
  get kind( ){ return this.m_kind;}
  set kind(v){
    v = types.asDataKind(v);
    if (v===this.m_kind) return;
    this.m_kind = v;
    this.touch();
  }

  /** Field char case, such as: asis, upper...
   * @returns {string}
   */
  get case( ){ return this.m_case;}
  set case(v){
    v = types.asCharCase(v);
    if (v===this.m_case) return;
    this.m_case = v;
    this.touch();
  }

  /** Whether this is a password field
   * @returns {bool}
   */
  get password( ){ return this.m_password;}
  set password(v){
    v = types.asBool(v);
    if (v===this.m_password) return;
    this.m_password = v;
    this.touch();
  }

  /** Imposes a minimum size constraint on data when >0
   * @returns {int}
   */
  get minSize( ){ return this.m_minSize;}
  set minSize(v){
    v = types.asInt(v);
    if (v===this.m_minSize) return;
    this.m_minSize = v;
    this.touch();
  }


  /** Imposes a maximum size constraint on data when >0
   * @returns {int}
   */
  get maxSize( ){ return this.m_maxSize;}
  set maxSize(v){
    v = types.asInt(v);
    if (v===this.m_maxSize) return;
    this.m_maxSize = v;
    this.touch();
  }

  /** Suggests a type of a view control that should be used
   * @returns {string}
   */
  get ctlType( ){ return this.m_ctlType;}
  set ctlType(v){
    v = types.asString(v);
    if (v===this.m_ctlType) return;
    this.m_ctlType = v;
    this.touch();
  }

  //...
  //todo 
  // lookup prop
  //  fact* properties doljni propuskat UNDEFINED cherez asString()

  // validate field data per required etc...

  /** Cascades validation on child fields. Override to perform model-wide cross-field validation.
   *  Throw ValidationError
   */
  async _doValidate(target, force){

    const error = (msg, args) => {
      msg = lcl.currentLocalizer().localizeString(msg, this.parent.isoLang, lcl.FIELD_ERROR, lcl.SCHEMA_MODEL_VALIDATION);
      msg = strings.args(msg, args);
      return new ValidationError(msg, this);
    };

    const val = this.m_value;

    if (this.factRequired){
      if (val===undefined || val===null || (types.isString(val) && strings.isEmpty(val)))
        throw error("Field '@f@' must have a value", {f: this.about});
    }
    // field.about
    // strings.args()
    // Model.isoLang
    
  }
}
