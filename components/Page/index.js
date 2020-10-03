import React, { Component } from "react";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  css,
} from "styled-components";
import Meta from "../Meta";
import Header from "../Header";
import { respondTo } from "../../utils/respondTo";

const theme = {
  colorPrimary: "#2090c0",
  black: "#393939",
  grey: "#3A3A3A",
  blue: "#659DBD",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "90%",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};

  ${respondTo.tabletMini` 
    
      max-width: 100%;
  `}/* margin: 0 auto; */
  /* padding: 2rem; */
`;

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
    
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'roboto';
    scroll-behavior: smooth;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
export default Page;
