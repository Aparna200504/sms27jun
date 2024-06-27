const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://aparnaprasad2004:4DFL49Jrw0G5TT1P@sms27jun.rd8vmgi.mongodb.net/?retryWrites=true&w=majority&appName=sms27jun";
const dbName = "sms26jun24";

app.post("/save", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection("student");
        const record = { "_id": req.body.rno, "name": req.body.name, "marks": req.body.marks };
        const result = await coll.insertOne(record);
        res.send(result);
    } catch (error) {
        res.send(error);
    } finally {
        await client.close();
    }
});

app.get("/gs", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection("student");
        const result = await coll.find({}).toArray();
        res.send(result);
    } catch (error) {
        res.send(error);
    } finally {
        await client.close();
    }
});

app.delete("/rs", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection("student");
        const record = { "_id": req.body.rno };
        const result = await coll.deleteOne(record);
        res.send(result);
    } catch (error) {
        res.send(error);
    } finally {
        await client.close();
    }
});

app.put("/us", async (req, res) => {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection("student");
        const whom = { "_id": req.body.rno };
        const what = { "$set": { "name": req.body.name, "marks": req.body.marks } };
        const result = await coll.updateOne(whom, what);
        res.send(result);
    } catch (error) {
        res.send(error);
    } finally {
        await client.close();
    }
});

app.listen(9000, () => {
    console.log("ready @9000");
});
