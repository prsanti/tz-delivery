import {useState, Fragment} from 'react';
import Map from './Map';
import UserSummary from './UserSummary';

import Chat from "./Chat/Chat";

import './Chat/Chat.css';

export default function Home(props) {
  // changes to true, when the driver accepts the request
  const [travelTD, settravelTD] = useState({
    time: "0",
    distance: "0",
  })
  // Coords
  const[origin, setOrigin] = useState({lat:null, lng:null});
  const[destination, setDestination] = useState({lat:null, lng:null});

  // Formated Addresses
  const [startAddress, setstartAddress] = useState("");
  const [finishAddress, setfinishAddress] = useState("");

  

  console.log("USER INFO:", props.user)
  console.log("USER NAME:", props.user.full_name)
  return (
    <Fragment>
      {/* Displays Google Maps */}
      {/* Shows Start and End Location on the Map */}
      <div className = "map">
        <Map 
          travelTD = {travelTD} settravelTD = {settravelTD} 
          origin = {origin} setOrigin = {setOrigin} 
          destination = {destination} setDestination = {setDestination}
          startAddress = {startAddress} setstartAddress = {setstartAddress}
          finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
        />
      </div>
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
        {/* User Summary Component */}
        {/* Shows Price and Distance to the receiver */}
        <UserSummary 
          travelTD = {travelTD} settravelTD = {settravelTD}
          origin = {origin} setOrigin = {setOrigin} 
          destination = {destination} setDestination = {setDestination}
          startAddress = {startAddress} 
          finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
        />
    </Fragment>

  )
}