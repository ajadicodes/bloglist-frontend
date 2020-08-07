import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import Login from "./Login";
import NewBlog from "./NewBlog";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

const Blogs = ({ name }) => {
  const [blogs, setBlogs] = useState([]);
  const [isReturnToLogin, setIsReturnToLogin] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        console.log("something went wrong while fetching blogs", error);
      });
  }, []);

  if (isReturnToLogin) {
    return <Login />;
  }

  return (
    <div>
      <h2>blogs</h2>
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
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
