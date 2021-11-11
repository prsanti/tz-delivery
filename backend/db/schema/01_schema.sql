DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  driver boolean NOT NULL DEFAULT FALSE,
  full_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  created_at timestamp DEFAULT NOW(),
  phone_number BIGINT NOT NULL,
  credit_card BIGINT,
  month_year varchar(255) NOT NULL,
  cvc varchar(255) NOT NULL,
  license varchar(255),
  street_address varchar(255) NOT NULL,
  apartment_number varchar(255),
  city varchar(255) NOT NULL,
  postal_code varchar(255) NOT NULL,
  province varchar(255) NOT NULL,
  country varchar(255) NOT NULL,
  current_location_lat REAL,
  current_location_lon REAL,
  password varchar(255) NOT NULL
);

CREATE TABLE messages(
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  driver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message varchar(255),
  created_at timestamp
);

CREATE TABLE trips(
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  driver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  start_address varchar(255) NOT NULL,
  end_address varchar(255) NOT NULL,
  start_location_lat REAL NOT NULL,
  start_location_lon REAL NOT NULL,
  end_location_lat REAL NOT NULL,
  end_location_lon REAL NOT NULL,
  accepted boolean DEFAULT FALSE,
  payment_amount NUMERIC(6, 2) DEFAULT 0,
  payment_status boolean NOT NULL DEFAULT FALSE,
  created_at timestamp DEFAULT NOW(),
  ended_at timestamp DEFAULT NULL
);
