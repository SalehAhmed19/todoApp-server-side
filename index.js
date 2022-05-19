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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rzir2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const tasksCollection = client.db("Todo").collection("task");
    /* all cars API */
    app.get("/task", async (req, res) => {
      const query = {};
      const cursor = tasksCollection.find(query);
      const tasks = await cursor.toArray();
      res.send(tasks);
    });
    app.delete("/task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await tasksCollection.deleteOne(query);
      res.send(result);
    });
    /* new car insert API */
    app.post("/task", async (req, res) => {
      const newTask = req.body;
      const result = await tasksCollection.insertOne(newTask);
      res.send(result);
    });
  } finally {
    ////
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log("Listening to port: ", port);
});
