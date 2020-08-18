import React, { useState } from "react";
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);

  const hideNewBlogForm = { display: visible ? "none" : "" };
  const showNewBlogForm = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      {/* render when visibility is false */}
      <div style={hideNewBlogForm}>
        <button onClick={toggleVisibility}>{props.defaultLabel}</button>
      </div>
      {/* rendered when visibility is true */}
      <div style={showNewBlogForm}>
        {props.children}
        <button onClick={toggleVisibility}>{props.cancelLabel}</button>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  defaultLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired
}

export default Togglable;
