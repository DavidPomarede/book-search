const express = require("express");
const path = require("path");
const morgan = require('morgan');

const mongoose = require("mongoose");
const routes = require("./routes");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(morgan('dev'))

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");
mongoose.connect(process.env.MONGODB_URI || "mongodb://heroku_krq6gtlx:fh5vfmprbi13sg4d0d7crv1qpo@ds023644.mlab.com:23644/heroku_krq6gtlx");

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
