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
    it("'' ()",   function() { aver.areEqual("", sut.truncate() );});
    it("'' undef",   function() { aver.areEqual("", sut.truncate(undefined) );});
    it("'' null",    function() { aver.areEqual("", sut.truncate(null) );});
    it("coerce to string",    function() { aver.areEqual("12345", sut.truncate(12345) );});
    it("coerce to string and truncate",    function() { aver.areEqual("123", sut.truncate(12345, 3) );});
    it("truncate",    function() { aver.areEqual("123", sut.truncate("12345", 3) );});
    it("ellipsis",    function() { aver.areEqual("1234..", sut.truncate("1234567890", 6, "..") );});
  });

  describe("#trim()", function() {
    it("'' ()",   function() { aver.areEqual("", sut.trim() );});
    it("'' undef",   function() { aver.areEqual("", sut.trim(undefined) );});
    it("'' null",    function() { aver.areEqual("", sut.trim(null) );});

    it("coerce int to string",    function() { aver.areEqual("12345", sut.trim(12345) );});
    it("coerce bool to string",    function() { aver.areEqual("true", sut.trim(true) );});

    it("case 1",    function() { aver.areEqual("abc", sut.trim(" abc") );});
    it("case 2",    function() { aver.areEqual("abc", sut.trim(" abc ") );});
    it("case 3",    function() { aver.areEqual("abc", sut.trim("\n abc\r ") );});
    it("case 4",    function() { aver.areEqual("a bc", sut.trim("\n a bc\r ") );});
    it("case 5",    function() { aver.areEqual("a\n\n   bc", sut.trim("\n a\n\n   bc\r ") );});
  });

  describe("#trimLeft()", function() {
    it("'' ()",   function() { aver.areEqual("", sut.trimLeft() );});
    it("'' undef",   function() { aver.areEqual("", sut.trimLeft(undefined) );});
    it("'' null",    function() { aver.areEqual("", sut.trimLeft(null) );});

    it("coerce int to string",    function() { aver.areEqual("12345", sut.trimLeft(12345) );});
    it("coerce bool to string",    function() { aver.areEqual("true", sut.trimLeft(true) );});

    it("case 1",    function() { aver.areEqual("abc", sut.trimLeft(" abc") );});
    it("case 2",    function() { aver.areEqual("abc ", sut.trimLeft(" abc ") );});
    it("case 3",    function() { aver.areEqual("abc\r ", sut.trimLeft("\n abc\r ") );});
    it("case 4",    function() { aver.areEqual("a bc\r ", sut.trimLeft("\n a bc\r ") );});
    it("case 5",    function() { aver.areEqual("a\n\n   bc\r ", sut.trimLeft("\n a\n\n   bc\r ") );});
  });

  describe("#trimRight()", function() {
    it("'' ()",   function() { aver.areEqual("", sut.trimRight() );});
    it("'' undef",   function() { aver.areEqual("", sut.trimRight(undefined) );});
    it("'' null",    function() { aver.areEqual("", sut.trimRight(null) );});

    it("coerce int to string",    function() { aver.areEqual("12345", sut.trimRight(12345) );});
    it("coerce bool to string",    function() { aver.areEqual("true", sut.trimRight(true) );});

    it("case 1",    function() { aver.areEqual(" abc", sut.trimRight(" abc") );});
    it("case 2",    function() { aver.areEqual(" abc", sut.trimRight(" abc ") );});
    it("case 3",    function() { aver.areEqual("\n abc", sut.trimRight("\n abc\r ") );});
    it("case 4",    function() { aver.areEqual("\n a bc", sut.trimRight("\n a bc\r ") );});
    it("case 5",    function() { aver.areEqual("\n a\n\n   bc", sut.trimRight("\n a\n\n   bc\r ") );});
  });


  describe("#dflt()", function() {
    it("()",     function()    { aver.areEqual("", sut.dflt() );});
    it("undef",  function() { aver.areEqual("", sut.dflt(undefined) );});
    it("null",   function() { aver.areEqual("", sut.dflt(null) );});

    it("1",   function() { aver.areEqual("abc", sut.dflt(undefined, "abc") );});
    it("2",   function() { aver.areEqual("abc", sut.dflt(null, "abc") );});

    it("1 2",   function() { aver.areEqual("def", sut.dflt(undefined, undefined, "def") );});
    it("2 2",   function() { aver.areEqual("def", sut.dflt(null, null, "def") );});

    it("3",   function() { aver.areEqual("abc", sut.dflt("abc", undefined, "def") );});
    it("4",   function() { aver.areEqual("cba", sut.dflt("cba", null, "def") );});
    it("5",   function() { aver.areEqual("cba", sut.dflt("cba", "   ", "def") );});
    it("6",   function() { aver.areEqual("123", sut.dflt(123, "   ", "def") );});

    it("6",   function() { aver.areEqual("true", sut.dflt(true, "   ", "def") );});
    it("7",   function() { aver.areEqual("false", sut.dflt(false, "   ", "def") );});

    let x = " \r\n    ";
    let y = "anyway";
    it("8",   function() { aver.areEqual(y, sut.dflt(x, y) );});
    it("9",   function() { aver.areEqual(x, sut.dflt(x) );});
  });


  describe("#asString()", function() {
    it("()",          function() { aver.areEqual("",    sut.asString()      );});
    it("undefined",   function() { aver.areEqual("",    sut.asString(undefined));});
    it("null",        function() { aver.areEqual("",    sut.asString(null)  );});
    it("-1",          function() { aver.areEqual("-1",  sut.asString(-1)    );});
    it("'abcd'",      function() { aver.areEqual("abcd", sut.asString("abcd") );});

    it("undefined, true",   function() { aver.areEqual(undefined,    sut.asString(undefined, true));});
    it("null, true",        function() { aver.areEqual("",    sut.asString(null, true)  );});
    it("-1, true",          function() { aver.areEqual("-1",  sut.asString(-1, true)    );});
    it("'abcd', true",      function() { aver.areEqual("abcd", sut.asString("abcd", true) );});

    it("true",    function() { aver.areEqual("true",  sut.asString(true) );});
    it("false",   function() { aver.areEqual("false", sut.asString(false) );});
    it("'defg'",   function() { aver.areEqual("defg", sut.asString(new String("defg")) );});
    it("date",   function() { aver.isTrue( sut.asString(new Date(1980, 1, 18)).indexOf("1980")>0 );});
  }); 

  describe("#isOneOf()", function() {
    it("()",          function() { aver.isFalse(  sut.isOneOf()    );});
    it("(aaa,)",          function() { aver.isFalse(  sut.isOneOf("aaa")    );});
    
    it("(aaa,bbb)",          function() { aver.isFalse(  sut.isOneOf("aaa","bbb")    );});
    it("(aaa,aaa)",          function() { aver.isTrue(  sut.isOneOf("aaa","aaa")    );});
    it("(aaa,aAA)",          function() { aver.isTrue(  sut.isOneOf("aaa","aAA")    );});
    it("(aaa,aAA, true)",          function() { aver.isFalse(  sut.isOneOf("aaa","aAA", true)    );});


    it(" case 1 ",          function() { aver.isFalse(  sut.isOneOf("bbb","a;b;c;d;e;f;aaa;ddd")    );});
    it(" case 2 ",          function() { aver.isTrue(  sut.isOneOf("ddd","a;b;c;d;e;f;aaa;ddd")    );});
    it(" case 3 ",          function() { aver.isTrue(  sut.isOneOf("ddd","a;b;c;d;e;f;aaa;dDD", false)    );});
    it(" case 4 ",          function() { aver.isFalse(  sut.isOneOf("ddd","a;b;c;d;e;f;aaa;dDD", true)    );});

    it(" case 5 ",          function() { aver.isTrue(  sut.isOneOf(1,"a;b;c;1;e;f;aaa;ddd")    );});
    it(" case 6 ",          function() { aver.isTrue(  sut.isOneOf(false,"a;b;c;1;false;f;2aaa;ddd")    );});
    it(" case 7 ",          function() { aver.isTrue(  sut.isOneOf(false,"a|b|c|1|false|f|2aaa|ddd")    );});

    it("flags 1 ",          function() { aver.isTrue(  sut.isOneOf("rich","a| b | RICH |  TIMID")    );});
    it("flags 2 ",          function() { aver.isTrue(  sut.isOneOf("tImiD","a| b| RICH | TIMID ")    );});
    it("flags 3 ",          function() { aver.isTrue(  sut.isOneOf("a","a|b| RICH|TIMID")    );});
    it("flags 4 ",          function() { aver.isFalse(  sut.isOneOf("hue","a|b|RICH|TIMID")    );});

    it("flags 1 arr",          function() { aver.isTrue(  sut.isOneOf("rich",["a  "," b", " RICH ", " TIMID"])    );});
    it("flags 2 arr",          function() { aver.isTrue(  sut.isOneOf("tImiD",["a  "," b", " RICH ", " TIMID"])    );});
    it("flags 3 arr",          function() { aver.isTrue(  sut.isOneOf("a", ["a  "," b", " RICH ", " TIMID"])    );});
    it("flags 4 arr",          function() { aver.isFalse(  sut.isOneOf("hue",["a  "," b", " RICH ", " TIMID"])    );});

    it("mix of types 1",          function() { aver.isTrue(  sut.isOneOf(true,[ 1, true," 23", "goOD"])    );});
    it("mix of types 2",          function() { aver.isTrue(  sut.isOneOf(23,[ 1, true," 23", "goOD"])    );});
    it("mix of types 3",          function() { aver.isTrue(  sut.isOneOf("23",[ 1, true, 23, "goOD"])    );});
    it("mix of types 4",          function() { aver.isTrue(  sut.isOneOf("good",[ 1, true, 23, "goOD"])    );});
    it("mix of types 5",          function() { aver.isFalse(  sut.isOneOf("good",[ 1, true, 23, "goOD"],true)    );});

    it("mix of types 6",          function() { aver.isTrue(  sut.isOneOf(7 , [ 1, 2, 7, "go"])  );});
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
      let v = new Date(1980, 7, 15);
      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(date)08/15/1980", got);
    });



    it("array[5]",   function() {
      let v = [1,2,3,true,-34.2];

      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(array[5])[1,2,3,true,-34.2]", got);
    });

    it("object",   function() {
      let v = {a: [1,2,3,true,-34.2], b: "abc"};

      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(object){\"a\":[1,2,3,true,-34.2],\"b\":\"abc\"}", got);
    });

    it("symbol",   function() {
      let v = Symbol(123);

      let got = sut.describe(v);
      console.log( got );
      aver.areEqual("(symbol)Symbol(123)", got);
    });


  }); 


});