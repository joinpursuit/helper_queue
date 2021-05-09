const classEnrollment = require("express").Router();
const { checkAdminId } = require("../middleware/admin_auth");
const { checkFirebaseToken } = require("../middleware/auth");
const { enrollClass } = require("../queries/class_enrollment");

classEnrollment.post("/", checkFirebaseToken, checkAdminId, enrollClass);

module.exports = classEnrollment;
