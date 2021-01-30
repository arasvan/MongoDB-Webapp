const express = require("express");
const app = express();

var bodyParser = require('body-parser');

const PORT = 3000;
app.listen(PORT, console.log(`Server started. Port ${PORT}`));

const mongoClient = require("mongodb").MongoClient;

let db;
mongoClient.connect('mongodb+srv://arasvan:219031@mycluster.ybtia.mongodb.net/', (err, client) => {
    db = client.db('cw2');
})

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
})

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e);
        res.send(results);
    })
})

app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insertOne(req.body, (e, results) => {
        if (e) return next(e) 
        res.send(results.ops)
    })
})