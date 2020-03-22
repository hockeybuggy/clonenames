import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
html, body, body > div {
  height: 100%;
}

body {
  margin: 0;

  font-family: Roboto, mono;
  font-size: 1.2rem;
  color: #073642;

  button {
    font-family: Roboto, mono;
    font-size: 1.2rem;
    overflow: wrap;
  }
}

`;

const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #fdf6e3;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
};

export default Layout;
