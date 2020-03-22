import React from "react";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;
