const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

// Define your quiz questions and options
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Madrid", "Rome"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correctAnswer: 0
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correctAnswer: 0
    }
];

// Initialize the quiz
function initializeQuiz() {
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    displayQuestion();
}

// Display the current question and options
function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Clear previous options
    optionsElement.innerHTML = "";

    // Create new options
    const optionLetters = ["a", "b", "c", "d"];
    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = document.createElement("li");
        option.textContent = currentQuestion.options[i];
        option.addEventListener("click", selectOption);
        optionsElement.appendChild(option);


        const optionNumber = document.createElement("span");
        optionNumber.textContent = `${optionLetters[i]}) `;
        option.insertBefore(optionNumber, option.firstChild);
    }
}

// Handle option selection
function selectOption(event) {
    const selectedOption = event.target;
    const optionIndex = selectedOption.dataset.optionIndex;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Check if the selected option is correct
    // if (currentQuestion.correctAnswer === Array.from(optionsElement.children).indexOf(selectedOption)) {
    //     score++;
    // }
    if (currentQuestion.correctAnswer === parseInt(optionIndex)) {
        score++;
    }

    // Disable further selection
    // for (let i = 0; i < optionsElement.children.length; i++) {
    //     optionsElement.children[i].removeEventListener("click", selectOption);
    // }
    const options = Array.from(optionsElement.children);
    options.forEach((option) => {
        option.removeEventListener("click", selectOption);
        option.style.cursor = "default";
    });

    // Move to the next question or show the result
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(displayQuestion, 1000);
    } else {
        setTimeout(showResult, 1000);
    }
}

// Show the quiz result
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultElement.textContent = `You scored ${score} out of ${quizQuestions.length} questions.`;
}

// Restart the quiz
function restartQuiz() {
    initializeQuiz();
}

// Attach event listeners to buttons
submitButton.addEventListener("click", initializeQuiz);
restartButton.addEventListener("click", restartQuiz);

// Initialize the quiz on page load
initializeQuiz();