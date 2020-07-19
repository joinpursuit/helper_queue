const jobStatusTimelinesRouter = require('express').Router();

const {getAllJobStatusTimelines} = require("../queries/jobs_status_timelines");
const { checkFirebaseToken } = require("../middleware/auth");

jobStatusTimelinesRouter.get("/:id", checkFirebaseToken, getAllJobStatusTimelines)

module.exports = jobStatusTimelinesRouter;