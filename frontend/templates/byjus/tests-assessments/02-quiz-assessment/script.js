const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        topic: "JavaScript Basics",
        options: ["define", "let", "variable", "declare"],
        answer: 1
    },
    {
        question: "Which symbol is used for a single-line comment?",
        topic: "JavaScript Syntax",
        options: ["<!-- -->", "//", "##", "/* */"],
        answer: 1
    },
    {
        question: "Which method is used to display a message in the browser console?",
        topic: "JavaScript Functions",
        options: ["console.log()", "print()", "display()", "message()"],
        answer: 0
    },
    {
        question: "Which data type represents true or false?",
        topic: "Data Types",
        options: ["String", "Number", "Boolean", "Object"],
        answer: 2
    },
    {
        question: "Which operator is used to compare both value and type?",
        topic: "Operators",
        options: ["==", "=", "===", "!="],
        answer: 2
    },
    {
        question: "Which method adds an element to the end of an array?",
        topic: "Arrays",
        options: ["push()", "add()", "append()", "insert()"],
        answer: 0
    },
    {
        question: "Which keyword is used to define a function?",
        topic: "Functions",
        options: ["function", "method", "func", "define"],
        answer: 0
    },
    {
        question: "Which object is used to interact with the webpage?",
        topic: "DOM",
        options: ["Window", "Document", "Browser", "Page"],
        answer: 1
    },
    {
        question: "Which event occurs when a user clicks an element?",
        topic: "Events",
        options: ["onhover", "onclick", "onload", "onchange"],
        answer: 1
    },
    {
        question: "Which method converts a JSON string into a JavaScript object?",
        topic: "JSON",
        options: ["JSON.parse()", "JSON.convert()", "JSON.object()", "JSON.read()"],
        answer: 0
    }
];

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);
let reviewQuestions = Array(questions.length).fill(false);
let timeLeft = 600;
let quizFinished = false;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");
const progress = document.getElementById("progress");
const timer = document.getElementById("timer");
const questionGrid = document.getElementById("questionGrid");
const answeredCount = document.getElementById("answeredCount");
const miniProgress = document.getElementById("miniProgress");
const reviewBtn = document.getElementById("reviewBtn");

function loadQuestion() {
    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionText.textContent = question.question;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");

        optionElement.className = "option";

        if (selectedAnswers[currentQuestion] === index) {
            optionElement.classList.add("selected");
        }

        optionElement.innerHTML = `
            <div class="option-letter">
                ${String.fromCharCode(65 + index)}
            </div>
            <span>${option}</span>
        `;

        optionElement.addEventListener("click", () => {
            if (quizFinished) return;

            selectedAnswers[currentQuestion] = index;
            loadQuestion();
            updateNavigator();
        });

        optionsContainer.appendChild(optionElement);
    });

    reviewBtn.classList.toggle(
        "active",
        reviewQuestions[currentQuestion]
    );

    reviewBtn.textContent = reviewQuestions[currentQuestion]
        ? "★ Marked for Review"
        : "☆ Mark for Review";

    updateNavigator();
}

function updateNavigator() {
    questionGrid.innerHTML = "";

    questions.forEach((_, index) => {
        const button = document.createElement("button");

        button.textContent = index + 1;

        if (selectedAnswers[index] !== null) {
            button.classList.add("answered");
        }

        if (reviewQuestions[index]) {
            button.classList.add("review");
        }

        if (index === currentQuestion) {
            button.classList.add("current");
        }

        button.addEventListener("click", () => {
            currentQuestion = index;
            loadQuestion();
        });

        questionGrid.appendChild(button);
    });

    const answered = selectedAnswers.filter(
        answer => answer !== null
    ).length;

    answeredCount.textContent =
        `${answered}/${questions.length}`;

    miniProgress.style.width =
        `${(answered / questions.length) * 100}%`;
}

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showSubmitModal();
    }
});

document.getElementById("previousBtn").addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

reviewBtn.addEventListener("click", () => {
    reviewQuestions[currentQuestion] =
        !reviewQuestions[currentQuestion];

    loadQuestion();

    showToast(
        reviewQuestions[currentQuestion]
            ? "Question marked for review"
            : "Review mark removed"
    );
});

document.getElementById("submitBtn").addEventListener("click", () => {
    showSubmitModal();
});

function showSubmitModal() {
    const unanswered = selectedAnswers.filter(
        answer => answer === null
    ).length;

    document.getElementById("submitMessage").textContent =
        unanswered > 0
            ? `You still have ${unanswered} unanswered question${unanswered > 1 ? "s" : ""}. Submit anyway?`
            : "You have answered all questions. Are you ready to submit?";

    document.getElementById("submitModal").classList.add("show");
}

document.getElementById("cancelSubmit").addEventListener("click", () => {
    document.getElementById("submitModal").classList.remove("show");
});

document.getElementById("confirmSubmit").addEventListener("click", () => {
    finishQuiz();
});

function finishQuiz() {
    if (quizFinished) return;

    quizFinished = true;

    document.getElementById("submitModal").classList.remove("show");

    let score = 0;

    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            score++;
        }
    });

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("resultScore").textContent =
        `${percentage}%`;

    document.getElementById("resultText").textContent =
        `You scored ${score} out of ${questions.length}. Keep practicing and continue improving your skills.`;

    document.getElementById("resultModal").classList.add("show");

    clearInterval(timerInterval);
}

document.getElementById("restartBtn").addEventListener("click", () => {
    currentQuestion = 0;
    selectedAnswers = Array(questions.length).fill(null);
    reviewQuestions = Array(questions.length).fill(false);
    timeLeft = 600;
    quizFinished = false;

    document.getElementById("resultModal").classList.remove("show");

    loadQuestion();
    updateTimer();
    startTimer();

    showToast("Quiz restarted!");
});

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("You have no new notifications.");
});

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft <= 60) {
        timer.parentElement.style.background = "#ffe7e7";
        timer.parentElement.style.color = "#d83a3a";
    }

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
    }
}

let timerInterval;

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!quizFinished && timeLeft > 0) {
            timeLeft--;
            updateTimer();
        }
    }, 1000);
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

loadQuestion();
updateTimer();
startTimer();