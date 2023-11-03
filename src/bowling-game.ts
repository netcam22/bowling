export function totalScore(scoreString: string): number {
  return `${scoreString} 00 00`
    .split(" ")
    .reduce(
      (
        numArray: Array<Array<number>>,
        thisTurn: string,
        i: number,
        scoreArray: Array<string>
      ): Array<Array<number>> => {
        if (i > 1) {
          const makeSubArr = (scoreStr: string): Array<number> => {
            return scoreStr
              .replace("X", "X0")
              .split("")
              .map((char: string) =>
                !isNaN(parseInt(char)) ? parseInt(char) : char === "X" ? 10 : 0
              );
          };
          let [a, b] = makeSubArr(scoreArray[i - 2]);
          const [c, d] = makeSubArr(scoreArray[i - 1]);
          let [e, f, ...bonus] = makeSubArr(thisTurn);
          if (
            scoreArray[i - 2].includes("/") ||
            scoreArray[i - 2].includes("X")
          ) {
            if (scoreArray[i - 2].includes("/")) {
              [a, b] = [a, 10 - a + c];
            } else if (
              scoreArray[i - 1].includes("X") &&
              scoreArray[i - 2].includes("X")
            ) {
              [a, b] = [a + b + c + d + e, 0];
            } else if (scoreArray[i - 2].includes("X")) {
              [a, b] = [a + b + c + d, 0];
            }
          }
          const newArr = [...numArray];
          if (
            (i === scoreArray.length - 3 && thisTurn.includes("/")) ||
            thisTurn.includes("X")
          ) {
            let [x, y] = [...bonus];
            newArr[i - 2] = [a + (x | 0) + (y | 0), b];
          } else {
            newArr[i - 2] = [a, b];
          }
          return newArr;
        }
        return numArray;
      },
      [
        [0, 0],
        [0, 0]
      ]
    )
    .reduce((acc, turn) => (acc += turn[0] + turn[1]), 0);
}
