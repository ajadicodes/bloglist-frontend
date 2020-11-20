import React, { useState, useRef } from 'react'
import blogService from '../services/blogs'
import DetailsTogglable from './DetailsTogglable'

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
    <div style={blogStyle} className="blog" data-testid="the-blog">
      <div className="titleAndAuthor">
        {blogState.title} {blogState.author}{' '}
        <button onClick={toggleDetails}>
          {isDetailsVisible ? 'hide' : 'view'}
        </button>
      </div>
      <DetailsTogglable ref={detailsRef}>
        <div>{blogState.url}</div>
        <div>
          likes <span data-testid="like-value">{blogState.likes}</span>{' '}
          <button className="likeButton" onClick={onLikeClick}>
            like
          </button>
        </div>
        <div data-testid="blog-poster">
          {blogState.user ? blogState.user.name : 'N/A'}
        </div>
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
  )
}

export default Blog
