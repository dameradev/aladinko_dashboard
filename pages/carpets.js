import React from "react";
import CarpetsList from "../components/Carpet/CarpetsList";
import SingleCarpet from "../components/Carpet/SingleCarpet";

const Carpets = (props) => {
  console.log(props);
  return (
    <div>
      {props.query.id ? <SingleCarpet id={props.query.id} /> : <CarpetsList />}
    </div>
  );
};

export default Carpets;
