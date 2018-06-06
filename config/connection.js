// -------mySQL init section----[START]-------
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,           // Your port; if not 3306
    user: "root",         // Your username
    password: "",       // Your password
    database: "burgers_db"
  });
// -------mySQL init section----[ END ]-------

// code to start everything off. Only respond if there is an error
connection.connect( function(err) {  
if (err) throw err;  
console.log("connected as id " + connection.threadId);
});
// Export connection for our ORM to use.
module.exports = connection;