const admin = require("../firebase");

const checkFirebaseToken = async (req, res, next) => {
  try {
    // console.log(req.headers.authtoken);
    // console.log(req.body)
    const token = req.headers.authtoken;
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log(decodedToken);
    const uid = decodedToken.uid;
    req.user_id = uid;
    next();
  } catch (error) {
    console.log("code broke!", error);
    res.status(401).json({ message: "No user authenticated!" });
  }
};

module.exports = { checkFirebaseToken };