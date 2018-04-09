const zhee = require("../../../out/zhee/zhee");
const sut = zhee.Aver;

describe("Aver", function() {

  describe("#isUndefined()", function() {

    it("pass undefined",   function() {
      let x = undefined;
      sut.isUndefined(x);
    });

    it("fail defined",   function() {
      sut.throws(function(){
        let x = 2;
        sut.isUndefined(x);
      }, "averment failure: isundefined");
    });
  });
  
  describe("#isDefined()", function() {

    it("pass defined",   function() {
      let x = 1;
      sut.isDefined(x);
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        let x = undefined;
        sut.isDefined(x);
      }, "averment failure: isdefined");
    });
  });

  describe("#isNull()", function() {

    it("pass null",   function() {
      let x = null;
      sut.isNull(x);
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        let x = undefined;
        sut.isNull(x);
      }, "averment failure: isnull");
    });

    it("fail non null",   function() {
      sut.throws(function(){
        let x = {};
        sut.isNull(x);
      }, "averment failure: isnull");
    });
  });

  describe("#isNotNull()", function() {

    it("pass non null",   function() {
      let x = {};
      sut.isNotNull(x);
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        let x = undefined;
        sut.isNotNull(x);
      }, "averment failure: isnotnull");
    });

    it("fail null",   function() {
      sut.throws(function(){
        let x = null;
        sut.isNotNull(x);
      }, "averment failure: isnotnull");
    });
  });

  describe("#isObject()", function() {

    it("pass object",   function() {
      let x = {};
      sut.isObject(x);
    });

    it("fail []",   function() {
      sut.throws(function(){
        let x = [];
        sut.isObject(x);
      }, "averment failure: isobject");
    });
  });

  describe("#isArray()", function() {

    it("pass array",   function() {
      let x = [];
      sut.isArray(x);
    });

    it("fail {}",   function() {
      sut.throws(function(){
        let x = {};
        sut.isArray(x);
      }, "averment failure: isarray");
    });
  });

  describe("#isFunction()", function() {

    it("pass function",   function() {
      let x = function(){ };
      sut.isFunction(x);
    });

    it("fail {}",   function() {
      sut.throws(function(){
        let x = {};
        sut.isFunction(x);
      }, "averment failure: isfunction");
    });
  });

  describe("#isFalse()", function() {

    it("pass false",   function() {
      let x = false;
      sut.isFalse(x);
    });

    it("fail true",   function() {
      sut.throws(function(){
        let x = true;
        sut.isFalse(x);
      }, "averment failure: isfalse");
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        let x = undefined;
        sut.isFalse(x);
      }, "averment failure: isfalse");
    });

    it("fail null",   function() {
      sut.throws(function(){
        let x = null;
        sut.isFalse(x);
      }, "averment failure: isfalse");
    });
  });


  describe("#isTrue()", function() {

    it("pass true",   function() {
      let x = true;
      sut.isTrue(x);
    });

    it("fail false",   function() {
      sut.throws(function(){
        let x = false;
        sut.isTrue(x);
      }, "averment failure: istrue");
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        let x = undefined;
        sut.isTrue(x);
      }, "averment failure: istrue");
    });

    it("fail null",   function() {
      sut.throws(function(){
        let x = null;
        sut.isTrue(x);
      }, "averment failure: istrue");
    });
  });


});