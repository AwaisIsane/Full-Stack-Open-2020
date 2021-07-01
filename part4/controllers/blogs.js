const blogsRouter = require("express").Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blobj = 'likes' in request.body ? {...request.body} : {...request.body,"likes":0}
    if (!blobj.title || !blobj.url)
    return response.status(400).json({ error: 'title or url is missing' })

    const blog = new Blog(blobj)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      
  })

  module.exports = blogsRouter