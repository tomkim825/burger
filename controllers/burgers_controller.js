var express = require('express'); 
var burger = require('../models/burger.js'); // Import the model (burger.js) to use its database functions.
var router = express.Router(); // Routing happens using this

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) { //index page -- SQL query to retrieve all entries 
    burger.all(function(data) { // all function in ORM to query all burgers
      var hbsObject = {  burger: data }; // creation of handlebars object to hold callback return data from Select ALL query
      res.render("index", hbsObject); //use handlebars to render data from SELECT ALL query to show all burgers in INDEX
    }); //end of ORM all function
  }); //end of router.get 
  
  router.post("/api/burger", function(req, res) { // When 'add burger' button is clicked, AJAX sends info to this route 
    burger.create( [ "burger_name", "devoured" ], [ req.body.name, req.body.devoured], function(result) { // ORM create function takes in burger name as typed into form. Devoured state received from AJAX post, but it will always be "false" for a new burger. could hard code devoured state.
      res.json({ id: result.insertId }); // Send back the ID of the new burger
    }); //end of ORM create function
  }); //end of router.post

  router.put("/api/burger/:id", function(req, res) { //put method for updating. Changes burger state to devoured when devour it button clicked
    var condition = "id = " + req.params.id;  //SQL condition where "ID = {num}"
    burger.update({ devoured: req.body.devoured }, condition, function(result) { //update ORM function to change devoured state. Devoured state could be hard-coded in to be "true" instead of req.body and still work since it doesn't toggle in this app/doesn't vary
      if (result.changedRows == 0) { // safety check to make sure burger id is in database
        return res.status(404).end();  // If no rows were changed, then the ID must not exist, so 404
      } else { res.status(200).end(); } // else everything is ok so retrun a 200 status
    }); //end of ORM update function
  }); //end of router.put

  router.delete("/api/burger/:id", function(req, res) { // delete method for deleting. runs Delete query when delete button clicked
    var condition = "id = " + req.params.id;  //SQL condition where "ID = {num}"
    burger.delete( condition, function(result) { // delete ORM function to run delete query
      return;  // no call back needed. Works without one. Could put console.log confirmation...
    }); //end of ORM delete function
  }); //end of router.delete

  // Export routes for server.js to use.
  module.exports = router;