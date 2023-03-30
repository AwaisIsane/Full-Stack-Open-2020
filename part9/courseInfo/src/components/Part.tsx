import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          {part.description}
        </>
      );
    case "group":
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          Project ex = {part.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>{part.backgroundMaterial}</p>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
