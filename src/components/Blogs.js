import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import NewBlog from './NewBlog'
import Notification from './Notification'
import App from '../App'
import Togglable from './Togglable'
import Blog from './Blog'

const Blogs = ({ blogUser }) => {
  const [blogs, setBlogs] = useState([])
  const [isReturnToLogin, setIsReturnToLogin] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState({
    data: null,
    status: null,
  })
  const [refreshBlogs, setRefreshBlogs] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => {
        // sort blogs by likes in descending order
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      })
      .catch((error) => {
        console.error('something went wrong while fetching blogs', error)
      })
  }, [refreshBlogs])

  // return to *App* (the entry into blog app)
  if (isReturnToLogin) {
    return <App />
  }

  return (
    <div data-testid="blog-list">
      <h2>blogs</h2>
      <Notification
        message={notificationMessage.data}
        isError={notificationMessage.status >= 400 ? true : false}
      />
      <div>
        {blogUser.name} logged in{' '}
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedBlogAppUser')
            setIsReturnToLogin(true)
          }}
        >
          logout
        </button>{' '}
      </div>
      <Togglable defaultLabel="create new blog" cancelLabel="cancel">
        <NewBlog
          handleNewBlogPost={(newBlog) => {
            setBlogs(blogs.concat(newBlog))
          }}
          handleNotifier={(notificationMessage) => {
            setNotificationMessage(notificationMessage)
          }}
          blogPoster={blogUser}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={blogUser}
          handleRefresh={() => setRefreshBlogs(!refreshBlogs)}
        />
      ))}
    </div>
  )
}

export default Blogs
