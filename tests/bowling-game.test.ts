import { totalScore } from "../src/bowling-game";

describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(totalScore()).toBe(15);
  });
  it("should return 5 for add(2,3)", () => {
    expect(totalScore()).toBe(5);
  });
});
