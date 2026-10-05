const questions = [
    {
        question: "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        answer: "C"
    },
    {
        question: "Which method is used to print a message to the browser console?",
        options: ["print()", "console.log()", "write()", "display()"],
        answer: "B"
    },
    {
        question: "Which symbol is used for strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "C"
    },
    {
        question: "Which data type represents true or false values?",
        options: ["String", "Boolean", "Number", "Object"],
        answer: "B"
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "join()"],
        answer: "A"
    },
    {
        question: "Which keyword is used to define a function?",
        options: ["method", "function", "define", "func"],
        answer: "B"
    },
    {
        question: "Which operator is used for logical AND?",
        options: ["||", "&&", "!", "&"],
        answer: "B"
    },
    {
        question: "Which value represents an empty or intentionally absent value?",
        options: ["null", "empty", "zero", "undefined-only"],
        answer: "A"
    },
    {
        question: "Which loop is commonly used to iterate over an array?",
        options: ["for", "switch", "if", "try"],
        answer: "A"
    },
    {
        question: "Which keyword creates a block-scoped variable?",
        options: ["var", "let", "global", "define"],
        answer: "B"
    },
    {
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Object Method",
            "Document Order Model",
            "Digital Object Manager"
        ],
        answer: "A"
    },
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()",
            "JSON.toObject()"
        ],
        answer: "A"
    },
    {
        question: "Which event occurs when a user clicks an element?",
        options: ["hover", "submit", "click", "change"],
        answer: "C"
    },
    {
        question: "Which property is used to change the text inside an element?",
        options: ["innerText", "textColor", "content", "valueText"],
        answer: "A"
    },
    {
        question: "Which function converts a string into an integer?",
        options: ["Integer()", "parseInt()", "toInteger()", "numberInt()"],
        answer: "B"
    },
    {
        question: "Which array method creates a new array based on a condition?",
        options: ["filter()", "push()", "sort()", "pop()"],
        answer: "A"
    },
    {
        question: "Which keyword refers to the current object context?",
        options: ["self", "current", "this", "object"],
        answer: "C"
    },
    {
        question: "Which statement is used to handle errors?",
        options: ["try...catch", "if...else", "error...handle", "check...error"],
        answer: "A"
    },
    {
        question: "Which method removes the last element from an array?",
        options: ["push()", "pop()", "remove()", "delete()"],
        answer: "B"
    },
    {
        question: "Which symbol starts a single-line comment in JavaScript?",
        options: ["<!--", "//", "##", "**"],
        answer: "B"
    }
];

let currentQuestion = 0;
let selectedAnswers = {};
let reviewQuestions = new Set();
let timeLeft = 29 * 60 + 45;
let testSubmitted = false;

const timerElement = document.getElementById("timer");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const questionNumber = document.getElementById("questionNumber");
const questionGrid = document.getElementById("questionGrid");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const reviewBtn = document.getElementById("reviewBtn");
const toast = document.getElementById("toast");
const modal = document.getElementById("modal");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

function updateTimer() {

    if (testSubmitted) {
        return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft <= 300) {
        timerElement.parentElement.style.background = "#ffe2df";
    }

    if (timeLeft <= 0) {
        submitTest();
        return;
    }

    timeLeft--;
}

setInterval(updateTimer, 1000);

function loadQuestion(index) {

    currentQuestion = index;

    const question = questions[index];

    questionNumber.textContent =
        String(index + 1).padStart(2, "0");

    questionText.textContent = question.question;

    answersContainer.innerHTML = "";

    question.options.forEach((option, optionIndex) => {

        const letter = String.fromCharCode(65 + optionIndex);

        const button = document.createElement("button");

        button.className = "answer";
        button.dataset.answer = letter;

        button.innerHTML = `
            <span class="option-letter">${letter}</span>
            <span class="option-text">${option}</span>
        `;

        if (selectedAnswers[index] === letter) {
            button.classList.add("selected");
        }

        button.addEventListener("click", function() {
            selectAnswer(letter);
        });

        answersContainer.appendChild(button);
    });

    updateQuestionGrid();
    updateReviewButton();
}

function selectAnswer(letter) {

    selectedAnswers[currentQuestion] = letter;

    document.querySelectorAll(".answer").forEach(function(answer) {
        answer.classList.remove("selected");

        if (answer.dataset.answer === letter) {
            answer.classList.add("selected");
        }
    });

    updateQuestionGrid();
    updateProgress();

    showToast("Answer saved.");
}

function updateProgress() {

    const answeredCount = Object.keys(selectedAnswers).length;

    progressText.textContent = `${answeredCount} / 20`;

    const percentage = (answeredCount / questions.length) * 100;

    progressBar.style.width = `${percentage}%`;
}

