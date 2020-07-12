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
