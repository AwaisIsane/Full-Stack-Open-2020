import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import Notification from "./Notification";

const Header = () => {
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate =useNavigate()
  
  const logoutUser = () => {
    dispatch(logout());
    navigate('/login')
  };

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <h2>
        youre logged in as {user} <button onClick={logoutUser}>Logout</button>
      </h2>
    </>
  );
};

export default Header;
