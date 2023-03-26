interface target {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

export const calculateExercises = (daily: number[], target: number): target => {
  const ratingTbl = {
    1: "bad please exercise daily",
    2: "not too bad but could be better",
    3: "noice keep it up",
  };

  const average = daily.reduce((a, b) => a + b, 0) / daily.length;
  const rating = average < target - 0.5 ? 1 : target + 1 > average ? 3 : 2;

  return {
    periodLength: daily.length,
    target,
    average,
    rating,
    ratingDescription: ratingTbl[rating],
    success: average >= target,
    trainingDays: daily.filter((n) => n !== 0).length,
  };
};
// process.argv.slice(2).forEach((n) => {
//   if (isNaN(Number(n))) {
//     console.error("NAN");
//     process.exit(1);
//   }
// });

// if (process.argv.length > 3) {
//   const target = Number(process.argv[2]);
//   const array = process.argv.splice(3).map((n) => Number(n));
//   console.log(calculateExercises(array, target));
// } else {
//   console.error("invalid no of params");
// }
