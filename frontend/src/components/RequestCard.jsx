import React, { useState } from 'react';
import moment from 'moment';

import { Card, Col, Row, Button, Badge } from 'react-bootstrap';

import ConfirmModal from "./ConfirmModal";
import './RequestCard.scss'

export default function RequestCard (props) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const {id, customer_id, start_address, end_address, driverlocation, origin, setOrigin, pickup, 
    setPickup, destination, setDestination, setPrice, start_location_lat, start_location_lon,
    end_location_lat, end_location_lon, created_at
  
  } = props;
  // console.log('dirver location from request card', driverlocation)
  const timestamp = moment(props.created_at).fromNow();
  
  return (
    <Card.Body className="request-container">
      <Card className = "tripCard">
        <Card.Body className="request-card" onClick = {() => {
          setOrigin({
            lat: driverlocation.current_location_lat,
            lng: driverlocation.current_location_lon
          })
          setDestination({
            lat: start_location_lat,
            lng: start_location_lon
          })
        }
        
        }>
          <Row className="card-container">
            <Col className="start-address">{props.start_address}</Col>
            <Col className="end-address">{props.end_address}</Col>
            <div className="trip-price">$ {props.price}</div>
            {!isConfirmed &&
            <Col className="btn-container">
              <Button variant="primary" onClick={() => setModalShow(true)} className="accept-btn">
              Accept
              </Button>
              <ConfirmModal
                show={modalShow}
                id = {id}
                customer_id = {customer_id}
                onHide={() => setModalShow(false)}
                price = {props.price}
                start_address={start_address}
                end_address={end_address}
                confirm={() => setIsConfirmed(true)}
                driverlocation = {driverlocation}
                origin = {origin}
                setOrigin = {setOrigin} 
                pickup = {pickup}
                setPickup = {setPickup}
                desination = {destination}
                setDestination = {setDestination}
                setPrice = {setPrice}
                start_location_lat = {start_location_lat}
                start_location_lon = {start_location_lon}
                end_location_lat = {end_location_lat}
                end_location_lon = {end_location_lon}
                created_at = {created_at}
                setChatSelected={props.setChatSelected}
                getAcceptedTrip={props.getAcceptedTrip}
              />
            </Col>
            }
            
            {isConfirmed &&
              <Col className="confirmed-badge">
                <Badge pill variant="success">Accepted</Badge>
              </Col>
            }
          </Row>
          <Row className="created-at">
            {`Posted ${timestamp}`}
          </Row>
        </Card.Body>
      </Card>
    </Card.Body>
  )
}