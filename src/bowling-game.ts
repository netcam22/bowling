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
          if (scoreStr) {
            return scoreStr
              .replace(/^X{1}$/, "X0")
              .split("")
              .map((char: string, i: number) =>
                !isNaN(parseInt(char))
                  ? parseInt(char)
                  : char.match(/^\/{1}$/)
                  ? 10
                  : char.match(/^X{1,3}$/)
                  ? 10 * char.length
                  : 0
              );
          }
          return [0, 0];
        };
        let [a, b, ...bonus] = makeSubArr(thisTurn);
        const current = thisTurn.slice(0, 2),
          next = scoreArray[i + 1] ? scoreArray[i + 1].slice(0, 2) : "00",
          oneAfter = scoreArray[i + 2] ? scoreArray[i + 2].slice(0, 2) : "00",
          [c, d] = makeSubArr(next),
          [e, f] = makeSubArr(oneAfter);
        if (current.includes("/") || current.includes("X")) {
          if (current.includes("/")) {
            [a, b] = [a, b - a + c];
          } else if (current.includes("X") && next.includes("X")) {
            [a, b] = [a + b + c + d + e, 0];
          } else if (current.includes("X") && next.includes("/")) {
            [a, b] = [a + b + d, 0];
          } else if (current.includes("X")) {
            [a, b] = [a + b + c + d, 0];
          }
          if (i === scoreArray.length - 1) {
            const [x, y] = [...bonus];
            return count + a + (x | 0) + (y | 0) + b;
          }
        }
        return count + a + b;
      },
      0
    );
}
