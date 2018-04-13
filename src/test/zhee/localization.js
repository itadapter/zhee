const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Localization;

describe("Localization", function() {

  describe("#DefaultLocalizer", function() {
    
    const dloc = new sut.DefaultLocalizer();


    describe("#formatDateTime()", function() {
      
      const dt = new Date(2017, 6, 12,  15, 43, 19, 789);

      it("arg0s", function(){ 
        let got = dloc.formatDateTime(dt);
        console.log( got );
        aver.areEqual("", got);
      });

    });


    describe("#formatCurrency()", function() {
      it("works", function(){ dloc.formatCurrency(500);  });
      //it("false for empty()",   function() { aver.isFalse( sut.isAssigned()           );});
    }); 

  });

});