import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import NewBlog from "./NewBlog";
import Notification from "./Notification";
import App from "../App";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

const Blogs = ({ name }) => {
  const [blogs, setBlogs] = useState([]);
  const [isReturnToLogin, setIsReturnToLogin] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        console.log("something went wrong while fetching blogs", error);
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
        message={notificationMessage}
        isError={
          notificationMessage ===
          "something went wrong while trying to add blog"
            ? true
            : false
        }
      />
      <div>
        {name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            setIsReturnToLogin(true);
          }}
        >
          logout
        </button>{" "}
      </div>
      <NewBlog
        handleNewBlogPost={(newBlog) => {
          setBlogs(blogs.concat(newBlog));
        }}
        handleNotifier={(notificationMessage) => {
          setNotificationMessage(notificationMessage);
        }}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
