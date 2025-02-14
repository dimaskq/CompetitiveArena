import React from "react";
import styled from "styled-components";
import TabsSection from "./TabSections";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #effffa;
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

const Menu = ({ open, activeTab, setActiveTab }) => {
  return (
    <StyledMenu open={open}>
      <TabsSection
        active={activeTab}
        onChange={(current) => setActiveTab(current)}
      />
    </StyledMenu>
  );
};

export default Menu;
