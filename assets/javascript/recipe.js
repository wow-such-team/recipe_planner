// API Key
var id = 'dbfb23e8'; 
var key = '3bf57d5b8152429180eac42017ed81f9'; 

// User choice variables
var protein = "all"
var diet = "balanced";


var queryURL = "https://api.edamam.com/search?q=" + protein + "&app_id=" + id + "&app_key=" + key + "&diet=" + diet;

    // calling the edamam api
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // console logging response from API
    .then(function(response) {
        console.log("API", response)

        var results = response.hits;

        // Looping over every result item for rating
        for (var i = 1; i < results.length; i++) {
            var recDiv = $("<div>");
            recDiv.addClass("recformat");

            var recName = response.hits[i].recipe.label;
            console.log("name", recName)            

            var p = $("<p>").text(recName);

            var recLink = response.hits[i].recipe.url;
            console.log("URL", recLink)            

            var a = $("<a>").attr("href", recLink).text("See Recipe");

            var recipeImage = $("<img>");
                recipeImage.attr({"src": response.hits[i].recipe.image,
                
                });
        
            recDiv.append(p);
            recDiv.append(a);
            recDiv.append(recipeImage); 
            $("#recipes-appear-here").prepend(recDiv);
        }  
        
    $("<button>").on("click", function(){
        diet = "balanced",
                "high-protein",
                "high-fiber",
                "low-fat",
                "low-carb",
                "low-sodium";
        
        
        for (var i = 0; i < diet.length; i++) {
            
        }
        response(diet[i])
    })
});
