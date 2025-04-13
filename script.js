// Global variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeRemaining = 600; // 10 minutes in seconds
let questions = [ // Manually added questions related to Computer Science
  {
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Central Processor Unit", "Computer Personal Unit"]
  },
  {
    question: "Which of the following is NOT a programming language?",
    correct_answer: "HTML",
    incorrect_answers: ["Java", "Python", "C++"]
  },
  {
    question: "Which data structure uses LIFO?",
    correct_answer: "Stack",
    incorrect_answers: ["Queue", "Array", "Linked List"]
  },
  {
    question: "Which company developed the first personal computer?",
    correct_answer: "IBM",
    incorrect_answers: ["Apple", "Microsoft", "Dell"]
  },
  {
    question: "Which algorithm is used for searching an element in a sorted array?",
    correct_answer: "Binary Search",
    incorrect_answers: ["Linear Search", "Depth First Search", "Breadth First Search"]
  },
  {
    question: "What does HTML stand for?",
    correct_answer: "HyperText Markup Language",
    incorrect_answers: ["HyperText Machine Language", "Hyper Tool Markup Language", "HighText Markup Language"]
  },
  {
    question: "Which type of database is SQL?",
    correct_answer: "Relational Database",
    incorrect_answers: ["Non-relational Database", "Object-Oriented Database", "Distributed Database"]
  },
  {
    question: "Which of these is an example of a low-level language?",
    correct_answer: "Assembly Language",
    incorrect_answers: ["Python", "C", "Java"]
  },
  {
    question: "Which protocol is used for email communication?",
    correct_answer: "SMTP",
    incorrect_answers: ["FTP", "HTTP", "IMAP"]
  },
  {
    question: "Which operating system was created by Linus Torvalds?",
    correct_answer: "Linux",
    incorrect_answers: ["Windows", "MacOS", "Android"]
  }
];
let selectedAnswers = []; // Array to store selected answers

// Load quiz data and start the test
function loadQuizData() {
  showLoginPage(); // Directly show the login page since we have hardcoded questions
}

// Show the login page
function showLoginPage() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

// Start the test after login
function startTest() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (name && email) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("quiz-section").classList.remove("hidden");
    document.getElementById("welcome-msg").innerText = `Welcome, ${name}! Let's start the test.`;
    
    // Start the timer
    startTimer();

    // Display the first question
    showQuestion(currentQuestionIndex);
  } else {
    alert("Please enter your name and email to proceed.");
  }
}

// Start the timer countdown
function startTimer() {
  timer = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      showResults();
    } else {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      document.getElementById("time").innerText = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  }, 1000);
}

// Show a specific question based on the index
function showQuestion(index) {
  const question = questions[index];
  document.getElementById("question-box").innerHTML = question.question;
  const options = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5); // Shuffle options
  
  let optionsHtml = '';
  options.forEach((option, i) => {
    optionsHtml += `
      <button class="option-btn" onclick="selectAnswer(${i}, '${option}')">${option}</button>
    `;
  });
  document.getElementById("options-box").innerHTML = optionsHtml;

  // Disable previous button if it's the first question
  document.getElementById("prev-btn").disabled = index === 0;
  // Disable next button if it's the last question
  document.getElementById("next-btn").disabled = index === questions.length - 1;
}

// Select an answer
function selectAnswer(index, answer) {
  // Store selected answer
  selectedAnswers[currentQuestionIndex] = answer;

  // Highlight selected button
  const optionsButtons = document.querySelectorAll(".option-btn");
  optionsButtons.forEach(btn => btn.classList.remove("selected"));
  optionsButtons[index].classList.add("selected");
}

// Move to the next question
function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
  }
}

// Move to the previous question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
  }
}

// Show results after test completion
function showResults() {
  document.getElementById("quiz-section").classList.add("hidden");
  document.getElementById("result-section").classList.remove("hidden");

  const name = document.getElementById("name").value;
  document.getElementById("candidate-name").innerText = `Name: ${name}`;

  // Calculate score
  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.correct_answer) {
      score++;
    }
  });

  document.getElementById("final-score").innerText = `Your score: ${score} / ${questions.length}`;

  // Review answers
  let reviewHtml = '';
  questions.forEach((question, index) => {
    const isCorrect = selectedAnswers[index] === question.correct_answer;
    reviewHtml += `
      <div class="review-block ${isCorrect ? 'correct' : 'wrong'}">
        <strong>Question ${index + 1}:</strong> ${question.question}<br>
        <strong>Your Answer:</strong> ${selectedAnswers[index]}<br>
        <strong>Correct Answer:</strong> ${question.correct_answer}
      </div>
    `;
  });
  document.getElementById("review-answers").innerHTML = reviewHtml;
}

// Restart the test
function restartTest() {
  currentQuestionIndex = 0;
  score = 0;
  timeRemaining = 600;
  selectedAnswers = [];

  // Clear previous result data
  document.getElementById("review-answers").innerHTML = '';
  document.getElementById("final-score").innerText = '';

  // Hide results and show the landing page again
  document.getElementById("result-section").classList.add("hidden");
  document.getElementById("landing-page").classList.remove("hidden");

  // Reload the quiz data
  loadQuizData();
}
