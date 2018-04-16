import * as types from "./types";
import * as aver from "./aver";
import * as strings from "./strings";

export const CULTURE_INVARIANT = "*";
export const CULTURE_US = "us";

export const ISO_LANG_ENG = "eng";
export const ISO_LANG_DEU = "deu";
export const ISO_LANG_FRA = "fra";
export const ISO_LANG_RUS = "rus";
export const ISO_LANG_ESP = "esp";

export const ANY_SCHEMA = "--ANY-SCHEMA--";
export const ANY_FIELD  = "--ANY-FIELD--";

export const FIELD_DAY   = "day";
export const FIELD_MONTH = "month";


export const DATE_FORMAT = {
  LONG_WEEK_DATE:   "LongWeekDate",  //  Tuesday, 30 August 2018
  SHORT_WEEK_DATE:  "ShortWeekDate", //  Tue, 30 Aug 2018
  LONG_DATE:        "LongDate",      //  30 August 2018
  SHORT_DATE:       "ShortDate",     //  30 Aug 2018 
  NUM_DATE:         "NumDate",       //  08/30/2018

  LONG_MONTH:      "LongMonth",      // August 2018
  SHORT_MONTH:     "ShortMonth",     // Aug 2018
  NUM_MONTH:       "NumMonth",       // 10/2018

  LONG_DAY_MONTH: "LongDayMonth",    //  12 August
  SHORT_DAY_MONTH: "ShortDayMonth",  //  12 Aug
};

export const TIME_DETAILS = {
  NONE: 0,  // time is off
  HM:   1, // hours:minutes
  HMS:  2, // hours:minutes:seconds
  HMSM: 3  // hours:minutes:seconds:millis
};


export const INVARIANT_MONTH_LONG_NAMES = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"];

export const INVARIANT_MONTH_SHORT_NAMES = INVARIANT_MONTH_LONG_NAMES.map( v => strings.truncate(v, 3) );

export const INVARIANT_DAY_LONG_NAMES = 
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const INVARIANT_DAY_SHORT_NAMES = INVARIANT_DAY_LONG_NAMES.map( v => strings.truncate(v, 3) );




/**
 * Provides default implementation of invariant localizer.
 * Other localizer shall extend this class and inject their instance using
 *  localization.injectLocalizer(new CustomLocalizer(...))
 */
export class Localizer{
  
  constructor(){
    this.m_Strings = {
      [ISO_LANG_ENG]: { [ANY_SCHEMA]: {[ANY_FIELD]: {  }} },
      [ISO_LANG_RUS]: { [ANY_SCHEMA]: {[ANY_FIELD]: {"yes":"да", "no":"нет"}}, "tezt": {[ANY_FIELD]: {"yes":"так", "no":"неа"}} },
      [ISO_LANG_DEU]: { [ANY_SCHEMA]: {[ANY_FIELD]: {"yes":"ja", "no":"nein"}} },
      [ISO_LANG_FRA]: { },
      [ISO_LANG_ESP]: { }
    };
  }

  get isInvariant() { return true; }

