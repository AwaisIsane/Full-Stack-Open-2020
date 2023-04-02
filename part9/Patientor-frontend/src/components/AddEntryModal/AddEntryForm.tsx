import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
  OutlinedInput,
} from "@mui/material";

import { Diagnose, NewEntry, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoseCodes: Diagnose[];
}

const diagnoseOptions = (codes: Diagnose[]): string[] => {
  return codes.map((c) => c.code);
};

const AddEntryForm = ({ onCancel, onSubmit, diagnoseCodes }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [HealthCheckrating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [discharge, setDischarge] = useState({ date: "", criteria: "" });
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState({ startDate: "", endDate: "" });

  const onHRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      const rating = Object.values(HealthCheckRating).find((g) => g === value);
      if (rating) {
        setHealthCheckRating(value);
      }
    }
  };

  const onDiagnoseChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const obj =
      diagnosisCodes.length > 0
        ? {
            description,
            date,
            specialist,
            diagnosisCodes,
          }
        : {
            description,
            date,
            specialist,
          };
    if (type === "HealthCheck") {
      onSubmit({
        ...obj,
        type,
        healthCheckRating: HealthCheckrating,
      });
    }
    if (type === "Hospital") {
      onSubmit({
        ...obj,
        type,
        discharge,
      });
    }
    if (type === "OccupationalHealthcare") {
      if (sickLeave.startDate !== "" && sickLeave.endDate !== "") {
        onSubmit({ ...obj, type, sickLeave, employerName });
      } else {
        onSubmit({ ...obj, type, employerName });
      }
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <Input
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnose Codes</InputLabel>
        <Select
          label="Diagnosis"
          fullWidth
          multiple
          value={diagnosisCodes}
          input={<OutlinedInput label="code" />}
          onChange={onDiagnoseChange}
        >
          {diagnoseOptions(diagnoseCodes).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="type"
          onChange={({ target }) => setType(target.value)}
        >
          <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>
            OccupationalHealthcare
          </MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
        </Select>
        {type === "HealthCheck" ? (
          <>
            <InputLabel style={{ marginTop: 20 }}>Health rating</InputLabel>
            <Select
              label="Health rating"
              fullWidth
              value={HealthCheckrating}
              onChange={onHRatingChange}
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>LowRisk</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>HighRisk</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>
                Critical Risk
              </MenuItem>
            </Select>
          </>
        ) : null}
        {type === "Hospital" ? (
          <>
            <InputLabel style={{ marginTop: 20 }}>Date discharge</InputLabel>
            <Input
              type="date"
              fullWidth
              value={discharge.date}
              onChange={({ target }) =>
                setDischarge({ ...discharge, date: target.value })
              }
            />
            <TextField
              label="criteria"
              fullWidth
              value={discharge.criteria}
              onChange={({ target }) =>
                setDischarge({ ...discharge, criteria: target.value })
              }
            />
          </>
        ) : null}
        {type === "OccupationalHealthcare" ? (
          <>
            <TextField
              label="employers name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sick leave start</InputLabel>
            <Input
              type="date"
              fullWidth
              value={sickLeave.startDate}
              onChange={({ target }) =>
                setSickLeave({ ...sickLeave, startDate: target.value })
              }
            />
            <InputLabel style={{ marginTop: 20 }}>sick leave end</InputLabel>
            <Input
              type="date"
              fullWidth
              value={sickLeave.endDate}
              onChange={({ target }) =>
                setSickLeave({ ...sickLeave, endDate: target.value })
              }
            />
          </>
        ) : null}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
