const express = require('express');
const router = express.Router();

module.exports = ({
  getMessages,
  getMessageById
}) => {
  /* GET all trips */
  router.get('/', (req, res) => {
    getMessages()
      .then((messages) => res.json(messages))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/:id', (req, res) => {
    const tripId = req.params.id;
    getMessageById(tripId)
      .then((users) => res.json(users))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  // router.post('/:id', function (req, res) {
  //   const { customer_id, driver_id, message } = req.body;
  //   db.query (
  //     `
  //     INSERT INTO messages (customer_id, driver_id, message)
  //     VALUES ($1, $2, $3::text)
  //     `
  //   )
  // }, [customer_id, driver_id, message]).then(() => res.json("message added!"));

  return router;
};
// module.exports = db => {
//   /* GET users listing. */
//   router.get('/', function(req, res) {
//     db.query(
//       "SELECT * FROM messages"
//     ).then(({ rows: messages }) => {
//       res.json(messages);
//     });
//   });
  
//   router.get('/:id', function(req, res) {
//     db.query(
//       `SELECT * FROM messages WHERE id=$1`
//     , [req.params.id]).then(({ rows: message }) => {
//       res.json(message);
//     });
//   });

//   router.post('/:id', function (req, res) {
//     const { customer_id, driver_id, message } = req.body;
//     db.query (
//       `
//       INSERT INTO messages (customer_id, driver_id, message)
//       VALUES ($1, $2, $3::text)
//       `
//     )
//   }, [customer_id, driver_id, message]).then(() => res.json("message added!"));

//   return router;
// }
