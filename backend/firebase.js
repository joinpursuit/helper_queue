const admin = require("firebase-admin");

const serviceAccount = require("./firebase-admin.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://helper-queue-73489.firebaseio.com",
});

module.exports = admin;