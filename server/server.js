//dependencies;

const express = require("express");
const app = express();

var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started. Port ${PORT}`));

const mongoClient = require("mongodb").MongoClient;

//connect mongodb;

let db;
mongoClient.connect('mongodb+srv://arasvan:219031@mycluster.ybtia.mongodb.net/', (err, client) => {
    db = client.db('cw2');
})

//setup 'collectionName' parameter;

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
})

//logger middleware;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    console.log("Request " + req.method + " from [" + req.url + "] at " + new Date());
    next();
})

//image loader middleware

var path = require("path");
var fs = require("fs");

app.use(function (req, res, next) {
    var fpath = path.join(__dirname, "static", req.url);
    fs.stat(fpath, (err, finfo) => {
        if (err) {
            next();
            return;
        }
        if (finfo.isFile()) res.sendFile(fpath);
        else next();
    })
})

//get method;

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e);
        res.send(results);
    })
})

//post method;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insertOne(req.body, (e, results) => {
        if (e) return next(e);
        res.send(results.ops);
    })
})

//update lesson database method;

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