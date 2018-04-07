import * as aver from "../../../out/zhee/aver";
import * as sut  from "../../../out/zhee/types";

describe("Types", function() {

  describe("#isArray()", function() {
    it("should return false for undefined", () => aver.isFalse( sut.isArray() ));
    it("should return false for undefined", () => aver.isFalse( sut.isArray(undefined) ));

    it("should return false for null",  () => aver.isFalse( sut.isArray(null) ));
    it("should return false for true",  () => aver.isFalse( sut.isArray(true) ));
    it("should return false for int",   () => aver.isFalse( sut.isArray(123) ));
    it("should return false for string",() => aver.isFalse( sut.isArray("zaza") ));
  });



});