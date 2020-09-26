import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import Nav from "../Nav";
import Logo from "../Logo";

const HeaderStyles = styled.header`
  border-bottom: 2px solid ${(props) => props.theme.blue};
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.08);
  height: 70px;
  .header {
    width: 1000px;
    height: inherit;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderStyles>
        <div className="header">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>

          <Nav />
        </div>
      </HeaderStyles>
    );
  }
}

export default Header;
