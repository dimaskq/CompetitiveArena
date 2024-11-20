import React from 'react';
// import classes from './Button.module.css';

function Button({ children, isActive = false, ...props }) {
  return (
    <button className='header-btn'
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
