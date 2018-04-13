const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Strings;

describe("Strings", function() {

  describe("#isEmpty()", function() {
    it("true ()",          function() { aver.isTrue( sut.isEmpty() );});
    it("true (undefined)", function() { aver.isTrue( sut.isEmpty(undefined) );});
    it("true (null)",      function() { aver.isTrue( sut.isEmpty(null) );});

    it("true (\"\")",            function() { aver.isTrue( sut.isEmpty("") );});
    it("true (\"  \")",          function() { aver.isTrue( sut.isEmpty("   ") );});
    it("true (\" \\n  \\r  \")", function() { aver.isTrue( sut.isEmpty(" \n  \r  ") );});
    it("true ([])",              function() { aver.isTrue( sut.isEmpty([]) );});
    it("true ([\"\"])",          function() { aver.isTrue( sut.isEmpty([""]) );});
    
    
    it("false (true)",            function() { aver.isFalse( sut.isEmpty(true) );});
    it("false (false)",           function() { aver.isFalse( sut.isEmpty(false) );});
    it("false ({})",              function() { aver.isFalse( sut.isEmpty({}) );});
    it("false ([\"\",2,3])",      function() { aver.isFalse( sut.isEmpty(["",2,3]) );});
    it("false (\"some text\"])",  function() { aver.isFalse( sut.isEmpty("some text") );});
    it("false (\"----------\"])", function() { aver.isFalse( sut.isEmpty("----------") );});
    it("false (\"---\\r\\n-------\"])", function() { aver.isFalse( sut.isEmpty("---\r\n-----") );});
  });
  
  describe("#truncate()", function() {
    it("passthrough undef",   function() { aver.areEqual(undefined, sut.truncate() );});
    it("passthrough null",    function() { aver.areEqual(null, sut.truncate(null) );});
    it("coerce to string",    function() { aver.areEqual("12345", sut.truncate(12345) );});
    it("coerce to string and truncate",    function() { aver.areEqual("123", sut.truncate(12345, 3) );});
    it("truncate",    function() { aver.areEqual("123", sut.truncate("12345", 3) );});
    it("ellipsis",    function() { aver.areEqual("1234..", sut.truncate("1234567890", 6, "..") );});
  });


  describe("#describe()", function() {


    it("undefined",   function() {
      let v = undefined;
      let got = sut.describe(v);
      aver.areEqual("<undefined>", got);
    });

    it("null",   function() {
      let v = null;
      let got = sut.describe(v);
      aver.areEqual("<null>", got);
    });

    it("string",   function() {
      let v = "abcdef";
      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(string[6])\"abcdef\"", got);
    });

    it("int",   function() {
      let v = 123;
      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(number)123", got);
    });

    it("float",   function() {
      let v = 123.8901;
      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(number)123.8901", got);
    });

    it("bool",   function() {
      let v = false;
      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(boolean)false", got);
    });

    it("date",   function() {
      let v = new Date("January 10, 1980 3:15:00");
      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(date)false", got);
    });



    it("array[5]",   function() {
      let v = [1,2,3,true,-34.2];

      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(Array[5])[1,2,3,true,-34.2]", got);
    });

    it("object",   function() {
      let v = {a: [1,2,3,true,-34.2], b: "abc"};

      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(object){\"a\":[1,2,3,true,-34.2],\"b\":\"abc\"}", got);
    });


  }); 


});