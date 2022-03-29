const admin = require("firebase-admin");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECURE_ACCESS_KEY,
});
const params = { Bucket: "dinorun", Key: "firebase.json" };

s3.getObject(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    const body = JSON.parse(data.Body.toString());

    admin.initializeApp({
      credential: admin.credential.cert(body),
    });
  }
});

module.exports = admin;
