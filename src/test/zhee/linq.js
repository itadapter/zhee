const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Linq;

describe("LINQ", function() {

 
  describe("#iteration", function() {
    it("root single",   function() { 
      let a = [1,2,3];

      let q = sut.$(a);

      let iterator = q[Symbol.iterator]();

      let entry = iterator.next();

      aver.isFalse(entry.done);
      aver.areEqual(1, entry.value);

      entry = iterator.next();
      aver.isFalse(entry.done);
      aver.areEqual(2, entry.value);

      entry = iterator.next();
      aver.isFalse(entry.done);
      aver.areEqual(3, entry.value);

      entry = iterator.next();
      aver.isTrue(entry.done);
      aver.areEqual(undefined, entry.value);
    });

    it("toArray single",   function() { 
      let a = [1,2,3];

      let q = sut.$(a).toArray();

      let iterator = q[Symbol.iterator]();

      let entry = iterator.next();

      aver.isFalse(entry.done);
      aver.areEqual(1, entry.value);

      entry = iterator.next();
      aver.isFalse(entry.done);
      aver.areEqual(2, entry.value);

      entry = iterator.next();
      aver.isFalse(entry.done);
      aver.areEqual(3, entry.value);

      entry = iterator.next();
      aver.isTrue(entry.done);
      aver.areEqual(undefined, entry.value);
    });

    it("toArray multiple",   function() { 
      let a = [1,2,3];

      let q = sut.$(a).toArray();

      let iterator1 = q[Symbol.iterator]();
      let iterator2 = q[Symbol.iterator]();

      let entry1 = iterator1.next();
      let entry2 = iterator2.next();

      aver.isFalse(entry1.done);
      aver.areEqual(1, entry1.value);

      aver.isFalse(entry2.done);
      aver.areEqual(1, entry2.value);


      entry1 = iterator1.next();
      entry2 = iterator2.next();
      entry2 = iterator2.next();

      aver.isFalse(entry1.done);
      aver.areEqual(2, entry1.value);
      aver.isFalse(entry2.done);
      aver.areEqual(3, entry2.value);

      entry1 = iterator1.next();
      entry2 = iterator2.next();

      aver.isFalse(entry1.done);
      aver.areEqual(3, entry1.value);
      aver.isTrue(entry2.done);
      aver.areEqual(undefined, entry2.value);
    });

    it("select single",   function() { 
      let a = [1,2,3];

      let q = sut.$(a).select(e => e*10);

      let iterator = q[Symbol.iterator]();

      let entry = iterator.next();

      aver.isFalse(entry.done);
      aver.areEqual(10, entry.value);

      entry = iterator.next();
      aver.isFalse(entry.done);
      aver.areEqual(20, entry.value);

      entry = iterator.next();
      aver.isFalse(entry.done);
      aver.areEqual(30, entry.value);

      entry = iterator.next();
      aver.isTrue(entry.done);
      aver.areEqual(undefined, entry.value);
    });

    it("select multiple",   function() { 
      let a = [1,2,3];

      let q = sut.$(a).select(e => e*10);

      let iterator1 = q[Symbol.iterator]();
      let iterator2 = q[Symbol.iterator]();

      let entry1 = iterator1.next();
      let entry2 = iterator2.next();

      aver.isFalse(entry1.done);
      aver.areEqual(10, entry1.value);

      aver.isFalse(entry2.done);
      aver.areEqual(10, entry2.value);


      entry1 = iterator1.next();
      entry2 = iterator2.next();
      entry2 = iterator2.next();

      aver.isFalse(entry1.done);
      aver.areEqual(20, entry1.value);
      aver.isFalse(entry2.done);
      aver.areEqual(30, entry2.value);

      entry1 = iterator1.next();
      entry2 = iterator2.next();

      aver.isFalse(entry1.done);
      aver.areEqual(30, entry1.value);
      aver.isTrue(entry2.done);
      aver.areEqual(undefined, entry2.value);
    });

  });
  
  
  describe("#select()", function() {
    it("1",   function() { 
      let a = [1,2,3,4,5];
      let q = sut.$(a).select(e => e*10).toArray();
      aver.areArraysEquivalent([10,20,30,40,50], q);
    });

  });

  describe("#select-where()", function() {
    it("1",   function() { 
      let a = [1,2,3,4,5];
      let q = sut.$(a).select(e => e*10).where(e => e>30).toArray();
      aver.areArraysEquivalent([40,50], q);
    });

  });

  describe("#count()", function() {

    it("empty",   function() { 
      aver.areEqual( 0, sut.$().count() );
      aver.areEqual( 0, sut.$(undefined).count() );
      aver.areEqual( 0, sut.$(null).count() );
      aver.areEqual( 0, sut.$([]).count() );
      aver.areEqual( 0, sut.$([1,2,3].filter(e=> e<0)).count() );
    });


    it("root",   function() { 
      let a = [1,2,3,4,5];
      let cnt = sut.$(a).count();
      aver.areEqual( 5, cnt);
    });

    it("select",   function() { 
      let a = [1,2,3,4,5];
      let cnt = sut.$(a).select(e => e*10).count();
      aver.areEqual(5, cnt);
    });

    it("select+filter",   function() { 
      let a = [1,2,3,4,5];
      let cnt = sut.$(a).select(e => e*10).count(e => e>30);
      aver.areEqual( 2, cnt);
    });

    it("select+where+filter",   function() { 
      let a = [1,2,3,4,5];
      let cnt = sut.$(a).select(e => e*10).where(e => e>40).count(e => e>30);
      aver.areEqual( 1, cnt);
    });

    it("mixed",   function() { 
      let a = [1,2,3,4,5];
      aver.areEqual(1, sut.$(a).select(e => e*10).where(e => e>40).count(e => e>30)  );
      aver.areEqual(2, sut.$(a).select(e => e*10).where(e => e>10).count(e => e>30)  );
      aver.areEqual(4, sut.$(a).select(e => e*10).where(e => e!=10).count()  );
      aver.areEqual(5, sut.$(a).where(e => e!=10).select(e => e*10).count()  );
      aver.areEqual(4, sut.$(a).where(e => e!=1).select(e => e*10).count()  );
    });

  });


  describe("#take()", function() {

    it("empty",   function() { 
      aver.areIterablesEquivalent( [], sut.$().take() );
      aver.areIterablesEquivalent( [], sut.$(undefined).take() );
      aver.areIterablesEquivalent( [], sut.$(null).take() );
    });

    it("basic",   function() {
      const a = [1,2,3,4,5];
      aver.areIterablesEquivalent( [1,2], sut.$(a).take(2) );
      aver.areIterablesEquivalent( [1,2,3], sut.$(a).take(3) );
    });

    it("chain-take",   function() {
      const a = [1,2,3,4,5];
      aver.areIterablesEquivalent( [12,13,14], sut.$(a).select(e => e+10).where(e=>e>=12).take(3) );
      aver.areIterablesEquivalent( [12,13], sut.$(a).select(e => e+10).take(3).where(e=>e>=12) );
    });
  });


  describe("#skip()", function() {

    it("empty",   function() { 
      aver.areIterablesEquivalent( [], sut.$().skip() );
      aver.areIterablesEquivalent( [], sut.$(undefined).skip() );
      aver.areIterablesEquivalent( [], sut.$(null).skip() );
    });

    it("basic",   function() {
      const a = [1,2,3,4,5];
      aver.areIterablesEquivalent( [3,4,5], sut.$(a).skip(2) );
      aver.areIterablesEquivalent( [], sut.$(a).skip(6) );
    });

    it("chain-skip",   function() {
      const a = [1,2,3,4,5];
      aver.areIterablesEquivalent( [14,15], sut.$(a).select(e => e+10).where(e=>e>=12).skip(2) );
      aver.areIterablesEquivalent( [15], sut.$(a).select(e => e+10).skip(4).where(e=>e>=12) );
    });
  });


  describe("#isEquivalentTo()", function() {

    it("empty",   function() { 
      aver.isFalse( sut.$().isEquivalentTo() );
      aver.isFalse( sut.$().isEquivalentTo(undefined) );
      aver.isFalse( sut.$().isEquivalentTo(null) );
      aver.isTrue( sut.$().isEquivalentTo([]) );
      aver.isTrue( sut.$([]).isEquivalentTo([]) );
    });

    it("same",   function() { 
      let a = sut.$([1,2,3]);
      aver.isTrue( a.isEquivalentTo(a) );
    });  

    it("basic",   function() { 
      aver.isTrue( sut.$([1,2,3]).isEquivalentTo([1,2,3]) );
      aver.isFalse( sut.$([1,2,33]).isEquivalentTo([1,2,3]) );
      aver.isFalse( sut.$([1,2,3]).isEquivalentTo([1,2,33]) );

      aver.isFalse( sut.$([1,2,3]).isEquivalentTo([1,2,3,4]) );
      aver.isFalse( sut.$([1,2,3,4]).isEquivalentTo([1,2,3]) );
      
    });

    it("basic wrapped",   function() { 
      aver.isTrue( sut.$([1,2,3]).isEquivalentTo(   sut.$([1,2,3])  ));
      aver.isFalse( sut.$([1,2,33]).isEquivalentTo( sut.$([1,2,3])  ));
      aver.isFalse( sut.$([1,2,3]).isEquivalentTo(  sut.$([1,2,33]) ));

      aver.isFalse( sut.$([1,2,3]).isEquivalentTo(  sut.$([1,2,3,4]) ));
      aver.isFalse( sut.$([1,2,3,4]).isEquivalentTo(sut.$([1,2,3])   ));
    });

    it("custom comparer",   function() { 
      aver.isTrue( sut.$([1,2,3]).isEquivalentTo([10,20,30], (a,b) => 10*a === b) );
      aver.isFalse( sut.$([10,20,30]).isEquivalentTo([10,20,30], (a,b) => 10*a === b) );
    });

    it("chained",   function() { 
      const a = sut.$([1,2,3,5,7,9]).where(e => e%2!==0);
      const b = sut.$([1,2,3,4,4,4,4,5,6,7,8,9]).where(e => e%2!==0);

      aver.isTrue( a.isEquivalentTo(b) );
    });
  });

  

});