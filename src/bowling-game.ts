export function totalScore(scoreString: string): number {
  return scoreString
    .split(" ")
    .reduce(
      (
        count: number,
        thisTurn: string,
        i: number,
        scoreArray: Array<string>
      ): number => {
        const makeSubArr = (scoreStr: string | undefined): Array<number> => {
          if (scoreStr !== undefined) {
            return scoreStr
              .replace(/^X{1}$/, "X0")
              .split("")
              .map((char: string) =>
                !isNaN(parseInt(char))
                  ? parseInt(char)
                  : char === "X"
                  ? 10
                  : char === "XX"
                  ? 20
                  : 0
              );
          }
          return [0, 0];
        };
        let [a, b] = makeSubArr(scoreArray[i]);
        const [c, d] = makeSubArr(scoreArray[i + 1]);
        const [e, f, ...bonus] = makeSubArr(scoreArray[i + 2]);
        if (scoreArray[i].includes("/") || scoreArray[i].includes("X")) {
          if (scoreArray[i].includes("/")) {
            [a, b] = [a, 10 - a + c];
          } else if (
            scoreArray[i + 1] !== undefined &&
            scoreArray[i + 1].includes("X") &&
            scoreArray[i].includes("X")
          ) {
            [a, b] = [a + b + c + d + e, 0];
          } else if (scoreArray[i].includes("X")) {
            [a, b] = [a + b + c + d, 0];
          }
        }
        if (
          scoreArray[i + 2] !== undefined &&
          (scoreArray[i + 2].includes("/") || scoreArray[i + 2].includes("X"))
        ) {
          let [x, y] = [...bonus];
          console.log(bonus);
          count += a + (x | 0) + (y | 0) + b;
        } else {
          count += a + b;
        }
        return count;
      },
      0
    );
}
