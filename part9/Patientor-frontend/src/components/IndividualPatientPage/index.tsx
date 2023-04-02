import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnose, NewEntry, Patient } from "../../types";
import { Button, Typography } from "@mui/material";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const IndividualPatientPage = ({ codes }: { codes: Diagnose[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  useEffect(() => {
    if (id) {
      patientService.getIndividualPatient(id).then((res) => setPatient(res));
    }
  }, [id]);

  const submitNewEntry = async (values: NewEntry) => {
    try {
      if (patient && id) {
        const ent = await patientService.addEntry(values, id);
        setPatient({ ...patient, entries: patient.entries.concat(ent) });
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // const codeToDesc = (cd: string): string => {
  //   const arr = codes.filter((c) => c.code === cd);
  //   return arr.length > 0 ? arr[0].name : "";
  // };
  if (!patient)
    return (
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        patienr doesnt exist
      </Typography>
    );

  return (
    <>
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        {patient.name}
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>Gender: {patient.gender}</p>
      <Typography variant="h5" style={{ marginBottom: "0.5em" }}>
        Entries
      </Typography>
      {patient.entries.map((e, i) => (
        <EntryDetails entry={e} key={i} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoseCodes={codes}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      {/* {patient.entries.map((e, i) => (
        <div key={i}>
          <p>
            {e.date} {e.description}
          </p>
          {e.diagnosisCodes ? (
            <ul>
              {e.diagnosisCodes.map((d, i) => (
                <li key={i}>{d}:-{codeToDesc(d)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))} */}
    </>
  );
};

export default IndividualPatientPage;
