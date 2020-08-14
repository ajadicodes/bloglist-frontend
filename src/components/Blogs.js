import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import NewBlog from "./NewBlog";
import Notification from "./Notification";
import App from "../App";
import Togglable from "./Togglable";

const Blog = ({ blog, user }) => {
  const [blogState, setBlogState] = useState(blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  console.log("++++ blog state", blogState);

  const onLikeClick = async () => {
    const blogUpdate = {
      ...blog,
      likes: blogState.likes + 1,
      user: blogState.user.id,
    };
    console.log("xxxxx before sending to the server", blogUpdate);
    const updatedBlog = await blogService.update(blog.id, blogUpdate);
    const blogToRender = {
      ...updatedBlog,
      likes: updatedBlog.likes,
      user: {
        id: blogState.user.id,
        name: user.name,
        username: user.username,
      },
    };
    setBlogState(blogToRender);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blogState.title} {blogState.author}
      </div>
      <div>
        <Togglable defaultLabel="view" cancelLabel="hide">
          <div>{blogState.url}</div>
          <div>
            likes {blogState.likes} <button onClick={onLikeClick}>like</button>
          </div>
          <div>{blogState.user ? blogState.user.name : "N/A"}</div>
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

  console.log("$$$$$ blogs:", blogs);

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
        <Blog key={blog.id} blog={blog} user={blogUser} />
      ))}
    </div>
  );
};

export default Blogs;
