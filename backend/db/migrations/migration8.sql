-- \c helper_queue;
DROP TABLE pairs IF EXISTS; 

CREATE TABLE pairs
(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    body VARCHAR,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
