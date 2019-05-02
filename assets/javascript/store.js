$(document).ready(function() {
    // API Key
    var key = 'AIzaSyAjPUiHLNjRPcyzFmwYYuee5s5xr8Ft0MU'; 

   // To hide the google maps iframe
   $("iframe").hide();

  //When the user enters zip code and clicks "Go"
   $("#zipcodeSubmit").on("click", function() {

        // To capture the user's zip code when the user clicks Go
        event.preventDefault();
        console.log("clicked");
        var zipCode = $("#zipcode").val();
        console.log("user zip code: " + zipCode);

        var queryURL = "https://www.google.com/maps/embed/v1/search?key=" + key + "&q=record+grocery+stores+near+" + zipCode;

        // Update the Google Maps URL src with the user's zip code.
        $("iframe").attr("src", queryURL);
        console.log(queryURL)
        $("iframe").show();
   });

});