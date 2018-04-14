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
      [ISO_LANG_ENG]: { },
      [ISO_LANG_RUS]: { },
      [ISO_LANG_DEU]: { },
      [ISO_LANG_FRA]: { },
      [ISO_LANG_ESP]: { }
    };
  }

  get isInvariant() { return true; }

  /**
   * Formats the date and time
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
  
  getCurrencySymbol(culture){
    return "$";
  }

  /*eslint-disable no-unused-vars*/
  getCurrencyThousandsSeparator(culture){
    return ",";
  }

  getCurrencyDecimalSeparator(culture){
    return ".";
  }

  /**
   * Returns primary language iso code for the specified culture
   * @param {string} culture 
   */
  getCulturePrimaryLanguageIso(culture){
    return ISO_LANG_ENG;
  }

  /**
   * Returns an array of languages in the order of imporatnce for the specified culture
   * @param {string} culture 
   */
  getCultureLanguageIsos(culture){
    return [ISO_LANG_ENG];
  }

  /*eslint-enable no-unused-vars*///------------------------------

  /**
   * 
   * @param {Object|number} amount Amount object or number for defaults
   */
  formatCurrency({amount = NaN, iso = "usd", precision = 2, symbol = true, sign = true, thousands = true} = {}){
    if (isNaN(amount) && arguments.length>0) amount = arguments[0];
    //console.log(amount, iso, precision, symbol, sign);
  }

  /**
   * Localizes string identified by the value within the schema and field scopes for the primary language of the supplied culture
   */
  localizeCultureString(value, culture, field = ANY_FIELD, schema = ANY_SCHEMA){
    let iso = this.getCulturePrimaryLanguageIso(culture);
    return this.localizeString(value, iso, field, schema);
  }

  /**
   * Localizes string identified by the value within the schema and field scopes per supplied language iso code
   * @param {} param0 
   */
  localizeString(value, iso, field = ANY_FIELD, schema = ANY_SCHEMA){
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

let s_Localizer = new Localizer();

/**
 * Injects custom localizer, typically this is done in the app.js file for the specific application
 * @param {Localizer} loc 
 */
export function injectLocalizer(loc){
  aver.isOf(loc, Localizer);
  s_Localizer = loc;
}

/**
 * Returns currently injected localizer
 */
export function currentLocalizer(){ return s_Localizer; }