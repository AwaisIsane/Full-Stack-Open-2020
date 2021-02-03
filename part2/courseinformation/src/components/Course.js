import React from 'react';


const Course = ({course})  => (
    <>
    <Header course={course} />
    {course.parts.map(part => <Part  part = {part} key={part.id}/>)}
    <Total course = {course} />
    </>
  )
  
  
  
  const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((a,b) => a+b.exercises,0);
    return(
      <b>total of {sum} exercises</b>
    ) 
  }
  
  const Part = ({part}) => {
    return (
      <p >
        {part.name} {part.exercises}
      </p>    
    )
  }

  export default Course;
