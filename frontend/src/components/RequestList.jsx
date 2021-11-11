import { Card, Col, Row, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';

import RequestCard from "./RequestCard";

import "./RequestList.scss";

export default function RequestList (props) {
  const {origin, setOrigin, destination, setDestination, pickup, setPickup, setPrice, driverlocation} = props;
  console.log('request list', driverlocation)
  const requests = props.requests.map(request => {
    return (
      <RequestCard 
        key={request.id}
        id={request.id}
        customer_id = {request.customer_id}
        price={request.payment_amount}
        accepted={request.accepted}
        status={request.accepted}
        start_address={request.start_address}
        end_address={request.end_address}
        created_at={request.created_at}
        driverlocation = {driverlocation}
        origin = {origin}
        pickup = {pickup}
        destination= {destination}
        setOrigin = {setOrigin}
        setPickup = {setPickup}
        setDestination = {setDestination}
        setPrice = {setPrice}
        start_location_lat = {request.start_location_lat}
        start_location_lon = {request.start_location_lon}
        end_location_lat = {request.end_location_lat}
        end_location_lon = {request.end_location_lon}
        setChatSelected={props.setChatSelected}
        getAcceptedTrip={props.getAcceptedTrip}
        created_at={request.created_at}
      />
    )
  })

  return (
    <Card className="requestList-container">
      <Card.Header className = "cardHeader">
        <Row className = "cardRow">
          <Col>From</Col>
          <Col>To</Col>
          <Col>Price</Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              menuAlign="right"
              key="Secondary"
              id="dropdown-variants-Secondary"
              title="Distance"
              variant="secondary"
              className = "distanceFilter"
            >
              Filter By Distance
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">500m</Dropdown.Item>
              <Dropdown.Item eventKey="2">1km</Dropdown.Item>
              <Dropdown.Item eventKey="3">5km</Dropdown.Item>
              <Dropdown.Item eventKey="4">10km</Dropdown.Item>
              <Dropdown.Item eventKey="4">20km</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Card.Header>
      <div className="request-list">
        {requests}
      </div>
    </Card>
  )
}