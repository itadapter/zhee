import * as CC from "./coreconsts";
import * as types from "./types";
import * as aver from "./aver";


/**
 * Provides default implementation of invariant localizer.
 * Other localizer shall extend this class and inject their instance using
 *  localization.injectLocalizer(new CustomLocalizer(...))
 */
export class DefaultLocalizer{
  
  constructor(){ }

  get isInvariant() { return true; }

  formatDateTime({value = 0, iso = "", date = true, time = true, utc = false} = {}){

  }

  getCurrencySymbol(iso){
    return "$";
  }

  formatCurrency({amount = 0, iso = "usd", precision = 2, symbol = true, sign = true} = {}){
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
