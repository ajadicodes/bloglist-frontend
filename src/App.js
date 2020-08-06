import React, { useState } from "react";
import Blogs from "./components/Blogs";

import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (someUser) => {
    setUser(someUser);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <Blogs name={user.name} />;
};

export default App;
