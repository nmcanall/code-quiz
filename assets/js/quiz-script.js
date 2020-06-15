// Global Variables
var timerEl = document.querySelector("#time-remaining");
var quizQuestionEl = document.querySelector("#quiz");
var formSubmitEl = document.querySelector("#submit-btn");
var quizEl = document.querySelector("#quiz");
var quizCompleteEl = document.querySelector("#quiz-complete");
var highscoresEl = document.querySelector("#highscores");
var highscoreListEl = document.querySelector("#highscore-list");
var quizQuestions = [
    {
        q: "What color is the sky?",
        answers: ["Orange", "Blue", "Green", "Yellow"],
        correctAnswer: "Blue"
    },
    {
        q: "What's your dog's name?",
        answers: ["Blue", "Hub", "Bud", "Peter"],
        correctAnswer: "Peter"
    },
    {
        q: "Who plays Forrest Gump?",
        answers: ["Tom Hanks", "Denzel Washington", "Johnny Depp", "Leonardo DiCaprio"],
        correctAnswer: "Tom Hanks"
    },
    {
        q: "What's the answer to life?",
        answers: ["Happiness", "Money", "42", "Power"],
        correctAnswer: "42"
    }
]
var timeRemaining = quizQuestions.length * 15; // Allows 15 seconds per question
var currentQuestion = 0;
var numCorrect = 0;
var finalScore = 0;
var initials = 0;

// Function to run timer
var startTimer = function() {
    timerEl.textContent = "Time: " + timeRemaining;
    timeRemaining--;
    var interval = setInterval(function() {
        timerEl.textContent = "Time: " + timeRemaining;
        if(timeRemaining === 0) {
            endQuiz();
            document.querySelector("#complete-prompt").textContent = "You've ran out of time.";
            clearInterval(interval);
        }
        if(quizEl.style.display === "none") {
            clearInterval(interval);
        }
        timeRemaining--;
    }, 1000)
};

// Function to process when a quiz answer is clicked
var submitAnswer = function(event) {
    var targetEl = event.target;
    
    // Ensure user clicked on an answer option; if not, return
    if(targetEl.nodeName !== "LI") {
        return;
    }

    // Store users answer and change score
    var userAnswer = targetEl.textContent;
    // currentQuestion value is for the next question; so to get the current, use -1
    if(userAnswer === quizQuestions[currentQuestion - 1].correctAnswer) {
        numCorrect++;
    }
    else {
        timeRemaining -= 10;
    }

    // If not at the end of the quiz, display the next question; otherwise, end the quiz
    if(currentQuestion < quizQuestions.length) {
        newQuizQuestion();
    }
    else {
        endQuiz();
    }
}

// Function to build a new question
var newQuizQuestion = function() {

    // This is the list for possible answers
    var answerListEl = document.querySelector("#answer-list");

    // Clear any current childer of answerListEl
    while(answerListEl.firstChild) {
        answerListEl.removeChild(answerListEl.childNodes[0]);
    }

    // Display new quiz question
    document.querySelector("#quiz-question").textContent = quizQuestions[currentQuestion].q;

    // Build answer list by looping through possible answers
    for(var i = 0; i < quizQuestions[currentQuestion].answers.length; i++) {
        var answerEl = document.createElement("li");
        answerEl.className = "btn-look";
        answerEl.textContent = quizQuestions[currentQuestion].answers[i];
        answerListEl.appendChild(answerEl);
    }

    // Move on to the next question
    currentQuestion++;
}

// Helper function to end the quiz
var endQuiz = function() {

    // Display the end quiz page and remove the take-quiz page
    timerEl.style.display = "none";
    quizEl.style.display = "none";
    highscoresEl.style.display = "none";
    quizCompleteEl.style.display = "block";

    // Update final score
    finalScore = Math.round(numCorrect / quizQuestions.length * 100);
    document.querySelector("#score-prompt").textContent = "Your final score is " + finalScore + "%.";
};

// Saves the form data and loads it in the highscores page
var formInput = function(event) {
    initials = document.querySelector("#initials").value;
    finalScore = Math.round(numCorrect / quizQuestions.length * 100);
    loadHighscore();
}

// Loads highscores and saves data in local storage
var loadHighscore = function() {

    // Display the highscores page and remove the take-quiz page
    quizEl.style.display = "none";
    highscoresEl.style.display = "block";
    quizCompleteEl.style.display = "none";
    console.log(initials, finalScore);

    var scoreEl = document.createElement("li");
    scoreEl.className = "highscore-item";
    scoreEl.textContent = initials + " - " + finalScore + "%";
    highscoreListEl.appendChild(scoreEl);
}

// Timer starts immediately when page loads
startTimer();

// Initialize page with the first quiz question
newQuizQuestion();

// Listener for when a quiz answer is clicked
quizEl.addEventListener("click", submitAnswer);

// Listener for when a quiz answer is clicked
formSubmitEl.addEventListener("click", formInput);