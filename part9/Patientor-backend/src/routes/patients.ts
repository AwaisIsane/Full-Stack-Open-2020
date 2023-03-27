import express from "express";
import patientSrv from "../services/patients";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientSrv.getNonSenseEntries();
  res.status(200).json(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addded = patientSrv.addPatient(newPatient);
    res.json(addded);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
