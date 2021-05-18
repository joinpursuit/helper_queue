const admin = require("express").Router();
const { spreadSheetAdminID } = require("../middleware/admin_auth");

const {
  getAllJobs,
  getAllJobsForClass,
  getAllJobsForStudent,
  getAllUsersOfApp,
  getAllJobsAndStatusNoWishList,
} = require("../queries/admin");

admin.use(spreadSheetAdminID);
admin.get("/alljobs", getAllJobs);
admin.get("/alljobs/:class", getAllJobsForClass);
admin.get("/alljobsandtimelines", getAllJobsAndStatusNoWishList);

//gets all jobs for a student by email
admin.get("/studentjobs/:email", getAllJobsForStudent);

admin.get("/students", getAllUsersOfApp);

// create pairings 

module.exports = admin;
