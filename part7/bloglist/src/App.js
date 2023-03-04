import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglabble";
import { initialzeBlogs } from "./reducers/blogsReducer";

const App = () => {
  const [user, setUser] = useState("");
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const creds = JSON.parse(localStorage.getItem("creds"));
    if (creds) setUser(creds["username"]);
    dispatch(initialzeBlogs());
    // blogService.getAll().then((blgs) => setBlogs(blgs.sort(sortByLikes)));
  }, []);

  const logoutUser = () => {
    setUser("");
    localStorage.removeItem("creds");
  };

  if (user === "") {
    return (
      <div>
        <Login setUser={setUser} />
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
