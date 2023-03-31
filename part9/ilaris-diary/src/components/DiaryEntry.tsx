import { useEffect, useState } from "react";
import { getDiary } from "../services";
import { NonSensitiveDiaryEntry } from "../types";

const DiaryEntry = () => {
  const [diary, setDiary] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getDiary().then((data) => setDiary(data));
  });

  return (
    <>
      {diary.map((entry,i) => (
        <div key={i}>
          <h3>{entry.date}</h3>
          <div>
            <>visibility {entry.visibility}</>
            <>weather {entry.weather}</>
          </div>
        </div>
      ))}
    </>
  );
};

export default DiaryEntry;
