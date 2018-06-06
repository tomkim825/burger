var express = require('express');
var bodyParser = require('body-parser');
var router = require("../controllers/burgers_controller.js");

//*******************************************************************
// **     Above reserved for initializing app  + global variables   **
//*******************************************************************

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server 
// ==============================================================================

var app = express(); // Tells node that we are creating an "express" server
app.use(express.static( 'public/')); //set up static location of assets

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ==============================================================================
// Handlebars CONFIGURATION
// This sets up the basic properties for handlebars 
// ==============================================================================

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ==============================================================================
// Routes CONFIGURATION
// This sets up the basic API routing. Only 1 html page  
// ==============================================================================

var router = require("../controllers/burgers_controller.js");

app.use(router);

// app.get("/", function(req, res) {
//     res.render("index", {
//     //   icecreams: icecreams
//     });
//   });
// var router = express.Router(); // Routing happens using this
// router.get("/", function(req, res) {
//     burger.all(function(data) {
//       var hbsObject = {
//         burger: data
//       };
//       console.log(hbsObject);
//       res.render("index", hbsObject);
//     });
//   });

// ==============================================================================
// LISTENER
// The below code effectively "starts" our server 
// ==============================================================================

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});