const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const { send } = require("express/lib/response");
const port = process.env.PORT || 4000;
const app = express();
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log("Listening to port: ", port);
});
