import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { likeBlog, removeBlog } from "../reducers/blogsReducer";

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const dispatch = useDispatch();

  const likePost = async () => {
    try {
      const obj = { blogId: blog.id, likes: blog.likes + 1 };
      dispatch(likeBlog(obj))
    } catch (exception) {
      exception.response
        ? dispatch(setNotification({message:exception.response.data.error,class:"error"}))
        : dispatch(setNotification({message:"something went wrong",class:"error"}));
    }
  };

  const removeBlogF = async () => {
    if (window.confirm("you want to delete blog")) {
      try {
        // const response = await blogSrv.deletePost(blog.id)
        dispatch(removeBlog(blog.id))
      } catch (exception) {
        dispatch(setNotification({message:exception.response.data.error,class:"error"}));
      }
    }
  };

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  if (show) {
    return (
      <div className="blog">
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShow}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div>
          Likes:{blog.likes}
          <button onClick={likePost}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user && (
          <div>
            <button onClick={removeBlogF}>remove</button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleShow}>view</button>
    </div>
  );
};

export default Blog;
