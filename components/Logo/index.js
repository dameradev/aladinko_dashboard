import React, { Component } from 'react'
import styled from 'styled-components'


const LogoStyles = styled.div`
  width: 60px;

  .logo {
    color: ${props => props.theme.blue};
    font-style: italic;
  }
  img {
    width: 100%;
  }
`;


export default class Logo extends Component {
  render() {
    return (
      <LogoStyles>
        <h1 className="logo">Projectu</h1>
        {/* <img src="../../static/logo.png" /> */}
      </LogoStyles>
    )
  }
}
