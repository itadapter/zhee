const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Localization;

describe("Localization", function() {

  describe("#DefaultLocalizer", function() {
    
    const dloc = new sut.DefaultLocalizer();

    describe("#formatCurrency()", function() {
      it("works", function(){ dloc.formatCurrency(500);  });
      //it("false for empty()",   function() { aver.isFalse( sut.isAssigned()           );});
    }); 

  });

});