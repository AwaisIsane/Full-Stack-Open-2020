import React from 'react';
import Person from "./Person";


const Persons =({personsToShow,handleButtonClick}) => (
<>
{personsToShow.map(person => 
        <Person 
        name={person.name} 
        no={person.number}
        id={person.id}
        handleButtonClick = {handleButtonClick}  
        key={person.name}/>) }
</> 
); 
        

export default Persons;
