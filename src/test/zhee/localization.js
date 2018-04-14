const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Localization;

describe("Localization", function() {

  describe("#Localizer", function() {
    
    const dloc = new sut.Localizer();//Default Localizer


    describe("#getCurrencySymbols()", function() {
      it("returns object", function(){ 
        let got = dloc.getCurrencySymbols(sut.CULTURE_INVARIANT);
        console.log( got );
        aver.areEqual("$", got.sym);
        aver.areEqual(",", got.ts);
        aver.areEqual(".", got.ds);
      });
    });
    
    describe("#getPrimaryLanguageIso()", function() {
      it("returns ENG", function(){ 
        let got = dloc.getPrimaryLanguageIso(sut.CULTURE_INVARIANT);
        console.log( got );
        aver.areEqual(sut.ISO_LANG_ENG, got);
      });
    });

    describe("#getLanguageIsos()", function() {
      it("returns ENG", function(){ 
        let got = dloc.getLanguageIsos(sut.CULTURE_INVARIANT);
        aver.isArray(got);
        aver.areEqual(sut.ISO_LANG_ENG, got[0]);
      });
    });

    describe("#getStringLocalizationIsos()", function() {
      it("returns ENG", function(){ 
        let got = dloc.getStringLocalizationIsos();
        aver.isArray(got);
        aver.areEqual(5, got.length);
        aver.areEqual(sut.ISO_LANG_ENG, got[0]);
        aver.areEqual(sut.ISO_LANG_ESP, got[4]);
      });
    });

    describe("#localizeString()", function() {
      it("passthrough", function(){   aver.areEqual("doesnotexist", dloc.localizeString("doesnotexist", sut.ISO_LANG_ENG));   });
      it("yes",  function(){   aver.areEqual("да",   dloc.localizeString("yes", sut.ISO_LANG_RUS));   });
      it("no",   function(){   aver.areEqual("нет",  dloc.localizeString("no", sut.ISO_LANG_RUS));    });
      it("abra", function(){   aver.areEqual("abra", dloc.localizeString("abra", sut.ISO_LANG_RUS));  });

      it("yes",  function(){   aver.areEqual("ja",   dloc.localizeString("yes", sut.ISO_LANG_DEU));   });
      it("no",   function(){   aver.areEqual("nein", dloc.localizeString("no", sut.ISO_LANG_DEU));    });
      it("abra", function(){   aver.areEqual("abra", dloc.localizeString("abra", sut.ISO_LANG_DEU));  });

      it("yes in schema",  function(){   aver.areEqual("так",   dloc.localizeString("yes", sut.ISO_LANG_RUS, sut.ANY_FIELD, "tezt"));   });
      it("no in schema",   function(){   aver.areEqual("неа",   dloc.localizeString("no", sut.ISO_LANG_RUS, sut.ANY_FIELD, "tezt"));   });
      it("yes in n/a filed n/a schema",  function(){   aver.areEqual("да",   dloc.localizeString("yes", sut.ISO_LANG_RUS, "fieldX", "schemaX"));   });
      it("yes in anyf/anys",  function(){   aver.areEqual("да",   dloc.localizeString("yes", sut.ISO_LANG_RUS, sut.ANY_FIELD, sut.ANY_SCHEMA));   });
    });


    describe("#formatDateTime()", function() {
      
      const dt = new Date(2017, 5, 12,  15, 43, 19, 89);// 12/june/2017 = Monday

      it("arg0s", function(){ 
        let got = dloc.formatDateTime(dt);
        console.log( got );
        aver.areEqual("06/12/2017", got);
      });

      it("LONG_WEEK_DATE", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_WEEK_DATE});
        console.log( got );
        aver.areEqual("Monday, 12 June 2017", got);
      });

      it("SHORT_WEEK_DATE", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.SHORT_WEEK_DATE});
        console.log( got );
        aver.areEqual("Mon, 12 Jun 2017", got);
      });

      it("LONG_DATE", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_DATE});
        console.log( got );
        aver.areEqual("12 June 2017", got);
      });

      it("SHORT_DATE", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.SHORT_DATE});
        console.log( got );
        aver.areEqual("12 Jun 2017", got);
      });

      it("NUM_DATE", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.NUM_DATE});
        console.log( got );
        aver.areEqual("06/12/2017", got);
      });

      it("LONG_MONTH", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_MONTH});
        console.log( got );
        aver.areEqual("June 2017", got);
      });

      it("SHORT_MONTH", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.SHORT_MONTH});
        console.log( got );
        aver.areEqual("Jun 2017", got);
      });

      it("NUM_MONTH", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.NUM_MONTH});
        console.log( got );
        aver.areEqual("06/2017", got);
      });

      it("LONG_DAY_MONTH", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_DAY_MONTH});
        console.log( got );
        aver.areEqual("12 June", got);
      });

      it("SHORT_DAY_MONTH", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.SHORT_DAY_MONTH});
        console.log( got );
        aver.areEqual("12 Jun", got);
      });


      it("LONG_WEEK_DATE+HM", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_WEEK_DATE, tmDetails: sut.TIME_DETAILS.HM});
        console.log( got );
        aver.areEqual("Monday, 12 June 2017 15:43", got);
      });

      it("LONG_WEEK_DATE+HMS", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_WEEK_DATE, tmDetails: sut.TIME_DETAILS.HMS});
        console.log( got );
        aver.areEqual("Monday, 12 June 2017 15:43:19", got);
      });

      it("LONG_WEEK_DATE+HMSM", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_WEEK_DATE, tmDetails: sut.TIME_DETAILS.HMSM});
        console.log( got );
        aver.areEqual("Monday, 12 June 2017 15:43:19:089", got);
      });

      it("LONG_WEEK_DATE+HMSM in UTC", function(){ 
        let got = dloc.formatDateTime({dt: dt, dtFormat: sut.DATE_FORMAT.LONG_WEEK_DATE, tmDetails: sut.TIME_DETAILS.HMSM, utc: true});
        console.log( got );
        aver.areNotEqual("Monday, 12 June 2017 15:43:19:089", got);// the actual time shift depends on the workstation
      });


    });


    describe("#formatCurrency()", function() {
      it("works", function(){ dloc.formatCurrency(500);  });
      //it("false for empty()",   function() { aver.isFalse( sut.isAssigned()           );});
    }); 

  });

});