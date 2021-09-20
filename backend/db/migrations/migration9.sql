-- \c helper_queue;

ALTER TABLE users 
ADD hashed_password TEXT,
ADD salt TEXT;
