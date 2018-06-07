var connection = require("../config/connection.js"); // Import MySQL connection.
// -------------[ start objToSQL() ] ---------------------------
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
// -------------[ end objToSQL() ] ---------------------------
// ************[ start of orm Object for export ]**************
var orm = {
all: function(tableInput, cb) { //all function is READ - selects all burgers in database
    var queryString = "SELECT * FROM " + tableInput + ";";  // in this app, tableInput is always burgers --> 'SELECT * from burgers' Could hard-code this in and it will work. But that would be bad programming
    connection.query(queryString, function(err, result) { //standard mysql query
    if (err) { throw err; } //error reporting
    cb(result); // call back function to return results. 
});  //end of query
}, //end of all
create: function(table, cols, vals, cb) { //create function is CREATE - for add a new burger
    var queryString = "INSERT INTO " + table; // in this app, the query will always be 'INSERT INTO burgers (burger_name, devoured) VALUES(?,?)' Could hard-code this in and it will work. But that would be bad programming 
    queryString += " (";
    queryString += cols.toString(); // this will always be "burger_name, devoured" 
    queryString += ") ";
    queryString += "VALUES ( ?,? ) "; //there are only 2 values -- name and devoured boolean to be parsed from body

    connection.query(queryString, vals, function(err, result) { //standard mysql query
        if (err) { throw err; } //error reporting
        cb(result); // call back function to return results. 
    });  //end of query
}, //end of create
update: function(table, objColVals, condition, cb) { //update function is UPDATE - for changing devoured state from DEFAULT false to true
    var queryString = "UPDATE " + table; // in this app, the query will always be 'UPDATE burgers SET (devoured:true) WHERE id = {{req.params.id}}' Could hard-code everything but the actual id.  
    queryString += " SET ";
    queryString += objToSql(objColVals);  // this will always be "devoured:true" 
    queryString += " WHERE ";
    queryString += condition; // this will be "id={{req.params.id}}"

    connection.query(queryString, function(err, result) { //standard mysql query
        if (err) { throw err; } //error reporting
        cb(result); // call back function to return results. 
    });  //end of query
}, //end of update
delete: function(table, condition, cb) { //delete function is DELETE - for deleting burgers on user click
    var queryString = "DELETE FROM " + table;  // in this app, the query will always be 'DELETE FROM burgers WHERE id = {{req.params.id}}' Could hard-code everything but the actual id. 
    queryString += " WHERE ";
    queryString += condition; // this will be "id={{req.params.id}}"

    connection.query(queryString, function(err, result) { //standard mysql query
        if (err) { throw err; } //error reporting
        cb(result); // call back function to return results. 
    });  //end of query
}//end of DELETE
};
// ************[ end of orm Object for export ]**************

// Export the orm object for the model (burger.js).
module.exports = orm;