var config = {
    apiKey: "AIzaSyBxkFmVfv-fnZ-u8TOdXWB8WdIXEDzFNTI",
    authDomain: "recipesave-277cb.firebaseapp.com",
    databaseURL: "https://recipesave-277cb.firebaseio.com",
    storageBucket: "recipesave-277cb.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding username

$("#add-username-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var userName = $("#user-name-input").val().trim();
    var recSave = $("#options-id")

    // Creates local "temporary" object for holding employee data
    var newUser = {
        name: userName,
        recipe: recSave,
    };

    // Uploads employee data to the database
     database.ref().push(newUser);
  
     // Logs everything to console
        console.log(newUser.name);
        console.log(newUser.recipe);

        // Clears all of the text-boxes
        $("#user-name-input").val("");
      

    });

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var userName = childSnapshot.val().name;
    var recSave = childSnapshot.val().recipe;
    
      // Employee Info
        console.log(userName);
        console.log(recSave);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(userName),
        $("<td>").text(recSave),
    );
     // Append the new row to the table
    $("#user-table > tbody").append(newRow);
});
