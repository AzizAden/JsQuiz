var startBtnEl = document.getElementById("startBtn");
var questionEl = document.getElementById("question");
var startEl = document.getElementById("start");
var timeEl = document.getElementById('timeLeft');
var answerEls = document.querySelectorAll('.choices a');
var score = 0;
var questionsAndAnswers = [
  {
    question: "Var, let, and const are all examples of what?",
    choices: ["Functions", "Arrays", "Variables", "HTML Elements"],
    answer: "Variables"
  },
  {
    question: "In what specific way should our lines of code be written in?",
    choices: ["Camel case", "Lowercase", "With plenty of space", "In cascading style"],
    answer: "Camel case"
  },
  {
    question: "What is used to store multiple values in JavaScript?",
    choices: ["Functions", "Arrays", "Variables", "Global tags"],
    answer: "Arrays"
  },
  {
    question: "A set of statements that performs a task is called what?",
    choices: ["Function", "Variable", "Global tag", "Array"],
    answer: "Function"
  },
  {
    question: "Who is the creator of JavaScript?",
    choices: ["Gabe Newell", "Brendan Eich", "Bill Gates", "Friedrich Java"],
    answer: "Brendan Eich"
  }
];
var currentIndex = 0;

function startQuiz() {
  startEl.classList.add("hide");
  questionEl.classList.remove("hide");
  timeEl.classList.remove("hide");
  startTimer();
  showQuestion();
  showChoices();
  answerEls.forEach(function(answerEl) {
    answerEl.addEventListener('click', onAnswer);
  });
}

function onAnswer(e) {
  var selectedAnswer = e.target.textContent;
  var currentQuestion = questionsAndAnswers[currentIndex];
  
  if (selectedAnswer === currentQuestion.answer) {
    score++;
  } else {
    // Penalize for incorrect answer
    secondsLeft -= 5;
  }

  currentIndex++;

  if (currentIndex < questionsAndAnswers.length) {
    showQuestion();
    showChoices();
  } else {
    endQuiz();
  }
}

function startTimer() {
  var secondsLeft = 60;

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  document.getElementById("promptText").textContent = questionsAndAnswers[currentIndex].question;
}

function showChoices() {
  var choices = questionsAndAnswers[currentIndex].choices;
  var choiceEls = document.querySelectorAll('.choices a');

  choiceEls.forEach(function(choiceEl, index) {
    choiceEl.textContent = choices[index];
  });
}

function endQuiz() {
  questionEl.classList.add("hide");
  timeEl.classList.add("hide");

  var result = document.createElement("h2");
  result.textContent = "You scored " + score + " out of " + questionsAndAnswers.length + " correct!";
  document.getElementById("quiz").appendChild(result);
}

startBtnEl.addEventListener("click", startQuiz);
