import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import NewBlog from "./NewBlog";
import Notification from "./Notification";
import App from "../App";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div>
        <Togglable defaultLabel="view" cancelLabel="hide">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button>like</button>
          </div>
          <div>{blog.user ? blog.user.name : ""}</div>
        </Togglable>
      </div>
    </div>
  );
};

const Blogs = ({ blogUser }) => {
  const [blogs, setBlogs] = useState([]);
  const [isReturnToLogin, setIsReturnToLogin] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    data: null,
    status: null,
  });

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        console.error("something went wrong while fetching blogs", error);
      });
  }, []);

  // return to *App* (the entry into blog app)
  if (isReturnToLogin) {
    return <App />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage.data}
        isError={notificationMessage.status >= 400 ? true : false}
      />
      <div>
        {blogUser.name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            setIsReturnToLogin(true);
          }}
        >
          logout
        </button>{" "}
      </div>
      <Togglable defaultLabel="create new blog" cancelLabel="cancel">
        <NewBlog
          handleNewBlogPost={(newBlog) => {
            setBlogs(blogs.concat(newBlog));
          }}
          handleNotifier={(notificationMessage) => {
            setNotificationMessage(notificationMessage);
          }}
          blogPoster={blogUser}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
