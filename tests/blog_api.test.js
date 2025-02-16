const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog  = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { url } = require('inspector')
const helper = require('./test_helper')
const { promiseHooks } = require('node:v8')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })


test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  


describe(' HTTP POST tests', () => {
  test('4.10 - HTTP POST test', async () => {
    const newBlog = {
      title: "React is easy",
      author: "Me",
      url: "https://www.w3schools.com/react/",
        likes: 30
    }    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes("React is easy"))
 })

 test('4.14 - HTTP PUT test', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
        likes: blogToUpdate.likes+100
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtStart.reduce((sum, blog) => blog.likes + sum, 0) + 100, blogsAtEnd.reduce((sum, blog) => blog.likes + sum, 0))
    assert.strictEqual(blogsAtEnd.length,helper.initialBlogs.length)
 })
})
    
describe(' HTTP GET tests', () => {
  test('4.8 - HTTP GET test', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('4.9 - id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert(blog.id)
    })
  })
})


describe(' HTTP DELETE tests', () => {
    test(' 4.13 - HTTP DELETE test', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    
        const titles = blogsAtEnd.map(r => r.title)
    
        assert(!titles.includes(blogToDelete.title))
      


    })


})

  after(async () => {
    await mongoose.connection.close()
  })