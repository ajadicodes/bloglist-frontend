import React, { useState } from 'react'
import blogServices from '../services/blogs'

const NewBlog = ({ handleNewBlogPost, handleNotifier, blogPoster }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlogPost = {
        title,
        author,
        url,
      }

      const blogPosted = await blogServices.create(newBlogPost)

      handleNewBlogPost({
        ...blogPosted.data,
        user: {
          id: blogPosted.data.user,
          name: blogPoster.name,
          username: blogPoster.username,
        },
      })

      const notificationMessage = {
        data: `a new blog '${blogPosted.data.title}' by ${blogPosted.data.author} added`,
        status: blogPosted.status,
      }

      // reset fields
      setTitle('')
      setAuthor('')
      setUrl('')

      handleNotifier(notificationMessage)

      // reset notification message
      setTimeout(() => {
        handleNotifier({ data: null, status: null })
      }, 5000)
    } catch (error) {
      const notificationMessage = {
        data: error.response.data.error,
        status: error.response.status,
      }

      // reset fields
      setTitle('')
      setAuthor('')
      setUrl('')

      handleNotifier(notificationMessage)

      // reset notification message
      setTimeout(() => {
        handleNotifier({ data: null, status: null })
      }, 5000)
    }
  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit} data-cy="formElement">
        <div>
          title:{' '}
          <input
            className="titleInput"
            name="Title"
            data-testid="title-input"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            className="authorInput"
            name="Author"
            data-testid="author-input"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            className="urlInput"
            name="Url"
            data-testid="url-input"
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button data-testid="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
