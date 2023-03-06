import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { addComment, likeBlog, removeBlog } from "../reducers/blogsReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const blogList = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user.username);
  const blog = blogList.find((blg) => blg.id === id);

  const [newComment, setNewComment] = useState("");

  const likePost = () => {
    const obj = { blogId: blog.id, likes: blog.likes + 1 };
    dispatch(likeBlog(obj)).catch((exception) => {
      exception.response
        ? dispatch(
            setNotification({
              message: exception.response.data.error,
              class: "error",
            })
          )
        : dispatch(
            setNotification({ message: "something went wrong", class: "error" })
          );
    });
  };

  const removeBlogF = () => {
    if (window.confirm("you want to delete blog")) {
      //   try {
      // const response = await blogSrv.deletePost(blog.id)
      dispatch(removeBlog(blog.id))
        .then(() => navigate("/"))
        .catch((exception) => {
          dispatch(
            setNotification({
              message: exception.response.data.error,
              class: "error",
            })
          );
        });
    }
  };

  const addCommentEvent = (event) => {
    event.preventDefault();
    dispatch(addComment({ id: blog.id, comment:newComment })).catch((exception) => {
      dispatch(
        setNotification({
          message: exception.response.data.error,
          class: "error",
        })
      );
    });
  };
  if(!blog) {
    return <>Wrong blog id</>;
  }
  return (
    <div className="blog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        Likes:{blog.likes}
        <button onClick={likePost}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user && (
        <div>
          <button onClick={removeBlogF}>remove</button>
        </div>
      )}
      <div>
        <h2>Comments</h2>
        <form onSubmit={addCommentEvent}>
          <div>
            <input
              type="text"
              value={newComment}
              name="comment"
              onChange={({ target }) => setNewComment(target.value)}
            />
            <button type="submit">add comment</button>
          </div>
        </form>
        {blog.comments.length === 0 ? (
          <span>no comments</span>
        ) : (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={`${index}${comment}`}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Blog;
