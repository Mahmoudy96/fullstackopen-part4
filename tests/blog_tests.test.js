const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b524576234d17f8',
      title: 'abcd',
      author: 'barack obama',
      url: 'https://edu.gov/abcd.pdf',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa74744a676234d17f8',
      title: 'Hmmm',
      author: 'Meow bin Meow',
      url: 'https://meow.m.w/tuna.pdf',
      likes: 8,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)

  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 25)
  })




})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b524576234d17f8',
      title: 'abcd',
      author: 'barack obama',
      url: 'https://edu.gov/abcd.pdf',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422aa74744a676234d17f8',
      title: 'Hmmm',
      author: 'Meow bin Meow',
      url: 'https://meow.m.w/tuna.pdf',
      likes: 8,
      __v: 0
    }
  ]

test('favorite of empty list is empty', () => { 
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result,undefined)

})

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(blogList)
    assert.deepStrictEqual(result, {
      title: 'abcd', author: 'barack obama', likes: 12,
    })
  })



})