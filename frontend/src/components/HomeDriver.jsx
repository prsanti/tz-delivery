import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RequestList from "./RequestList";
import MapDriver from './Map_Driver';
import DriverSummary from './DriverSummary';
import Chat from "./Chat/Chat";

import './Chat/Chat.css'

export default function HomeDriver (props) {

  // Delcaring Variables for the map and page
  // travel moade variables
  const[travelMode, setTravelMode] = React.useState("WALKING");

  // Request variables
  const [requests, setRequests] = useState([]); 

  // Driver location variables
  const [driverlocation, setDriverlocation] = useState([]); 

  // Travel Distance variables
  const [travelTD, settravelTD] = useState({
    time: "0",
    distance: "0",
  })

  // Price
  const [price, setPrice] = useState("");

  // Start and End location
  const [startAddress, setstartAddress] = useState("");
  const [finishAddress, setfinishAddress] = useState("");
  
  // Coords
  const[origin, setOrigin] = useState({
    lat: null, 
    lng: null 
  });

  // Pick up coords
  const [pickup, setPickup] = useState({
    lat: null, 
    lng: null
  });
  
  // Destination coords
  const[destination, setDestination] = useState({
    lat: null, 
    lng: null
  });
  
  // Gets data from the backend for the users and trips
  useEffect(() => {
    const requestsAPI = "https://techknights-prototype-backend.herokuapp.com/trips/not-accepted"
    Axios.get(requestsAPI) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setRequests(res.data));
  },[])

  // useEffect(() => {
  //   const requestsAPI = "https://techknights-prototype-backend.herokuapp.com/users"
  //   Axios.get(requestsAPI) //would be /api/trips/requested to get trips that have the accepted===false
  //     .then(res => setDriverlocation(res.data));
  // },[])

  // Stores user data as cookies
  const token = localStorage.getItem("token");

  useEffect(() => {
    const requestsAPI = "https://techknights-prototype-backend.herokuapp.com/users/data"
    Axios.get(requestsAPI, { headers: { "x-access-token": token} }) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setDriverlocation(res.data));
  },[])


  return (
    <div id="home-driver">
      <div>
        <div className = "map">
          {/* Map component for the driver */}
          <MapDriver 
            driverlocation = {driverlocation}
            travelMode = {travelMode}
            setTravelMode = {setTravelMode}
            travelTD = {travelTD} settravelTD = {settravelTD}
            origin = {origin} setOrigin = {setOrigin} 
            pickup = {pickup}
            destination = {destination} setDestination = {setDestination}
            startAddress = {startAddress} setstartAddress = {setstartAddress}
            finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
          />
        </div>
        {/* Driver summary: price, distance */}
        <DriverSummary price = {price} travelMode = {travelMode} travelTD = {travelTD} settravelTD = {settravelTD}/>
        {/* Chat component */}
        <div id="chat">
          { props.chatSelected && 
            <Chat
              name={props.user.full_name}
              driver={props.user.driver}
              user={props.user}
            />
          }
        </div>
        {/* Request Cards */}
        <h2>Requests</h2>
        {/* Returns a list of available trips as cards */}
        <RequestList 
          driverlocation = {driverlocation}
          requests = {requests} 
          origin = {origin}
          pickup = {pickup}
          destination = {destination}
          setOrigin = {setOrigin} 
          setPickup = {setPickup}
          setDestination = {setDestination}
          setPrice = {setPrice}
          setChatSelected={props.setChatSelected}
          getAcceptedTrip={props.getAcceptedTrip}
        />
      </div>
    </div>
  )
}