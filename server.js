const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const morgan = require('morgan');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(morgan('combined'));
// Add routes, both API and view
app.use(routes);



// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://user1:password1@ds229118.mlab.com:29118/heroku_2km8737x");
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://user1:password1@ds229118.mlab.com:29118/heroku_2km8737x";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
}); 
}); 



// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
