const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Linq;

describe("LINQ", function() {

 
  describe("#iteration", function() {
    it("root single",   function() { 
      let a = [1,2,3];

      let q = new sut.$(a);

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

      let q = new sut.$(a).toArray();

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

      let q = new sut.$(a).toArray();

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

      let q = new sut.$(a).select(e => e*10);

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

      let q = new sut.$(a).select(e => e*10);

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
      let q = new sut.$(a).select( e => e*10 ).toArray();
      aver.areArraysEquivalent([10,20,30,40,50], q);
    });

  });

  describe("#select-where()", function() {
    it("1",   function() { 
      let a = [1,2,3,4,5];
      let q = new sut.$(a).select( e => e*10 ).where( e => e>30 ).toArray();
      aver.areArraysEquivalent([40,50], q);
    });

  });

  

});