import express from "express";
import { getEntries } from "../services/diagnose";

const router = express.Router();

router.get("/", (_req, res) => {
  const diagnoses = getEntries();
  res.status(200).json(diagnoses);
});

router.post("/", (_req, res) => {
  res.send("Saving a diary!");
});

export default router;
