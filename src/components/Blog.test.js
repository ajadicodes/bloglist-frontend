import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './NewBlog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'sample title',
      author: 'John Doe',
      url: 'http://www.example.com',
      likes: 10,
      user: {
        username: 'fooBar',
      },
    }

    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={blog.user} handleLikeClick={mockHandler} />
    )
  })

  test('renders only blog title and author by default', () => {
    const titleAndAuthorDiv = component.container.querySelector(
      '.titleAndAuthor'
    )
    const detailsDiv = component.container.querySelector('.details')

    expect(titleAndAuthorDiv).toBeVisible()
    expect(detailsDiv).not.toBeVisible()
  })

  test('also renders details when view button is clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const titleAndAuthorDiv = component.container.querySelector(
      '.titleAndAuthor'
    )
    const detailsDiv = component.container.querySelector('.details')

    // component.debug()
    expect(titleAndAuthorDiv).toBeVisible()
    expect(detailsDiv).toBeVisible()
  })

  // test('event handler received as props is called twice when like button is clicked twice', () => {
  //   // click button twice
  //   const likeButton = component.container.querySelector('.likeButton')
  //   fireEvent.click(likeButton)
  //   fireEvent.click(likeButton)

  //   expect(mockHandler.mock.calls).toHaveLength(2)
  // })
})

test('<NewBlog />', () => {
  const blogPoster = {
    name: 'SR2',
    username: 'superroot2',
  }

  const component = render(<NewBlog blogPoster={blogPoster} />)

  const titleInput = component.container.querySelector('.titleInput')
  const authorInput = component.container.querySelector('.authorInput')
  const urlInput = component.container.querySelector('.urlInput')

  fireEvent.change(titleInput, {
    target: { value: 'new blog found' },
  })

  fireEvent.change(authorInput, {
    target: { value: 'Jack Finto' },
  })

  fireEvent.change(urlInput, {
    target: { value: 'http://www.newblog.com' },
  })

  const form = component.container.querySelector('form')
  expect(form).toHaveFormValues({
    Title: 'new blog found',
    Author: 'Jack Finto',
    Url: 'http://www.newblog.com',
  })
})
