import { useState } from "react";
const useField = (type,defaultValue="") => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = () => {
        setValue(defaultValue)
    }

    return [{
      type,
      value,
      onChange,
    },reset]
  }

  export {useField}