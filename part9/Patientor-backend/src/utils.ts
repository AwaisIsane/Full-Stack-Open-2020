import {
  BaseEntry,
  Diagnose,
  Discharge,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewPatient,
  sickLeave,
} from "./types";
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (text: unknown): text is number => {
  return typeof text === "number" || text instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing comment");
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isHealthRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing Gender: " + gender);
  }
  return gender;
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isNumber(rating) || !isHealthRating(rating)) {
    throw new Error("Incorrect or missing Gender: " + rating);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria),
    };
  }

  throw new Error("Incorrect data: a field missing in discharge");
};

const parsesickLeave = (sickleave: unknown): sickLeave => {
  if (!sickleave || typeof sickleave !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("startDate" in sickleave && "endDate" in sickleave) {
    return {
      startDate: parseDate(sickleave.startDate),
      endDate: parseString(sickleave.endDate),
    };
  }

  throw new Error("Incorrect data: a field missing in sickLeave");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: [],
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

export const toAddEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    let entryWithoutUnion: Omit<BaseEntry, "id"> = {
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      date: parseDate(object.date),
    };
    if ("diagnosisCodes" in object) {
      entryWithoutUnion = {
        ...entryWithoutUnion,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      };
    }
    if (object.type === "Hospital" && "discharge" in object) {
      return {
        ...entryWithoutUnion,
        type: object.type,
        discharge: parseDischarge(object.discharge),
      };
    }
    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      return {
        ...entryWithoutUnion,
        type: object.type,
        healthCheckRating: parseHealthRating(object.healthCheckRating),
      };
    }
    if (object.type === "OccupationalHealthcare" && "employerName" in object) {
      const oH: NewEntry = {
        ...entryWithoutUnion,
        type: object.type,
        employerName: parseString(object.employerName),
      };

      if ("sickLeave" in object)
        return { ...oH, sickLeave: parsesickLeave(object.sickLeave) };
      return oH;
    }
  }
  throw new Error("Incorrect data: a field missing");
};
