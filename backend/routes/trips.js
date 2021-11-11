const express = require('express');
const router = express.Router();

module.exports = ({
  getTrips,
  getTripById,
  addTrip,
  getTripsByNotAccepted,
  acceptTrip,
  cancelTrip,
  deleteTrip,
  getUserAndDriverActiveTrip,
  getCustomersActiveTrip,
  getDriversActiveTrip,
  completeTrip
}) => {
  // GET all trips
  router.get('/', (req, res) => {
    getTrips()
      .then(trips => res.json(trips))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // POST a new trip
  router.post('/', function(req, res) {
    const {
      customer_id,
      driver_id,
      start_address,
      end_address,
      start_location_lat,
      start_location_lon,
      end_location_lat,
      end_location_lon,
      payment_amount
    } = req.body;
    
    addTrip(customer_id, driver_id, start_address, end_address, start_location_lat, start_location_lon, end_location_lat, end_location_lon, payment_amount)
      .then(trip => res.json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Get trip by accepted status
  router.get('/not-accepted', (req, res) => {
    getTripsByNotAccepted()
      .then(trips => res.json(trips))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.get('/trip/:id', (req, res) => {
    const tripId = req.params.id;
    getTripById(tripId)
      .then(users => res.json(users))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // router.get('/active-trip', (req, res) => {
  //     getUserAndDriverActiveTrip()
  // });

  // Get trip by ID
  router.get('/:id', (req, res) => {
    //   const tripId = req.params.id;
    //   getTripById(tripId)
    //       .then(users => res.json(users))
    //       .catch(err => res.json({
    //           error: err.message
    //       }));

    const tripId = req.params.id;
    getUserAndDriverActiveTrip(tripId)
      .then(trip => res.status(200).json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });

  //gets a route that matches the rider Id === customer_id and the accepted === true and ended_at === null
  router.get('/rider/:id', (req, res) => {

    const userId = req.params.id;
    getCustomersActiveTrip(userId)
      .then(trip => res.status(200).json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.get('/driver/:id', (req, res) => {

    const userId = req.params.id;
    getDriversActiveTrip(userId)
      .then(trip => res.status(200).json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });


  // Updates a trip to 'accepted'
  // NEED TO ADD driver_id somehow
  router.put('/:id/accept', (req, res) => {
    const tripId = req.params.id;
    // console.log(tripId);
    // const driverId = req.params.driver_id;
    // console.log(driverId)
    const driverId = req.body.driver_id;
    console.log(req.body);

    acceptTrip(tripId, driverId)
      .then(trip => res.json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });

  // Updates a trip to 'cancelled'
  router.put('/:id/cancel', (req, res) => {
    const tripId = req.params.id;

    cancelTrip(tripId)
      .then(trip => res.json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.delete("/:id/delete", (req, res) => {
    const tripId = req.params.id;
    deleteTrip(tripId)
      .then(trip => res.json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });

  router.put("/:id/complete", (req, res) => {
    const tripId = req.params.id;
    completeTrip(tripId)
      .then(trip => res.json(trip))
      .catch(err => res.json({
        error: err.message
      }));
  });


  return router;
};

// removed for now
// (6, NULL, '398 Church St, Toronto, ON M5B 2A2', '27 Kings College Cir, Toronto, ON M5S', 43.660410, -79.379010, 43.661369, -79.396263, false, 25, false, current_timestamp, NULL),