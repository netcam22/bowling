export function totalScore(scoreString: string): number {
  const scoreArr = scoreString
    .split(" ")
    .reduce(
      (
        numArray: Array<Array<number>>,
        turn: string,
        i: number,
        scoreArray: Array<string>
      ): Array<Array<number>> => {
        const turnData = turn.replace("X", "X0");
        const [a, b] = turnData
          .split("")
          .map((char: string) => (!isNaN(parseInt(char)) ? parseInt(char) : 0));
        console.log(a, b);
        if (
          i > 0 &&
          (scoreArray[i - 1].includes("/") || scoreArray[i - 1].includes("X"))
        ) {
          let [x, y] = [a, b];
          const prevScore = scoreArray[i - 1];
          //console.log(prevScore);
          if (scoreArray[i - 1].includes("/")) {
            [x, y] = [parseInt(prevScore[0]), 10 - parseInt(prevScore[0]) + a];
          }
          if (scoreArray[i - 1].includes("X")) {
            [x, y] = [10, a + b];
          }
          if (
            scoreArray[i - 1].includes("X") &&
            scoreArray[i - 1].includes("X")
          ) {
            [x, y] = [10, a + b];
          }
          console.log(a, b, x, y);
          const newArr = [...numArray];
          newArr[i] = [a, b];
          newArr[i - 1] = [x, y];
          return newArr;
        }
        return [...numArray, (numArray[i] = [a, b])];
      },
      []
    );
  console.log(scoreArr);
  return scoreArr.reduce((acc, turn) => {
    return (acc += turn[0] + turn[1]);
  }, 0);
}
