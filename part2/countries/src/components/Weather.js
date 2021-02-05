import  React,{useState , useEffect} from 'react';
import axios from 'axios';
import Displaywthr from './Displaywthr';

const Weather = ({city}) => {
    const [ctyweather,setCtyWeather] = useState({});
    const [wthrStatus,setWthrStaus] = useState(false);
    //dont ardcode here
    const API_key = process.env.REACT_APP_API_KEY || null;
    const  api_call = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_key}&units=metric`


    useEffect(() => {

            axios
                .get(api_call)
                .then(response => {
                    setCtyWeather(response.data);
                    setWthrStaus(true)})
                 //   .then(response =>
                  //  setWthrStaus(true))
                
                .catch(err => console.log("error",err));
        
                },[api_call])

                
    

    return(
    <>
    <Displaywthr  city={ctyweather} status = {wthrStatus}/>
    </>
    );
}

export default Weather;