  /**
   * Formats the date and time value as string per culture
   * @param {Object} args
   * @param {Date} args.dt Datetime argument, it may be supplied without an args object as a sole argument
   * @param {string} args.culture Localization culture id
   * @param {DATE_FORMAT} args.dtFormat Format of date part representation
   * @param {TIME_DETAILS} args.tmDetails Time detalization (NONE= no time)
   * @param {boolean} args.utc Treat date time as UTC value
   */
  formatDateTime({dt = null, culture = null, dtFormat = DATE_FORMAT.NUM_DATE, tmDetails = TIME_DETAILS.NONE, utc = false} = {}){
    if (dt===null){
      if (arguments.length==0)
        throw new Error("'dt' arg is missing");
    
      dt = arguments[0]; 
    }
    
    const v = types.isDate(dt) ? dt : new Date(dt);
    
    const month   = utc ? v.getUTCMonth()    : v.getMonth();
    const daym    = utc ? v.getUTCDate()     : v.getDate();
    const dayw    = utc ? v.getUTCDay()      : v.getDay();
    const year    = utc ? v.getUTCFullYear() : v.getFullYear();
    
    const d2 = (num) => ("0" + num.toString()).slice(-2);
    const d3 = (num) => ("00" + num.toString()).slice(-3);
    const dnl = (idx) => this.localizeCultureString(INVARIANT_DAY_LONG_NAMES[idx], culture, FIELD_DAY);
    const dns = (idx) => this.localizeCultureString(INVARIANT_DAY_SHORT_NAMES[idx], culture, FIELD_DAY);
    const mnl = (idx) => this.localizeCultureString(INVARIANT_MONTH_LONG_NAMES[idx], culture, FIELD_MONTH);
    const mns = (idx) => this.localizeCultureString(INVARIANT_MONTH_SHORT_NAMES[idx], culture, FIELD_MONTH);
    
    let result = "";
    
    switch(dtFormat){
      case DATE_FORMAT.LONG_WEEK_DATE:   result = `${dnl(dayw)}, ${daym} ${mnl(month)} ${year}`;  break; //  Tuesday, 30 August 2018
      case DATE_FORMAT.SHORT_WEEK_DATE:  result = `${dns(dayw)}, ${daym} ${mns(month)} ${year}`;  break; //  Tue, 30 Aug 2018
      case DATE_FORMAT.LONG_DATE:        result = `${daym} ${mnl(month)} ${year}`;  break; //  30 August 2018
      case DATE_FORMAT.SHORT_DATE:       result = `${daym} ${mns(month)} ${year}`;  break; //  30 Aug 2018 
      case DATE_FORMAT.NUM_DATE:         result = `${d2(month+1)}/${d2(daym)}/${year}`;  break;//  08/30/2018

      case DATE_FORMAT.LONG_MONTH:       result = `${mnl(month)} ${year}`;  break;  // August 2018
      case DATE_FORMAT.SHORT_MONTH:      result = `${mns(month)} ${year}`;  break;  // Aug 2018
      case DATE_FORMAT.NUM_MONTH:        result = `${d2(month+1)}/${year}`;  break;   // 10/2018

      case DATE_FORMAT.LONG_DAY_MONTH:   result = `${daym} ${mnl(month)}`;  break;    //  12 August
      case DATE_FORMAT.SHORT_DAY_MONTH:  result = `${daym} ${mns(month)}`; break;     //  12 Aug
      default:
        result = `${daym} ${mnl(month)} ${year}`;
    }
    
    if (tmDetails===TIME_DETAILS.NONE) return result;
    
    const hours   = utc ? v.getUTCHours()    : v.getHours();
    const minutes = utc ? v.getUTCMinutes()  : v.getMinutes();
    
    if (tmDetails===TIME_DETAILS.HM) return `${result} ${d2(hours)}:${d2(minutes)}`;
    
    const seconds = utc ? v.getUTCSeconds()  : v.getSeconds();
    
    if (tmDetails===TIME_DETAILS.HMS) return `${result} ${d2(hours)}:${d2(minutes)}:${d2(seconds)}`;

    const millis =  utc ? v.getUTCMilliseconds()  : v.getMilliseconds();
    return `${result} ${d2(hours)}:${d2(minutes)}:${d2(seconds)}:${d3(millis)}`;
  }

  /*eslint-disable no-unused-vars*///------------------------------
  
  /**
  * @typedef {Object} CurrencySymbols
  * @property {string} sym Currency symbol, such as $
  * @property {string} ts Thousands separator, such as ,
  * @property {string} ds Decimal separator, such as .
  */

  /**
   * Returns currency formatting symbols for culture
   * @param {string} culture
   * @returns {CurrencySymbols} Currency formatting symbols
   */
  getCurrencySymbols(culture){
    return {sym: "$", ts: ",", ds: "."};
  }

  /**
   * Returns primary language iso code for the specified culture
   * @param {string} culture 
   */
  getPrimaryLanguageIso(culture){
    return ISO_LANG_ENG;
  }

  /**
   * Returns an array of languages in the order of imporatnce for the specified culture
   * @param {string} culture 
   */
  getLanguageIsos(culture){
    return [ISO_LANG_ENG];
  }

  /*eslint-enable no-unused-vars*///------------------------------

