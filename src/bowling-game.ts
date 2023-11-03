export function totalScore(scoreString: string): number {
  const scoreArr = scoreString.split(" ");
  //console.log(scoreArr);
  // map
  const mappedScore = scoreArr.reduce(
    (
      numArray: Array<Array<number>>,
      turn: string,
      i: number,
      scoreArray: Array<string>
    ): Array<Array<number>> => {
      const turnInNums = turn.replace("-", "0");
      const [a, b] = [parseInt(turnInNums[0]), parseInt(turnInNums[1])];
      // consider prev score as x, y
      // for spare, y = 10-x plus a from current score
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
  console.log(mappedScore);
  // reduce
  return mappedScore.reduce((acc, turn) => {
    return (acc += turn[0] + turn[1]);
  }, 0);
}
