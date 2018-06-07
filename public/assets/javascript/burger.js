// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() { //$ means wait until whole page is loaded
  $(".change-devoured").on("click", function(event) { // button click event to change to devoured
    var id = $(this).data("id"); //get id from button so we know which one to change in SQL query
    var newDevouredState = { devoured: 1 }; //new devoured state is set to true (1) when button clicked
    
    $.ajax("/api/burger/" + id, { // Send the PUT request to change SQL item
      type: "PUT",
      data: newDevouredState //send new devouredstate (true)
    }).then( function() { location.reload(); } ); // Reload the page to get the updated list after the AJAX call is done
  }); //end of change-devoured button click

  $(".delete-burger").on("click", function(event) { // button click event to delete burger
    var id = $(this).data("id");  //get id from button so we know which one to delete in SQL query

    $.ajax("/api/burger/" + id, {  // Send the DELETE request.
      type: "DELETE",
    }).then( function() { console.log("deleted burger"); } ); //nothing needed after AJAX call. Added confirmation
    location.reload(); //if I put this in the promise section of AJAX, it doesn't happen for some reason.
  }); // end of delete button click


  $("#submit").on("click", function(event) { // submit button for ADD BURGER form
    event.preventDefault();     // Make sure to preventDefault on a submit event.

    var newBurger = { //create object to POST to server 
      name: $("#addburger").val().trim(), //get burger name
      devoured: 0 //hard-coded to false since this is logically true
    }; //end of newBurger object

    // Send the POST request.
    $.ajax("/api/burger", {
      type: "POST",
      data: newBurger
    }).then(  function() { location.reload(); } );  // Reload the page to get the updated list
  }); //end of button click for ADD BURGER 
}); //end of function on page load
