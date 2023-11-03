export function totalScore(scoreString: string): number {
  ///"11 11 11 11 11 11 11 11 11 11"
  // split
  const scoreArr = scoreString.split(" ");
  console.log(scoreArr);
  // map
  const mappedScore = scoreArr.map(item => {
    return [parseInt(item[0]), parseInt(item[1])];
  });
  console.log(mappedScore);
  // reduce
  return mappedScore.reduce((acc, item) => {
    return (acc += item[0] + item[1]);
  }, 0);
}
