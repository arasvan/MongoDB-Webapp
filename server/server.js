const express = require("express");
const app = express();

const PORT = 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

let lessons = [
    {
        "subject": "Maths",
        "location": "Brent Cross",
        "price": 100,
        "space": 5,
        "icon": "graphics/maths_icon.png"
    },
    {
        "subject": "English",
        "location": "Wembley",
        "price": 80,
        "space": 5,
        "icon": "graphics/english_icon.png"
    },
    {
        "subject": "Maths",
        "location": "Wembley",
        "price": 110,
        "space": 5,
        "icon": "graphics/maths_icon.png"
    },
    {
        "subject": "English",
        "location": "Brent Cross",
        "price": 90,
        "space": 5,
        "icon": "graphics/english_icon.png"
    },
    {
        "subject": "Maths",
        "location": "Chelsea",
        "price": 95,
        "space": 5,
        "icon": "graphics/maths_icon.png"
    },
    {
        "subject": "Physics",
        "location": "Edgeware",
        "price": 110,
        "space": 5,
        "icon": "graphics/physics_icon.png"
    },
    {
        "subject": "Chemistry",
        "location": "Brent Cross",
        "price": 65,
        "space": 5,
        "icon": "graphics/chemistry_icon.png"
    },
    {
        "subject": "Biology",
        "location": "Finchley",
        "price": 115,
        "space": 5,
        "icon": "graphics/biology_icon.png"
    },
    {
        "subject": "Music",
        "location": "Greenford",
        "price": 75,
        "space": 5,
        "icon": "graphics/music_icon.png"
    },
    {
        "subject": "Physics",
        "location": "Hampton",
        "price": 80,
        "space": 5,
        "icon": "graphics/physics_icon.png"
    }
];

app.get("/lessons", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(lessons));
});

app.get("/user", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(user));
});