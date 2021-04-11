const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mongoDBGTDRouter = require("./routes/mongoDB/GTD.js");

// // support parsing of application/json type post data
// app.use(bodyParser.json());

// //support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongDB
const mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api/mongodb", mongoDBGTDRouter);

app.use(function(req, res) {
     res.status(404).json({"error":"Invalid API Request"});
})

const port = process.env.PORT || 5000;

// Start the listener!
const listener = app.listen(port, () => {
     console.log("❇️Express server is running on port", listener.address().port);
});