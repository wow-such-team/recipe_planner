// array to store each question w/ associated options
var quizQuestions = [{qNum: 1, question: "Pick your protein!", options: ["Beef", "Chicken", "Fish", "Vegetarian"], backImg: ""},
                    {qNum: 2, question: "Spice Level?", options: ["Not spicy at all", "Medium Spice", "Spicy", "Extra spicy"], backImg: ""},
                    {qNum: 3, question: "How many are we cooking for?", options: ["free answer"], backImg: ""},
                    {qNum: 4, question: "How much time do you have?", options: ["free answer"], backImg: ""}];
var question; // variable to store dynamically created element for questions
var options; // variable to store dynamically created element for the options for each question
var questionNum; // tracks which question is being displayed
var nextButton; // variable to store dynamically created next button

$(document).ready(function() {
  console.log("document ready");

  // start quiz with the first object in question array
  questionNum = 0;
  console.log("question number: " + questionNum);

  displayQuestion(); // display first question

  // user clicks next button to move onto next question
  $("#next-button").on("click", function() {
    console.log("clicked next");

    // increment questionNum so that next time displayQuestion is used, the next question object will be used
    questionNum++;
    console.log("question number: " + questionNum);

    $("#question").html("");

    if(questionNum>=quizQuestions.length) {
      console.log("no more questions");
    }
    else {
      displayQuestion();
    };
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

  //append button to question div
  // question.append(nextButton);
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

// function nextOrPrevious() {

// }