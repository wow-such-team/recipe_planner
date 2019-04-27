// array to store each question w/ associated options
var quizQuestions = [{qID: "diet", question: "Do you have dietary restrictions?", options: ["Vegetarian", "Vegan", "Pescatarian", "Nothing in particular"], backImg: "background8.jpg", userAnswer: ""},
                    {qID: "veggie protein", question: "Pick your protein!", options: ["Tofu", "Tempeh", "Seitan", "Mushrooms", "Anything"], backImg: "vegetable-background.jpeg", userAnswer: ""},
                    {qID: "sea protein", question: "Pick your protein!", options: ["Fish", "Shrimp", "Crab", "Lobster", "Clam", "Mussel", "Anything"], backImg: "pescatarian-background.jpg", userAnswer: ""},
                    {qID: "meat protein", question: "Pick your protein!", options: ["Beef", "Chicken", "Fish", "Pork", "Anything"], backImg: "meat-protein.jpg", userAnswer: ""},
                    {qID: "exclude", question: "Ingredients to exclude (use commas to separate if multiple ingredients).", options: "free answer", backImg: "allergies.jpg", userAnswer: ""},
                    {qID: "calories", question: "What is your desire calorie range?", options: "free answer", backImg: "calories.jpg", userAnswer: ""},
                    {qID: "quantity", question: "How many are we cooking for?", options: "free answer", backImg: "guests.jpg", userAnswer: ""},
                    {qID: "time", question: "How much time do you have?", options: "free answer", backImg: "time.jpg", userAnswer: ""}];
var question; // variable to store dynamically created element for questions
var options; // variable to store dynamically created element for the options for each question
var questionNum; // tracks which question is being displayed

$(document).ready(function() {
  console.log("document ready");

  // start quiz with the first object in question array
  questionNum = 0;
  console.log("question number: " + questionNum);

  displayQuestion(); // display first question

  // user clicks next button to move onto next question
  $("#next-button").on("click", function() {
    console.log("clicked next");

    if(questionNum>=quizQuestions.length-1) {
      console.log("no more questions");
      $("#next-button").attr("data-toggle", "modal");
      $(".modal-body").text("This is the last question. There is nothing after this.");
    }
    else {
      $("#next-button").removeAttr("data-toggle");
      $("#question-id").html("");
      $("#options-id").html("");

      // increment questionNum so that next time displayQuestion is used, the next question object will be used
      increment();
      console.log("question number: " + questionNum);

      displayQuestion();
    };
  });

  $("#previous-button").on("click", function() {
    console.log("clicked previous");

    

    if(questionNum<=0) {
      console.log("You're already on the first question.");
      $("#previous-button").attr("data-toggle", "modal");
      $(".modal-body").text("This is the first question. There's nothing before this.");
    }
    else {
      $("#previous-button").removeAttr("data-toggle");
      $("#question-id").html("");
      $("#options-id").html("");

      decrement();
      console.log("question number: " + questionNum);

      displayQuestion();
    }
  });
});


// function for displaying each question
function displayQuestion() {
  // dynamically create div to store question
  question = $("<div>", {text: quizQuestions[questionNum].question});

  console.log("number of options: " + quizQuestions[questionNum].options.length);
  //if()
  // loop through number of options in each question object
  for(var j=0; j<quizQuestions[questionNum].options.length; j++) {
    console.log("option: " + quizQuestions[questionNum].options[j]);

    // dynamically create a div for an option
    options = $("<div>", {class: "options", text: quizQuestions[questionNum].options[j]});

    // append the option to the question
    $("#options-id").append(options);
  };

  // append the question (and all options) to the static div w/ id of question in quiz.html
  $("#question-id").append(question);

  //change background image depending on question
  $("html").css("background-image", "url('assets/images/" + quizQuestions[questionNum].backImg + "')");
  $("body").css("background-image", "url('assets/images/" + quizQuestions[questionNum].backImg + "')");

  // store the user's choice
  storeAnswers();
};


//function for storing the user's choice for each question
function storeAnswers() {
  $(".options").on("click", function() {
    console.log("user clicked " + $(this).text());

    // adds id to selected option so that background color is different
    $(".options").removeAttr("id");
    $(this).attr("id", "selected");

    // store the user's chosen option into the quizQuestion array w/ key userAnswer
    quizQuestions[questionNum].userAnswer = $(this).text().toLowerCase();

    console.log(quizQuestions[questionNum]);
  });
};

function getResults() {
  // API Key
  var id = 'dbfb23e8'; 
  var key = '3bf57d5b8152429180eac42017ed81f9';

  // results from quiz stored in variables
  var protein;



  var queryURL = "https://api.edamam.com/search?q=" + protein + "&app_id=" + id + "&app_key=" + key + "&diet=" + diet;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
};

// increments questionNum so that the next question displays
function increment() {
  if(questionNum<=quizQuestions.length-1 && questionNum>=0){
    // if one of the protein questions, skips to next non-protein question
    if(questionNum===1 || questionNum===2 || questionNum===3) {
      questionNum = 4;
    }
    // if question is asking type of diet, skips to appropriate protein question
    else if(questionNum===0) {
      if(quizQuestions[0].userAnswer==="vegetarian" || quizQuestions[0].userAnswer==="vegan") {
        console.log("increment veggie or vegan");
        questionNum = 1;
      }
      else if(quizQuestions[0].userAnswer==="pescatarian") {
        console.log("increment seafood");
        questionNum = 2;
      }
      else {
        console.log("increment anything");
        questionNum = 3;
      };
    }
    // for all other questions, just increment
    else {
      questionNum++;
    };
  };
};

// decrements question tracker so that previous question displays
function decrement() {
  if(questionNum<=quizQuestions.length-1 && questionNum>=0){
    console.log(questionNum);
    // if question is right before protein questions, skip to appropriate protein question based on response to diet question
    if(questionNum===4) {
      console.log(quizQuestions[0]);
      if(quizQuestions[0].userAnswer==="vegetarian" || quizQuestions[0].userAnswer==="vegan") {
        console.log("decrement veggie or vegan");
        questionNum = 1;
      }
      else if(quizQuestions[0].userAnswer==="pescatarian") {
        console.log("decrement seafood");
        questionNum = 2;
      }
      else {
        console.log("decrement anything");
        questionNum = 3;
      };
    }
    // if on first question (diet question), skip to appropriate protein question based on diet
    else if(questionNum===1 || questionNum===2 || questionNum===3) {
      questionNum = 0;
    }
    // for all other questions, just decrement
    else {
      questionNum--;
    };
  };
};