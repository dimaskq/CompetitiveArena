import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button`
  position: absolute;
  top: 30%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: #EFFFFA;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: absolute;
    transform-origin: center;
  }

  div:first-child {
    transform: ${({ open }) => (open ? "rotate(45deg) translate(5px, 5px)" : "rotate(0)")};
  }

  div:nth-child(2) {
    opacity: ${({ open }) => (open ? "0" : "1")};
  }

  div:nth-child(3) {
    transform: ${({ open }) => (open ? "rotate(-45deg) translate(5px, -5px)" : "rotate(0)")};
  }
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
