import { totalScore } from "../src/bowling-game";
//We will not check for valid rolls or correct number of rolls and frames
//some sample test data:
// "11 11 11 11 11 11 11 11 11 11", 20
//"23 52 45 13 42 33 54 12 34 54",  65
//"23 52 4- 13 42 33 54 12 34 54",  60
//"9- 9- 9- 9- 9- 9- 9- 9- 9- 9-", 90
//"5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5", 150
// "X X X X X X X X X X X X", 300
describe("test for only number values from throws with 10 turns", () => {
  // arrange
  const scoreString = "11 11 11 11 11 11 11 11 11 11";
  const score = 20;
  // act and assert
  test("all throws of one result in score of 20", () => {
    expect(totalScore(scoreString)).toBe(score);
  });
  test("throws of all positive integer values result in score of 65", () => {
    expect(totalScore("23 52 45 13 42 33 54 12 34 54")).toBe(65);
  });
  test("throws of all 8s and 1s result in score of 90", () => {
    expect(totalScore("81 81 81 81 81 81 81 81 81 81")).toBe(90);
  });
});

describe("test for number values with some misses from throws with 10 turns", () => {
  // arrange
  const scoreString = "11 11 11 11 1- 11 11 11 11 11";
  const score = 19;
  // act and assert
  test("all throws of one apart from one miss result in score of 19", () => {
    expect(totalScore(scoreString)).toBe(score);
  });
  test("throws of all positive integer values with one miss result in score of 60", () => {
    expect(totalScore("23 52 4- 13 42 33 54 12 34 54")).toBe(60);
  });
  test("throws of all 8s and 1s with 2 misses result in score of 81", () => {
    expect(totalScore("81 81 81 -1 81 81 8- 81 81 81")).toBe(81);
  });

  test("throws of all 9s and 1s with 2 misses result in score of 90", () => {
    expect(totalScore("9- 9- 9- 9- 9- 9- 9- 9- 9- 9-")).toBe(90);
  });
});
