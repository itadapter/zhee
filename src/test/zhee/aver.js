const zhee = require("../../../out/zhee/zhee");
const sut = zhee.Aver;

describe("Aver", function() {

  describe("#isUndefined()", function() {

    it("ret true for undefined",   function() {
       let x = undefined;
       sut.isUndefined(x);
    });

    it("throw for defined",   function() {
      sut.throws(function(){
          let x = 2;
          sut.isUndefined(x);
        }, "averment failure: isundefined");
    });
  });
  
  describe("#isDefined()", function() {

    it("ret true for defined",   function() {
       let x = 1;
       sut.isDefined(x);
    });

    it("throw for undefined",   function() {
      sut.throws(function(){
          let x = undefined;
          sut.isDefined(x);
        }, "averment failure: isdefined");
    });
  });


});