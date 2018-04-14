const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Localization;

describe("Localization", function() {

  describe("#DefaultLocalizer", function() {
    
    const dloc = new sut.DefaultLocalizer();


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