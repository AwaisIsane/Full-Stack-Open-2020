import React from 'react';



const Person = ({name,no,handleButtonClick,id}) => (
    <>
    {name} {no}<button onClick={handleButtonClick} value={id}>delete</button><br />
    </>
    );

export default Person ;
