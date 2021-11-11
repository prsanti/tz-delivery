import React, { useState, Fragment } from 'react';
import Axios from 'axios';
import { Redirect } from "react-router-dom";
import { Form, Col } from 'react-bootstrap';
import RiderRegisterForm from "./RiderRegisterForm";
import DriverRegisterForm from "./DriverRegisterForm";

import "./Register.scss";

export default function Register(props) {
  const [ newUser, setNewUser ] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    credit_card: "",
    month_year: "",
    cvc: "",
    street_address: "",
    apartment_number: null,
    city: "",
    postal_code: "",
    province: "",
    country: "",
    driver: false,
    license: null
  });

  const [ userType, setUserType ] = useState("rider");
  const [registered, setRegistered] = useState(false);

  function register (e) {
    e.preventDefault();
    
    return Axios.post("http://localhost:3001/users", newUser)
      .then(() => setRegistered(true))
      .catch(err => console.log(err))
  }

  function handleChange (e) {
    e.preventDefault();
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value});
  };

  function userCheck (e) {
    setUserType(e.target.value);

    if (userType === "driver") {
      setNewUser({...newUser, driver: true });
    }
  }

  return (
    <Fragment>
      {registered && <Redirect to="/login" />}
      <div id="register" classname="container">
        <div className="outer-container">
          <h1 className = "registerH1"> Register</h1>
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
              register={register}
              change={handleChange}
              userInfo={newUser}
            />
          }
          {userType === "driver" && 
            <DriverRegisterForm 
            change={handleChange}
            register={register}
            userInfo={newUser}
            />
          }
        </div>
      </div>
    </Fragment>
  )
}
