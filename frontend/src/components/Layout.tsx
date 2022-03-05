import React from "react";
// tslint:disable-next-line: no-submodule-imports
import styled, { css } from "styled-components/macro";
import { Logo } from "./Logo";

export const MaxWidthCSS = css`
  max-width: ${(props) => props.theme.sizes.maxWidth};
  margin: auto;
`;
const Header = styled.header`
  height: ${(props) => props.theme.sizes.headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const Main = styled.main`
  min-height: calc(
    100vh - ${(props) => props.theme.sizes.headerHeight} -
      ${(props) => props.theme.sizes.footerHeight}
  );
  padding: 0 25px;
  ${MaxWidthCSS}
`;

const Footer = styled.footer`
  height: ${(props) => props.theme.sizes.footerHeight};
  padding: 0 25px;
  ${MaxWidthCSS};
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Main>{children}</Main>
      <Footer>© 2021 Andreas Kraus</Footer>
    </>
  );
};
