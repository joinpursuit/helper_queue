const db = require("../db");

const getAllJobs = async (req, res, next) => {
  try {
    let jobs = await db.any(
      "SELECT * FROM jobs " +
      "JOIN users ON users.id = jobs.user_id " + 
      "ORDER BY users.class"
    );
    jobs = jobs.filter(job => job.email !== "teststudent@pursuit.org")
    res.json({
      jobs,
      message: "All Jobs",
    });
  } catch (err) {
    next(err);
  }
};

const getAllJobsAndStatusNoWishList = async (req, res, next) => {
    try {
      let jobs = await db.any(
        "SELECT jobs.id AS job_id, jobs.company, jobs.job_title, " +
          "jobs.post_url, jobs.salary, jobs.location, jobs.due_date, jobs.description, jobs.status, " +
          "jobs.created_at, jobs.user_id, jobs.last_modified, users.email, users.class, " +
          "jobs_status_timelines.status as timeline_status, jobs_status_timelines.created_at as timeline_created_at  " +
          "FROM jobs " +
          "JOIN users ON jobs.user_id = users.id " +
          "JOIN jobs_status_timelines ON jobs_status_timelines.job_id = jobs.id " +
          "ORDER BY jobs.last_modified DESC"
        
      );
      jobs = jobs.filter((job) => job.email !== "teststudent@pursuit.org");

      let obj = {};

      jobs.forEach((job) => {
        if (obj[job.job_id]) {
          obj[job.job_id].timelines.push({
            status: job.timeline_status,
            created_at: job.timeline_created_at,
          });
        } else {
          obj[job.job_id] = job;
          obj[job.job_id].timelines = [
            {
              status: job.timeline_status,
              created_at: job.timeline_created_at,
            },
          ];
          delete obj[job.job_id].timeline_status;
          delete obj[job.job_id].timeline_created_at;
        }
      });

      jobs = Object.values(obj).filter(job => job.status.toLowerCase() !== "wishlist")


      res.json({
        jobs: jobs,
        message: "All Jobs",
      });
    } catch (err) {
      next(err);
    }
}

const getAllJobsForClass = async (req, res, next) => {
  try {
     let jobs = await db.any(
      "SELECT * FROM jobs JOIN users ON users.id = jobs.user_id where class = $1",
      req.params.class
    );
    jobs = jobs.filter((job) => job.email !== "teststudent@pursuit.org");
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
        "jobs_status_timelines.status as timeline_status, jobs_status_timelines.created_at as timeline_created_at  " +
        "FROM jobs " +
        "JOIN users ON jobs.user_id = users.id " +
        "JOIN jobs_status_timelines ON jobs_status_timelines.job_id = jobs.id " +
        "WHERE users.email = $1 " +
        "ORDER BY jobs.last_modified DESC",
      req.params.email
    );

    let obj = {};

    jobs.forEach((job) => {
        if(obj[job.job_id]) {
            obj[job.job_id].timelines.push({status: job.timeline_status, created_at: job.timeline_created_at})
        } else {
            obj[job.job_id] = job;
            obj[job.job_id].timelines = [
              { status: job.timeline_status, created_at: job.timeline_created_at },
            ];
            delete obj[job.job_id].timeline_status
            delete obj[job.job_id].timeline_created_at
        }
    })



    res.json({
      status: 200,
      message: "All jobs for student",
      email: req.params.email,
      jobs: obj,
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsersOfApp = async (req, res, next) => {
    try {
        const users = await db.any("SELECT * FROM users");
        res.json({
            status: 200, 
            message: "all users",
            users
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
  getAllJobs,
  getAllJobsForClass,
  getAllJobsForStudent,
  getAllUsersOfApp,
  getAllJobsAndStatusNoWishList,
};





  