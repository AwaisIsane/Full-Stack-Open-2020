const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')


const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info("connected to mongo db")
  }
  )
  .catch((error) => {
    logger.error("error is ",error.message)
  })


app.use(cors())
app.use(express.json())

app.use('/api/blogs',blogsRouter)

module.exports = app