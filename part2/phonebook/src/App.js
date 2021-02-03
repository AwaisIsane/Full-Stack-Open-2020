import React, { useState } from 'react'


const Phonebookentry = ({name,no}) => <p>{name} {no}</p>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      number: "040-1234567"}
  ]) ;

  const [ newName, setNewName ] = useState('');
  const [ newNo, setNewNo] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
           number: <input value={newNo} onChange={handleNumberChange} /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Phonebookentry name={person.name} no={person.number} key={person.name}/>)}    

    </div>
  )
}

export default App
