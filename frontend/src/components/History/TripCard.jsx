import React from 'react';

import { Card } from 'react-bootstrap';

export default function TripCard (props) {
  const payment_status = props.payment_status ? "Completed" : "Cancelled"

  return (
    <div>
      <Card>
        <Card.Header>{props.created_at}</Card.Header>
        <Card.Body>
          <Card.Title>Status: {payment_status}</Card.Title>
          <Card.Text>${props.payment_amount}</Card.Text>
          <Card.Text>{props.start_address}</Card.Text>
          <Card.Text>{props.end_address}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
};