const db = require("../db");

const getAllJobStatusTimelines = async (req, res, next) => {
    try {
        const timelines = db.any("SElECT * FROM jobs_status_timelines WHERE job_id =$1", req.params.id);
        res.json({
            timelines, 
            message: "All timelines for one job"
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllJobStatusTimelines }