import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import blogSrv from "../services/blogs";

const AddBlog = ({  setBlogs, blogsa, toggleFrm }) => {
  const [blogForm, setBlogForm] = useState({ title: "", author: "", url: "" });
  const dispatch = useDispatch()
  const addBlogEvent = async (event) => {
    event.preventDefault();
    try {
      const response = await blogSrv.postNew(blogForm);
      dispatch(setNotification({
        message: `a new Blog ${response.title} by ${response.author}`,
        class: "success",
      }));
      setBlogs([...blogsa, response]);
      toggleFrm.current.toggleVisibility();
    } catch (exception) {
      if (exception.response) {
        dispatch(setNotification({
          message: exception.response.data.error,
          class: "error",
        }))
      } else {
        dispatch(setNotification({ message: "fail", class: "error" }));
      }
    }
  };

  return (
    <div>
      <form onSubmit={addBlogEvent}>
        <div>
          title
          <input
            type="text"
            value={blogForm.title}
            name="title"
            onChange={({ target }) =>
              setBlogForm({ ...blogForm, title: target.value })
            }
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={blogForm.author}
            name="author"
            onChange={({ target }) =>
              setBlogForm({ ...blogForm, author: target.value })
            }
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={blogForm.url}
            name="url"
            onChange={({ target }) =>
              setBlogForm({ ...blogForm, url: target.value })
            }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default AddBlog;
