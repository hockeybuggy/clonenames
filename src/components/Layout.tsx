import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const breakPointSmall = "400px";
const breakPointMedium = "600px";
const GlobalStyle = createGlobalStyle`
html {
  font-size: 12px;
}

@media (min-width: ${breakPointSmall}) {
  html {
    font-size: 16px;
  }
}

@media (min-width: ${breakPointMedium}) {
  html {
    font-size: 20px;
  }
}

body {
  min-height: 100vh;
}

body > div {
  min-height: 100vh;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  color: #073642;
  background-color: #fdf6e3;

  button {
    font-family: Roboto, mono;
    font-weight: 400;
  }

  @media (min-width: ${breakPointMedium}) {
    button {
      font-size: 1.0rem;
    }
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
