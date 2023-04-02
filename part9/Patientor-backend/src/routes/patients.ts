import express from "express";
import patientSrv from "../services/patients";
import { toNewPatientEntry, toAddEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientSrv.getNonSenseEntries();
  res.status(200).json(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const body = patientSrv.getPatientByid(id);
  res.json(body);
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

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toAddEntry(req.body);
    const addded = patientSrv.addEntry(id, newEntry);
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
