import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!(req.query.weight && req.query.height))
    res.json({ error: "malformated params" });
  else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const BMI = calculateBmi(height, weight);
    const body = { weight, height, BMI };
    res.json(body);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  console.log(body)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!(body.daily_exercises && body.target)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    res.status(200).json(calculateExercises(body.daily_exercises,body.target));
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
