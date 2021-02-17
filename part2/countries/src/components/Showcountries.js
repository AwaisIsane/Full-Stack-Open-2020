import React , {useState} from 'react';
import Countrydata from './Countrydata';
import Countrys from './Countrys';

const Showcountries = ({Toshow}) => {
    if (Toshow.length > 10) {
      return (
      <>
      Too many matches,specify another filter
      </>
      );
    }

    else if (Toshow.length>1) {
      return (
        <>
        {Toshow.map(Cntry => <Countrys
        key={Cntry.name}
          Cntry={Cntry} />
        )}
        </>
      );
    }
    else if (Toshow.length===0) {
      return (<>no country check input</>);
    }

    else {
      
      return <Countrydata country={Toshow[0]} />
    }
}

export default Showcountries;
