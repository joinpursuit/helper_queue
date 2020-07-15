const db = require("../db");

const getAllUserJobs = async (req, res, next) => {
  try {
    const jobs = await db.any(
      "SELECT * FROM jobs WHERE user_id = $1",
      req.user.id
    );
    res.json({
      jobs,
      message: "All Jobs",
    });
  } catch (err) {
    next(err);
  }
};

const createJob = async (req, res, next) => {
  try {
    const job = await db.one(
      "INSERT INTO jobs" +
        " (company, job_title, post_url, location, salary, due_date, description, status, user_id)" +
        " VALUES(${company}, ${job_title}, ${post_url}, ${location}, ${salary}, ${due_date}, ${description}, ${status}, ${user_id}) RETURNING *",
      req.body
    );

    await db.none(
      "INSERT INTO jobs_status_timelines (status, job_id)" + 
      " VALUES(${status}, ${job_id})", 
      {
        job_id: job.id,
        status: job.status
        }
      );

    res.json({
      job,
      message: "New Job Added",
    });
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  req.body.id = req.params.id;
  try {
    let prevJob = await db.one("SELECT status FROM jobs WHERE id = $1", req.params.id);
    if(prevJob.status !== req.body.status) {
          await db.none(
            "INSERT INTO jobs_status_timelines (status, job_id)" +
              " VALUES(${status}, ${job_id})",
            {
              job_id: req.params.id,
              status: req.body.status,
            }
          );
    }
    let job = await db.one(
      "UPDATE jobs SET company=${company}, job_title=${job_title}, post_url=${post_url}, location=${location}, salary=${salary}, due_date=${due_date}, description=${description}, status=${status} WHERE id = ${id} RETURNING *",
      req.body
    );
    res.json({
      job,
      message: "Job Updated",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUserJobs, createJob, updateJob };
