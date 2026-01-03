
// DOM elements
const startScreen = document.getElementById("startscreen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");

const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answer: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Float", correct: true },
      { text: "Undefined", correct: false }
    ]
  },
  {
    question: "Which keyword is used to declare a constant variable?",
    answer: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "static", correct: false }
    ]
  },
  {
  question: "Which function is used to convert JSON string into JavaScript object?",
  answer: [
    { text: "JSON.parse()", correct: true },
    { text: "JSON.stringify()", correct: false },
    { text: "parseJSON()", correct: false },
    { text: "convertJSON()", correct: false }
  ]
},
{
  question: "Which keyword is used to declare a block-scoped variable?",
  answer: [
    { text: "var", correct: false },
    { text: "let", correct: true },
    { text: "const", correct: false },
    { text: "static", correct: false }
  ]
},
{
  question: "What will `console.log(typeof NaN)` output?",
  answer: [
    { text: "NaN", correct: false },
    { text: "undefined", correct: false },
    { text: "number", correct: true },
    { text: "object", correct: false }
  ]
}


];

// quiz state
let curretQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

//it will update the questions given
totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);

function startQuiz(){
  curretQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("screen-active");
  resultsScreen.classList.remove("screen-active");
  quizScreen.classList.add("screen-active");

  showQuestions();
}

function showQuestions(){
  answerDisabled = false;
  answersContainer.innerHTML = "";

  const currentQuestion = quizQuestions[curretQuestionIndex];

  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = curretQuestionIndex + 1;

  progressBar.style.width =
    ((curretQuestionIndex + 1) / quizQuestions.length) * 100 + "%";

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(event){
  if(answerDisabled) return;
  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  if(isCorrect){
    score++;
    scoreSpan.textContent = score;
  }

  Array.from(answersContainer.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    curretQuestionIndex++;
    if(curretQuestionIndex < quizQuestions.length){
      showQuestions();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults(){
  quizScreen.classList.remove("screen-active");
  resultsScreen.classList.add("screen-active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if(percentage >= 100){
    resultMessage.textContent = "great, you know js";
  }
  else if(percentage >=80){
    resultMessage.textContent ="good job ! dude"
  }
  else if(percentage >=60){
    resultMessage.textContent ="some revision need"
  }
   else if(percentage >= 40){
    resultMessage.textContent = "lets study,together";
  } else {
    resultMessage.textContent = "PADHLE BHAI ";
  }
}
