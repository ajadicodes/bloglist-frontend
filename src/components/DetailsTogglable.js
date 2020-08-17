import React, { useState, useImperativeHandle } from "react";

const DetailsTogglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const showDetails = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return <div style={showDetails}>{props.children}</div>;
});
export default DetailsTogglable;
