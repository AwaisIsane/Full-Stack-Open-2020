import data from "../../data/patients";
import { NewEntry, NewPatient, NonSensitivePatient, Patient,Entry } from "../types";
import { v4 as uuid } from "uuid";

let patients: Patient[] = data;
const getEntries = (): Patient[] => {
  return patients;
};

const getNonSenseEntries = (): NonSensitivePatient[] => {
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

const addEntry = (id: string, entry: NewEntry): Entry => {
  const ent = { ...entry, id: uuid() };
  // patients.forEach((p) => {
  //   if (p.id === id) p.entries.push(ent);
  // });
  patients = patients.map((p) =>
    p.id === id ? { ...p, entries:p.entries.concat(ent)   }: p
  );
  return ent;
};

const getPatientByid = (id: string): Patient => {
  return patients.filter((p) => p.id === id)[0];
};

export default {
  addPatient,
  getNonSenseEntries,
  getEntries,
  getPatientByid,
  addEntry,
};
