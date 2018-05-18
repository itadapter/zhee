if (zhee===undefined) var zhee = require("./out/zhee");
const aver = zhee.Aver;
const sut = zhee.Models;

describe("Models", function() {

  describe("#1()", function() {
    
    class Person extends sut.Model{
      constructor(){
        super(null, "Person");
        new sut.Field(this, "fname");
        new sut.Field(this, "lname");
        new sut.Field(this, "age");

        new sut.Field(this, "aage");
      }
    }


    it("1",   function() { 
      const m = new Person();
      console.log( m.data );
    });

  }); 

  
});