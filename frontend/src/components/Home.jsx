import React, { useEffect, useState } from "react";

import HomeRider from "./HomeRider";
import HomeDriver from "./HomeDriver";
import ChatModal from './ChatModal';
import HomeNotLoggedIn from './HomeNotLoggedIn';

import Axios from "axios";

import './Home.scss';

// Home Page For Driver
const Homee = () => {
  const [ user, setUser ] = useState({});
  const token = localStorage.getItem("token");

  const [ chatSelected, setChatSelected ] = useState(false);
  const [ isTripAccepted, setIsTripAccepted ] = useState(false)

  // Used to get data from the backend (user and trip data)
  // if user is logged in, the backend returns data as a cookie
  useEffect(() => {
    Axios.get("https://techknights-prototype-backend.herokuapp.com/users/data", { headers: { "x-access-token": token} })
      .then((res) => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, []);



  // function clickHandler () {
  //   // if (isTripAccepted) {
  //     setChatSelected(!chatSelected);
  //   // }
  // };

  return (
    <div id="homepage">
      {/* If there's no cookie, returns a not logged in page */}
      {!token && <HomeNotLoggedIn />}
      {/* If the user is logged in and not a driver (receiver) returns a receiver page*/}
      {!user.driver && token &&
        <HomeRider 
          user={user} 
          chatSelected={chatSelected}
          setIsTripAccepted={setIsTripAccepted}
        />
      }
      {/* If the user is logged in and is a driver, return the driver page */}
      {user.driver && token &&
        <HomeDriver 
          user={user} 
          setIsTripAccepted={setIsTripAccepted}
          chatSelected={chatSelected} 
        />
      }
      <ChatModal  setChatSelected={setChatSelected} chatSelected={chatSelected} />
    </div>
  )
};

export default Homee;