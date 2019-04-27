$(document).ready(function() {
// API Key
var id = 'dbfb23e8'; 
var key = '3bf57d5b8152429180eac42017ed81f9'; 

// User choice variables
var protein = "chicken";

//Other Global Variables
var from = 0;
var to = 10;

$("#more-recipes").hide();

    //Add 10 more recipes to the page when "more recipes" button clicked-
    
    $("#more-recipes").on("click", function(){
    console.log("clicked")
    
    var queryURL = "https://api.edamam.com/search?q=" + protein + "&from=" + from + "&to=" + to + "&app_id=" + id + "&app_key=" + key;
    
    console.log("from: " + from)
    console.log("to: " + to)
    console.log("URL :" + queryURL);

    // calling the edamam api
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    
    // console logging response from API
    .then(function(response) {
        // console.log("API", response)
    
        var results = response.hits;
        // console.log(results)
    
        // Looping over every result item
        function appendRecipes () {
            for (var i = 0; i < 10; i++) {
            console.log(i)
            var recDiv = $("<div>");
                recDiv.addClass("card");
                recDiv.css("width", "20rem")
    
            var cardBody = $("<div>");
                cardBody.addClass("card-body")
                
            var recipeImage = $("<img>");
                recipeImage.addClass("card-img-top")
                recipeImage.attr({"src": response.hits[i].recipe.image,
                });
                
    
            var recName = response.hits[i].recipe.label;
            console.log("name", recName)            
    
            var p = $("<h4>")
                p.addClass("card-title");
                p.text(recName);
                
    
            var recLink = response.hits[i].recipe.url;
            console.log("URL", recLink)            
    
            var a = $("<a>")
                a.addClass("card-link")
                a.attr("href", recLink).text("See Recipe");
                
    
            var source = $("<p>").addClass("card-text text-muted").text(response.hits[i].recipe.source)
    
            cardBody.append(recipeImage)
            cardBody.append(p) 
            cardBody.append(a)
            cardBody.append(source);
            recDiv.append(cardBody);
            $("#recipes-appear-here").append(recDiv);
            };
        }
        appendRecipes();
        
    })

    // Update the From and To variable to show more recipes
    from += 10;
    to += 10;

    });

    // Capture the user's input into a variable when user clicks "Go"
    $("#searchSubmit").on("click", function() {
        event.preventDefault();
        $("#recipes-appear-here").empty();
        $(".card-columns").remove();
        var userQ = $("#search").val()
        console.log("usertyped: " + userQ);
        
        // Clear the search field
        $("#search").val("");

        // Update the global variable
        protein = userQ;

        // Run the function to append recipes to the page
        var queryURL = "https://api.edamam.com/search?q=" + protein + "&from=" + from + "&to=" + to + "&app_id=" + id + "&app_key=" + key;
    
    console.log("from: " + from)
    console.log("to: " + to)
    console.log("URL :" + queryURL);

    // calling the edamam api
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    
    // console logging response from API
    .then(function(response) {
        // console.log("API", response)
    
        var results = response.hits;
        // console.log(results)
    
        // Looping over every result item
        function appendRecipes () {
            for (var i = 0; i < 10; i++) {
            console.log(i)
            var recDiv = $("<div>");
                recDiv.addClass("card");
                recDiv.css("width", "20rem")
    
            var cardBody = $("<div>");
                cardBody.addClass("card-body")
                
            var recipeImage = $("<img>");
                recipeImage.addClass("card-img-top")
                recipeImage.attr({"src": response.hits[i].recipe.image,
                });
                
    
            var recName = response.hits[i].recipe.label;
            console.log("name", recName)            
    
            var p = $("<h4>")
                p.addClass("card-title");
                p.text(recName);
                
    
            var recLink = response.hits[i].recipe.url;
            console.log("URL", recLink)            
    
            var a = $("<a>")
                a.addClass("card-link")
                a.attr("href", recLink).text("See Recipe");
                
    
            var source = $("<p>").addClass("card-text text-muted").text(response.hits[i].recipe.source)
    
            cardBody.append(recipeImage)
            cardBody.append(p) 
            cardBody.append(a)
            cardBody.append(source);
            recDiv.append(cardBody);
            $("#recipes-appear-here").append(recDiv);
            };
        }
        appendRecipes();
        $("#more-recipes").show();
    })

    // Update the From and To variable to show more recipes
    from += 10;
    to += 10;

    });


});


