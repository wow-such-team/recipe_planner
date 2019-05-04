// set up firebase stuff
var config = {
    apiKey: "AIzaSyBxkFmVfv-fnZ-u8TOdXWB8WdIXEDzFNTI",
    authDomain: "recipesave-277cb.firebaseapp.com",
    databaseURL: "https://recipesave-277cb.firebaseio.com",
    storageBucket: "recipesave-277cb.appspot.com",
};

firebase.initializeApp(config);

var database = firebase.database();

// array for storing current usernames
var usedUsernames = [];
console.log(usedUsernames);

// store value of temporary recipe
var tempRecipe;

// Button for adding username
$("#add-username-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var userName = $("#user-name-input").val().trim();
    
    //checks if username already in use
    for(var i=0; i<=usedUsernames.length; i++) {
        var alreadyUsed = false; // false means username has not been used before
        if(userName===usedUsernames[i]) {
            alreadyUsed = true;
            break;
        }
        else {
            alreadyUsed = false;
            continue;
        }
    }

    // adds username
    if(alreadyUsed===true) {
        console.log("username already taken");

        $("#username-message").text("Username already exists. Please choose another username.");
    }
    else {
        // Creates local "temporary" object for holding employee data
        var newUser = {
            name: userName
        };

        // Uploads employee data to the database
        database.ref().child('users').push(newUser);
    
        // Logs everything to console
        console.log(newUser.name);
        console.log(newUser.recipe);

        // Clears all of the text-boxes
        $("#user-name-input").val("");

        $("#username-message").text("Username successfully created. Please see in 'Current Users' section.");
    };

    // remove username message after 15 seconds
    setTimeout(function() {
        $("#username-message").html("");
    }, 15000);
});

// 3. Create Firebase event for adding users to the database and a row in the html when a user adds an entry
database.ref('users').on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    usedUsernames.push(childSnapshot.val().name);
  
    // dynamically create html elements
    var userNameDiv = $("<td>", {class:"username", text: childSnapshot.val().name});
    var recSaveDiv = $("<td>", {class: "saverecipe", text: "Save Recipe"});
    
    // Employee Info
    console.log(userNameDiv.text());
    console.log(recSaveDiv.text());

    // Create the new row
    var newRow = $("<tr>").append(
        userNameDiv,
        recSaveDiv
    );

    // give row attribute to be later referenced
    newRow.attr("name", userNameDiv.text());

    // Append the new row to the table
    $("#user-table > tbody").append(newRow);

    // when click username, show user's favorites
    $(".username").on("click", function() {
        // console.log("clicked user's name");
        // console.log($(this).text());
        
        // if clicked item text is the same as name value of data
        if($(this).text()===childSnapshot.val().name) {
            console.log("it worked");

            console.log(childSnapshot.val().name);

            // clear previously displayed recipes
            $("#recipe-table-body").html("");

            // update title of box to show which user's favorites are being displayed
            $("#user-favorites-title").text("Favorite Recipes for " + childSnapshot.val().name);

            // get user's favorite recipes from firebase
            database.ref('users').child(childSnapshot.key).child('recipes').on('child_added', function(childSnapshot) {
                console.log(childSnapshot.val());

                // dynamically create elements w/ text to display recipe title & url
                var favRecipeTitle = $("<td>", {text: childSnapshot.val().label});
                var favRecipeLink = $("<a>", {href: childSnapshot.val().url, text: childSnapshot.val().url});
                var linkDiv = $("<td>").append(favRecipeLink);
            
                var newRecipeRow = $("<tr>").append(favRecipeTitle, linkDiv);

                $("#recipe-table > tbody").append(newRecipeRow);;
            });
        };
    });
    
    // save latest quiz result to associated username when 'save recipe' is clicked
    $(".saverecipe").on("click", function() {
        console.log("clicked save recipe");
        console.log(childSnapshot.val().name);
        var selectedName = $(this).closest("tr").attr("name");

        if(selectedName===childSnapshot.val().name) {
            console.log(childSnapshot.val());;
            console.log(childSnapshot.key);

            // push recipe url's into an array to use later to check against
            var recipeArray = [];
            database.ref('users').child(childSnapshot.key).child('recipes').on('child_added', function(childSnapshot) {
                recipeArray.push(childSnapshot.val().url);
            });

            console.log(recipeArray);

            // check if user has already saved recipe
            var checkRecipeSave = false; // false means recipe has not been saved to the username yet
            for(var i=0; i<recipeArray.length; i++) {
                if(recipeArray[i]===tempRecipe.url) {
                    checkRecipeSave = true;
                    console.log("recipe already saved to this username");
                    break;
                }
                else {
                    checkRecipeSave = false;
                    continue;
                }
            };

            if(checkRecipeSave===false) {
                database.ref('users').child(childSnapshot.key).child('recipes').push(tempRecipe);
            }
            else {
                $("#temp-save-message").text("You've already saved this recipe to the selected username.");
                setTimeout(function() {
                    $("#temp-save-message").html("");
                }, 15000);
            }
        };
    });
});

// display temporary recipe
database.ref('temporary').on('value', function(snapshot) {
    tempRecipe = snapshot.val();
    console.log(tempRecipe);

    $("#temp-recipe-title").html(tempRecipe.label);
    $("#temp-recipe-link").html(tempRecipe.url);
    $("#temp-recipe-link").attr("href", tempRecipe.url);
});