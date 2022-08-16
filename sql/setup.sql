-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP table if exists restaurants CASCADE;
DROP table if exists users_restaurants CASCADE;



CREATE table restaurants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  address VARCHAR NOT NULL
  -- rating VARCHAR NOT NULL,
  -- comment VARCHAR NOT NULL
);


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL

);

CREATE table users_restaurants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    users_id BIGINT,
    FOREIGN KEY (users_id) REFERENCES users(id),
    restaurants_id BIGINT,
    FOREIGN KEY (restaurants_id) REFERENCES restaurants(id),
    rating VARCHAR NOT NULL,
    comment VARCHAR NOT NULL
);

INSERT INTO users (first_name, last_name, email, password_hash) VALUES 
('tom', 'lawyer', 'westengland@example.com', '123456789');




INSERT INTO restaurants (name, city, address ) VALUES
('burger king', 'alberta', 'north helmond drive'),
('panda express', 'alberta', 'north creek drive'),
('mcdonalds', 'spokane', 'north bend drive');


INSERT INTO users_restaurants (users_id, restaurants_id, rating, comment) VALUES
(1, 1, '10', 'it was great'),
(1, 2, '2', 'really sucked'),
(1, 3, '4', 'not bad but wont eat it again');
