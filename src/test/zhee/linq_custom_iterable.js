const zhee = require("../../../out/zhee/zhee");
const aver = zhee.Aver;
const sut = zhee.Linq;

describe("LINQ_custom_iterable", function () {

  let people = {
    data: [
      { name: "Nick", age: 32 },
      { name: "Ann", age: 43 },
      { name: "Tom", age: 23 },
      { name: "Jim", age: 29 },
      { name: "John", age: 23 },
      { name: "Ann", age: 32 }
    ]
  };

  people[Symbol.iterator] = function () {
    let idx = 0;
    let length = this.data.length;
    let data = this.data;
    return {
      next() {
        if (idx < length) {
          return {
            done: false,
            value: data[idx++]
          };
        } else {
          return {
            done: true
          };
        }
      }
    };
  };

  describe("root", function () {
    it("source", function () {
      let p = sut.$(people).source;
      aver.areEqual(people, p);
    });

    it("toArray", function () {
      let p = sut.$(people).toArray();

      aver.areEqual(people.data.length, p.length);
      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });

    it("iteration", function () {
      let p = sut.$(people);
      let i = 0;
      for (let pp of p) {
        var person = people.data[i++];
        aver.areEqual(person.name, pp.name);
        aver.areEqual(person.age, pp.age);
      }
    });

    it("iterationEmpty", function () {
      let p = sut.$();
      let i = 0;
      for (let pp of p) {
        i++;
      }
      aver.areEqual(0, i);
    });
  });

  describe("select", function () {
    it("normalName", function () {
      let p = sut.$(people).select(e => e.name).toArray();
      aver.areArraysEquivalent(["Nick", "Ann", "Tom", "Jim", "John", "Ann"], p);
    });

    it("normalAge", function () {
      let p = sut.$(people).select(e => e.age).toArray();
      aver.areArraysEquivalent([32, 43, 23, 29, 23, 32], p);
    });

    it("transformation", function () {
      let p = sut.$(people).select(e => e.name + (e.age > 30 ? "" : e.age)).toArray();
      aver.areArraysEquivalent(["Nick", "Ann", "Tom23", "Jim29", "John23", "Ann"], p);
    });

    it("fromEmpty", function () {
      let p = sut.$().select(e => e.name).toArray();
      aver.areEqual(0, p.length);
    });

    it("self", function () {
      let p = sut.$(people).select().toArray();

      aver.areEqual(people.data.length, p.length);
      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });
  });

  describe("where", function () {
    it("normal1", function () {
      let p = sut.$(people).where(e => e.age > 30).toArray();

      aver.areEqual(3, p.length);

      aver.areEqual("Nick", p[0].name);
      aver.areEqual(32, p[0].age);

      aver.areEqual("Ann", p[1].name);
      aver.areEqual(43, p[1].age);

      aver.areEqual("Ann", p[2].name);
      aver.areEqual(32, p[2].age);
    });

    it("normal2", function () {
      let p = sut.$(people).where(e => e.name.startsWith("J")).toArray();

      aver.areEqual(2, p.length);

      aver.areEqual("Jim", p[0].name);
      aver.areEqual(29, p[0].age);

      aver.areEqual("John", p[1].name);
      aver.areEqual(23, p[1].age);
    });

    it("combination", function () {
      let p1 = sut.$(people).where(e => e.name.length < 4 && e.age < 30).toArray();
      let p2 = sut.$(people).where(e => e.name.length < 4).where(e => e.age < 30).toArray();

      aver.areEqual(2, p1.length);
      aver.areEqual(p1.length, p2.length);

      aver.areEqual("Tom", p1[0].name);
      aver.areEqual(23, p1[0].age);

      aver.areEqual("Jim", p1[1].name);
      aver.areEqual(29, p1[1].age);

      aver.areEqual("Tom", p2[0].name);
      aver.areEqual(23, p2[0].age);

      aver.areEqual("Jim", p2[1].name);
      aver.areEqual(29, p2[1].age);
    });

    it("emptyResult", function () {
      let p = sut.$(people).where(e => e.age > 50).toArray();
      aver.areEqual(0, p.length);
    });

    it("fromEmptySource", function () {
      let p = sut.$().where(e => e.age > 0).toArray();
      aver.areEqual(0, p.length);
    });

    it("withoutCondition", function () {
      let p = sut.$(people).where().toArray();

      aver.areEqual(people.data.length, p.length);
      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });
  });

  describe("take & skip", function () {
    it("takeNoOne", function () {
      let p = sut.$(people).take(0).toArray();
      aver.areEqual(0, p.length);
    });

    it("takeNormal", function () {
      let p = sut.$(people).take(2).toArray();
      aver.areEqual(2, p.length);

      aver.areEqual("Nick", p[0].name);
      aver.areEqual(32, p[0].age);

      aver.areEqual("Ann", p[1].name);
      aver.areEqual(43, p[1].age);
    });

    it("takeMoreThenExist", function () {
      let p = sut.$(people).take(100).toArray();

      aver.areEqual(people.data.length, p.length);
      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });

    it("takeMultiple", function () {
      let p = sut.$(people).take(3).take(1).toArray();

      aver.areEqual(1, p.length);
      aver.areEqual("Nick", p[0].name);
      aver.areEqual(32, p[0].age);
    });

    it("skipNoOne", function () {
      let p = sut.$(people).skip(0).toArray();

      aver.areEqual(people.data.length, p.length);
      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });

    it("skipMoreThenExist", function () {
      let p = sut.$(people).skip(100).toArray();
      aver.areEqual(0, p.length);
    });

    it("skipNormal", function () {
      let p = sut.$(people).skip(4).toArray();
      aver.areEqual(2, p.length);

      aver.areEqual("John", p[0].name);
      aver.areEqual(23, p[0].age);

      aver.areEqual("Ann", p[1].name);
      aver.areEqual(32, p[1].age);
    });

    it("takeSkipCombi1", function () {
      let p = sut.$(people).skip(2).take(2).toArray();
      aver.areEqual(2, p.length);

      aver.areEqual("Tom", p[0].name);
      aver.areEqual(23, p[0].age);

      aver.areEqual("Jim", p[1].name);
      aver.areEqual(29, p[1].age);
    });

    it("takeSkipCombi2", function () {
      let p = sut.$(people).take(3).skip(2).toArray();
      aver.areEqual(1, p.length);

      aver.areEqual("Tom", p[0].name);
      aver.areEqual(23, p[0].age);
    });

    it("skipMultiple", function () {
      let p = sut.$(people).skip(3).skip(2).toArray();
      aver.areEqual(1, p.length);

      aver.areEqual("Ann", p[0].name);
      aver.areEqual(32, p[0].age);
    });

    it("takeFromEmpty", function () {
      let p = sut.$().take(2).toArray();
      aver.areEqual(0, p.length);
    });

    it("skipFromEmpty", function () {
      let p = sut.$().skip(2).toArray();
      aver.areEqual(0, p.length);
    });
  });

  describe("orderBy", function () {
    it("ascAge", function () {
      let p = sut.$(people).orderBy((a, b) => a.age > b.age).toArray();
      aver.areEqual(6, p.length);

      aver.areEqual("Tom", p[0].name);
      aver.areEqual(23, p[0].age);
      aver.areEqual("John", p[1].name);
      aver.areEqual(23, p[1].age);
      aver.areEqual("Jim", p[2].name);
      aver.areEqual(29, p[2].age);
      aver.areEqual("Nick", p[3].name);
      aver.areEqual(32, p[3].age);
      aver.areEqual("Ann", p[4].name);
      aver.areEqual(32, p[4].age);
      aver.areEqual("Ann", p[5].name);
      aver.areEqual(43, p[5].age);
    });

    it("descName", function () {
      let p = sut.$(people).orderBy((a, b) => a.name < b.name).toArray();
      aver.areEqual(6, p.length);

      aver.areEqual("Tom", p[0].name);
      aver.areEqual(23, p[0].age);
      aver.areEqual("Nick", p[1].name);
      aver.areEqual(32, p[1].age);
      aver.areEqual("John", p[2].name);
      aver.areEqual(23, p[2].age);
      aver.areEqual("Jim", p[3].name);
      aver.areEqual(29, p[3].age);
      aver.areEqual("Ann", p[4].name);
      aver.areEqual(43, p[4].age);
      aver.areEqual("Ann", p[5].name);
      aver.areEqual(32, p[5].age);
    });
  });

  describe("count", function () {
    it("normal", function () {
      let n = sut.$(people).count();
      aver.areEqual(6, n);
    });

    it("withCondition1", function () {
      let n = sut.$(people).count(e => e.age > 30);
      aver.areEqual(3, n);
    });

    it("withCondition2", function () {
      let n = sut.$(people).count(e => e.age > 50);
      aver.areEqual(0, n);
    });

    it("withCondition3", function () {
      let n = sut.$(people).count(e => e.age < 50);
      aver.areEqual(6, n);
    });

    it("empty", function () {
      let n = sut.$().count();
      aver.areEqual(0, n);
    });
  });

  describe("any", function () {
    it("withCondition1", function () {
      let t = sut.$(people).any(e => e.age < 0);
      aver.isFalse(t);
    });

    it("withCondition2", function () {
      let t = sut.$(people).any(e => e.age > 40);
      aver.isTrue(t);
    });

    it("withoutCondition", function () {
      let t = sut.$(people).any();
      aver.isTrue(t);
    });

    it("fromEmpty", function () {
      let t = sut.$().any();
      aver.isFalse(t);
    });
  });

  describe("all", function () {
    it("withoutCondition", function () {
      let t = sut.$(people).all();
      aver.isTrue(t);
    });

    it("withCondition1", function () {
      let t = sut.$(people).all(e => e.age < 30);
      aver.isFalse(t);
    });

    it("withCondition2", function () {
      let t = sut.$(people).any(e => e.age < 50);
      aver.isTrue(t);
    });

    it("fromEmpty", function () {
      let t = sut.$().all();
      aver.isTrue(t);
    });

    it("withConditionFromEmpty", function () {
      let t = sut.$().all(e => e.age > 0);
      aver.isTrue(t);
    });
  });

  describe("firstOrDefault", function () {
    it("withoutCondition", function () {
      let t = sut.$(people).firstOrDefault();

      aver.isTrue(t.ok);
      let val = t.value;

      aver.areEqual("Nick", val.name);
      aver.areEqual(32, val.age);
    });

    it("withCondition", function () {
      let t = sut.$(people).firstOrDefault(e => e.name.startsWith("J"));

      aver.isTrue(t.ok);
      let val = t.value;

      aver.areEqual("Jim", val.name);
      aver.areEqual(29, val.age);
    });

    it("noElements", function () {
      let t = sut.$(people).firstOrDefault(e => e.name.startsWith("Z"));

      aver.isFalse(t.ok);
      aver.isUndefined(t.value);
    });

    it("fromEmpty", function () {
      let t = sut.$().firstOrDefault();

      aver.isFalse(t.ok);
      aver.isUndefined(t.value);
    });
  });

  describe("first", function () {
    it("withoutCondition", function () {
      let t = sut.$(people).first();

      aver.areEqual("Nick", t.name);
      aver.areEqual(32, t.age);
    });

    it("withCondition", function () {
      let t = sut.$(people).first(e => e.name.startsWith("J"));

      aver.areEqual("Jim", t.name);
      aver.areEqual(29, t.age);
    });

    it("noElements", function () {
      aver.throws(function () {
        sut.$(people).first(e => e.name.startsWith("Z"));
      }, "no matching elements");
    });

    it("fromEmpty", function () {
      aver.throws(function () {
        sut.$().first();
      }, "no matching elements");
    });
  });

  describe("concat", function () {
    it("normal", function () {
      let p = sut.$(people);
      p = p.concat([{
        count: p.count()
      }]).toArray();

      aver.areEqual(7, p.length);

      for (let i = 0; i < p.length - 1; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }

      aver.areEqual(6, p[6].count);
    });

    it("empty", function () {
      let p = sut.$(people).concat([]).toArray();

      aver.areEqual(6, p.length);

      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });

    it("undefined", function () {
      let p = sut.$(people).concat(undefined).toArray();

      aver.areEqual(6, p.length);

      for (let i = 0; i < p.length; i++) {
        aver.areEqual(people.data[i].name, p[i].name);
        aver.areEqual(people.data[i].age, p[i].age);
      }
    });
  });

  describe("distinct", function () {
    it("conditonAge", function () {
      let p = sut.$(people).distinct(e => e.age).toArray();
      aver.areEqual(4, p.length);

      aver.areEqual("Nick", p[0].name);
      aver.areEqual(32, p[0].age);

      aver.areEqual("Ann", p[1].name);
      aver.areEqual(43, p[1].age);

      aver.areEqual("Tom", p[2].name);
      aver.areEqual(23, p[2].age);

      aver.areEqual("Jim", p[3].name);
      aver.areEqual(29, p[3].age);
    });

    it("conditionName", function () {
      let p = sut.$(people).distinct(e => e.name).toArray();
      aver.areEqual(5, p.length);

      aver.areEqual("Nick", p[0].name);
      aver.areEqual(32, p[0].age);

      aver.areEqual("Ann", p[1].name);
      aver.areEqual(43, p[1].age);

      aver.areEqual("Tom", p[2].name);
      aver.areEqual(23, p[2].age);

      aver.areEqual("Jim", p[3].name);
      aver.areEqual(29, p[3].age);

      aver.areEqual("John", p[4].name);
      aver.areEqual(23, p[4].age);
    });

    it("withoutConditonfromEmpty", function () {
      let p = sut.$().distinct().toArray();
      aver.areEqual(0, p.length);
    });

    it("withConditonfromEmpty", function () {
      let p = sut.$().distinct(e => e.age).toArray();
      aver.areEqual(0, p.length);
    });
  });

  describe("isEquivalentTo", function () {
    it("normal", function () {
      let p1 = sut.$([{
        name: "Nick",
        age: 17
      }, {
        name: "Alex",
        age: 55
      }]);
      let p2 = sut.$([{
        name: "Nick",
        age: 17
      }, {
        name: "Wolfgang",
        age: 55
      }]);

      aver.isFalse(p1.isEquivalentTo(p2));
      aver.isFalse(p1.isEquivalentTo(p2, (a, b) => a.name === b.name));
      aver.isTrue(p1.isEquivalentTo(p2, (a, b) => a.age === b.age));

      let p3 = sut.$([{
        name: "Nick",
        age: 17
      }]);
      aver.isFalse(p1.isEquivalentTo(p3));

      aver.isTrue(p1.isEquivalentTo([{
        name: "Nick",
        age: 17
      }, {
        name: "Wolfgang",
        age: 55
      }], (a, b) => a.age === b.age));

      aver.isTrue(p1.isEquivalentTo([17, 55], (a, b) => a.age === b));
    });

    it("empty", function () {
      aver.isTrue(sut.$(null).isEquivalentTo(sut.$(null)));
      aver.isTrue(sut.$(null).isEquivalentTo(sut.$()));
      aver.isTrue(sut.$().isEquivalentTo(sut.$(null)));
      aver.isTrue(sut.$().isEquivalentTo(sut.$()));
      aver.isTrue(sut.$([]).isEquivalentTo(sut.$([])));
    });
  });

});