const jobs = require("express").Router();
const { checkFirebaseToken } = require("../middleware/auth");
const { getAllUserJobs, createJob, updateJob } = require("../queries/jobs");
jobs.use(checkFirebaseToken);
jobs.get("/", getAllUserJobs);
jobs.post("/", createJob);
jobs.put("/:id", updateJob);
module.exports = jobs;
