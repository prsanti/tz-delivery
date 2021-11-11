import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import TripList from "./TripList"

export default function History () {
  const [ trips, setTrips ] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get("http://localhost:3001/users/trips", { headers: { "x-access-token": token} })
      .then((res) => {
        console.log(res.data);
        setTrips(res.data);
      })
      .catch(err => console.log(err))
  },[]);

  return (
    <div>
      <h1>Trips History</h1>
      <div>
        <TripList trips={trips}/>
      </div>
    </div>
  )
}