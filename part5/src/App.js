import { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const[user,setUser] = useState('')
  const [notifMessage,setNotifMessage] = useState({message:'',class:'error'})

  useEffect(() => {
    const creds = JSON.parse(localStorage.getItem('creds'))
    if (creds)setUser(creds['username']) 
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const logoutUser = () => {
    setUser('')
    localStorage.removeItem('creds');
  }

  if(user===''){
    return (
      <div>
        <Login setUser={setUser} />
      </div>
    )
  }
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notifMessage.message} setMessage={setNotifMessage} clss={notifMessage.class} />
      <h2>youre logged in as {user} <button onClick={logoutUser}>Logout</button></h2>
      <h2>AddBlog</h2>
      <AddBlog setNotificationMessage={setNotifMessage} setBlogs={setBlogs} blogsa={blogs}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
