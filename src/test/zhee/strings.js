const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Strings;

describe("Strings", function() {

  describe("#truncate()", function() {
    it("passthrough undef",   function() { aver.areEqual(undefined, sut.truncate() );});
    it("passthrough null",    function() { aver.areEqual(null, sut.truncate(null) );});
    it("coerce to string",    function() { aver.areEqual("12345", sut.truncate(12345) );});
    it("coerce to string and truncate",    function() { aver.areEqual("123", sut.truncate(12345, 3) );});
    it("truncate",    function() { aver.areEqual("123", sut.truncate("12345", 3) );});
    it("ellipsis",    function() { aver.areEqual("1234..", sut.truncate("1234567890", 6, "..") );});
  }); 


  describe("#describe()", function() {

    it("array[5]",   function() {
      let v = [1,2,3,true,-34.2];

      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(Array[5])[1,2,3,true,-34.2]", got);
    });

    
  }); 


});