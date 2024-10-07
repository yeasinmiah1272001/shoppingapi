const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
const cors = require("cors");

// midleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// mongodb
const uri = `mongodb+srv://shoppingdata:SfIWPHTIgfAuRUxW@cluster0.qlvqjvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const bookCollection = client.db("shoppingdata").collection("shoppingdata");
    const productCollection = client.db("shoppingdata").collection("products");
    const spicyCollection = client.db("shoppingdata").collection("spicy");
    const ecommarce = client.db("shoppingdata").collection("collection");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // auth releted appi

    app.get("/shopping", async (req, res) => {
      const result = await bookCollection.find().toArray();
      res.send(result);
    });
    app.get("/products", async (req, res) => {
      const result = await productCollection.find().toArray();
      res.send(result);
    });
    app.get("/allspicy", async (req, res) => {
      const result = await spicyCollection.find().toArray();
      res.send(result);
    });
    app.get("/collection", async (req, res) => {
      const result = await ecommarce.find().toArray();
      res.send(result);
    });

    app.get("/", (req, res) => {
      res.send("api-running...");
    });

    app.listen(port, () => {
      console.log(`Simple Crud is Running on port ${port}`);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);
