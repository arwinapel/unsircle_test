const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 1234;
const users = require('./routes/users.route');

// setup DB
const db_url = 'mongodb://localhost:27017/unsircle';
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.log.bind(console, "Error connection mongo"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/users", users);

app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});