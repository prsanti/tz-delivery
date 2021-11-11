const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const { checkToken } = require('../helpers/checkTokenHelper');

module.exports = ({
  getUsers,
  getUserById,
  addUser,
  getUserByEmail,
  getTripsByUserId,
  updateUserCurrentLocation,
  fetchIP,
  fetchCoordsByIP,
  getUserActiveTrip,
  updateUserInfo
}) => {
  // Gets all of a user's trips
  router.get('/trips', checkToken, (req, res) => {
    getTripsByUserId(req.userID)
      .then(trips => res.status(200).json(trips))
      .catch((err) => res.status(401).json({
        error: err.message
      }));
  });
    
  // Get all users
  router.get('/', (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  // Get user data by ID
  router.get('/data', checkToken, (req, res) => {
    getUserById(req.userID)
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  // Updates a user's data and verifies with their token
  router.put('/data', checkToken, (req, res) => {
    getUserById(req.userID)
      .then(user => {
        const { id } = user;
        const { driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country } = req.body;
        const password = bcrypt.hashSync(req.body.password, saltRounds);
        updateUserInfo(id, driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password)
          .then(user => res.status(200).json(user))
          .catch((err) => res.json({
            error: err.message
          }));
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/active-trip', checkToken, (req, res) => {
    getUserActiveTrip(req.userID)
      .then(trip => res.status(200).json(trip))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  // Login user
  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email)
      .then(user => {
        if (user) {
          if (user.email === email) {
            if (bcrypt.compareSync(password, user.password)) {
              // JWT
              const token = jwt.sign({userID: user.id}, "bigSecret");
              return res.status(200).json({token});
            } else {
              return res.status(401).json("Incorrect password");
            }
          } else {
            return res.status(401).json("Incorrect email or password");
          }
        } else {
          return res.status(401).json("Email does not exist");
        }
      })
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Logout
  // Not used?
  router.post('/logout', (req, res) => {
    req.session.user_id = null;
    return res.json(req.session.user_id);
  });

  router.put('/location', checkToken, (req, res) => {
    // fetch the user's current IP
    return fetchIP()
      .then(body => {
        // Fetch the user's lat and lon from their IP
        fetchCoordsByIP(body)
          .then(coordinates => {
            // Update the user's current location with their new coordinates
            const { lat, lon } = JSON.parse(coordinates);
            updateUserCurrentLocation(lat, lon, req.userID);
          });
      })
      .then(user => res.json(user))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Add new user
  router.post('/', (req, res) => {
    const driver = req.body.license ? true : false;
    const { full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country } = req.body;
    const password = bcrypt.hashSync(req.body.password, saltRounds);
    const current_location_lat = null;
    const current_location_lon = null;

    getUserByEmail(email)
      .then(user => {
        if (user) {
          res.json({
            msg: 'Sorry, a user account with this email already exists'
          });
        } else {
          return addUser(driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password);
        }
      })
      .then(newUser => res.json(newUser))
      .catch(err => res.json({
        error: err.message
      }));
  });

  return router;
};