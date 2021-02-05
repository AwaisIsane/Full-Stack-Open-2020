import React, {useState , useEffect} from 'react';
import axios from 'axios';
import Showcountries from './components/Showcountries';


const  App = () => {

  const [countryTf , setCountryTf] = useState('');
  const [countries,setCountries] = useState([]);
  const [Toshow,setToShow] = useState([]);

  useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => setCountries(response.data));
         
  },[]);


  const handleSearch = (event) => {
        setCountryTf(event.target.value);

        const reg = new RegExp(event.target.value,'i');
        setToShow(countries.filter(per =>  reg.test(per.name)));
  }

  const CToShow = 
      countryTf === ""
      ? countries
      : Toshow;


  return (
    <div>
      <label>find countries</label>
      <input value={countryTf} onChange={handleSearch} /><br />
      <Showcountries Toshow = {CToShow} />
    </div>
  );
}

export default App;
