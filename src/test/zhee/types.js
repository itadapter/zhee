const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Types;

describe("Types", function() {

  describe("#isAssigned()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isAssigned()           );});
    it("false for undefined", function() { aver.isFalse( sut.isAssigned(undefined)  );});
    it("false for null",      function() { aver.isFalse( sut.isAssigned(null)       );});

    it("true for ''",    function() { aver.isTrue( sut.isAssigned("")       );});
    it("true for 'abc'", function() { aver.isTrue( sut.isAssigned("abc")    );});
    it("true for []",    function() { aver.isTrue( sut.isAssigned([])    );});
    it("true for {}",    function() { aver.isTrue( sut.isAssigned({})    );});
    it("true for true",  function() { aver.isTrue( sut.isAssigned(true)    );});
    it("true for false", function() { aver.isTrue( sut.isAssigned(false)    );});
    it("true for 123",   function() { aver.isTrue( sut.isAssigned(123)    );});
    it("true for Date",  function() { aver.isTrue( sut.isAssigned(new Date(1980,1, 21))    );});
  }); 

  describe("#hown()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.hown()  );});
    it("false for undefined", function() { aver.isFalse( sut.hown(undefined)  );});
    it("false for null",      function() { aver.isFalse( sut.hown(null)       );});

    it("{}",        function() { aver.isFalse( sut.hown({})  );});
    it("{}, null",  function() { aver.isFalse( sut.hown({}, null)  );});
    it("null, 'a'", function() { aver.isFalse( sut.hown(null, "a")  );});
    it("{}, 'a'",   function() { aver.isFalse( sut.hown({}, "a")  );});

    it("{a: undefined}, 'a'", function() { aver.isTrue( sut.hown({a: undefined}, "a")  );});

    it("inherit", function() {
      function MyClass() {this.A = 1;}
      MyClass.prototype = {B: 2};

      let obj = new MyClass();

      aver.isTrue( sut.hown(obj, "A")  );
      aver.isTrue( "B" in obj  );
      aver.isFalse( sut.hown(obj, "B")  );
    });
  }); 


  describe("#isString()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isString()           );});
    it("false for undefined", function() { aver.isFalse( sut.isString(undefined)  );});
    it("false for null",      function() { aver.isFalse( sut.isString(null)       );});

    it("false for true",      function() { aver.isFalse( sut.isString(true) );});
    it("false for 1",      function() { aver.isFalse( sut.isString(1)       );});
    it("false for []",      function() { aver.isFalse( sut.isString([])     );});
    it("false for {}",      function() { aver.isFalse( sut.isString({})     );});

    it("true for ''",       function() { aver.isTrue( sut.isString("")       );});
    it("true for 'abc'",   function() { aver.isTrue( sut.isString("abc")    );});

    it("true for new String('abc')",   function() { aver.isTrue( sut.isString( new String("abc") )) ;});
  }); 


  describe("#isDate()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isDate()           );});
    it("false for undefined", function() { aver.isFalse( sut.isDate(undefined)  );});
    it("false for null",      function() { aver.isFalse( sut.isDate(null)       );});

    it("true for date",      function() { aver.isTrue( sut.isDate( new Date("December 25, 2014")) );});
    it("true for date(now)", function() { aver.isTrue( sut.isDate( new Date( Date.now() )) );});
  });
  
  
  describe("#isNumber()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isNumber()           );});
    it("false for undefined", function() { aver.isFalse( sut.isNumber(undefined)  );});
    it("false for null",      function() { aver.isFalse( sut.isNumber(null)       );});

    it("false for {}",      function() { aver.isFalse( sut.isNumber({})       );});
    it("false for true",      function() { aver.isFalse( sut.isNumber(true)   );});
    it("false for 'abc'",      function() { aver.isFalse( sut.isNumber("abc") );});
    it("false for '2'",  function() { aver.isFalse( sut.isNumber( "2" )); });


    it("true for 2",    function() { aver.isTrue( sut.isNumber( 2 )); });
    it("true for -123.1232",    function() { aver.isTrue( sut.isNumber( -123.1232 )); });

    it("true for new Number(-123.1232)",    function() { aver.isTrue( sut.isNumber( new Number(-123.1232) )); });
  });


  describe("#isBool()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isBool()           );});
    it("false for undefined", function() { aver.isFalse( sut.isBool(undefined)  );});
    it("false for null",      function() { aver.isFalse( sut.isBool(null)       );});

    it("false for {}",      function() { aver.isFalse( sut.isBool({})       );});
    it("false for 'abc'",   function() { aver.isFalse( sut.isBool("abc") );});
    it("false for 1",       function() { aver.isFalse( sut.isBool( 1 )); });
    it("false for '1'",     function() { aver.isFalse( sut.isBool( "1" )); });


    it("true for true",    function() { aver.isTrue( sut.isBool( true )); });
    it("true for false",    function() { aver.isTrue( sut.isBool( false )); });

    it("true for new Boolean()",    function() { aver.isTrue( sut.isBool( new Boolean(true) )); });
  });


  describe("#isArray()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isArray()          );});
    it("false for undefined", function() { aver.isFalse( sut.isArray(undefined) );});
    it("false for null",      function() { aver.isFalse( sut.isArray(null)      );});
    it("false for true",      function() { aver.isFalse( sut.isArray(true)      );});
    it("false for int",       function() { aver.isFalse( sut.isArray(123)       );});
    it("false for string",    function() { aver.isFalse( sut.isArray("zaza")    );});
    it("false for {}",        function() { aver.isFalse( sut.isArray({})        );});

    it("true for []",            function() { aver.isTrue( sut.isArray([])           );});
    it("true for [null, null]",  function() { aver.isTrue( sut.isArray([null, null]) );});
    it("true for [1,2,3]",       function() { aver.isTrue( sut.isArray([1,2,3])      );});

    it("true for new Array()",       function() { aver.isTrue( sut.isArray( new Array()) );});
  });

  describe("#isObject()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isObject()          );});
    it("false for undefined", function() { aver.isFalse( sut.isObject(undefined) );});
    it("false for null",      function() { aver.isFalse( sut.isObject(null)      );});
    it("false for true",      function() { aver.isFalse( sut.isObject(true)      );});
    it("false for int",       function() { aver.isFalse( sut.isObject(123)       );});
    it("false for string",    function() { aver.isFalse( sut.isObject("zaza")    );});
    it("false for []",        function() { aver.isFalse( sut.isObject([])    );});

    it("true for {}",        function() { aver.isTrue( sut.isObject({})        );});
    it("true for {a:1...}",  function() { aver.isTrue( sut.isObject({a: 2, b: 3}) );});

    function Car(){ this.a=1; }

    it("true for new Car()",  function() { aver.isTrue( sut.isObject(new Car()) );});
  });

  describe("#isFunction()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isFunction()          );});
    it("false for undefined", function() { aver.isFalse( sut.isFunction(undefined) );});
    it("false for null",      function() { aver.isFalse( sut.isFunction(null)      );});
    it("false for true",      function() { aver.isFalse( sut.isFunction(true)      );});
    it("false for int",       function() { aver.isFalse( sut.isFunction(123)       );});
    it("false for string",    function() { aver.isFalse( sut.isFunction("zaza")    );});
    it("false for []",        function() { aver.isFalse( sut.isFunction([])    );});

    it("true for function{}", function() { aver.isTrue( sut.isFunction( function(){}) );});
    it("true for ()=>true", function() { aver.isTrue( sut.isFunction( () => true ) );});
    it("true for new Function()",  function() { aver.isTrue( sut.isFunction( new Function("a", "return a*a")) );});

  });


  describe("#isObjectOrArray()", function() {
    it("false for empty()",   function() { aver.isFalse( sut.isObjectOrArray()          );});
    it("false for undefined", function() { aver.isFalse( sut.isObjectOrArray(undefined) );});
    it("false for null",      function() { aver.isFalse( sut.isObjectOrArray(null)      );});
    it("false for true",      function() { aver.isFalse( sut.isObjectOrArray(true)      );});
    it("false for int",       function() { aver.isFalse( sut.isObjectOrArray(123)       );});
    it("false for string",    function() { aver.isFalse( sut.isObjectOrArray("zaza")    );});
    
    it("true for []",        function() { aver.isTrue( sut.isObjectOrArray([]) );});
    it("true for {}",        function() { aver.isTrue( sut.isObjectOrArray({})  );});
    it("true for {a:1...}",  function() { aver.isTrue( sut.isObjectOrArray({a: 2, b: 3}) );});

    function Car(){ this.a=1; }

    it("true for new Car()",  function()    { aver.isTrue( sut.isObjectOrArray(new Car())    );});
    it("true for [null, null]",  function() { aver.isTrue( sut.isObjectOrArray([null, null]) );});
    it("true for [1,2,3]",       function() { aver.isTrue( sut.isObjectOrArray([1,2,3])      );});
  });




  describe("#describeTypeOf()", function() {
    it("for ()",   function() { aver.areEqual( "<undefined>", sut.describeTypeOf() );});
    it("for undefined",   function() { aver.areEqual( "<undefined>", sut.describeTypeOf(undefined) );});
    it("for null",   function() { aver.areEqual( "<null>", sut.describeTypeOf(null) );});

    it("for 1",   function() { aver.areEqual( "number", sut.describeTypeOf(1) );});
    it("for 1.3",   function() { aver.areEqual( "number", sut.describeTypeOf(1.3) );});
    it("for true",   function() { aver.areEqual( "boolean", sut.describeTypeOf(true) );});
    it("for false",   function() { aver.areEqual( "boolean", sut.describeTypeOf(false) );});

    it("for Date",   function() { aver.areEqual( "date", sut.describeTypeOf(new Date()) );});
    it("for []",   function() { aver.areEqual( "array", sut.describeTypeOf([]) );});
    it("for [1,2,3]",   function() { aver.areEqual( "array", sut.describeTypeOf([1,2,3]) );});
    it("for {}",   function() { aver.areEqual( "object", sut.describeTypeOf({}) );});
    it("for {a: 1}",   function() { aver.areEqual( "object", sut.describeTypeOf({a: 1}) );});
    
  });

  describe("#nav()", function() {

    it("()",   function() { 
      let got = sut.nav();
      aver.isNotNull(got);
      aver.isUndefined( got.orig  );
      aver.isUndefined( got.root  );
      aver.isUndefined( got.full  );
      aver.isUndefined( got.value );
      aver.isUndefined( got.result );
    });

    it("({})",   function() { 
      let got = sut.nav({});
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isUndefined( got.full  );
      aver.isUndefined( got.value );
      aver.isUndefined( got.result );
    });

    it("({},'a')",   function() { 
      let obj = {};
      let got = sut.nav(obj,"a");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isFalse( got.full  );
      aver.areEqual(obj, got.value );
      aver.isUndefined(got.result);
    });

    it("({a: 1},'a')",   function() { 
      let obj = {a: 1};
      let got = sut.nav(obj,"a");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue  ( got.full  );
      aver.areEqual(1, got.value );
      aver.areEqual(1, got.result);
    });

    it("({a: undefined},'a')",   function() { 
      let obj = {a: undefined};
      let got = sut.nav(obj,"a");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue  ( got.full  ); // ATTENTION: full = true, but result is 100% match to undefined
      aver.areEqual(undefined, got.value );
      aver.areEqual(undefined, got.result);// undefined is a 100% match (because full=true)
    });

    it("({a: undefined},'a.b.c')",   function() { 
      let obj = {a: undefined};
      let got = sut.nav(obj,"a.b.c");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isFalse  ( got.full  ); // ATTENTION: full = false because there is no a.b.c
      aver.areEqual(undefined, got.value );
      aver.areEqual(undefined, got.result);
    });


    it("([123, undefined, true],'1')",   function() { 
      let obj = [123, undefined, true ];
      let got = sut.nav(obj,"1");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue   ( got.full  ); // ATTENTION: full = true obj[1]==undefined
      aver.areEqual(undefined, got.value );
      aver.areEqual(undefined, got.result);
    });

    it("([123, {a: {b: 567}}, true ],'1.a.b')",   function() { 
      let obj = [123, {a: {b: 567}}, true ];
      let got = sut.nav(obj,"1.a.b");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue   ( got.full  ); 
      aver.areEqual(567, got.value );
      aver.areEqual(567, got.result);
    });

    it("([123, {a: {b: 567}, q: -9}, true],'1.z.b')",   function() { 
      let obj = [123, {a: {b: 567}, q: -9}, true ];
      let got = sut.nav(obj,"1.z.b");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isFalse   ( got.full  ); 
      aver.areEqual(-9, got.value.q );
      aver.areEqual(undefined, got.result);
    });

    it("([123, {a: {b: 567, xxx: -877}, q: -9}, true ],'1.a.z')",   function() { 
      let obj = [123, {a: {b: 567, xxx: -877}, q: -9}, true ];
      let got = sut.nav(obj,"1.a.z");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isFalse   ( got.full  ); 
      aver.areEqual(-877, got.value.xxx );
      aver.areEqual(undefined, got.result);
    });

    it("([123, {a: {b: 567, xxx: -877}, q: -9}, true ],'1.a.xxx')",   function() { 
      let obj = [123, {a: {b: 567, xxx: -877}, q: -9}, true ];
      let got = sut.nav(obj,"1.a.xxx");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue   ( got.full  ); 
      aver.areEqual(-877, got.value );
      aver.areEqual(-877, got.result);
    });


    it("([123, [[567, 890],-40, -20, [1001, 1002]], true ],'1.0.1')",   function() { 
      let obj = [123, [[567, 890],-40, -20, [1001, 1002]], true ];
      let got = sut.nav(obj,"1.0.1");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue   ( got.full  ); 
      aver.areEqual(890, got.value );
      aver.areEqual(890, got.result);
    });

    it("([123, [[567, 890],-40, -20, [1001, 1002]], true ],'1.0.111')",   function() { 
      let obj = [123, [[567, 890],-40, -20, [1001, 1002]], true ];
      let got = sut.nav(obj,"1.0.111");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isFalse   ( got.full  ); 
      aver.areEqual(567, got.value[0] );
      aver.areEqual(undefined, got.result);
    });

    it("([123, [[567, 890],-40, -20, [1001, 1002]], true ],'1.2')",   function() { 
      let obj = [123, [[567, 890],-40, -20, [1001, 1002]], true ];
      let got = sut.nav(obj,"1.2");
      aver.isNotNull(got);
      aver.isNotNull( got.orig  );
      aver.isNotNull( got.root  );
      aver.isTrue   ( got.full  ); 
      aver.areEqual(-20, got.value );
      aver.areEqual(-20, got.result);
    });


    it("simple [] path",   function() {
      let obj = { 
        a: 2,
        b: true
      };

      let got1 = sut.nav(obj, ["a"]);
      aver.isNotNull(got1);
      aver.areEqual(obj, got1.orig  );
      aver.areEqual(obj, got1.root  );
      aver.isTrue(got1.full);
      aver.areEqual(2, got1.value  );

      let got2 = sut.nav(obj, ["b"]);
      aver.isNotNull(got2);
      aver.areEqual(obj, got2.orig  );
      aver.areEqual(obj, got2.root  );
      aver.isTrue(got2.full);
      aver.areEqual(true, got2.value  );
    });

    it("simple string path",   function() {
      let obj = { 
        a: 2,
        b: true
      };

      let got1 = sut.nav(obj, "a");
      aver.isNotNull(got1);
      aver.areEqual(obj, got1.orig  );
      aver.areEqual(obj, got1.root  );
      aver.isTrue(got1.full);
      aver.areEqual(2, got1.value  );

      let got2 = sut.nav(obj, "b");
      aver.isNotNull(got2);
      aver.areEqual(obj, got2.orig  );
      aver.areEqual(obj, got2.root  );
      aver.isTrue(got2.full);
      aver.areEqual(true, got2.value  );
    });


    it("2 level object path",   function() {
      let obj = { 
        a: {x: 2, y: 3},
        b: "Hello!"
      };

      let got1 = sut.nav(obj, "a.x");
      aver.isNotNull(got1);
      aver.areEqual(obj, got1.orig  );
      aver.areEqual(obj, got1.root  );
      aver.isTrue(got1.full);
      aver.areEqual(2, got1.value  );

      let got2 = sut.nav(obj, "a.y");
      aver.isNotNull(got2);
      aver.areEqual(obj, got2.orig  );
      aver.areEqual(obj, got2.root  );
      aver.isTrue(got2.full);
      aver.areEqual(3, got2.value  );

      let got3 = sut.nav(obj, "b");
      aver.isNotNull(got3);
      aver.areEqual(obj, got3.orig  );
      aver.areEqual(obj, got3.root  );
      aver.isTrue(got3.full);
      aver.areEqual("Hello!", got3.value  );
    });

    it("2 level object path partial",   function() {
      let obj = { 
        a: {x: 2, y: 3, q: 98},
        b: "Hello!"
      };

      let got = sut.nav(obj, "a.z");//there is no "z"
      aver.isNotNull(got);
      aver.areEqual(obj, got.orig  );
      aver.areEqual(obj, got.root  );
      aver.isFalse(got.full);
      aver.isObject( got.value  );
      aver.areEqual(98,  got.value.q  );
      aver.areEqual(undefined,  got.result  );
    });

    it("3 level object path",   function() {
      let obj = { 
        a: {x: 2, y: 3, q: { name: "abc", descr: "def" }},
        b: "Hello!"
      };

      let got = sut.nav(obj, "a.q.descr");
      aver.isNotNull(got);
      aver.areEqual(obj, got.orig  );
      aver.areEqual(obj, got.root  );
      aver.isTrue(got.full);
      aver.areEqual("def",  got.value  );
      aver.areEqual("def",  got.result );
    });

    it("3 level object/array path",   function() {
      let obj = { 
        a: [232, 323, { name: "abc", descr: "def123" }],
        b: "Hello!"
      };

      let got = sut.nav(obj, "a.2.descr");
      aver.isNotNull(got);
      aver.areEqual(obj, got.orig  );
      aver.areEqual(obj, got.root  );
      aver.isTrue(got.full);
      aver.areEqual("def123",  got.value  );
      aver.areEqual("def123",  got.result );
    });

    it("3 level chain",   function() {
      let obj = { 
        a: [232, 323, { name: "abc", descr: "def123" }],
        b: "Hello!"
      };

      let got = sut.nav(obj, "a")
        .nav("2")
        .nav("descr");

      aver.isNotNull(got);
      aver.areEqual(obj, got.orig  );
      aver.areEqual(obj.a[2], got.root  );
      aver.isTrue(got.full);
      aver.areEqual("def123",  got.value  );
      aver.areEqual("def123",  got.result  );
    });

    it("inherit",   function() {
      
      function MyClass(a){ this.A = a; } 
      MyClass.prototype = {B: {c: 1589, d: 2}};

      let obj = new MyClass(1234);

      let got = sut.nav(obj, "B.c");// B is inherited via prototype

      aver.isNotNull(got);
      aver.areEqual(obj, got.orig  );
      aver.areEqual(obj, got.root  );
      aver.isTrue(got.full);
      aver.areEqual(1589,  got.value  );
      aver.areEqual(1589,  got.result );
    });

    it("inherit partial",   function() {
      
      function MyClass(a){ this.A = a; } 
      MyClass.prototype = {B: {c: 1589, d: 2}};

      let obj = new MyClass(1234);

      let got = sut.nav(obj, "B.Z");// B is inherited via prototype

      aver.isNotNull(got);
      aver.areEqual(obj, got.orig  );
      aver.areEqual(obj, got.root  );
      aver.isFalse(got.full);
      aver.areEqual(1589,  got.value.c  );
      aver.areEqual(undefined,  got.result );
    });

  });

  describe("#mixin()", function() {
    it("null for (undef, undef)",   function() { aver.isNull( sut.mixin(undefined));  });
    it("null for (null, null)",   function() { aver.isNull( sut.mixin(null, null));  });
    it("object for ({})",   function() { aver.isObject( sut.mixin({}) );  });
    it("object for ({}, null)",   function() { aver.isObject( sut.mixin({}, null));  });


    it("basically works",   function() {
      let a = {};
      let b = {d: 2, e: true};
      let c = sut.mixin(a, b);
    
      aver.areEqual(2,  c.d );
      aver.isTrue( c.e );
    });

    it("overrides existing",   function() {
      let a = {d: 4};
      let b = {d: 2, e: true};
      let c = sut.mixin(a, b);
    
      aver.areEqual( 2, c.d );
      aver.isTrue( c.e );
    });

    it("keeps existing",   function() {
      let a = {d: 4};
      let b = {d: 2, e: true};
      let c = sut.mixin(a, b, true);
    
      aver.areEqual(4, c.d );
      aver.isTrue( c.e );
    });


    it("class this",   function() {
      let a = new aver.MockA(3, 4);
      let b = {d: 2, e: true};
      let c = sut.mixin(a, b);
    
      aver.areEqual(2, c.d );
      aver.isTrue( c.e );
    });

    
    it("class prototype",   function() {
      
      function classX(){ this.z = 123; }
      
      let a = new classX();
      let b = {d: 2, e: true};
      sut.mixin(classX.prototype, b);
      
    
      aver.areEqual(123, a.z );
      aver.areEqual(2, a.d );
      aver.isTrue( a.e );
    });

  });


  describe("#asBool()", function() {
    it("()",   function() { aver.areEqual( false, sut.asBool() );});
    it("undefined",   function() { aver.areEqual( false, sut.asBool(undefined) );});
    it("null",   function() { aver.areEqual( false, sut.asBool(null) );});

    it("1",   function() { aver.areEqual( true, sut.asBool(1) );});
    it("0",   function() { aver.areEqual( false, sut.asBool(0) );});

    it("'1'",   function() { aver.areEqual( true, sut.asBool("1") );});
    it("' 1'",   function() { aver.areEqual( true, sut.asBool(" 1   ") );});
    it("ok",   function() { aver.areEqual( true, sut.asBool("  ok  ") );});
    it("yes",   function() { aver.areEqual( true, sut.asBool("yes") );});
    it("YES",   function() { aver.areEqual( true, sut.asBool("YES") );});
    it("TrUE",   function() { aver.areEqual( true, sut.asBool("TrUE") );});

    function Custom(state){
      this.state = state;
      this.asBoolean = function(){ return state; };
    }

    it("Custom(true)",   function() { aver.areEqual( true, sut.asBoolean(new Custom(true)) );});
    it("Custom(false)",   function() { aver.areEqual( false, sut.asBoolean(new Custom(false)) );});
    
  });


  describe("#classOf()", function() {
    it("()",   function() { aver.areEqual( null, sut.classOf() );});
    it("null",   function() { aver.areEqual( null, sut.classOf(null) );});
    it("undef",   function() { aver.areEqual( null, sut.classOf(undefined) );});
    it("123",   function() { aver.areEqual( null, sut.classOf(123) );});
    it("str",   function() { aver.areEqual( null, sut.classOf(true) );});

    it("[]",   function() { aver.areEqual( null, sut.classOf([]) );});

    it("{}",   function() { aver.areEqual( Object, sut.classOf({ }) );});

    it("MockA",   function() { aver.areEqual( aver.MockA, sut.classOf( new aver.MockA()) );});
    it("MockB",   function() { aver.areEqual( aver.MockB, sut.classOf( new aver.MockB()) );});
    it("MockBase",   function() { aver.areEqual( aver.MockBase, sut.classOf( new aver.MockBase()) );});

  });

  describe("#parentOfClass()", function() {
    it("()",   function() { aver.areEqual( null, sut.parentOfClass() );});
    it("null",   function() { aver.areEqual( null, sut.parentOfClass(null) );});
    it("undef",   function() { aver.areEqual( null, sut.parentOfClass(undefined) );});
    it("123",   function() { aver.areEqual( null, sut.parentOfClass(123) );});
    it("str",   function() { aver.areEqual( null, sut.parentOfClass(true) );});

    it("[]",   function() { aver.areEqual( null, sut.parentOfClass([]) );});

    it("{}",   function() { aver.areEqual( null, sut.parentOfClass({ }) );});

    it("MockA",    function() { aver.areEqual( aver.MockBase, sut.parentOfClass( aver.MockA));});
    it("MockB",    function() { aver.areEqual( aver.MockBase, sut.parentOfClass( aver.MockB)   );});
    it("MockBC",    function() { aver.areEqual( aver.MockB, sut.parentOfClass( aver.MockBC)   );});
    it("MockBase", function() { aver.areEqual( null, sut.parentOfClass( aver.MockBase)      );});
  });

  

});