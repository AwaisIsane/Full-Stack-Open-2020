import { useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { setNotification } from "../reducers/notificationReducer";
import { login } from "../reducers/userReducer";
import Notification from "./Notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogin =  (event) => {
    event.preventDefault();
    dispatch(login({ username, password }))
    .then(()=>navigate('/'))
    .catch((exception) => {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          class: "error",
        })
      );
    });
  };

  return (
    <div>
      <Notification />
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
  );
};

export default Login;
