import React, { useState,useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNo, setNewNo] = useState("");
  const [searchName,setSearchName] = useState("");
  const [searchArr,setSearchArr] = useState([]);


  useEffect(() => {
      personService
        .getAll()
        .then(nwperson => setPersons(nwperson))
  },[]);


  const addName = (event) => {

        event.preventDefault();
        const namethere = (persons,newName) => {return (persons.find(
            (ele) => ele.name.toLowerCase()===newName.toLowerCase()));
        }
        const namethe = namethere(persons,newName);

        if (!namethe){
        const personObj = {name:newName,number:newNo};
        personService
                .create(personObj)
                .then(rtperson => {
                  setPersons(persons.concat(rtperson));
                  setNewName("");
                  setNewNo("");
                })
        }
        else if (window.confirm(`${newName} is already added to the phonebook,replace with a new one?`)) {
          const personObj = {...namethe,number:newNo};
          
          personService
                  .update(personObj,namethe.id)
                  .then(rtperson => {
                    setPersons(persons.map(person => person.id !== namethe.id ? person : rtperson));
                    setNewNo("");
                    setNewName("");
                  })
                  
        }
        else {
            setNewName("");
            setNewNo("")
        }

  }



  const handleNameChange = (event) => {
      setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
      setNewNo(event.target.value);
  }

  const handleSearch = (event) => {
        setSearchName(event.target.value);
        const reg = new RegExp(event.target.value,'i');
        setSearchArr(persons.filter(per =>  reg.test(per.name)));
       
  }

  const handleButtonClick = (event) => {
    const id = event.target.value;
    if (window.confirm(`Delete ${event.target.name}`)) {
    personService
          .remove(id);
    setPersons(persons.filter((person) => person.id !== Number(id)));
        }
      }

  const personsToShow = 
    searchName === ""
        ? persons
        : searchArr;

        return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
              searchName = {searchName}
              handleSearch = {handleSearch}
              />
      <h3>Add a new</h3>
      <PersonForm 
                  addName = {addName} 
                  handleNumberChange = {handleNumberChange}
                  handleNameChange = {handleNameChange}
                  newName = {newName}
                  newNo = {newNo}
                  />
      <h3>Numbers</h3>
      <Persons 
                personsToShow = {personsToShow}
                handleButtonClick = {handleButtonClick} 
                />

    </div>
  );
}


export default App;
