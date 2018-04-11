import { truncate } from "./strings";

export const CULTURE_INVARIANT = "*";
export const CULTURE_US = "us";


export const ISO_LANG_ENG = "eng";
export const ISO_LANG_DEU = "deu";
export const ISO_LANG_RUS = "rus";



export const ELLIPSIS  = "...";
export const NULL      = "<null>";
export const UNDEFINED = "<undefined>";
export const UNKNOWN   = "<unknown>";
export const EMPTY     = "<empty>";


export const DATE_TIME_FORMAT = {
    LONG_DATE_TIME:  "LongDateTime",
    SHORT_DATE_TIME: "ShortDateTime",
    LONG_DATE: "LongDate",
    SHORT_DATE: "ShortDate",
    LONG_DAY_MONTH: "LongDayMoth",    //  12 August
    SHORT_DAY_MONTH: "ShortDayMoth",  //  12 Aug
    MONTH_PERIOD: "MonthPeriod",      //  10/2018
    LONG_TIME: "LongTime",            //  02:11:33 pm
    SHORT_TIME: "ShortTime"           //  02:11 pm
};



export const INVARIANT_MONTH_FULL_NAMES = ["January",
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

export const INVARIANT_MONTH_SHORT_NAMES = INVARIANT_MONTH_FULL_NAMES.map( v => truncate(v, 3) );

export const INVARIANT_DAY_FULL_NAMES = ['Sunday', 
                                         'Monday', 
                                         'Tuesday', 
                                         'Wednesday', 
                                         'Thursday', 
                                         'Friday', 
                                         'Saturday'];
export const INVARIANT_DAY_SHORT_NAMES = INVARIANT_DAY_FULL_NAMES.map( v => truncate(v, 3) );