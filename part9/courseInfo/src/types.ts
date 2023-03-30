interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CouresWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CouresWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground

interface CouresWithDescription extends CoursePartBase {
  description: string;
}
