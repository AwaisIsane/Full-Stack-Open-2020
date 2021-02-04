import React, { useState,useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from "./components/Filter";
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNo, setNewNo] = useState("");
  const [searchName,setSearchName] = useState("");
  const [searchArr,setSearchArr] = useState([]);


  useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => setPersons(response.data))


  },[]);


  const addName = (event) => {

        event.preventDefault();
        const namethere = (persons,newName) => {return (persons.findIndex(
            (ele) => ele.name.toLowerCase()===newName.toLowerCase()));
        }


        if (namethere(persons,newName) === -1){
        const personObj = {name:newName,number:newNo};
        setPersons(persons.concat(personObj));
        setNewName("");
        setNewNo("");
        }
        else {
            window.alert(`${newName} is already added to phonebook`);
            setNewName("");
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
  );
}

export default App;
