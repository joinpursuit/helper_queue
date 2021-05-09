const classEnrollment = require("express").Router();
const { checkAdminId } = require("../middleware/admin_auth");
const { enrollClass } = require("../queries/class_enrollment");

classEnrollment.post("/", enrollClass);

module.exports = classEnrollment;
