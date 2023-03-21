import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [login,result] = useMutation(LOGIN, {
    onError: (error) => {
        const errors = error.graphQLErrors[0].message
        alert(errors)
      }
  });
  

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      localStorage.setItem('user-token', token)
      props.setToken(token)
      props.setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

};

export default Login;