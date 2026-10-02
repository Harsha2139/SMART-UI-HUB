const messages = document.getElementById("messages");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

let tasks =
    JSON.parse(localStorage.getItem("dashboardTasks")) || [];

let notes =
    JSON.parse(localStorage.getItem("dashboardNotes")) || [];

let chat =
    JSON.parse(localStorage.getItem("dashboardChat")) || [];

function saveData() {

    localStorage.setItem(
        "dashboardTasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "dashboardNotes",
        JSON.stringify(notes)
    );

    localStorage.setItem(
        "dashboardChat",
        JSON.stringify(chat)
    );
}

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================
   NAVIGATION
========================= */

function showSection(id) {

    document.querySelectorAll(".section")
    .forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(id)
        .classList.add("active");

    document.querySelectorAll(".nav-btn[data-section]")
    .forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.dataset.section === id
        );

    });
}

document.querySelectorAll(".nav-btn[data-section]")
.forEach(button => {

    button.addEventListener("click", () => {
        showSection(button.dataset.section);
    });

});


/* =========================
   CHAT
========================= */

function addChat(text, type, save = true) {

    const div = document.createElement("div");

    div.className = `message ${type}`;

    if (type === "ai") {

        div.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="bubble">
                ${escapeHTML(text)}
            </div>
        `;

    } else {

        div.innerHTML = `
            <div class="bubble">
                ${escapeHTML(text)}
            </div>
        `;
    }

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

    if (save) {

        chat.push({
            text,
            type
        });

        saveData();

        updateStats();
    }
}

function aiResponse(text) {

    const msg = text.toLowerCase();

    if (msg.includes("python")) {
        return "Python is widely used in AI, data science, automation and backend development.";
    }

    if (msg.includes("ai")) {
        return "Artificial Intelligence enables computers to perform tasks such as learning, reasoning, prediction and language processing.";
    }

    if (msg.includes("study")) {
        return "Try a balanced plan: DSA + Python + AI/ML + projects + revision.";
    }

    if (msg.includes("project")) {
        return "Good projects include AI chatbot, recommendation system, document analyzer and AI study assistant.";
    }

    return "I understand your question. 🤖 This dashboard currently uses a local demo AI response.";
}

chatForm.addEventListener("submit", e => {

    e.preventDefault();

    const text = messageInput.value.trim();

    if (!text) return;

    addChat(text, "user");

    messageInput.value = "";

    setTimeout(() => {

        addChat(
            aiResponse(text),
            "ai"
        );

    }, 600);
});

document.querySelectorAll(".suggestions button")
.forEach(button => {

    button.addEventListener("click", () => {

        messageInput.value =
            button.textContent;

        chatForm.requestSubmit();

    });

});


document.getElementById("clearChat")
.addEventListener("click", () => {

    chat = [];

    saveData();

    messages.innerHTML = "";

    addChat(
        "Chat cleared. How can I help?",
        "ai",
        false
    );

    updateStats();

});


/* =========================
   TASKS
========================= */

function renderTasks() {

    const list =
        document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        const item =
            document.createElement("div");

        item.className =
            "task-item" +
            (task.completed
                ? " completed"
                : "");

        item.innerHTML = `
            <input
                type="checkbox"
                class="task-check"
                ${task.completed ? "checked" : ""}
            >

            <div class="task-info">
                <div class="task-name">
                    ${escapeHTML(task.name)}
                </div>
            </div>

            <button class="delete-btn">
                🗑
            </button>
        `;

        item.querySelector(".task-check")
        .addEventListener("change", () => {

            tasks[index].completed =
                !tasks[index].completed;

            saveData();

            renderTasks();

            updateStats();

        });

        item.querySelector(".delete-btn")
        .addEventListener("click", () => {

            tasks.splice(index, 1);

            saveData();

            renderTasks();

            updateStats();

        });

        list.appendChild(item);

    });

    document.getElementById("totalTasks")
        .textContent = tasks.length;

    document.getElementById("completedTasks")
        .textContent =
        tasks.filter(t => t.completed).length;

    document.getElementById("pendingTasks")
        .textContent =
        tasks.filter(t => !t.completed).length;
}

document.getElementById("addTask")
.addEventListener("click", () => {

    const name =
        prompt("Enter task:");

    if (!name || !name.trim()) return;

    tasks.push({
        name: name.trim(),
        completed: false
    });

    saveData();

    renderTasks();

    updateStats();

});


/* =========================
   NOTES
========================= */

function renderNotes() {

    const grid =
        document.getElementById("notesGrid");

    grid.innerHTML = "";

    notes.forEach((note, index) => {

        const card =
            document.createElement("div");

        card.className = "note-card";

        card.innerHTML = `
            <button class="note-delete">
                ×
            </button>

            <h3>
                ${escapeHTML(note.title)}
            </h3>

            <p>
                ${escapeHTML(note.content)}
            </p>
        `;

        card.querySelector(".note-delete")
        .addEventListener("click", () => {

            notes.splice(index, 1);

            saveData();

            renderNotes();

            updateStats();

        });

        grid.appendChild(card);

    });

}

document.getElementById("addNote")
.addEventListener("click", () => {

    const title =
        prompt("Note title:");

    if (!title) return;

    const content =
        prompt("Note content:");

    if (!content) return;

    notes.push({
        title,
        content
    });

    saveData();

    renderNotes();

    updateStats();

});


/* =========================
   WORD COUNTER
========================= */

document.getElementById("counterInput")
.addEventListener("input", function() {

    const text = this.value;

    const words =
        text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

    const chars = text.length;

    const lines =
        text
            ? text.split("\n").length
            : 0;

    document.getElementById("words")
        .textContent = words;

    document.getElementById("chars")
        .textContent = chars;

    document.getElementById("lines")
        .textContent = lines;

});


/* =========================
   CALCULATOR
========================= */

document.getElementById("calculate")
.addEventListener("click", () => {

    const expression =
        document.getElementById("calculator")
        .value.trim();

    const result =
        document.getElementById("calcResult");

    if (!expression) {

        result.textContent =
            "Enter a calculation.";

        return;
    }

    try {

        if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
            throw new Error();
        }

        const answer =
            Function(
                `"use strict"; return (${expression})`
            )();

        result.textContent =
            "Result: " + answer;

    } catch {

        result.textContent =
            "Invalid calculation.";

    }

});


/* =========================
   DARK MODE
========================= */

document.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "dashboardDark",
        document.body.classList.contains("dark")
    );

});

if (
    localStorage.getItem("dashboardDark")
    === "true"
) {
    document.body.classList.add("dark");
}


/* =========================
   STATS
========================= */

function updateStats() {

    document.getElementById("messageCount")
        .textContent = chat.length;

    document.getElementById("taskCount")
        .textContent = tasks.length;

    document.getElementById("noteCount")
        .textContent = notes.length;
}


/* =========================
   NEW CHAT
========================= */

document.getElementById("newChat")
.addEventListener("click", () => {

    showSection("chat");

    chat = [];

    saveData();

    messages.innerHTML = "";

    addChat(
        "New chat started! 🤖",
        "ai",
        false
    );

    updateStats();

});


/* =========================
   LOAD DATA
========================= */

renderTasks();
renderNotes();
updateStats();

if (chat.length) {

    messages.innerHTML = "";

    chat.forEach(item => {

        addChat(
            item.text,
            item.type,
            false
        );

    });

}