import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import blogServices from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (someUser) => {
    setUser(someUser);
  };

  // check if user is locally saved
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <Blogs name={user.name} />;
};

export default App;
