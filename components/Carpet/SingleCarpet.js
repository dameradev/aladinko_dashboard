import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const AutoplaySlider = withAutoplay(AwesomeSlider);

import CreateCarpet from "./CreateCarpet";

import Form from "../styles/Form";

export const SINGLE_CARPET_QUERY = gql`
  query SINGLE_CARPET_QUERY($id: ID!) {
    carpet(where: { id: $id }) {
      id
      customer
      images
      status
      phoneNumber
      address
      carpets {
        id
        measure
        pricePerMeter
      }

      pickupTime
    }
  }
`;

const SingleCarpetStyled = styled.div`
  padding: 1rem;
  & > p {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    span {
      max-width: 20rem;
    }
  }
  .address {
    span {
      color: blue;
    }
  }
  .phone-number {
    a {
      padding-left: 2rem;
      color: blue;
    }
  }
`;

const SingleCarpet = (props) => {
  const onAddressClick = (address) => {
    window.open("//" + "google.com/search?q=" + address, "_blank");
  };
  return (
    <Query query={SINGLE_CARPET_QUERY} variables={{ id: props.id }}>
      {({ data }) => {
        let newData = data ? data : {};
        const {
          carpet: { address, customer, phoneNumber, pickupTime, images } = {},
          carpet,
        } = newData;
        console.log(data);
        return (
          <SingleCarpetStyled>
            <h1>Ime: {customer}</h1>
            <p className="address" onClick={() => onAddressClick(address)}>
              Naslov: <span>{address}</span>
            </p>
            <p className="phone-number">
              Tel.št:
              <a href={`tel:+386${phoneNumber}`}>+386{phoneNumber}</a>
            </p>

            <p>
              Čas prevzema: <span>{pickupTime}</span>
            </p>
            {carpet && <CreateCarpet image carpet={carpet} />}

            <AutoplaySlider
              // animation="cubeAnimation"
              className="bg-video"
              interval={10000}
              play={false}
              cancelOnInteraction={false}
            >
              {images &&
                images.map((image) => {
                  return <div data-src={image} />;
                })}
            </AutoplaySlider>
          </SingleCarpetStyled>
        );
      }}
    </Query>
  );
};

export default SingleCarpet;
