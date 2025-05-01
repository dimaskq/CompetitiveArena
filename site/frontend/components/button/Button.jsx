import React from "react";

function Button({ children, isActive = false, ...props }) {
  return (
    <button className="header-btn" {...props}>
      {children}
    </button>
  );
}

export default Button;
