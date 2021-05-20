-- \c helper_queue;
DROP TABLE IF EXISTS pairs; 

CREATE TABLE pairs
(
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    body VARCHAR,
    current_day INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
