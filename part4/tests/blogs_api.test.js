const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

test('blogs have  id prop',async () => {
   const  res = await api.get('/api/blogs')
   expect(res.body[0].id).toBeDefined()
})
  
  afterAll(() => {
    mongoose.connection.close()
  })

test("length increase by 1 i",async () => {
    const iniBlogs = await api.get('/api/blogs')
    
    const blog = {
                    title: "Crypto is the future",
                    author: "Jacck",
                    url: "https://awaisisane.github.io",
                    likes: 3,
                }
    await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(iniBlogs.body.length + 1)
})

//likes continue
test("likes property missing defaults 0",async () => {
  
  const blog = {
                  title: "Crypto is gambling",
                  author: "me",
                  url: "https://awaisisane.github.io"
              }
  const res = await api.post('/api/blogs')
                       .send(blog)
                       .expect('Content-Type',/application\/json/)
                    
  

  expect(res.body.id).toBeDefined()
  expect(res.body.likes).toBe(0)
})

test("if title and url are missing",async () => {
  const blog = {
    author: "me",
    likes:3
}
const res = await api
                    .post('/api/blogs')
                    .send(blog)
                    .expect(400)
expect()
})