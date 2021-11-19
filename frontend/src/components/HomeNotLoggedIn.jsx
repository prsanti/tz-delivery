import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  return (
    <div id="body">
      <Trail open={open} onClick={() => set((state) => !state)} >
        <span id="app-name">dyanomi </span>

      </Trail>
      <Trail open={!open} onClick={() => set((state) => !state)} >
        <span className="slogan">Delivery</span>
        <span className="slogan">Tracking</span>
        <span className="slogan">Service</span>
      </Trail>
      <div className="button-group">
        <Link to="/login">
          <Button variant="dark" size="lg" className = "RLbutton">
            Login
          </Button>
        </Link>
        <Link to ="/register">
          <Button variant="outline-dark" size="lg" className = "RLbutton">
            Register
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HomeNotLoggedIn;