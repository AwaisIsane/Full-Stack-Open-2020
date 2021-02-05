import React from 'react';
import Weather from './Weather'
const Countrydata = ({country}) => (
    
    <>
    <h1>{country.name}</h1>
    <p>capital {country.capital}<br/>
    population {country.population}</p>
    <h2>languages</h2>
    <ul>
      {country.languages.map(lan => <li key={lan.name}>{lan.name}</li>)}
    </ul>
    <img src={country.flag} alt={country.name} width="200" height="100"/>
    <Weather city = {country.capital} />
    </>
  );


export default Countrydata;
