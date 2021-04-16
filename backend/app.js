const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const storyRoutes = require("./routes/story");
const voteRoutes = require("./routes/vote");
mongoose
  .connect(
    "mongodb+srv://mongodb_user:ZMNySECuepUuYe99@clustermean.zwnle.mongodb.net/wahlo?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected successfully to wahlo.");
  })
  .catch((error) => {
    console.log("Connection failed.", error);
  });
let db = mongoose.connection;
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use((req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, Origin, X-Requested-with, Content-Type"
  );
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );
  next();
});

app.use("/api/story",storyRoutes);
app.use("/api/vote",voteRoutes);
module.exports = app;