function updateQuestionGrid() {

    const buttons = document.querySelectorAll(".question-number");

    buttons.forEach(function(button, index) {

        button.classList.remove("current", "answered", "review");

        if (selectedAnswers[index]) {
            button.classList.add("answered");
        }

        if (reviewQuestions.has(index)) {
            button.classList.add("review");
        }

        if (index === currentQuestion) {
            button.classList.add("current");
        }
    });
}

function updateReviewButton() {

    if (reviewQuestions.has(currentQuestion)) {
        reviewBtn.classList.add("active");
        reviewBtn.textContent = "★ Marked for Review";
    } else {
        reviewBtn.classList.remove("active");
        reviewBtn.textContent = "☆ Mark for Review";
    }
}

document.querySelectorAll(".question-number").forEach(function(button, index) {

    button.addEventListener("click", function() {

        if (testSubmitted) {
            return;
        }

        loadQuestion(index);
    });

});

reviewBtn.addEventListener("click", function() {

    if (reviewQuestions.has(currentQuestion)) {
        reviewQuestions.delete(currentQuestion);
        showToast("Removed from review.");
    } else {
        reviewQuestions.add(currentQuestion);
        showToast("Question marked for review.");
    }

    updateReviewButton();
    updateQuestionGrid();
});

document.getElementById("clearBtn").addEventListener("click", function() {

    if (selectedAnswers[currentQuestion]) {

        delete selectedAnswers[currentQuestion];

        loadQuestion(currentQuestion);
        updateProgress();

        showToast("Answer cleared.");

    } else {

        showToast("No answer to clear.");

    }

});

document.getElementById("previousBtn").addEventListener("click", function() {

    if (currentQuestion === 0) {
        showToast("You are already on the first question.");
        return;
    }

    loadQuestion(currentQuestion - 1);
});

document.getElementById("nextBtn").addEventListener("click", function() {

    if (!selectedAnswers[currentQuestion]) {
        showToast("Select an answer before continuing.");
        return;
    }

    if (currentQuestion === questions.length - 1) {
        openSubmitModal();
        return;
    }

    loadQuestion(currentQuestion + 1);
});

function openSubmitModal() {

    const answered = Object.keys(selectedAnswers).length;
    const unanswered = questions.length - answered;

    document.getElementById("modalTitle").textContent =
        "Submit Test?";

    document.getElementById("modalText").textContent =
        `You have answered ${answered} of 20 questions. ${unanswered} question(s) remain unanswered.`;

    document.getElementById("modalIcon").textContent = "!";

    modal.classList.add("active");
}

function closeSubmitModal() {
    modal.classList.remove("active");
}

function submitTest() {

    if (testSubmitted) {
        return;
    }

    testSubmitted = true;

    closeSubmitModal();

    const correctAnswers = Object.keys(selectedAnswers).filter(index => {
        return selectedAnswers[index] === questions[index].answer;
    }).length;

    document.getElementById("modalTitle").textContent =
        "Test Submitted ✓";

    document.getElementById("modalText").textContent =
        `Your test has been submitted. You answered ${Object.keys(selectedAnswers).length} questions and got ${correctAnswers} correct.`;

    document.getElementById("modalIcon").textContent = "✓";

    document.getElementById("confirmModal").style.display = "none";
    document.getElementById("cancelModal").textContent = "Close";

    modal.classList.add("active");

    showToast("Test submitted successfully.");
}

document.getElementById("submitBtn").addEventListener("click", openSubmitModal);

document.getElementById("confirmModal").addEventListener("click", submitTest);

document.getElementById("cancelModal").addEventListener("click", function() {

    if (testSubmitted) {
        closeSubmitModal();
    } else {
        closeSubmitModal();
    }

});

document.getElementById("closeModal").addEventListener("click", closeSubmitModal);

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeSubmitModal();
    }

});

document.getElementById("helpBtn").addEventListener("click", function() {

    document.getElementById("modalTitle").textContent =
        "Test Instructions";

    document.getElementById("modalText").textContent =
        "Select one answer for each question. Use Mark for Review when you want to return to a question later.";

    document.getElementById("modalIcon").textContent = "?";

    document.getElementById("confirmModal").style.display = "none";
    document.getElementById("cancelModal").textContent = "Got It";

    modal.classList.add("active");
});

document.getElementById("exitBtn").addEventListener("click", function() {

    document.getElementById("modalTitle").textContent =
        "Exit Test?";

    document.getElementById("modalText").textContent =
        "Your current answers will remain on this page, but the assessment will not be submitted.";

    document.getElementById("modalIcon").textContent = "←";

    document.getElementById("confirmModal").style.display = "none";
    document.getElementById("cancelModal").textContent = "Continue Test";

    modal.classList.add("active");
});

loadQuestion(0);
updateProgress();
updateTimer();