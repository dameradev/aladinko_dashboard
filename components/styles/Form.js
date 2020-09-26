import styled, { keyframes } from "styled-components";

import { respondTo } from "../../utils/respondTo";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.3rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${(props) => props.theme.colorPrimary};
    }
  }

  button {
    display: block;
  }
  button,
  input[type="submit"] {
    width: auto;
    background: #2194c0;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #2194c0 0%,
        #2090c0 50%,
        #2194b0 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }

  .carpet-details {
    width: 30%;
    margin-right: 1rem;
    display: inline-block;
    ${respondTo.tabletMini` 
      width: 100%;
      
    `}
    &__wrapper {
      display: flex;
      align-items: center;
      ${respondTo.tabletMini` 
      flex-direction: column
      
    `}
    }
  }
  .remove-carpet {
    display: inline-block;
    margin-bottom: 2rem;
    ${respondTo.tabletMini` 
      align-self: flex-start;
      
    `}
  }
`;

export default Form;
