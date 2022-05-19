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
    // /* single car API */
    // app.get("/cars/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const car = await carsCollection.findOne(query);
    //   res.send(car);
    // });
    // /* single car delete API */
    // app.delete("/cars/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await carsCollection.deleteOne(query);
    //   res.send(result);
    // });
    // /* new car insert API */
    // app.post("/cars", async (req, res) => {
    //   const newCar = req.body;
    //   const result = await carsCollection.insertOne(newCar);
    //   res.send(result);
    // });
    // /* my items get API */
    // app.get("/my-items", verifyJwt, async (req, res) => {
    //   const email = req.query.email;
    //   const decodedEmail = req.decoded.email;
    //   console.log(email);
    //   if (email === decodedEmail) {
    //     const query = { email: email };
    //     const cursor = carsCollection.find(query);
    //     const myItems = await cursor.toArray();
    //     res.send(myItems);
    //   } else {
    //     res.status(403).send({ message: "Forbidden Access" });
    //   }
    // });
    // /* item quantity update API */
    // app.put("/cars/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updateCar = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const update = {
    //     $set: {
    //       quantity: updateCar.quantity,
    //       sold: updateCar.sold,
    //     },
    //   };
    //   const result = await carsCollection.updateOne(filter, update, options);
    //   res.send(result);
    // });
    // /* item delete API from my items */
    // app.delete("/my-items/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await carsCollection.deleteOne(query);
    //   res.send(result);
    // });
    // /* specific user access token API */
    // app.post("/login", async (req, res) => {
    //   const user = req.body;
    //   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "1d",
    //   });
    //   res.send({ accessToken: accessToken });
    // });
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
