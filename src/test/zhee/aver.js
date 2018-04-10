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


  describe("#areEqual()", function() {
    it("TRUE", function(){
      sut.areEqual(1, 1);
      sut.areEqual(null, null);
      sut.areEqual(undefined, undefined); 
    });

    it("FALSE", function(){
      sut.throws( function(){ sut.areEqual(1, "1"); } );
      sut.throws( function(){ sut.areEqual(0, null); } );
      sut.throws( function(){ sut.areEqual(undefined, null); } );
    });
  });

  describe("#areNotEqual()", function() {
    it("TRUE", function(){
      sut.areNotEqual(1, "1");
      sut.areNotEqual(0, null);
      sut.areNotEqual(undefined, null);
    });

    it("FALSE", function(){
      sut.throws( function(){ sut.areNotEqual(1, 1); } );
      sut.throws( function(){ sut.areNotEqual(null, null); } );
      sut.throws( function(){ sut.areNotEqual(undefined, undefined); } );
    });
  });

  describe("#classes", function() {

    it("inherits", function(){
      let obj = new sut.MockA(3, 9);
      sut.isTrue( obj instanceof sut.MockBase );
      sut.isTrue( obj instanceof sut.MockA );

      sut.areEqual(3, obj.a);
      sut.areEqual(9, obj.b);
      obj.b = -8;
      sut.areEqual(-8, obj.b);
    });

    it("virtual override function", function(){
      let a = new sut.MockA(3, 9);

      let dscr = a.describe();
      sut.areEqual("MockA(a: 3, b: 9)", dscr);
    });

    it("virtual base function", function(){
      let a = new sut.MockB(3, 9);

      let dscr = a.describe();
      sut.areEqual("base(a: 3, b: 9)", dscr);
    });

  });


});