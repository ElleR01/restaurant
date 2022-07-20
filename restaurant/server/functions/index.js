const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");

const serviceAccount = require("insert yout path where you saved the new key of /admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "url of you db",
});
const db = admin.database();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//update "confirm" value to true
app.post("/updateOrder", (req, res) => {
  const {orderId} = req.body;
  db.ref("/orders/"+ orderId).update({confirm: true});
  console.log(req.body);
  res.status(200).send("update to order " + orderId + " done!");
});

exports.app = functions.https.onRequest(app);

