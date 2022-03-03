
import {useState} from "react";

import './Pricebar.scss';
import "./UserSummary.scss";

export default function DriverSummary(props) {

  const {travelMode, travelTD, price} = props;

  return (
    <article className = "driverSummary">
      {/* Receiver Page */}
      {/* Returns distance from start to end location and returns the price*/}
      <h3> Distance from current location to user: {travelTD.distance} ({travelTD.time}) </h3>
      <h4> Price : ${price} </h4> 
    </article>
  )
}