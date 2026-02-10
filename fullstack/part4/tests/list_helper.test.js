const listHelper = require('../utils/list_helper')

const blogs = [
  { title: "A", author: "X", likes: 5 },
  { title: "B", author: "Y", likes: 10 },
  { title: "C", author: "X", likes: 7 }
]

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

test('total likes', () => {
  expect(listHelper.totalLikes(blogs)).toBe(22)
})

test('favorite blog', () => {
  expect(listHelper.favoriteBlog(blogs)).toEqual({
    title: "B",
    author: "Y",
    likes: 10
  })
})

test('most blogs', () => {
  expect(listHelper.mostBlogs(blogs)).toEqual({
    author: "X",
    blogs: 2
  })
})

test('most likes', () => {
  expect(listHelper.mostLikes(blogs)).toEqual({
    author: "X",
    likes: 12
  })
})
