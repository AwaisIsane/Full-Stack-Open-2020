const blogsRouter = require("express").Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (req, res) => {
    const result = await Blog
                        .find({})
      
        res.json(result)
      
  })
  
  blogsRouter.post('/', async (req, res) => {
    const blobj = 'likes' in req.body ? {...req.body} : {...req.body,"likes":0}
    if (!blobj.title || !blobj.url)
    return res.status(400).json({ error: 'title or url is missing' })

    const blog = new Blog(blobj)
  
    const result = await blog.save()
    res.status(201).json(result)
      
      
  })
  blogsRouter.put("/:id", async (req,res) => {
    const body = req.body

    const blog = {
      likes:body.likes
    }

   const updatedBlog = await  Blog.findByIdAndUpdate(req.params.id , blog,{new:true})

   if (updatedBlog) {
     res.status(200).json(updatedBlog.toJSON())
    } else {
      res.status(404).end()
    }
  })

  blogsRouter.delete("/:id", async (req,res,) => {

    const result = await Blog.findByIdAndRemove(req.params.id);
    
    res.status(204).end();
      
      
  });

  module.exports = blogsRouter