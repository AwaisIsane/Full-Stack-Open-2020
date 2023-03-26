export const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 16) return "Underweight (Severe thinness)";
  else if (BMI < 17) return "Underweight (Moderate thinness)";
  else if (BMI < 18.5) return "Underweight (Mild thinness)";
  else if (BMI < 25) return "Normal (healthy weight)";
  else if (BMI < 30) return "Overweight (Pre-obese)";
  else if (BMI < 35) return "Obese (Class I)";
  else if (BMI < 40) return "Obese (Class 2)";
  else return "Obese (Class III)";
};
// process.argv.slice(2).forEach((n) => {
//   if (isNaN(Number(n))) {
//     console.error("NAN");
//     process.exit(1);
//   }
// });

// if (process.argv.length > 3) {
//   const arg = process.argv.slice(2);
//   console.log(calculateBmi(Number(arg[0]), Number(arg[1])));
// } else {
//   console.error("invalid no of params");
// }
