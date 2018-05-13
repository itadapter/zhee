if (zhee===undefined) var zhee = require("./out/zhee");
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


  describe("#isString()", function() {

    it("pass string",   function() {
      sut.isString("aaaaa");
    });

    it("fail 1",   function() {
      sut.throws(function(){
        sut.isString(1);
      }, "averment failure: isstring");
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        sut.isString(undefined);
      }, "averment failure: isstring");
    });

    it("fail null",   function() {
      sut.throws(function(){
        sut.isString(null);
      }, "averment failure: isstring");
    });
  });

  describe("#isBool()", function() {

    it("pass bool",   function() {
      sut.isBool(true);
      sut.isBool(false);
      sut.isBool(1===1);
    });

    it("fail 1",   function() {
      sut.throws(function(){
        sut.isBool(1);
      }, "averment failure: isbool");
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        sut.isBool(undefined);
      }, "averment failure: isbool");
    });

    it("fail null",   function() {
      sut.throws(function(){
        sut.isBool(null);
      }, "averment failure: isbool");
    });
  });

  describe("#isNumber()", function() {

    it("pass nums",   function() {
      sut.isNumber(1);
      sut.isNumber(-1123.23);
      sut.isNumber(0);
    });

    it("fail str",   function() {
      sut.throws(function(){
        sut.isNumber("123");
      }, "averment failure: isnumber");
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        sut.isNumber(undefined);
      }, "averment failure: isnumber");
    });

    it("fail null",   function() {
      sut.throws(function(){
        sut.isNumber(null);
      }, "averment failure: isnumber");
    });
  });

  describe("#isDate()", function() {

    it("pass date",   function() {
      sut.isDate( new Date(1980, 1, 1));
    });

    it("fail str",   function() {
      sut.throws(function(){
        sut.isDate("1/1/2001");
      }, "averment failure: isdate");
    });

    it("fail undefined",   function() {
      sut.throws(function(){
        sut.isDate(undefined);
      }, "averment failure: isdate");
    });

    it("fail null",   function() {
      sut.throws(function(){
        sut.isDate(null);
      }, "averment failure: isdate");
    });
  });


  describe("#areEqual()", function() {
    it("TRUE", function(){
      sut.areEqual(1, 1);

      sut.areEqual("abc", "abc");//may have used areEqualValues() as strings get special treatment

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

      //note: Date is ref type, hence two instances are different. 
      //Use areEqualValues() for object equality check based on valueOf()
      sut.areNotEqual(new Date(123), new Date(123));
    });

    it("FALSE", function(){
      sut.throws( function(){ sut.areNotEqual(1, 1); } );
      sut.throws( function(){ sut.areNotEqual(null, null); } );
      sut.throws( function(){ sut.areNotEqual(undefined, undefined); } );
    });
  });


  describe("#areEqualValues()", function() {
    it("TRUE", function(){
      sut.areEqualValues(1, 1);

      sut.areEqualValues("abc", "abc");//may have used areEqual() as strings get special treatment

      sut.areEqualValues(null, null);
      sut.areEqualValues(undefined, undefined); 

      sut.areEqualValues(new Date(123), new Date(123)); 
    });

    it("FALSE", function(){
      sut.throws( function(){ sut.areEqual(1, "1"); } );
      sut.throws( function(){ sut.areEqual(0, null); } );
      sut.throws( function(){ sut.areEqual(undefined, null); } );

      sut.throws( function(){ sut.areEqualValues(new Date(124), new Date(1));  });
      sut.throws( function(){ sut.areEqualValues(1, true);  });
      sut.throws( function(){ sut.areEqualValues(1, "1");  });
    });
  });



  describe("#isOf()", function() {
    it("TRUE", function(){
      let obj = new sut.MockA(1, 2);
      sut.isOf(obj, sut.MockBase);
      sut.isOf(obj, sut.MockA);
    });

    it("FALSE", function(){
      let obj = new sut.MockA(1, 2);
      sut.throws( function(){ sut.isOf(obj, Array); }, "isOf" );
      sut.throws( function(){ sut.isOf(null, null); }, "isOf" );
      sut.throws( function(){ sut.isOf(undefined, undefined); }, "isOf");
    });
  });

  describe("#isNotOf()", function() {
    it("TRUE", function(){
      let obj = new sut.MockB(1, 2);
      sut.isNotOf(obj, Array);
      sut.isNotOf(obj, sut.MockA);
    });

    it("FALSE", function(){
      let obj = new sut.MockA(1, 2);
      sut.throws( function(){ sut.isNotOf(obj, sut.MockBase); }, "isNotOf" );
      sut.throws( function(){ sut.isNotOf(obj, sut.MockA); }, "isNotOf" );
      sut.throws( function(){ sut.isNotOf(null, null); }, "isNotOf"  );
      sut.throws( function(){ sut.isNotOf(undefined, undefined); }, "isNotOf" );
    });
  });

  describe("#classes", function() {

    it("inherits", function(){
      let obj = new sut.MockA(3, 9);
      sut.isOf(obj, sut.MockBase );
      sut.isOf(obj, sut.MockA );

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


  describe("#areArraysEquivalent()", function() {

    it("()", function(){ sut.throws( () => sut.areArraysEquivalent() , "areArraysEquivalent");  });
    it("(undefined)", function(){ sut.throws( () => sut.areArraysEquivalent(undefined) , "areArraysEquivalent");  });
    it("(null, null)", function(){ sut.throws( () => sut.areArraysEquivalent(null, null) , "areArraysEquivalent");  });

    it("1", function(){ sut.areArraysEquivalent([], []);  });
    it("2", function(){ sut.areArraysEquivalent([1], [1]);  });
    it("3", function(){ sut.areArraysEquivalent([true, 1], [true, 1]);  });
    it("4", function(){ sut.areArraysEquivalent(["aaa", 2], ["aaa", 2]);  });

    it("10", function(){ sut.throws( () => sut.areArraysEquivalent(null, []),     "areArraysEquivalent");  });
    it("20", function(){ sut.throws( () => sut.areArraysEquivalent([1], [2]),     "areArraysEquivalent");  });
    it("30", function(){ sut.throws( () => sut.areArraysEquivalent([1,2], [2,1]), "areArraysEquivalent");  });
    it("40", function(){ sut.throws( () => sut.areArraysEquivalent([1], [1,2]),   "areArraysEquivalent");  });
  });


  describe("#areIterablesEquivalent()", function() {

    it("()", function(){ sut.throws( () => sut.areIterablesEquivalent() , "areIterablesEquivalent");  });
    it("(undefined)", function(){ sut.throws( () => sut.areIterablesEquivalent(undefined) , "areIterablesEquivalent");  });
    it("(null, null)", function(){ sut.throws( () => sut.areIterablesEquivalent(null, null) , "areIterablesEquivalent");  });

    it("1", function(){ sut.areIterablesEquivalent([], []);  });
    it("2", function(){ sut.areIterablesEquivalent([1], [1]);  });
    it("3", function(){ sut.areIterablesEquivalent([true, 1], [true, 1]);  });
    it("4", function(){ sut.areIterablesEquivalent(["aaa", 2], ["aaa", 2]);  });

    it("10", function(){ sut.throws( () => sut.areIterablesEquivalent(null, []),     "areIterablesEquivalent");  });
    it("20", function(){ sut.throws( () => sut.areIterablesEquivalent([1], [2]),     "areIterablesEquivalent");  });
    it("30", function(){ sut.throws( () => sut.areIterablesEquivalent([1,2], [2,1]), "areIterablesEquivalent");  });
    it("40", function(){ sut.throws( () => sut.areIterablesEquivalent([1], [1,2]),   "areIterablesEquivalent");  });
  });


});