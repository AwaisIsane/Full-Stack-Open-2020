import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglabble";
import { initialzeBlogs } from "./reducers/blogsReducer";
import { logout, setUser } from "./reducers/userReducer";
import loginSrv from "./services/login";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.username);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const creds = loginSrv.getUserFromStorage();
    if (creds) dispatch(setUser(creds));
    dispatch(initialzeBlogs());
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
    <div>
      <h1>Blogs</h1>
      <Notification />
      <h2>
        youre logged in as {user} <button onClick={logoutUser}>Logout</button>
      </h2>
      <Togglable buttonLabel="addBlog" ref={blogFormRef}>
        <AddBlog toggleFrm={blogFormRef} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;
