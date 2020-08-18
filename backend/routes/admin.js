const admin = require("express").Router();
const { getAllJobs, getAllJobsForClass } = require("../queries/admin");

admin.get("/alljobs", getAllJobs);
admin.get("/alljobs/:class", getAllJobsForClass);

module.exports = admin;
