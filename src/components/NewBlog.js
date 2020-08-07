import React, { useState } from "react";
import blogServices from "../services/blogs";

const NewBlog = ({ handleNewBlogPost, handleNotifier }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlogPost = {
        title,
        author,
        url,
      };
      const blogPosted = await blogServices.create(newBlogPost);
      handleNewBlogPost(blogPosted);
      handleNotifier(
        `a new blog '${blogPosted.title}' by ${blogPosted.author} added`
      );
    } catch (error) {
      handleNotifier(error.response);
      setTimeout(() => {
        handleNotifier({ data: null, status: null });
      }, 5000);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          title:{" "}
          <input
            name="Title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            name="Author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            name="Url"
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
