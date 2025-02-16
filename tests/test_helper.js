const Blog = require('../models/blog')

initialBlogs = [
    {
      title: "HTML is easy",
      author: "Me",
      url: "https://www.w3schools.com/html/",
        likes: 10,
    
    
    },
    {
        title: "CSS is easy",
        author: "Not me",
        url: "https://www.w3schools.com/css/",
          likes: 20,
    }


]

nonExistingId = async () => { 
    const blog = new Blog({ title: 'willremovethissoon', author: 'Me', url: 'https://www.w3schools.com/html/', likes: 10 })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }

  blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  } 


module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }