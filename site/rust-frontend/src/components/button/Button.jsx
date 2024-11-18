import React from 'react';
// import classes from './Button.module.css';

function Button({ children, isActive = false, ...props }) {
  return (
    <button
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
