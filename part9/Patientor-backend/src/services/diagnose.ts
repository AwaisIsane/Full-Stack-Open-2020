import data from "../../data/diagnoses";
import { Diagnose } from "../types";

export const getEntries = (): Diagnose[] => {
  return data;
};

