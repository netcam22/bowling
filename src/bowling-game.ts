export function totalScore(scoreString: string): number {
  const scoreArr = `${scoreString} 00 00`.split(" ").reduce(
    (
      numArray: Array<Array<number>>,
      turn: string,
      i: number,
      scoreArray: Array<string>
    ): Array<Array<number>> => {
      if (i > 1) {
        const first = scoreArray[i - 2].replace("X", "X0");
        let [a, b] = first
          .split("")
          .map((char: string) => (!isNaN(parseInt(char)) ? parseInt(char) : 0));
        const second = scoreArray[i - 1].replace("X", "X0");
        const [c, d] = second
          .split("")
          .map((char: string) => (!isNaN(parseInt(char)) ? parseInt(char) : 0));
        const third = scoreArray[i].replace("X", "X0");
        const [e, f] = third
          .split("")
          .map((char: string) => (!isNaN(parseInt(char)) ? parseInt(char) : 0));
        if (
          scoreArray[i - 2].includes("/") ||
          scoreArray[i - 2].includes("X")
        ) {
          if (scoreArray[i - 2].includes("/")) {
            [a, b] = [a, 10 - a + c];
          }
          if (scoreArray[i - 2].includes("X")) {
            [a, b] = [10 + c + d, 0];
          }
          if (
            scoreArray[i - 1].includes("X") &&
            scoreArray[i - 2].includes("X")
          ) {
            [a, b] = [20 + e + f, 0];
          }
        }
        const newArr = [...numArray];
        newArr[i - 2] = [a, b];
        newArr[i - 1] = [c, d];
        newArr[i] = [e, f];
        return newArr;
      }
      return numArray;
    },
    [
      [0, 0],
      [0, 0]
    ]
  );
  console.log(scoreString, scoreArr);
  return scoreArr.reduce((acc, turn) => {
    return (acc += turn[0] + turn[1]);
  }, 0);
}
