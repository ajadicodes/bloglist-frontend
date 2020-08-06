import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

const Blogs = ({ name }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs))
      .catch((error) => {
        console.log("something went wrong while fetching blogs", error);
      });
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {name} logged in <button>logout</button>{" "}
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
