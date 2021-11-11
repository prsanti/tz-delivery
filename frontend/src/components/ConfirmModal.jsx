import {useState, useEffect, useCallback} from 'react';
import Axios from 'axios';
import {Modal, Button} from 'react-bootstrap';
import { io } from 'socket.io-client';

let socket;

export default function ConfirmModal (props) {

  const {id, customer_id, confirm, driverlocation, origin, 
    start_address, end_address, price, setPrice, start_location_lat, start_location_lon,
    end_location_lat, end_location_lon, created_at
  } = props;
  
  const [loaded, setloaded] = useState(false);
  console.log('driverlocation' , driverlocation)
  console.log('start location lat' , start_location_lat)
  console.log('start location lon' , start_location_lon)

  const controlDestinationLat = () => {
    if ( end_location_lat){
      return  end_location_lat
    }
    return null
  }

  const controlDestinationLng = () => {
    if (end_location_lon){
      return end_location_lon
    }
    return null
  }

  const token = localStorage.getItem("token");
  const [currentDriverId, setCurrentDriverId] = useState(null);

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users/data"
    Axios.get(requestsAPI, { headers: { "x-access-token": token} }) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => {
        console.log(res.data.id);
        setCurrentDriverId(res.data.id)
      });
  }, {})
  console.log(currentDriverId);

  const [ trip, setTrip ] = useState({
    customer_id: customer_id,
    driver_id: currentDriverId,
    start_address: start_address,
    end_address: end_address,
    start_location_lat: origin.lat,
    start_location_lon: origin.lng,
    end_location_lat: controlDestinationLat(),
    end_location_lon: controlDestinationLng(),
    accepted: true,
    payment_amount: price,
    payment_status: false,
    created_at: created_at,
    ended_at: null
  })

  // useEffect(() => {
  //   if (loaded) {
  //     console.log('newtrip', trip)
  //     return Axios.put("http://localhost:3001/trips/1/accept", trip)
  //       .then(() => console.log("new trip request created"))
  //       .catch(err => console.log(err));
  //   }
  // }, [loaded])


  const confirmTrip = useCallback(() => {
    setloaded(true)
    setTrip({
      customer_id: customer_id,
      driver_id: currentDriverId,
      start_address: start_address,
      end_address: end_address,
      start_location_lat: origin.lat,
      start_location_lon: origin.lng,
      end_location_lat: controlDestinationLat(),
      end_location_lon: controlDestinationLng(),
      accepted: true,
      payment_amount: price,
      payment_status: false,
      created_at: created_at,
      ended_at: null
    })
    console.log('trip confirmed', trip)
    return currentDriverId && Axios.put(`http://localhost:3001/trips/${id}/accept`, { driver_id : currentDriverId})
    .then(() => console.log("new trip request created"))
    .catch(err => console.log(err));
  }, [currentDriverId])

  const notifyCustomer = (tripId) => {
    socket = io("http://localhost:3001", {
        transports: ["websocket", "polling"]
      });

    console.log("NOTIFY CUSTOMER FN TRIGGERED")
    socket.emit("accept", ({ room: tripId }))
    console.log("NOTIFY CUSTOMER FN FINISHED")

    return;
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Accept this request?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>From: {props.start_address}</p>
        <p>To: {props.end_address}</p>
        <p>Price: ${props.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          confirm()
          confirmTrip()
          setPrice(props.price)
          notifyCustomer(id)
        }}>
          Yes
        </Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>

  )
}