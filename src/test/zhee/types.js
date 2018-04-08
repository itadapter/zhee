const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Types;

describe("Types", function() {

  describe("#isAssigned()", function() {
    it("ret false for empty()",   function() { aver.isFalse( sut.isAssigned()           );});
    it("ret false for undefined", function() { aver.isFalse( sut.isAssigned(undefined)  );});
    it("ret false for null",      function() { aver.isFalse( sut.isAssigned(null)       );});

    it("ret true for ''",       function() { aver.isTrue( sut.isAssigned("")       );});
    it("ret true for 'abc'",   function() { aver.isTrue( sut.isAssigned("abc")    );});
    it("ret true for []",   function() { aver.isTrue( sut.isAssigned([])    );});
    it("ret true for {}",   function() { aver.isTrue( sut.isAssigned({})    );});
    it("ret true for true",   function() { aver.isTrue( sut.isAssigned(true)    );});
    it("ret true for 123",   function() { aver.isTrue( sut.isAssigned(123)    );});
    
  }); 


  describe("#isString()", function() {
    it("ret false for empty()",   function() { aver.isFalse( sut.isString()           );});
    it("ret false for undefined", function() { aver.isFalse( sut.isString(undefined)  );});
    it("ret false for null",      function() { aver.isFalse( sut.isString(null)       );});

    it("ret false for true",      function() { aver.isFalse( sut.isString(true) );});
    it("ret false for 1",      function() { aver.isFalse( sut.isString(1)       );});
    it("ret false for []",      function() { aver.isFalse( sut.isString([])     );});
    it("ret false for {}",      function() { aver.isFalse( sut.isString({})     );});

    it("ret true for ''",       function() { aver.isTrue( sut.isString("")       );});
    it("ret true for 'abc'",   function() { aver.isTrue( sut.isString("abc")    );});
  }); 

  describe("#isArray()", function() {
    it("ret false for empty()",   function() { aver.isFalse( sut.isArray()          );});
    it("ret false for undefined", function() { aver.isFalse( sut.isArray(undefined) );});
    it("ret false for null",      function() { aver.isFalse( sut.isArray(null)      );});
    it("ret false for true",      function() { aver.isFalse( sut.isArray(true)      );});
    it("ret false for int",       function() { aver.isFalse( sut.isArray(123)       );});
    it("ret false for string",    function() { aver.isFalse( sut.isArray("zaza")    );});
    it("ret false for {}",        function() { aver.isFalse( sut.isArray({})        );});

    it("ret true for []",            function() { aver.isTrue( sut.isArray([])           );});
    it("ret true for [null, null]",  function() { aver.isTrue( sut.isArray([null, null]) );});
    it("ret true for [1,2,3]",       function() { aver.isTrue( sut.isArray([1,2,3])      );});
  });

  describe("#isObject()", function() {
    it("ret false for empty()",   function() { aver.isFalse( sut.isObject()          );});
    it("ret false for undefined", function() { aver.isFalse( sut.isObject(undefined) );});
    it("ret false for null",      function() { aver.isFalse( sut.isObject(null)      );});
    it("ret false for true",      function() { aver.isFalse( sut.isObject(true)      );});
    it("ret false for int",       function() { aver.isFalse( sut.isObject(123)       );});
    it("ret false for string",    function() { aver.isFalse( sut.isObject("zaza")    );});
    it("ret false for []",        function() { aver.isFalse( sut.isObject([])    );});

    it("ret true for {}",        function() { aver.isTrue( sut.isObject({})        );});
    it("ret true for {a:1...}",  function() { aver.isTrue( sut.isObject({a: 2, b: 3}) );});

    function Car(){ this.a=1; }

    it("ret true for new Car()",  function() { aver.isTrue( sut.isObject(new Car()) );});
  });


  describe("#isObjectOrArray()", function() {
    it("ret false for empty()",   function() { aver.isFalse( sut.isObjectOrArray()          );});
    it("ret false for undefined", function() { aver.isFalse( sut.isObjectOrArray(undefined) );});
    it("ret false for null",      function() { aver.isFalse( sut.isObjectOrArray(null)      );});
    it("ret false for true",      function() { aver.isFalse( sut.isObjectOrArray(true)      );});
    it("ret false for int",       function() { aver.isFalse( sut.isObjectOrArray(123)       );});
    it("ret false for string",    function() { aver.isFalse( sut.isObjectOrArray("zaza")    );});
    
    it("ret true for []",        function() { aver.isTrue( sut.isObjectOrArray([]) );});
    it("ret true for {}",        function() { aver.isTrue( sut.isObjectOrArray({})  );});
    it("ret true for {a:1...}",  function() { aver.isTrue( sut.isObjectOrArray({a: 2, b: 3}) );});

    function Car(){ this.a=1; }

    it("ret true for new Car()",  function()    { aver.isTrue( sut.isObjectOrArray(new Car())    );});
    it("ret true for [null, null]",  function() { aver.isTrue( sut.isObjectOrArray([null, null]) );});
    it("ret true for [1,2,3]",       function() { aver.isTrue( sut.isObjectOrArray([1,2,3])      );});
  });



});