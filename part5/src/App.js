import { useState, useEffect,useRef } from 'react'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglabble'
import blogService from './services/blogs'
import { sortByLikes } from './utils'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const[user,setUser] = useState('')
  const [notifMessage,setNotifMessage] = useState({ message:'',class:'error' })
  const blogFormRef = useRef()

  useEffect(() => {
    const creds = JSON.parse(localStorage.getItem('creds'))
    if (creds)setUser(creds['username'])
    blogService.getAll().then(blgs =>
      setBlogs( blgs.sort(sortByLikes) )
    )
  }, [])

  const logoutUser = () => {
    setUser('')
    localStorage.removeItem('creds')
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
      <Togglable buttonLabel='addBlog' ref={blogFormRef}>
        <AddBlog setNotificationMessage={setNotifMessage} setBlogs={setBlogs} blogsa={blogs} toggleFrm={blogFormRef}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>
      )}
    </div>
  )
}

export default App
