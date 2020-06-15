// Global Variables
var timerEl = document.querySelector("#time-remaining");
var quizQuestionEl = document.querySelector("#quiz");
var quizEl = document.querySelector("#quiz");
var quizCompleteEl = document.querySelector("#quiz-complete");
var quizQuestions = [
    {
        q: "What color is the sky?",
        answers: ["Orange", "Blue", "Green", "Yellow"],
        correctAnswer: "Blue"
    },
    {
        q: "What's your dog's name?",
        answers: ["Blue", "Hub", "Bud", "Peter"],
        answer: "Peter"
    },
    {
        q: "Who plays Forrest Gump?",
        answers: ["Tom Hanks", "Denzel Washington", "Johnny Depp", "Leonardo DiCaprio"],
        answer: "Tom Hanks"
    },
    {
        q: "What's the answer to life?",
        answers: ["Happiness", "Money", "42", "Power"],
        answer: "42"
    }
]
var timeRemaining = quizQuestions.length * 15; // Allows 15 seconds per question
var currentQuestion = 0;

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
    timerEl.style.display = "none";
    quizEl.style.display = "none";
    quizCompleteEl.style.display = "block";
};

// Timer starts immediately when page loads
startTimer();

// Initialize page with the first quiz question
newQuizQuestion();

// Listener for when a quiz answer is clicked
quizEl.addEventListener("click", submitAnswer);