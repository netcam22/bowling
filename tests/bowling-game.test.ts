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

describe("test for number values with some spares from throws with 10 turns", () => {
  // arrange
  const scoreString = "54 54 54 5/ 54 54 54 54 54 54";
  const score = 96;
  // act and assert
  test("test for all turns with scores of 5,4 but one with spare score of 5,/", () => {
    expect(totalScore(scoreString)).toBe(score);
  });
  test("throws of all 5s and spares apart from last turn", () => {
    expect(totalScore("5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 54")).toBe(144);
  });

  test(" mixed throws with 2 spares result in score of 92", () => {
    expect(totalScore("5/ 54 53 51 54 53 51 52 5/ 54")).toBe(92);
  });
});

describe("test for number values including one or more non consecutive strikes from games with 10 turns", () => {
  // arrange
  const scoreString = "54 54 54 X 54 54 54 54 54 54";
  const score = 100;
  // act and assert
  test("all turns with scores of 5,4 apart from one strike scores 100", () => {
    expect(totalScore(scoreString)).toBe(score);
  });

  test("all turns with scores of 5,4 apart from two non consecutive strike scores 110", () => {
    expect(totalScore("54 54 X 54 54 54 X 54 54 54")).toBe(110);
  });

  test("all turns with scores of 5,4 apart from three non consecutive strike scores 120", () => {
    expect(totalScore("54 54 X 54 X 54 X 54 54 54")).toBe(120);
  });

  test("alternate scores of 5,4 with strike scores 140", () => {
    expect(totalScore("X 54 X 54 X 54 X 54 X 54")).toBe(140);
  });
});

describe("test for number values including two or more consecutive strikes from games with 10 turns", () => {
  test("scores of 5,4 with two consecutive strike scores to be 146", () => {
    expect(totalScore("54 X X 54 X 54 X 54 X 54")).toBe(146);
  });

  test("throws of all strikes apart from last turn to be 263", () => {
    expect(totalScore("X0 X0 X0 X0 X0 X0 X0 X0 X0 54")).toBe(263);
  });
});
