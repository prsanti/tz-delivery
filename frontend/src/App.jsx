import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register/Register"
import Settings from "./components/Settings"
import Support from "./components/Support";
import Navbar from "./components/Navbar"
import History from "./components/History/History"
import Logout from "./components/Logout";

function App() {
  return (
    <Router >
      <div className = "App">
        <Navbar />
        <Switch>
          <Route path = "/support">
            <Support />
          </Route>
          <Route path = "/settings">
            <Settings />
          </Route>
          <Route path = "/login">
            <Login />
          </Route>
          <Route path = "/register">
            <Register />
          </Route>
          <Route path = "/history">
            <History />
          </Route>
          <Route path = "/logout">
            <Logout />
          </Route>
          <Route path = "/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
