import React, { useState } from "react";
import loginServices from "../services/login";
import blogServices from "../services/blogs";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      onLogin(user);
      blogServices.setToken(user.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error("something went wrong", exception.message);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          username{" "}
          <input
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            type="text"
            name="Username"
            value={username}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            value={password}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
