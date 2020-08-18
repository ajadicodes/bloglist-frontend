import React, { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import NewBlog from './NewBlog'
import Notification from './Notification'
import App from '../App'
import DetailsTogglable from './DetailsTogglable'
import Togglable from './Togglable'

const Blog = ({ blog, user, handleRefresh }) => {
  const [blogState, setBlogState] = useState(blog)
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const detailsRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const onLikeClick = async () => {
    const blogUpdate = {
      ...blog,
      likes: blogState.likes + 1,
      user: blogState.user.id,
    }

    const updatedBlog = await blogService.update(blog.id, blogUpdate)
    const blogToRender = {
      ...updatedBlog,
      likes: updatedBlog.likes,
      user: {
        id: blogState.user.id,
        name: blogState.user.name,
        username: blogState.user.username,
      },
    }
    setBlogState(blogToRender)
  }

  const toggleDetails = () => {
    detailsRef.current.toggleVisibility()
    setIsDetailsVisible(!isDetailsVisible)
  }

  const onRemoveClick = async (title, author) => {
    if (
      window.confirm(`Do you really want to remove blog ${title} by ${author}?`)
    ) {
      await blogService.remove(blogState.id)
      handleRefresh()
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blogState.title} {blogState.author}{' '}
        <button onClick={toggleDetails}>
          {isDetailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      <div>
        <DetailsTogglable ref={detailsRef}>
          <div>{blogState.url}</div>
          <div>
            likes {blogState.likes} <button onClick={onLikeClick}>like</button>
          </div>
          <div>{blogState.user ? blogState.user.name : 'N/A'}</div>
          <div>
            {blogState.user && blogState.user.username === user.username ? (
              <button
                onClick={() => onRemoveClick(blogState.title, blogState.author)}
              >
                remove
              </button>
            ) : null}
          </div>
        </DetailsTogglable>
      </div>
    </div>
  )
}

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
        // sort blogs by likes in ascending order
        setBlogs(blogs.sort((a, b) => a.likes - b.likes))
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
    <div>
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
