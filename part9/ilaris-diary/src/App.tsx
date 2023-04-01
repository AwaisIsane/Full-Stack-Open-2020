import { useEffect, useState } from "react";
import AddEntry from "./components/AddEntry";
import DiaryEntry from "./components/DiaryEntry";
import { getDiary } from "./services";
import { NonSensitiveDiaryEntry } from "./types";

function App() {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error,setError] = useState("")

  useEffect(() => {
    getDiary().then((data) => setDiary(data));
  }, []);

  const addDiary = (entry: NonSensitiveDiaryEntry) => {
    setDiary([...diary, entry]);
  };

  const setErrorf = (err:string) => setError(err);

  return (
    <>
      <h1>Add new Entry</h1>
      <h1>{error}</h1>
      <AddEntry addDiaryf={addDiary}  setError={setErrorf}/>
      <h2>Diary Entries</h2>
      <DiaryEntry diary={diary} />
    </>
  );
}

export default App;
