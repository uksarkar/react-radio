const functions = require('firebase-functions');
const app = require("express")();
const { getAllStations, storeStation, addViews } = require("./routes/requests");
const cors = require("cors");
app.use(cors());

app.get("/stations", getAllStations);
app.post("/station", storeStation);
app.post("/addViews", addViews);

exports.api = functions.region("asia-east2").https.onRequest(app);