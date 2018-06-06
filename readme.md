# Eat Da Burger!
Full stack application using Node.js/Express/MySQL/Handlebars

## Description

This application demonstrates a simple full stack application with a front end implemented with HTML/CSS and the backend implemented with Node.js and Express. HTML templating is done with the help of Handlebars.

The user may enter any burger name to add it to the menu. This also adds the new burger entry into the MySQL database. The initial burger entry is added to the left side of the screen. The user may then eat any burger by clicking on the devour button, which moves it into the adjacent column and updates its status accordingly in the database. The user can also delete the burger, which will also delete it from the database 

## Screenshot
![gif of burger](https://github.com/tomkim825/burger/blob/master/public/assets/img/burger.gif)


## Installation

To run the application locally, first install the application dependencies.

	npm install
	
Finally, run the node server locally.

	node server.js
	
Now, open the local application on port 8080 at the URL: `http://localhost:8080/`.






