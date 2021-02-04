import React from 'react';
import Person from "./Person";


const Persons =({personsToShow}) => (
<>
{personsToShow.map(person => 
        <Person 
        name={person.name} 
        no={person.number} 
        key={person.name}/>) }
</> 
); 
        

export default Persons;
