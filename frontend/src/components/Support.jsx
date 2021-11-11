import {Fragment} from 'react';
import {Jumbotron, ListGroup} from 'react-bootstrap';

import './Support.scss';

export default function Support(props) {
  return (
    <Fragment>

      <Jumbotron>
        <h1>Having Issues? </h1>
        <p>
          We're here to help 24/7 - Find FAQs or just reach out to us
        </p>
      </Jumbotron>

      <div className = "listGroup">
      <ListGroup >
        <h4 className = "allTopics"> All Topics </h4>
        <ListGroup.Item action variant="light">
          Signing up 
        </ListGroup.Item>

        <ListGroup.Item action variant="light">
          Trip Issues and Refunds
        </ListGroup.Item>

        <ListGroup.Item action variant="light">
          Account and Payment Options
        </ListGroup.Item>

        <ListGroup.Item action variant="light">
          Guide to Rebu
        </ListGroup.Item>

        <ListGroup.Item action variant="light">
          FAQ
        </ListGroup.Item>

        <ListGroup.Item action variant="light">
          More
        </ListGroup.Item>

      </ListGroup>
      </div>

    </Fragment>
  )
}