import { CoursePart } from "../types";
import Part from "./Part";


const Content = ({parts}:{parts:CoursePart[]}) => {
  return (
    <>
    {parts.map((part,i)=><Part part={part} key={i} />)}
  </>
  );
};

export default Content;