-- \c helper_queue;

CREATE INDEX tickets_complete ON tickets(complete, owner_id);
CREATE INDEX jobs_user_id ON jobs(user_id);
CREATE INDEX jobs_status_timelines_job_id ON jobs_status_timelines(job_id);
