import { NonSensitiveDiaryEntry } from "../types";

const DiaryEntry = ({diary}:{diary:NonSensitiveDiaryEntry[]}) => {


  return (
    <>
      {diary.map((entry, i) => (
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
