// array to store each question w/ associated options
var quizQuestions = [{qID: "diet", question: "Do you have dietary restrictions?", options: ["Vegetarian", "Vegan", "Pescatarian", "Nothing in particular"]},
                    {qID: "veggie protein", question: "Pick your protein!", options: ["Tofu", "Tempeh", "Seitan", "Mushrooms", "Anything"], backImg: ""},
                    {qID: "sea protein", question: "Pick your protein!", options: ["Fish", "Shrimp", "Crab", "Lobster", "Clam", "Mussel", "Anything"], backImg: ""},
                    {qID: "meat protein", question: "Pick your protein!", options: ["Beef", "Chicken", "Fish", "Pork", "Anything"], backImg: ""},
                    {qID: "exclude", question: "Ingredients to exclude (use commas to separate if multiple ingredients).", options: ["free answer"], backImg: ""},
                    {qID: "calories", question: "What is your desire calorie range?", options: ["free answer"], backImg: ""},
                    {qID: "quantity", question: "How many are we cooking for?", options: ["free answer"], backImg: ""},
                    {qID: "time", question: "How much time do you have?", options: ["free answer"], backImg: ""}];
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
    }
    else {
      $("#question").html("");

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
    }
    else {
      $("#question").html("");

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
  // dynamically create button
  nextButton = $("<button>", {id: "next-button", text: "Next"});

  console.log("number of options: " + quizQuestions[questionNum].options.length);
  // loop through number of options in each question object
  for(var j=0; j<quizQuestions[questionNum].options.length; j++) {
    console.log("option: " + quizQuestions[questionNum].options[j]);

    // dynamically create a div for an option
    options = $("<div>", {class: "options", text: quizQuestions[questionNum].options[j]});

    // append the option to the question
    question.append(options);
  };

  // append the question (and all options) to the static div w/ id of question in quiz.html
  $("#question").append(question);

  // store the user's choice
  storeAnswers();
};


//function for storing the user's choice for each question
function storeAnswers() {
  $(".options").on("click", function() {
    console.log("user clicked " + $(this).text());

    // store the user's chosen option into the quizQuestion array w/ key userAnswer
    quizQuestions[questionNum].userAnswer = $(this).text().toLowerCase();

    console.log(quizQuestions[questionNum]);
  });
};

function displayResults() {
  // API Key
  var id = 'dbfb23e8'; 
  var key = '3bf57d5b8152429180eac42017ed81f9';


  var queryURL = "https://api.edamam.com/search?q=" + protein + "&app_id=" + id + "&app_key=" + key + "&diet=" + diet;
};

function increment() {
  questionNum++;
};

function decrement() {
  questionNum--;
};