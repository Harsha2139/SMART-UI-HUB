const toast = document.getElementById("toast");
const modal = document.getElementById("modal");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

function openModal(title, text, action = "Continue Learning") {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalText").textContent = text;
    document.getElementById("modalAction").textContent = action;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

document.getElementById("runCode").addEventListener("click", function() {

    const code = document.getElementById("codeEditor").value;
    const preview = document.getElementById("preview");
    const status = document.getElementById("codeStatus");

    if (!code.trim()) {
        showToast("Write some JavaScript first.");
        return;
    }

    preview.innerHTML = `
        <div class="terminal-line">
            <span class="terminal-symbol">›</span>
            <span>Hello, Student!</span>
        </div>
        <div class="terminal-line">
            <span class="terminal-symbol">›</span>
            <span style="color:#aaa4b7">Code executed successfully.</span>
        </div>
    `;

    status.textContent = "Executed successfully ✓";
    showToast("Code executed successfully!");
});

document.getElementById("resetCode").addEventListener("click", function() {

    document.getElementById("codeEditor").value =
`function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Student"));`;

    document.getElementById("codeStatus").textContent = "Ready to run";

    showToast("Code editor reset.");
});

document.getElementById("clearOutput").addEventListener("click", function() {

    document.getElementById("preview").innerHTML = `
        <span style="color:#686475">
            Console cleared...
        </span>
    `;

    showToast("Console cleared.");
});

document.querySelectorAll(".answer").forEach(function(answer) {

    answer.addEventListener("click", function() {

        document.querySelectorAll(".answer").forEach(function(item) {
            item.classList.remove("correct", "wrong");
        });

        const result = document.getElementById("quizResult");

        if (this.dataset.answer === "correct") {

            this.classList.add("correct");

            result.textContent =
                "✓ Correct! The function keyword is used to declare a function.";

            result.className = "quiz-result show success";

            document.getElementById("progressText").textContent = "67%";
            document.getElementById("progressBar").style.width = "67%";

            showToast("Excellent! Correct answer.");

        } else {

            this.classList.add("wrong");

            result.textContent =
                "Not quite. Try again! Think about the keyword used before a function name.";

            result.className = "quiz-result show error";

            showToast("Try again!");
        }
    });

});

document.getElementById("hintBtn").addEventListener("click", function() {

    openModal(
        "Here's a Hint 💡",
        "Traditional JavaScript function declarations begin with the keyword 'function'.",
        "Got It"
    );

});

document.querySelectorAll(".lesson").forEach(function(lesson) {

    lesson.addEventListener("click", function() {

        if (this.classList.contains("locked")) {
            showToast("Complete the previous lessons to unlock this.");
            return;
        }

        document.querySelectorAll(".lesson").forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const lessonName = this.querySelector("strong").textContent;

        showToast(`Opening ${lessonName}...`);
    });

});

document.getElementById("previousBtn").addEventListener("click", function() {
    showToast("Opening Data Types lesson...");
});

document.getElementById("continueBtn").addEventListener("click", function() {

    openModal(
        "Next Lesson: Arrays",
        "You are ready to learn how JavaScript stores multiple values using arrays.",
        "Start Arrays"
    );

});

document.getElementById("helpBtn").addEventListener("click", function() {

    openModal(
        "Need Help?",
        "Use the interactive editor to experiment with code. Run your code and check the live console output.",
        "Got It"
    );

});

document.getElementById("notificationBtn").addEventListener("click", function() {
    showToast("You have 2 new learning notifications.");
});

document.getElementById("closeModal").addEventListener("click", closeModal);

document.getElementById("modalAction").addEventListener("click", function() {
    closeModal();
    showToast("Ready for the next activity!");
});

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});