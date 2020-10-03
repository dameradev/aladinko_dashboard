import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Query, useMutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Moment from "react-moment";

import { respondTo } from "../../utils/respondTo";
// import { deleteCarpet } from "../../../backend/src/resolvers/Mutation";

const DELETE_CARPET = gql`
  mutation DELETE_CARPET($id: String) {
    deleteCarpet(id: $id) {
      id
    }
  }
`;

const CHANGE_STATUS = gql`
  mutation CHANGE_STATUS($id: String, $status: String) {
    changeStatus(id: $id, status: $status) {
      id
    }
  }
`;

const ALL_CARPETS = gql`
  query ALL_CARPETS($status: String) {
    carpets(status: $status) {
      id
      customer
      date_add
      date_delivery
      images
      status
      phoneNumber
      address
      pickupTime
      carpets {
        measure
        pricePerMeter
        totalPrice
      }
      totalPrice
    }
  }
`;

const CarpetCard = styled.article`
  padding: 2rem;
  color: #2c2c2c;
  box-shadow: ${(props) => props.theme.bs};
  display: flex;
  flex-direction: column;

  &:first-of-type {
    margin-top: 5rem;
  }
  ${respondTo.tabletMini` 
    
    box-shadow:none;
    border-bottom: 5px solid black;
    width: 100vw;
    
  `}

  & > p {
    border-bottom: 1px solid grey;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
  }

  .pickup-time {
    text-align: right;
  }
  .grey {
    color: #303030;
    /* font-style: italic; */
    font-weight: 100;
    margin-right: 1rem;
  }

  .blue {
    color: blue;
    padding-left: 2rem;
  }

  .phone {
    a {
      color: blue;
      padding-left: 1rem;
    }
  }
  .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    select {
      padding: 1rem;
      font-size: 1.6rem;
    }
    .Ordered {
      color: green;
    }
    .Delivered {
      color: red;
    }
  }
  .delete {
    margin-top: 5rem;
    border: 1px solid black;
    padding: 1rem;
    background: none;
    font-size: 1.6rem;
    align-self: flex-start;
  }
`;

const CarpetListStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  grid-gap: 2rem;
  ${respondTo.tabletMini` 
      grid-gap:1rem;
      width: 100%;
  `}

  .settings {
    padding: 2rem;
    position: fixed;
    background: #cecece;
    width: 100vw;

    &__scroll-top {
      top: 0;
    }
    select {
      padding: 1rem;
      font-size: 1.8rem;
    }
  }
`;

const STATUS_LIST = ["Ordered", "Processing", "Delivered"];

const CarpetsList = () => {
  const [deleteCarpet] = useMutation(DELETE_CARPET);
  const [changeStatus] = useMutation(CHANGE_STATUS);

  const [queryStatus, changeQueryStatus] = useState("Ordered");
  const [scrollTopSetting, setScrollTopSetting] = useState(false);

  const listenScrollEvent = () => {
    window.pageYOffset > 0
      ? setScrollTopSetting(true)
      : setScrollTopSetting(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => listenScrollEvent());
  });

  const onAddressClick = (address) => {
    window.open("//" + "google.com/search?q=" + address, "_blank");
  };
  return (
    <Query query={ALL_CARPETS} variables={{ status: queryStatus }}>
      {({ data, error, loading, refetch }) => {
        // console.log(data.carpets);
        console.log(data);

        // return <p>test</p>;
        return (
          <CarpetListStyled>
            <div
              className={`settings ${
                scrollTopSetting && "settings__scroll-top"
              }`}
            >
              <select
                onChange={
                  (e) => {
                    // cons;
                    changeQueryStatus(e.target.value);
                    refetch({ variables: { status: queryStatus } });
                    // document.location.reload();
                  }
                  // console.log()
                }
              >
                {STATUS_LIST.map((statusItem) => {
                  return (
                    <option
                      value={statusItem}
                      // selected={status === statusItem ? true : false}
                    >
                      {statusItem}
                    </option>
                  );
                })}
              </select>
            </div>
            {data?.carpets.map(
              ({
                id,
                address,
                customer,
                date_add,
                date_delivery,
                phoneNumber,
                status,
                pickupTime,
                carpets,
                totalPrice,
              }) => {
                return (
                  <CarpetCard key={id}>
                    {
                      <p>
                        <span className="grey">Ime Stranke: </span>
                        <Link href={{ pathname: "/carpets", query: { id } }}>
                          <a className="blue">{customer}</a>
                        </Link>
                      </p>
                    }
                    <p className="phone">
                      <span className="grey">Tel št:</span>

                      <a href={`tel:+386${phoneNumber}`}>+386{phoneNumber}</a>
                    </p>
                    <p onClick={() => onAddressClick(address)}>
                      <span className="grey">Naslov:</span>
                      <span className="blue">{address}</span>
                    </p>

                    <p>
                      <span className="grey">Čas prevzema:</span>{" "}
                      <span className="pickup-time">{pickupTime}</span>
                    </p>

                    <p>
                      <span className="grey">Data naročila: </span>
                      <Moment date={date_add} format="DD/MM/YYYY HH:mm" />
                    </p>
                    <p>
                      <span className="grey">Data dostave: </span>
                      <Moment date={date_delivery} format="DD/MM/YYYY HH:mm" />
                    </p>

                    <div className="status">
                      <span className="grey">Status: </span>
                      <span className={status}>
                        {status === "Ordered"
                          ? "Naročeno"
                          : status === "Processing"
                          ? "V delavnico"
                          : status === "Delivered"
                          ? "Končano"
                          : null}
                      </span>
                      <select
                        onChange={
                          (e) => {
                            changeStatus({
                              variables: { id, status: e.target.value },
                            });
                            document.location.reload();
                          }
                          // console.log()
                        }
                      >
                        {STATUS_LIST.map((statusItem) => {
                          return (
                            <option
                              value={statusItem}
                              selected={status === statusItem ? true : false}
                            >
                              {statusItem}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* <Mutation mutation={deleteCarpet} variables={{ id: id }}> */}
                    <button
                      className="delete"
                      onClick={() => deleteCarpet({ variables: { id } })}
                    >
                      Pobriši
                    </button>
                    {/* </Mutation> */}
                  </CarpetCard>
                );
              }
            )}
          </CarpetListStyled>
        );
      }}
    </Query>
  );
};

export default CarpetsList;
