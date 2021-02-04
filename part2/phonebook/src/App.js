import React, { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from "./components/Filter";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) ;

  const [ newName, setNewName ] = useState('');
  const [ newNo, setNewNo] = useState("");
  const [searchName,setSearchName] = useState("");
  const [searchArr,setSearchArr] = useState([]);


  const addName = (event) => {

        event.preventDefault();
        const namethere = (persons,newName) => {return (persons.findIndex(
            (ele) => ele.name.toLowerCase()===newName.toLowerCase()));
        }


        if (namethere(persons,newName) === -1){
        const personObj = {name:newName,number:newNo};
        setPersons(persons.concat(personObj))
        setNewName("")
        setNewNo("")
        }
        else {
            window.alert(`${newName} is already added to phonebook`)
            setNewName("")
        }

  }



  const handleNameChange = (event) => {
      setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
      setNewNo(event.target.value)
  }

  const handleSearch = (event) => {
        setSearchName(event.target.value);
        const reg = new RegExp(event.target.value,'i');
        setSearchArr(persons.filter(per =>  reg.test(per.name)));
       
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
                />

    </div>
  )
}

export default App
