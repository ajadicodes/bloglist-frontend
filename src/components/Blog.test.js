import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  let component

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

    component = render(<Blog blog={blog} user={blog.user} />)
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
})
