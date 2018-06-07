var orm = require("../config/orm.js");// Import the ORM to create functions that will interact with the database.

var burger = {
    all: function(cb) {
      orm.all("burgers", function(res) { cb(res); }); //burger.all calls orm.all [this seems redundant in this situation. A complex app may need this extra layer] The 'burgers' argument feeds into SQL table. Since it is not a variable but a hard coded string, it could have been hard coded in ORM and save room
    },
    create: function(cols, vals, cb) { 
      orm.create("burgers", cols, vals, function(res) { cb(res); }); // again this is redunant, burger.create adds nothing to orm.create. Also could have hard coded "burgers" into ORM
    },
    update: function(objColVals, condition, cb) {
      orm.update("burgers", objColVals, condition, function(res) { cb(res);  }); // again.. hard coding "burgers" into ORM can make this code unnecessary. But it is a requirement for this HW...so here it is
    },
    delete: function(condition, cb) {
      orm.delete("burgers", condition, function(res) { cb(res);  }); //I wish this model did more to the ORM functions than add a hard-coded string. Maybe future homeworks will add complexity.
    }
  };

module.exports = burger; // Export the database functions for the controller (burgers_controller.js).