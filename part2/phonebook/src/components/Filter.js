import React from 'react';

const Filter = ({searchName,handleSearch}) =>  ( 
 <>
<label>filter shown with </label> 
<input 
        value={searchName} 
        onChange={handleSearch} 
                                />
</>
);

export default Filter;
