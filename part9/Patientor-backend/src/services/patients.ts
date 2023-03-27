import data from "../../data/patients";
import { NewPatient, Patient } from "../types";
import { v4 as uuid } from "uuid";

const patients: Patient[] = data;
const getEntries = (): Patient[] => {
  return patients;
};

const getNonSenseEntries = (): Omit<Patient, "ssn">[] => {
  return patients.map((dat) => ({
    id: dat.id,
    name: dat.name,
    dateOfBirth: dat.dateOfBirth,
    gender: dat.gender,
    occupation: dat.occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const pt = { ...patient, id: uuid() };
  patients.push(pt);
  return pt;
};

export default { addPatient, getNonSenseEntries, getEntries };
