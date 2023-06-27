const startBtnEl = document.getElementById("startBtn");
const questionEl = document.getElementById("question");
const timeEl = document.getElementById('timeLeft');
const answerEls = document.querySelectorAll('.choices a');
let score = 0;
const questionsAndAnswers = [
  {
    question: "Commonly used datatypes do not include?",
    choices: ["numbers", "alerts", "strings", "boleans"],
    answer: "boleans"
  },
  {
    question: "What year was Javascript released?",
    choices: ["1996", "2009", "1999", "1982"],
    answer: "1996"
  },
  {
    question: "What is used to store multiple values in JavaScript?",
    choices: ["Functions", "Arrays", "Variables", "Global tags"],
    answer: "Arrays"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal", "for loops", "console.log"],
    answer: "for loops"
  },
  {
    question: "Who is the creator of JavaScript?",
    choices: ["Isaac Newton", "Brendan Eich", "Kanye West", "Paul Bunyan"],
    answer: "Brendan Eich"
  }
];
let currentIndex = 0;
let secondsLeft = 60;

function startQuiz() {
  const startEl = document.getElementById("start");
  startEl.classList.add("hide");
  questionEl.classList.remove("hide");
  timeEl.classList.remove("hide");
  startTimer();
  showQuestion();
  showChoices();
  answerEls.forEach((answerEl) => {
    answerEl.addEventListener('click', onAnswer);
  });
}

function onAnswer(e) {
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
}

startBtnEl.addEventListener("click", startQuiz);
