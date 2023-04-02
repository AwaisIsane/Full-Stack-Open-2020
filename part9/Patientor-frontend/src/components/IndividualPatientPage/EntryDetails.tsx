import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthRatingBar from "../HealthRatingBar";
import WorkIcon from "@mui/icons-material/Work";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckE = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <p>
        {entry.date}
        <MedicalServicesIcon />
      </p>
      <p>{entry.description}</p>
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      <p>diagnose by {entry.specialist}</p>
    </>
  );
};

const HospitalE = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>
        {entry.discharge.criteria} {entry.discharge.date}
      </p>
      <p>diagnose by{entry.specialist}</p>
    </>
  );
};

const OccupationalHealthcareE = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <p>
        {entry.date}
        <WorkIcon />
        {entry.employerName}
      </p>
      <p>{entry.description}</p>
      <p>diagnosed by {entry.specialist}</p>
    </>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckE entry={entry} />;
    case "Hospital":
      return <HospitalE entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareE entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
