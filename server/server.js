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
    res.setHeader('Access-Control-Allow-Methods', '*');
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
        if (e) return next(e);
        res.send(results.ops);
    })
})

const ObjectID = require("mongodb").ObjectID;
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.update(
        { _id: new ObjectID(req.params.id) },
        {
            $set: { 
                subject: req.body.subject,
                location: req.body.location,
                price: req.body.price,
                space: req.body.space,
                icon: req.body.icon
            }
        },
        { safe: true, multi: false },
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ? { msg: 'success' } : {msg: 'error'})
        }
    )
})