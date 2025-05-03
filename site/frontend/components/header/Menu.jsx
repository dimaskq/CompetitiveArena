import React from "react";
import styled from "styled-components";
import TabsSection from "./TabSections";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgb(42, 42, 42);
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Menu = ({ open, activeTab, setActiveTab, setOpen }) => {
  return (
    <StyledMenu open={open}>
      <TabsSection
        active={activeTab}
        onChange={(current) => {
          setActiveTab(current);
          setOpen(false);
        }}
      />
    </StyledMenu>
  );
};

export default Menu;
