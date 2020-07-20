const db = require("../db");

const getAllJobStatusTimelines = async (req, res, next) => {
    try {
        const timelines = await db.any("SElECT * FROM jobs_status_timelines WHERE job_id =$1 ORDER BY created_at ASC", req.params.id);
        res.json({
            timelines, 
            message: "All timelines for one job",
            job_id: req.params.id
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { getAllJobStatusTimelines }