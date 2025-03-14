import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button`
  position: fixed;
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
`;

const StyledBurgerLine = styled.div`
  width: 2rem;
  height: 0.25rem;
  background: #effffa;
  border-radius: 10px;
  transition: all 0.3s linear;
  transform-origin: 1px;

  ${({ open }) =>
    open &&
    `
    &:first-child {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    &:nth-child(2) {
      opacity: 0;
      transform: translateX(20px);
    }

    &:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

const Burger = ({ open, setOpen }) => {
  return (
    <StyledBurger onClick={() => setOpen((prev) => !prev)}>
      <StyledBurgerLine open={open} />
      <StyledBurgerLine open={open} />
      <StyledBurgerLine open={open} />
    </StyledBurger>
  );
};

export default Burger;
