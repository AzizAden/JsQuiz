const startBtnEl = document.getElementById("startBtn");
const questionEl = document.getElementById("question");
const timeEl = document.getElementById('timeLeft');
const answerEls = document.querySelectorAll('.choices a');
let score = 0;
const questionsAndAnswers = [
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
let currentIndex = 0;
let secondsLeft = 60;
let quizFinished = false;

function startQuiz() {
  const startEl = document.getElementById("start");
  startEl.classList.add("hide");
  questionEl.classList.remove("hide");
  timeEl.classList.remove("hide");
  score = 0;
  currentIndex = 0;
  secondsLeft = 60;
  quizFinished = false;
  startTimer();
  showQuestion();
  showChoices();
  answerEls.forEach((answerEl) => {
    answerEl.addEventListener('click', onAnswer);
  });
}

function onAnswer(e) {
  if (quizFinished) {
    return;
  }

  const selectedAnswer = e.target.textContent;
  const currentQuestion = questionsAndAnswers[currentIndex];
  
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
  const timerInterval = setInterval(() => {
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
  const choices = questionsAndAnswers[currentIndex].choices;
  const choiceEls = document.querySelectorAll('.choices a');

  choiceEls.forEach((choiceEl, index) => {
    choiceEl.textContent = choices[index];
  });
}

function endQuiz() {
  questionEl.classList.add("hide");
  timeEl.classList.add("hide");

  const result = document.createElement("h2");
  result.textContent = `You scored ${score} out of ${questionsAndAnswers.length} correct!`;
  document.getElementById("quiz").appendChild(result);

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);
  document.getElementById("quiz").appendChild(restartBtn);

  quizFinished = true;
}

function restartQuiz() {
  const result = document.querySelector("h2");
  const restartBtn = document.querySelector("button");
  result.remove();
  restartBtn.remove();
  startQuiz();
}

startBtnEl.addEventListener("click", startQuiz);
