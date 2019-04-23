// API Key
var id = 'dbfb23e8'; 
var key = '3bf57d5b8152429180eac42017ed81f9'; 

// User choice variables
var protein = "tofu"
var diet = 'low-carb';
var servings = 0;

var queryURL = "https://api.edamam.com/search?q=" + protein + "&app_id=" + id + "&app_key=" + key + "&diet=" + diet;

$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response){
    var strResponse = JSON.stringify(response)
    console.log("the response is: " 
    + strResponse);
});