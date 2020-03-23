import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
  min-height: 100vh;
}

body > div {
  min-height: 100vh;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  color: #073642;
  background-color: #fdf6e3;

  button {
    font-family: Roboto, mono;
    font-size: 1.2rem;
    overflow: wrap;
  }
}

`;

const LayoutContainer = styled.div`
  min-height: 100vh;
  margin: auto 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
