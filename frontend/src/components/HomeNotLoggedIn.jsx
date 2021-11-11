import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';
// import logo from './Logo/Rebu-Logo.png';

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  return (
    <div id="body">
      <Trail open={open} onClick={() => set((state) => !state)} >
        <span id="app-name">Rebu</span>
      </Trail>
      <Trail open={!open} onClick={() => set((state) => !state)} >
        <span className="slogan">Designated</span>
        <span className="slogan">Driving</span>
        <span className="slogan">Service</span>
      </Trail>
      <div className="button-group">
        <Link to="/login">
          <Button variant="success" size="lg" className = "RLbutton">
            Login
          </Button>
        </Link>
        <Link to ="/register">
          <Button variant="info" size="lg" className = "RLbutton">
            Register
          </Button>
        </Link>
      </div>
      
    </div>
  )
}

export default HomeNotLoggedIn;