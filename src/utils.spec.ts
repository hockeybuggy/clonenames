import { randomChoice, randomBool, shuffle } from "./utils";

describe("utils", () => {
  describe("randomChoice", () => {
    it("returns one of the selections", () => {
      const choice = randomChoice(["A", "B"]);

      expect(choice == "A" || choice == "B").toBeTruthy();
    });
  });

  describe("randomBool", () => {
    it("returns true or false", () => {
      const choice = randomBool();

      expect(choice === true || choice === false).toBeTruthy();
    });
  });

  describe("shuffle", () => {
    it("contains the same number of elements", () => {
      const list = ["1", "2", "3"];
      const shuffledList = shuffle(list);

      expect(list.length).toEqual(shuffledList.length);
    });
  });
});