  /**
   * Formats currency per supplied culture
   * @param {Object|number}args 
   * @param {number} args.amt Amount to format - required
   * @param {string} args.iso Currency iso code such as 'usd' - required
   * @param {string} args.culture Formatting culture id
   * @param {int} args.precision Number of decimal places
   * @param {boolean} args.symbol True to add the currency symbol
   * @param {boolean} args.sign  True to add minus sign, otheriwse culture accounting format is used (such as paranthesis in the US)
   * @param {boolean} args.thousands True to add thousands separator
   */
  formatCurrency({amt = NaN, iso = null, culture = null,  precision = 2, symbol = true, sign = true, thousands = true} = {}){
    if (isNaN(amt)){
      if (arguments.length<2)
        throw new Error("Currency 'amt' and 'iso' args are required");
      amt = arguments[0]; 
      iso = arguments[1];
    }

    if (isNaN(amt)) throw new Error("Currency 'amt' isNaN");
    if (!iso) throw new Error("Currency 'iso' is required");
    if (!culture) culture = CULTURE_INVARIANT;
    const symbols = this.getCurrencySymbols(culture);
    const neg = amt < 0;
    if (precision<0) precision = 0;

    amt = Math.floor(Math.abs(amt) * Math.pow(10, precision));
    const amts = amt.toString();
    let amtw, amtf;
    if (precision>0){
      amtw = amts.slice(0, amts.length-precision);//whole
      amtf = amts.slice(-precision);//fraction
    }else{
      amtw = amts;
      amtf = "";
    }

    if (thousands){
      let whole = "";
      for(let i=1; amtw.length-i>=0; i++){
        if (i>1 && (i-1)%3===0) whole = symbols.ts + whole;
        whole = amtw[amtw.length-i] + whole;
      }
      amtw = whole; 
    }

    let result = neg ? (sign ? "-" : "(") : "";//  - or (
    
    result += symbol ? symbols.sym : "";// $

    result += precision>0 ? amtw + symbols.ds + amtf : amtw; // whole.fraction
    
    if (neg && !sign) result += ")";
    return result;
  }


  /**
   * Returns an array of all language ISOs supported by the instance
   */
  getStringLocalizationIsos(){
    return Object.keys(this.m_Strings).filter(n => n.length === 3);
  }

  /**
   * Localizes string identified by the value within the schema and field scopes for the primary language of the supplied culture
   */
  localizeCultureString(value, culture, field, schema){
    let iso = this.getPrimaryLanguageIso(culture);
    return this.localizeString(value, iso, field, schema);
  }

  /**
   * Localizes string identified by the value within the schema and field scopes per supplied language iso code
   * @param {string} value to localize/localization key
   * @param {string} iso language iso code
   * @param {string} field field name to which localization is applied, e.g. ANY_FIELD. Fields are resolved under schema
   * @param {string} schema schema name to which localization is applied, e.g. ANY_SCHEMA 
   */
  localizeString(value, iso, field, schema){
    if (!value) return null;
    if (strings.isEmpty(value) || strings.isEmpty(iso)) return null;
  
    if (strings.isEmpty(field)) field = ANY_FIELD;
    if (strings.isEmpty(schema)) schema = ANY_SCHEMA;
  
    var node = this.m_Strings;
    if (!node.hasOwnProperty(iso)) return value;
    node = node[iso];
  
    if (!node.hasOwnProperty(schema)){
      if (!node.hasOwnProperty(ANY_SCHEMA)) return value;
      node = node[ANY_SCHEMA];
    } else node = node[schema];
  
    if (!node.hasOwnProperty(field)){
      if (!node.hasOwnProperty(ANY_FIELD)) return value;
      node = node[ANY_FIELD];
    } else node = node[field];
  
    if (!node.hasOwnProperty(value)) return value;
    return node[value];
  }


}

/**
 * Default Invariant Localizer instance
 */
export const INVARIANT = new Localizer();

let s_Current = INVARIANT;

/**
 * Injects custom localizer, typically this is done in the app.js file for the specific application
 * @param {Localizer} loc 
 */
export function injectLocalizer(loc){
  aver.isOf(loc, Localizer);
  s_Current = loc;
}

/**
 * Returns currently injected localizer
 */
export function currentLocalizer(){ return s_Current; }