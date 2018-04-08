const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Types;

describe("Types", function() {

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

});