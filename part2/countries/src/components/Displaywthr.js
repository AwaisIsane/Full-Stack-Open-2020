import React from'react';

const Displaywthr = ({city,status}) => {

    if (status) {
        const image_link = `http://openweathermap.org/img/w/${city.weather[0].icon}.png`
    return (
    <>
    <h2>Weather in {city.name}</h2>
    <b>temperature:</b>{city.main.temp} Celsius<br />
    <img src={image_link} alt="weather" /><br />
    <b>wind:</b>{city.wind.speed}Knots degree {city.wind.deg}<br/>

    </>
);}
 
return <p>data not available for the city</p>
}

 export default Displaywthr;

