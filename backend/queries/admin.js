const db = require("../db");

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await db.any(
      "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id ORDER BY class"
    );
    console.log(jobs);
    res.json({
      jobs,
      message: "All Jobs",
    });
  } catch (err) {
    next(err);
  }
};

const getAllJobsForClass = async (req, res, next) => {
  try {
    const jobs = await db.any(
      "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id where class = $1",
      req.params.class
    );
    console.log(jobs);
    res.json({
      jobs,
      message: "All Jobs",
    });
  } catch (err) {
    next(err);
  }
};

const getAllJobsForStudent = async (req, res, next) => {
  try {
    const jobs = await db.any(
      "SELECT jobs.id AS job_id, jobs.company, jobs.job_title, " +
        "jobs.post_url, jobs.salary, jobs.location, jobs.due_date, jobs.description, jobs.status, " +
        "jobs.created_at, jobs.user_id, jobs.last_modified, users.email, users.class, " +
        "ARRAY_AGG(jobs_status_timelines.*) AS job_status_timelines " +
        "FROM jobs " +
        "JOIN users ON jobs.user_id = users.id " +
        "JOIN jobs_status_timelines ON jobs_status_timelines.job_id = jobs.id " +
        "WHERE users.email = $1 " +
        "GROUP BY jobs.id, users.email, users.class " +
        "ORDER BY jobs.last_modified DESC",
      req.params.email
    );

    res.json({
      status: 200,
      message: "All jobs for student",
      email: req.params.email,
      jobs,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllJobs, getAllJobsForClass, getAllJobsForStudent };
