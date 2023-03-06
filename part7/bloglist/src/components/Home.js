import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialzeBlogs } from "../reducers/blogsReducer";
import AddBlog from "./AddBlog";
import Blog from "./Blog";
import Togglable from "./Togglabble";

const Home = () => {

    const blogFormRef = useRef();
    const dispatch = useDispatch();
  
    const user = useSelector((state) => state.user.username);
    const blogs = useSelector((state) => state.blogs);
  
    useEffect(() => {
      dispatch(initialzeBlogs());
    }, []);

    
    return (
        <div>
          <Togglable buttonLabel="addBlog" ref={blogFormRef}>
            <AddBlog toggleFrm={blogFormRef} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      );
}

export default Home;