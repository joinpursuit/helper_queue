  
-- DROP DATABASE IF EXISTS helper_queue;
-- CREATE DATABASE helper_queue;

-- \c helper_queue;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id VARCHAR PRIMARY KEY,
    email VARCHAR
);

DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets
(
    id SERIAL PRIMARY KEY,
    body VARCHAR, 
    complete BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    owner_id VARCHAR REFERENCES users(id) ON DELETE SET NULL
);
