import React  from 'react';

const PersonForm = (props) => (
<form onSubmit={props.addName}>
  <h1>add a new</h1>
        <div>
          <label>name:</label>
           <input value={props.newName} 
                       onChange={props.handleNameChange}
                        />
        </div>
        <div>
           <label>number:</label>
            <input 
                value={props.newNo} 
                onChange={props.handleNumberChange} 
                        /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
);

export default PersonForm;