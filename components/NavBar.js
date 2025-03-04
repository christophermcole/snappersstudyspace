"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
// Small logo "S" shows if taskbar not expanded
  return (
    <Taskbar
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={isExpanded ? "expanded" : ""}
    >
      <Logo>{isExpanded ? "Snapper’s Study Space" : "S"}</Logo>
      <NavLinks className={isExpanded ? "visible" : ""}>
        <StyledLink href="/Home">Home</StyledLink>
        <StyledLink href="/NotesPage">Notes</StyledLink>
        <StyledLink href="/spotify">Spotify</StyledLink>
        <StyledLink href="/Chat">Chat</StyledLink>
      </NavLinks>
    </Taskbar>
  );
};

const Taskbar = styled.nav`
  background: #1E2F23;
  color: #F9ECCC;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  transition: height 0.3s ease-in-out;
  height: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;

  &.expanded {
    height: 80px;
  }
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  transition: font-size 0.3s ease-in-out;

  ${Taskbar}:not(.expanded) & {
    font-size: 16px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.visible {
    opacity: 1;
  }
`;

const StyledLink = styled(Link)`
  color: #F9ECCC;
  text-decoration: none;
  padding: 10px 15px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;

export default NavBar;
