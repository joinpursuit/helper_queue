\c helper_queue;

ALTER TABLE jobs
ADD last_modified TIMESTAMP WITH TIME ZONE;
UPDATE jobs SET last_modified = created_at;
ALTER TABLE jobs ALTER last_modified SET DEFAULT CURRENT_TIMESTAMP;

CREATE OR REPLACE FUNCTION update_last_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_modified = now(); 
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER  update_job_last_modified BEFORE
UPDATE ON jobs FOR EACH ROW
EXECUTE PROCEDURE  update_last_modified_column();






