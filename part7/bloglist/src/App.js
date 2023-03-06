import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Route,Routes, BrowserRouter as Router  } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Notification from "./components/Notification";
import UsersView from "./components/UsersView";
import { logout, setUser } from "./reducers/userReducer";
import loginSrv from "./services/login";
;

const App = () => {

  
  const user = useSelector((state)=>state.user.username)
  const dispatch = useDispatch()

  useEffect(() => {
    const creds = loginSrv.getUserFromStorage();
    if (creds) dispatch(setUser(creds));
  }, []);

  const logoutUser = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div>
        <Login  />
      </div>
    );
  }
  return (
    <Router>
      <h1>Blogs</h1>
          <Notification />
          <h2>
            youre logged in as {user} <button onClick={logoutUser}>Logout</button>
          </h2>
   <Routes>
    <Route path="/login" element={<Login />}/>
    <Route path="/" element={<Home />} />
    <Route path="users" element={<UsersView />} />
   </Routes>
   </Router>
  );
};

export default App;
