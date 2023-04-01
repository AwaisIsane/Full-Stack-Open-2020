import { useState } from "react";
import { NonSensitiveDiaryEntry, Visibility, Weather } from "../types";
import { createDiaryEntry } from "../services";
import { parseVisibility, parseWeather } from "../utils";
import { AxiosError } from "axios";

const AddEntry = ({addDiaryf,setError}:{addDiaryf:(entry:NonSensitiveDiaryEntry)=>void,setError:(err:string)=>void}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");

  const submit = async (event: React.SyntheticEvent) => {
    try{
    event.preventDefault();
    const body = { date, weather, visibility, comment };
    const response = await createDiaryEntry(body);
    addDiaryf({ date, weather, visibility,id:response.id })
    }
    catch (e) {
        const error = e as AxiosError
        console.log(error)
        setError(error.message)
    }
  };
  const weatherA: Weather[] = [
    Weather.Cloudy,
    Weather.Rainy,
    Weather.Stormy,
    Weather.Windy,
  ];
  const visibilityA: Visibility[] = [
    Visibility.Good,
    Visibility.Great,
    Visibility.Ok,
    Visibility.Poor,
  ];
  return (
    <form onSubmit={submit}>
      <div>
        <label>date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        <label>visibility  :-</label>
        <label>{Visibility.Good}</label>
        <input
          type="radio"
          name="visibility"
          value={Visibility.Good}
          onChange={(event) =>
            setVisibility(parseVisibility(event.target.value))
          }
          checked
        />
        {visibilityA.map((v) => (
          <span key={v} >  
            <label>   {v}</label>
            <input
              type="radio"
              name="visibility"
              value={v}
              onChange={(event) =>
                setVisibility(parseVisibility(event.target.value))
              }
            />
          </span>
        ))}
      </div>
      <div>
        <label>weather</label>
        <label>{Weather.Sunny}</label>
        <input
          type="radio"
          name="weather"
          value={Weather.Sunny}
          onChange={(event) => setWeather(parseWeather(event.target.value))}
          checked
        />
        {weatherA.map((w, i) => (
          <span key={i}>
            <label>{w}</label>
            <input
              type="radio"
              name="weather"
              value={w}
              onChange={(event) => setWeather(parseWeather(event.target.value))}
            />
          </span>
        ))}
      </div>
      <div>
        <label>comment</label>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddEntry;
