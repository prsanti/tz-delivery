const pg = require('pg');
require('dotenv').config();

// postgres://pexmltnntomhlk:5150715ae386d0c9fb96043cd4371a37be71a2b9353ab2a60321e9cedcce2dae@ec2-34-204-128-77.compute-1.amazonaws.com:5432/d7dt27idu160ak
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL || connectionString,
});

console.log(`Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
client.connect();



module.exports = client;