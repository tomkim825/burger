// -------mySQL section----[START]-------
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,           // Your port; if not 3306
    user: "root",         // Your username
    password: "",       // Your password
    database: "burger_db"
  });
// -------mySQL section----[ END ]-------
// code to start everything off
connection.connect(function(err) {
  if (err) throw err;
    });

module.exports = connection;