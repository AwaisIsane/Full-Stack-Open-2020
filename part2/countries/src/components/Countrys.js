import React, {useState}  from "react"
import Countrydata from './Countrydata'


const Countrys = ({Cntry}) => {
    const [show,setShow] = useState(false);
    
    const handleButtonClk = (event) => {
        event.preventDefault();
        setShow(!show)
    }
    if (show) {
        return (<>
            <label>{Cntry.name}</label>
            <button onClick={handleButtonClk}>hide</button>
            <Countrydata country={Cntry} /><br/>
                </>)
    }
    else {
        return (<>
    <label>{Cntry.name}</label>
    <button onClick={handleButtonClk}>show</button><br/>
        </>)
    }
}

export default Countrys;
