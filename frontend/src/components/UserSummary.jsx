import {Fragment, useState, useEffect, useCallback, useRef} from "react";
import { Redirect } from "react-router-dom";
import Axios from 'axios';

import * as FaIcons from 'react-icons/fa';
import './Pricebar.scss';
import "./UserSummary.scss";

import Button from './Button';
import { Spinner, Alert } from 'react-bootstrap';

export default function UserSummary(props) {

  const {travelTD, origin, destination, startAddress, finishAddress} = props;

  const [priceMenu, setpriceMenu] = useState(false);
  const [price, setPrice] = useState(0);
  const [waiting, setWaiting]  = useState(false);
  const [ newTrip, setNewTrip ] = useState({
    customer_id: null,
    driver_id: null,
    start_address: startAddress,
    end_address: finishAddress,
    start_location_lat: origin.lat,
    start_location_lon: origin.lng,
    end_location_lat: destination.lat,
    end_location_lon: destination.lng,
    accepted: false,
    payment_amount: price,
    payment_status: false,
    created_at: Date.now(),
    ended_at: null
  })
  const [loadedOnce, setloadedOnce] = useState(false);
  const [loadCancel, setloadCancel] = useState(false);
  const [toggle, setToggle] = useState(false);
 

  const distanceInNumber = Math.round(parseFloat(travelTD.distance.replace("km", "")))
  const priceRange = [];

  const priceRangeGenerator = distanceInNumber => {
    const medianPrice = Math.round((distanceInNumber * 3 ));
    // const medianPrice = Math.round(15);

    priceRange.push({price: medianPrice})
    priceRange.push({price: medianPrice + medianPrice*0.05})
    priceRange.push({price: medianPrice + medianPrice*0.15})
    priceRange.push({price: medianPrice + medianPrice*0.25})
    priceRange.push({price: medianPrice + medianPrice*0.35})
    priceRange.push({price: medianPrice + medianPrice*0.45})

    return priceRange
  }

  const PriceRange = priceRangeGenerator(distanceInNumber)
 
  let range = {};
  const getPriceRange = PriceRange => {
    const lowest = PriceRange[0];
    const highest = PriceRange[PriceRange.length - 1];
    range = {
      lowest,
      highest
    }
    return range
  }

  getPriceRange(PriceRange)

  const listofPrice = PriceRange.map( (item, index) => {
    return <li key = {index} 
              className = "priceItem"
              onClick ={
                () => {
                  setPrice(item.price)
                  showPrice()        
                }
              }>
              ${item.price} 
            </li>
  })

  const showPrice = () => {
    setpriceMenu(!priceMenu);
  }

  useEffect(() => {
    if (loadedOnce && toggle) {
      setWaiting(true)
      console.log('newtrip', newTrip)
      return Axios.post("http://localhost:3001/trips", newTrip)
        .then(() => console.log("new trip request created"))
        .catch(err => console.log(err));
    }
  }, [loadedOnce, toggle])

  const token = localStorage.getItem("token");
  const [currentDriver, setCurrentDriver]  = useState(null)
  const [currentTripID, setCurrentTripID]  = useState(null)
  const [driverName, setDriverName] = useState(null)
  const [accepted, setAccepted] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users/data"
    Axios.get(requestsAPI, { headers: { "x-access-token": token} }) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setCurrentDriver(res.data.id));
  })

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users/active-trip"
    Axios.get(requestsAPI, { headers: { "x-access-token": token} }) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => {
        if (res.data[res.data.length-1]) {
          if (res.data[res.data.length-1].accepted) {
            setAccepted(true)
          }
        }
      });
  })

  useEffect(() => {
    const requestsAPI = `http://localhost:3001/trips/`
    Axios.get(requestsAPI) 
      .then(res => {
        setCurrentTripID(res.data.length)
      });
  })

  useEffect(() => {
    const requestsAPI = `http://localhost:3001/trips/rider/${currentDriver}`
    Axios.get(requestsAPI) 
      .then(res => {
        setDriverName(res.data.driver_name)
        console.log(res.data)
        console.log('driver name:', driverName)
      });
  })

  const requestTrip = useCallback(() => {
    setloadedOnce(true)
    setToggle(true)
    setNewTrip({
      customer_id: currentDriver,
      driver_id: null,
      start_address: startAddress,
      end_address: finishAddress,
      start_location_lat: origin.lat,
      start_location_lon: origin.lng,
      end_location_lat: destination.lat,
      end_location_lon: destination.lng,
      accepted: false,
      payment_amount: price,
      payment_status: false,
      created_at: Date.now(),
      ended_at: null
    })
    console.log('currenttrip id', currentTripID)
  }, [price])

  useEffect(() => {
    if (loadCancel && (!toggle)) {
      setWaiting(false)
      console.log('trip id to be deleted', currentTripID)
      // let deleteid = currentTripID - 1
      return Axios.put(`http://localhost:3001/trips/${currentTripID}/cancel`)
      .then(() => {
        console.log("previous trip cancelled/delete")
        setloadedOnce(true)
      })
      .catch(err => console.log(err));
    }
  }, [loadCancel, toggle])


  const cancelTrip = useCallback(() => {
    setloadCancel(true)
    setToggle(false)
  }, [])
  
  const completeTrip = () => {
    setCompleted(true)
    return Axios.put(`http://localhost:3001/trips/${currentTripID}/complete`)
    .then(() => {
      console.log('Trip completed')
    })
    .catch(err => console.log(err));
  }

  return (
    <Fragment>
      <article className = "userSummary">
        <h3> Distance from current location to home: {travelTD.distance} ({travelTD.time}) </h3>
        <h4> Estimated Price Range: ${range.lowest.price} - ${range.highest.price}</h4> 
        <FaIcons.FaAngleDown onClick = {showPrice} className = "dropdown"/> 
        <div className = {priceMenu ? 'show' : 'hide' }>
          {listofPrice}
        </div>
        <div className = "selectedPrice"> 
          ${price}
        </div>
      </article>
      <div className = "statusContainer">
        {(waiting && (!accepted)) ? <Spinner animation="grow" variant="secondary" /> : <div></div>}
        {(!accepted) ? <Button type = {waiting ? "Waiting for Driver" : "Search for Driver"} onClick = {requestTrip}/> : <div></div> }
        {(waiting && (!accepted)) ? <Button type = "Cancel Request" onClick = {cancelTrip}/> : <div></div> }
        {accepted && (!completed) ? <Fragment> <Alert variant = "success" >
          {driverName} has accepted your request. He will message you once he is nearby!
        </Alert>  <Button type = "Trip Complete" onClick = {completeTrip}/> </Fragment> : <div></div>}
        {completed ? <Button type = "Trip Completed!" onClick = {completeTrip}/> : <div></div> } 
      </div>
    </Fragment>
    
  )
}