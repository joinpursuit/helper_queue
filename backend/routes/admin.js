const admin = require("express").Router();
const {
  getAllJobs,
  getAllJobsForClass,
  getAllJobsForStudent,
} = require("../queries/admin");

admin.get("/alljobs", getAllJobs);
admin.get("/alljobs/:class", getAllJobsForClass);

//gets all jobs for a student by email
admin.get("/studentjobs/:email", getAllJobsForStudent);

module.exports = admin;
