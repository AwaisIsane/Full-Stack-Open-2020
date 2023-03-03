import { useState } from 'react'
import blogSrv from '../services/blogs'
import Notification from './Notification'
import {  sortByLikes } from '../utils'

const Blog = ({ blog,setBlogs,blogs,user }) => {
  const [show,setShow] = useState(false)
  const [nMessage,setNMessage] = useState('')
  const toggleShow = () => setShow(!show)

  const likePost = async () => {
    try{
      const obj = { id:blog.id,likes:blog.likes+1 }
      const response = await blogSrv.likePost(obj)
      const blg = blogs.map(bl => bl.id === blog.id ?{ ...bl,likes:response.likes }:bl)
      blg.sort(sortByLikes)
      setBlogs(blg)}
    catch (exception) {
      exception.response?setNMessage(exception.response.data.error):setNMessage('something went wrong')
    }
  }

  const removeBlog = async () => {
    if(window.confirm('you want to delete blog')) {
      try{
        // const response = await blogSrv.deletePost(blog.id)
        await blogSrv.deletePost(blog.id)
        const blg = blogs.filter(bl => bl.id!==blog.id)
        setBlogs(blg)
      }
      catch (exception) {
        setNMessage(exception.response.data.error)
      }}
  }

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5
  // }

  if(show) {
    return (
      <div className='blog'>
        <div>
          <Notification message={nMessage} setMessage={setNMessage} clss='error'/>
          {blog.title} {blog.author}
          <button onClick={toggleShow}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
        Likes:{blog.likes}
          <button onClick={likePost}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.username===user&&
      <div>
        <button onClick={removeBlog}>remove</button>
      </div>}
      </div>
    )
  }
  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>view</button>
    </div>
  )}

export default Blog