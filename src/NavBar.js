import React from "react";
import { Link } from "@reach/router";
import styled, { keyframes } from "react-emotion";
import colors from "./colors";

const Spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const SpyGlass = styled("span")`
  display: inline-block;
  animation: 1s ${Spin} linear;
`;

const Container = styled("header")`
  background-color: ${colors.primary};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = () => {
  return (
    <Container>
      <NavLink to="/">Sagacity</NavLink>
      <NavLink to="/search-params">
        <SpyGlass arial-label="search" role="img">
          Search
        </SpyGlass>
      </NavLink>
    </Container>
  );
};

export default NavBar;
