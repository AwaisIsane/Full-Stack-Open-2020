import axios from "axios";
import {
  Diagnose,
  Entry,
  NewEntry,
  NonSensitivePatient,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<NonSensitivePatient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getIndividualPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`);

  return data;
};

const addEntry = async (entry: NewEntry, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  getIndividualPatient,
  getDiagnoses,
  addEntry,
};
