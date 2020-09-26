import React from "react";

// import { useMutation } from "apollo-boost";
import { Query, useMutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Moment from "react-moment";
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
  query ALL_CARPETS {
    carpets {
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

  .grey {
    color: #828282;
  }

  .Ordered {
    color: blue;
  }
  .phone {
    a {
      color: blue;
      padding-left: 1rem;
    }
  }
`;

const CarpetListStyled = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
`;

const STATUS_LIST = ["Ordered", "Processing", "Delivered"];

const CarpetsList = () => {
  const [deleteCarpet] = useMutation(DELETE_CARPET);
  const [changeStatus] = useMutation(CHANGE_STATUS);
  return (
    <Query query={ALL_CARPETS}>
      {({ data, error, loading }) => {
        // console.log(data.carpets);
        console.log(data);

        // return <p>test</p>;
        return (
          <CarpetListStyled>
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
                      <h3>
                        <span className="grey">Ime Stranke: </span>
                        {customer}
                      </h3>
                    }
                    <h4 className="phone">
                      <span className="grey">Tel št:</span>

                      <a href={`tel:+386${phoneNumber}`}>+386{phoneNumber}</a>
                    </h4>
                    <h4>
                      <span className="grey">Naslov:</span> {address}
                    </h4>

                    <h4>
                      <span className="grey">Čas prevzema:</span> {pickupTime}
                    </h4>

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
                    <button onClick={() => deleteCarpet({ variables: { id } })}>
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
