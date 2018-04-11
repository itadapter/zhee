import * as CC from "./coreconsts";
import * as types from "./types";
import * as aver from "./aver";

import { truncate } from "./strings";

export const CULTURE_INVARIANT = "*";
export const CULTURE_US = "us";

export const ISO_LANG_ENG = "eng";
export const ISO_LANG_DEU = "deu";
export const ISO_LANG_RUS = "rus";


export const DATE_FORMAT = {
  LONG_WEEK_DATE:   "LongWeekDate",  //  Tuesday, 30 August 2018
  SHORT_WEEK_DATE:  "ShortWeekDate", //  Tue, 30 Aug 2018
  LONG_DATE:        "LongDate",      //  30 August 2018
  SHORT_DATE:       "ShortDate",     //  30 Aug 2018 
  NUM_DATE:         "NumDate",       //  08/30/2018

  LONG_MONTH:      "LongMonth",      // August 2018
  SHORT_MONTH:     "ShortMonth",     // Aug 2018
  SHORT_NUM_MONTH: "NumMonth",       // 10/2018

  LONG_DAY_MONTH: "LongDayMonth",    //  12 August
  SHORT_DAY_MONTH: "ShortDayMonth",  //  12 Aug
};

export const TIME_DETAILS = {
  NONE: 0,  // time is off
  HM:   1, // hours:minutes
  HMS:  2, // hours:minutes:seconds
  HMSM: 3  // hours:minutes:seconds:millis
};


export const INVARIANT_MONTH_LONG_NAMES = ["January",
                                  "February",
                                  "March",
                                  "April",
                                  "May",
                                  "June",
                                  "July",
                                  "August",
                                  "September",
                                  "October",
                                  "November",
                                  "December"];

export const INVARIANT_MONTH_SHORT_NAMES = INVARIANT_MONTH_LONG_NAMES.map( v => truncate(v, 3) );

export const INVARIANT_DAY_LONG_NAMES = ['Sunday', 
                                       'Monday', 
                                       'Tuesday', 
                                       'Wednesday', 
                                       'Thursday', 
                                       'Friday', 
                                       'Saturday'];
export const INVARIANT_DAY_SHORT_NAMES = INVARIANT_DAY_LONG_NAMES.map( v => truncate(v, 3) );



/**
 * Provides default implementation of invariant localizer.
 * Other localizer shall extend this class and inject their instance using
 *  localization.injectLocalizer(new CustomLocalizer(...))
 */
export class DefaultLocalizer{
  
  constructor(){ }

  get isInvariant() { return true; }

  /**
   * Formats the date and time
   * @param {*} param0 
   */
  formatDateTime({dt = null, culture = null, dtFormat = DATE_FORMAT.LONG_DATE, tmDetails = TIME_DETAILS.NONE, utc = false} = {}){
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
    const dnl = (idx) => strLocalize(langIso, "date", "", INVARIANT_DAY_LONG_NAMES[idx]);
    const dns = (idx) => strLocalize(langIso, "date", "", INVARIANT_DAY_SHORT_NAMES[idx]);
    const mnl = (idx) => strLocalize(langIso, "date", "", INVARIANT_MONTH_LONG_NAMES[idx]);
    const mns = (idx) => strLocalize(langIso, "date", "", INVARIANT_MONTH_SHORT_NAMES[idx]);
    
    let result = "";
    
    switch(dtFormat){
      case DATE_FORMAT.LONG_WEEK_DATE:   result = `${dnl(dayw)}, ${daym} ${mnl(month)} ${year}`;  break; //  Tuesday, 30 August 2018
      case DATE_FORMAT.SHORT_WEEK_DATE:  result = `${dns(dayw)}, ${daym} ${mns(month)} ${year}`;  break; //  Tue, 30 Aug 2018
      case DATE_FORMAT.LONG_DATE:        result = `${daym} ${mnl(month)} ${year}`;  break; //  30 August 2018
      case DATE_FORMAT.SHORT_DATE:       result = `${daym} ${mns(month)} ${year}`;  break; //  30 Aug 2018 
      case DATE_FORMAT.NUM_DATE:         result = `${d2(month+1)}/${d2(daym)}/${year}`;  break;//  08/30/2018
      
      case DATE_FORMAT.LONG_MONTH:       result = `${mnl(month)} ${year}`;  break;  // August 2018
      case DATE_FORMAT.SHORT_MONTH:      result = `${mns(month)} ${year}`;  break;  // Aug 2018
      case DATE_FORMAT.NUM_MONTH:        result = `${d2(month)} ${year}`;  break;   // 10/2018
      
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
    return `${result} ${d2(hours)}:${d2(minutes)}:${d2(seconds)}:${millis}`;
  }

  getCurrencySymbol(iso){
    return "$";
  }

  getCurrencyThousandsSeparator(iso){
    return ",";
  }

  getCurrencyDecimalSeparator(iso){
    return ".";
  }

  /**
   * 
   * @param {Object|number} amount Amount object or number for defaults
   */
  formatCurrency({amount = NaN, iso = "usd", precision = 2, symbol = true, sign = true, thousands = true} = {}){
    if (isNaN(amount) && arguments.length>0) amount = arguments[0];
    console.log(amount, iso, precision, symbol, sign);
  }
}

let s_Localizer = new DefaultLocalizer();

/**
 * Injects custom localizer
 * @param {DefaultLocalizer} loc 
 */
export function injectLocalizer(loc){
  aver.isOf(loc, DefaultLocalizer);
  s_Localizer = loc;
}

/**
 * Returns currently injected localizer
 */
export function getCurrentLocalizer(){ return s_Localizer; }



//todo  Finish and test cover
export function formatDateTime(d, cult, utc){
  return s_Localizer.formatDateTime(d, cult, utc);
}

export function formatDate(d, cult, utc){
  return s_Localizer.formatDate(d, cult, utc);
}

export function formatTime(d, cult, utc){
  return s_Localizer.formatTime(d, cult, utc);
}
