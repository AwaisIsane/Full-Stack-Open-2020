import  { useEffect} from 'react';

const Notification = ({ message,setMessage,clss,time=5000 }) => {

  useEffect(()=>{
    if(message!=='') setTimeout(()=>setMessage(''),time)
  },[message])

  

  if (message === "" ) {
    return null
  }

    
  return (
    <div className={clss}>
      {message}
    </div>
  )
}

  export default Notification;