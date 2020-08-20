const admin = require("express").Router();
const {checkAdminId} = require('../middleware/admin_auth');

const {
  getAllJobs,
  getAllJobsForClass,
  getAllJobsForStudent,
  getAllUsersOfApp,
} = require("../queries/admin");

admin.use(checkAdminId);
admin.get("/alljobs", getAllJobs);
admin.get("/alljobs/:class", getAllJobsForClass);

//gets all jobs for a student by email
admin.get("/studentjobs/:email", getAllJobsForStudent);

admin.get("/students", getAllUsersOfApp);

module.exports = admin;
