const request = require('request-promise-native');

module.exports = (db) => {
  // Gets all users in DB
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };
  
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // Get user by ID
  const getUserById = id => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1` ,
      values: [id]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const getUserByEmail = email => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1` ,
      values: [email]
    };

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  // Get all trips from a user
  const getTripsByUserId = id => {
    const query = {
      text: `SELECT * FROM trips WHERE customer_id = $1`,
      values: [id]
    };

    return db
      .query(query)
      .then(result => result.rows)
      .catch((err) => err);
  };

  // Get user's IP address
  const IPurl = 'https://api.ipify.org?format=json';

  const fetchIP = () => {
    return request(IPurl);
  };

  // Convert user's IP to coordinates
  const fetchCoordsByIP = (body) => {
    const ip = JSON.parse(body).ip;
    return request(`http://ip-api.com/json/${ip}`);
  };

  // Update the user's current location (lat and lon)
  const updateUserCurrentLocation = (lat, lon, id) => {
    const query = {
      text: `UPDATE users SET current_location_lat = $1, current_location_lon = $2 WHERE id = $3`,
      values: [lat, lon, id]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // Add new user to DB
  const addUser = (driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password) => {
    const query = {
      text: `
                INSERT INTO users (driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            `,
      values: [driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, current_location_lat, current_location_lon, password]
    };
  
    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  // Gets a trip by user's ID
  const getUserActiveTrip = (id) => {
    const query = {
      text: `SELECT * FROM trips WHERE customer_id = $1 and ended_at is NULL`,
      values: [id]
    };

    return db
      .query(query)
      .then(result => result.rows)
      .catch((err) => err);
  };

  // Updates a user's information in the user's table
  const updateUserInfo = (id, driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password) => {
    const query = {
      text: `
                UPDATE users 
                SET driver = $2, full_name = $3, email = $4, phone_number = $5, credit_card = $6, month_year = $7, cvc = $8, license = $9, street_address = $10, apartment_number = $11, city = $12, postal_code = $13, province = $14, country = $15, password = $16
                WHERE id = $1`,
      values: [id, driver, full_name, email, phone_number, credit_card, month_year, cvc, license, street_address, apartment_number, city, postal_code, province, country, password]
    };

    return db
      .query(query)
      .then(user => result.rows[0])
      .catch((err) => err);
  };
  
  return {
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
  };
};