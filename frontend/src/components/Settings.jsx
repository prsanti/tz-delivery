
import { React, useState, useEffect, Fragment } from "react";
import Axios from 'axios';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Form, Col } from 'react-bootstrap';
import RiderRegisterForm from "./Register/RiderRegisterForm";
import DriverRegisterForm from './Register/DriverRegisterForm';

import "./Register/Register.scss";

export default function Settings() {
  const token = localStorage.getItem("token");

  const [currentUser, setCurrentUser] = useState({});
  const [ userType, setUserType ] = useState("rider");

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users/data"
    Axios.get(requestsAPI, { headers: { "x-access-token": token} })
      .then(res => setCurrentUser(res.data));
  }, {});

  const updateUser = (e) => {
    e.preventDefault();

    return Axios.put("http://localhost:3001/users/data", currentUser, { headers: { "x-access-token": token} })
      .then(() => console.log("updated"))
      .catch(err => console.log(err))
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCurrentUser({ ...currentUser, [name]: value});
  };

  const userCheck = (e) => {
    setUserType(e.target.value);

    if (userType === "driver") {
      setCurrentUser({...currentUser, driver: true });
    }
  };

  return (
    <Fragment>
      {!token && <Redirect to="/login" />}
      <div id="register" classname="container">
        <div className="outer-container">
          <h1 className = "settingsH1">Settings</h1>
          <Form.Row className="usertype-container">
            <Form.Label as="legend" column sm={2}>
              <span>User Type</span>
            </Form.Label>
            <Form.Row as={Col}>
              <Form.Check
                type="radio"
                label="Rider"
                name="formHorizontalRadios"
                value="rider"
                id="formHorizontalRadios1"
                defaultChecked
                onClick={userCheck}
                className="choose-usertype"
              />
              <Form.Check
                type="radio"
                label="Driver"
                name="formHorizontalRadios"
                value="driver"
                id="formHorizontalRadios2"
                onClick={userCheck}
                className="choose-usertype"
              />
            </Form.Row>
          </Form.Row>
          <hr />
          {userType === "rider" &&
          <RiderRegisterForm 
            register={updateUser}
            change={handleChange}
            userInfo={currentUser}
          />
          }
          {userType === "driver" &&
            <DriverRegisterForm 
            change={handleChange}
            register={updateUser}
            userInfo={currentUser}
            />
          }
        </div>
      </div>
    </Fragment>
  )
}