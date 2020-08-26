import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

test('renders only blog title and author by default', () => {
  const blog = {
    title: 'sample title',
    author: 'John Doe',
    url: 'http://www.example.com',
    likes: 10,
    user: {
      username: 'fooBar',
    },
  }

  const component = render(<Blog blog={blog} user={blog.user} />)
  const titleAndAuthorDiv = component.container.querySelector('.titleAndAuthor')
  const detailsDiv = component.container.querySelector('.details')

  // component.debug()
  expect(titleAndAuthorDiv).toBeVisible()
  expect(detailsDiv).not.toBeVisible()

  console.log(prettyDOM(titleAndAuthorDiv))
})
