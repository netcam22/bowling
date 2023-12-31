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
    expect(totalScore("X X X X X X X X X 54")).toBe(263);
  });

  test("throws of multiple strikes apart from last turn to be 157", () => {
    expect(totalScore("X X 81 X 71 X X 34 X 54")).toBe(157);
  });

  test("throws of multiple strikes apart from last turn to be 153", () => {
    expect(totalScore("45 X X 27 X X 35 X X 16")).toBe(153);
  });
});

describe("test for values with spare at end", () => {
  // arrange
  const scoreString = "54 54 54 5/ 54 54 54 54 54 5/5";
  const score = 102;
  // act and assert
  test("test for spare at end", () => {
    expect(totalScore(scoreString)).toBe(score);
  });

  test("test for multiples spares with spare at end", () => {
    expect(totalScore("5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/5")).toBe(150);
  });
});

describe("test for values with strikes at end", () => {
  // arrange
  const scoreString = "54 54 54 54 54 54 54 54 54 X25";
  const score = 98;
  // act and assert
  test("test for strike at end", () => {
    expect(totalScore(scoreString)).toBe(score);
  });

  test("test for multiples spares with strike at end", () => {
    expect(totalScore("5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ X45")).toBe(159);
  });

  test("test with strike and number at end", () => {
    expect(totalScore("44 9/ 25 08 71 80 54 2/ X XX1")).toBe(131);
  });

  test("test with strike at start", () => {
    expect(totalScore("X 9/ 80 63 09 9/ 23 72 45 12")).toBe(102);
  });

  test("test with strikes and spares", () => {
    expect(totalScore("9/ 5/ X 0/ 5/ X 6/ 9/ X 12")).toBe(165);
  });

  test("test with strikes and spares", () => {
    expect(totalScore("8/ 32 X 5/ 52 52 4/ 71 X 1/X")).toBe(132);
  });
});
