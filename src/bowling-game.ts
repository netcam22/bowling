export function totalScore(scoreString: string): number {
  ///"11 11 11 11 11 11 11 11 11 11"
  // split
  const scoreArr = scoreString.split(" ");
  //console.log(scoreArr);
  // map
  const mappedScore = scoreArr.map(
    (turn: string, i: number, scoreArray: Array<string>): Array<number> => {
      const turnInNums = turn.replace("-", "0");
      const [a, b] = [parseInt(turnInNums[0]), parseInt(turnInNums[1])];
      console.log(a, b);
      return [a, b];
    }
  );
  //console.log(mappedScore);
  // reduce
  return mappedScore.reduce((acc, item) => {
    return (acc += item[0] + item[1]);
  }, 0);
}
