const db = require("../db");

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await db.any(
      "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id ORDER BY class"
    );
    console.log(jobs)
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
      "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id where class = $1", req.params.class
    );
    console.log(jobs)
    res.json({
      jobs,
      message: "All Jobs",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllJobs, getAllJobsForClass };
