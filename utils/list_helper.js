const dummy = (blogs) => {
    return(1)
  }
  


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }



 const favoriteBlog = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    return blogs.map(blog => ({'title': blog.title, 'author': blog.author, 'likes': blog.likes})).find(blog => blog.likes === mostLikes)
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }