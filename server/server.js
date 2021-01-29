const express = require("express");
const app = express();

const PORT = 8080;
app.listen(PORT, console.log(`Server started. Port ${PORT}`));

const mongoClient = require("mongodb").MongoClient;

let db;
mongoClient.connect('mongodb+srv://arasvan:219031@mycluster.ybtia.mongodb.net/cw2?retryWrites=true&w=majority/', (err, client) => {
    db = client.db('cw2');
    })

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
})

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(results);
    })
})

let lessons = [];

app.get("/lessons", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(lessons));
});

app.get("/user", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(user));
});