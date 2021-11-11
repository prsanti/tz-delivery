import {useState, useEffect} from 'react';
import {
  DistanceMatrixService,
} from "@react-google-maps/api";

import { Spinner } from 'react-bootstrap';

export default function Distance(props) {

  const {destination, origin, settravelTD, loadedOnce, setloadedOnce, setstartAddress, setfinishAddress, travelMode} = props;

  const options = {
    destinations: [destination],
    origins: [origin],
    travelMode: travelMode, 
  }

  let time = ""
  let distance = ""

  useEffect(()=> {
    console.log('works')
  }, [props.destination, props.origin])

  const callback = (response) => {
    console.log('response from distance', response)
    time = response.rows[0].elements[0].duration.text
    console.log(time)
    distance = response.rows[0].elements[0].distance.text
    console.log(distance)
    if (!loadedOnce) {
      setloadedOnce(() => {
        settravelTD(time, distance)
        setstartAddress(response.originAddresses[0])
        setfinishAddress(response.destinationAddresses[0])
        return true
      })
    }

  }

  return (
    <div>
      {props.destination && props.origin ? <DistanceMatrixService options = {options} callback = {callback} /> : <Spinner animation="border" variant="secondary" />}
    </div>
  )
}


