
\c helper_queue;

CREATE TABLE jobs_status_timelines
(
    id SERIAL PRIMARY KEY,
    status VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE,
    job_id INT REFERENCES jobs(id) ON DELETE SET NULL 
    );


INSERT INTO jobs_status_timelines (status, created_at, job_id) SELECT status, created_at, id FROM jobs;


ALTER TABLE jobs_status_timelines ALTER created_at SET DEFAULT CURRENT_TIMESTAMP;
