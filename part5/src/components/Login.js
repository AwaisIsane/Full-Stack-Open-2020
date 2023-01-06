import { useState, useEffect } from 'react'
import loginSrv from '../services/login'
import Notification from './Notification'

const Login = ({setUser}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [error,setError] = useState('')
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
        const loggedIn = await loginSrv.login({username,password})
        console.log(loggedIn)
        setUser(username)
        }
        catch (exception){
            setError(exception.response.data.error)

        }
    
  }


return (
    <div>
     <Notification message={error} clss={"error"} setMessage={setError}/>
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  </div>
        )
}
  
  export default Login