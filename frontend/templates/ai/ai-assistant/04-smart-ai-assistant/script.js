/* =====================================================
   SMART AI ASSISTANT
   FULL FRONT-END FUNCTIONALITY
===================================================== */


/* =====================================================
   STORAGE
===================================================== */

let tasks =
    JSON.parse(localStorage.getItem("smartAI_tasks")) || [];

let notes =
    JSON.parse(localStorage.getItem("smartAI_notes")) || [];

let messages =
    JSON.parse(localStorage.getItem("smartAI_messages")) || [];

let activities =
    JSON.parse(localStorage.getItem("smartAI_activity")) || [];

let goal =
    localStorage.getItem("smartAI_goal") || "";

let darkMode =
    localStorage.getItem("smartAI_dark") === "true";


/* =====================================================
   ELEMENTS
===================================================== */

const sections =
    document.querySelectorAll(".section");

const navButtons =
    document.querySelectorAll(".nav-btn[data-section]");

const pageTitle =
    document.getElementById("pageTitle");

const dateText =
    document.getElementById("dateText");

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (darkMode) {
        document.body.classList.add("dark");
    }

    updateDate();

    renderTasks();

    renderNotes();

    renderActivities();

    renderMessages();

    updateStats();

    loadGoal();

});


/* =====================================================
   DATE
===================================================== */

function updateDate() {

    const now = new Date();

    dateText.textContent =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
}


/* =====================================================
   NAVIGATION
===================================================== */

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sectionName =
            button.dataset.section;

        openSection(sectionName);

    });

});


function openSection(sectionName) {

    sections.forEach(section => {

        section.classList.remove("active");

    });

    const selected =
        document.getElementById(sectionName);

    if (selected) {

        selected.classList.add("active");

    }


    navButtons.forEach(button => {

        button.classList.remove("active");

        if (
            button.dataset.section ===
            sectionName
        ) {

            button.classList.add("active");

        }

    });


    const titles = {

        home: "Smart AI Dashboard",

        chat: "AI Chat",

        tasks: "Task Manager",

        notes: "My Notes",

        tools: "AI Tools"

    };

    pageTitle.textContent =
        titles[sectionName] || "Smart AI";

}


/* =====================================================
   NEW CHAT
===================================================== */

document
    .getElementById("newChatBtn")
    .addEventListener("click", () => {

        messages = [];

        localStorage.removeItem(
            "smartAI_messages"
        );

        renderMessages();

        openSection("chat");

        addAIMessage(
            "New conversation started! How can I help you?"
        );

    });


/* =====================================================
   START CHAT
===================================================== */

document
    .getElementById("startChatBtn")
    .addEventListener("click", () => {

        openSection("chat");

        document
            .getElementById("chatInput")
            .focus();

    });


/* =====================================================
   CHAT
===================================================== */

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const messagesContainer =
    document.getElementById("messages");


chatForm.addEventListener("submit", event => {

    event.preventDefault();

    const text =
        chatInput.value.trim();

    if (!text) return;

    addUserMessage(text);

    chatInput.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        const response =
            generateAIResponse(text);

        addAIMessage(response);

    }, 600);

});


/* =====================================================
   ADD USER MESSAGE
===================================================== */

function addUserMessage(text) {

    messages.push({
        type: "user",
        text: text,
        time: new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    });

    saveMessages();

    renderMessages();

    addActivity(
        "You sent a message to AI"
    );

    updateStats();

}


/* =====================================================
   ADD AI MESSAGE
===================================================== */

function addAIMessage(text) {

    messages.push({
        type: "ai",
        text: text,
        time: new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    });

    saveMessages();

    renderMessages();

    updateStats();

}


/* =====================================================
   SAVE MESSAGES
===================================================== */

function saveMessages() {

    localStorage.setItem(
        "smartAI_messages",
        JSON.stringify(messages)
    );

}


/* =====================================================
   RENDER MESSAGES
===================================================== */

function renderMessages() {

    messagesContainer.innerHTML = "";

    if (messages.length === 0) {

        messagesContainer.innerHTML = `

            <div class="message ai">

                <div class="message-avatar">
                    🤖
                </div>

                <div class="bubble">
                    Hello! 👋 I'm your Smart AI Assistant.
                    Ask me anything.
                </div>

            </div>

        `;

        return;
    }


    messages.forEach(message => {

        const div =
            document.createElement("div");

        div.className =
            `message ${message.type}`;


        if (message.type === "ai") {

            div.innerHTML = `

                <div class="message-avatar">
                    🤖
                </div>

                <div class="bubble">
                    ${escapeHTML(message.text)}
                </div>

            `;

        } else {

            div.innerHTML = `

                <div class="bubble">
                    ${escapeHTML(message.text)}
                </div>

            `;

        }


        messagesContainer.appendChild(div);

    });


    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}


/* =====================================================
   AI RESPONSE
===================================================== */

function generateAIResponse(input) {

    const text =
        input.toLowerCase();


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
            Hello! 👋 I'm ready to help.
            You can ask me about programming,
            study plans, projects, career preparation,
            tasks or general questions.
        `;

    }


    if (
        text.includes("python")
    ) {

        return `
            Python is a beginner-friendly programming
            language used for web development, automation,
            data analysis, AI and machine learning.

            A good learning order is:
            Python basics → Functions → OOP →
            NumPy → Pandas → DSA → Machine Learning.
        `;

    }


    if (
        text.includes("study") ||
        text.includes("plan")
    ) {

        return `
            📚 Simple study plan:

            1. Learn the concept.
            2. Write the syntax yourself.
            3. Solve an easy problem.
            4. Solve a medium problem.
            5. Build a small project.
            6. Revise what you learned.

            Consistency is more important than studying
            everything in one day.
        `;

    }


    if (
        text.includes("dsa")
    ) {

        return `
            💻 Important DSA topics:

            Arrays → Strings → Hashing →
            Two Pointers → Sliding Window →
            Binary Search → Sorting →
            Linked List → Stack → Queue →
            Trees → BST → Heap → Graphs →
            Greedy → Dynamic Programming.
        `;

    }


    if (
        text.includes("project")
    ) {

        return `
            💡 Project ideas:

            • AI Study Assistant
            • Student Task Manager
            • Expense Analyzer
            • Resume Analyzer
            • Smart Attendance System
            • AI Application Assistant
            • Personal Productivity Dashboard
        `;

    }


    if (
        text.includes("career")
    ) {

        return `
            🚀 For an AI/software career, focus on:

            Python
            DSA
            SQL
            Git/GitHub
            Statistics
            Machine Learning
            Deep Learning
            Generative AI
            APIs
            AI Agents
            Cloud basics
            Real-world projects
        `;

    }


    if (
        text.includes("help") ||
        text.includes("what can")
    ) {

        return `
            🤖 I can help you with:

            • Programming
            • DSA
            • Python
            • AI/ML learning
            • Study planning
            • Project ideas
            • Career preparation
            • Task management
            • Notes
            • Text summarization
            • Calculations
        `;

    }


    if (
        text.includes("motivat")
    ) {

        return `
            🔥 Don't wait until you feel motivated.

            Start with one small task.
            Work for 25 minutes.
            Take a short break.
            Then continue.

            Small progress every day becomes
            a big result over time.
        `;

    }


    return `
        🤖 I understand your question.

        This offline demo assistant uses predefined
        responses. For a real AI assistant, you can later
        connect this interface to an AI API/backend.

        Try asking about Python, DSA, projects,
        study plans, career or motivation.
    `;

}


/* =====================================================
   TYPING
===================================================== */

function showTyping() {

    const div =
        document.createElement("div");

    div.className =
        "message ai";

    div.id =
        "typing";

    div.innerHTML = `

        <div class="message-avatar">
            🤖
        </div>

        <div class="bubble">
            AI is typing...
        </div>

    `;

    messagesContainer.appendChild(div);

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}


function removeTyping() {

    const typing =
        document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}


/* =====================================================
   CLEAR CHAT
===================================================== */

document
    .getElementById("clearChatBtn")
    .addEventListener("click", () => {

        if (
            !confirm(
                "Clear all chat messages?"
            )
        ) return;

        messages = [];

        saveMessages();

        renderMessages();

        showToast("Chat cleared");

    });


/* =====================================================
   SUGGESTIONS
===================================================== */

document
    .querySelectorAll(
        ".suggestions button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                chatInput.value =
                    button.dataset.question;

                chatForm.dispatchEvent(
                    new Event("submit")
                );

            }
        );

    });


/* =====================================================
   COMMANDS
===================================================== */

document
    .querySelectorAll(".command")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const command =
                    button.dataset.command;

                const commands = {

                    study:
                        "Create a study plan for me",

                    code:
                        "Help me with coding",

                    career:
                        "Give me a career guide",

                    ideas:
                        "Give me project ideas",

                    motivate:
                        "Motivate me"

                };

                chatInput.value =
                    commands[command];

                chatForm.dispatchEvent(
                    new Event("submit")
                );

            }
        );

    });


/* =====================================================
   VOICE INPUT
===================================================== */

document
    .getElementById("voiceBtn")
    .addEventListener("click", () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            showToast(
                "Voice recognition not supported"
            );

            return;

        }


        const recognition =
            new SpeechRecognition();

        recognition.lang =
            "en-IN";

        recognition.start();

        showToast(
            "Listening..."
        );


        recognition.onresult =
            event => {

                chatInput.value =
                    event.results[0][0].transcript;

                showToast(
                    "Voice captured"
                );

            };


        recognition.onerror =
            () => {

                showToast(
                    "Voice input failed"
                );

            };

    });


/* =====================================================
   TASK MODAL
===================================================== */

const taskModal =
    document.getElementById("taskModal");

document
    .getElementById("addTaskBtn")
    .addEventListener("click", () => {

        taskModal.classList.add("show");

        document
            .getElementById("taskInput")
            .focus();

    });


/* =====================================================
   QUICK TASK
===================================================== */

document
    .querySelector(
        '[data-action="task"]'
    )
    .addEventListener("click", () => {

        openSection("tasks");

        taskModal.classList.add("show");

    });


/* =====================================================
   SAVE TASK
===================================================== */

document
    .getElementById("saveTaskBtn")
    .addEventListener("click", () => {

        const input =
            document.getElementById(
                "taskInput"
            );

        const priority =
            document.getElementById(
                "taskPriority"
            ).value;

        const name =
            input.value.trim();

        if (!name) {

            showToast(
                "Enter a task name"
            );

            return;

        }


        tasks.push({

            id: Date.now(),

            name: name,

            priority: priority,

            completed: false

        });


        saveTasks();

        renderTasks();

        updateStats();

        addActivity(
            `Task created: ${name}`
        );

        input.value = "";

        taskModal.classList.remove(
            "show"
        );

        showToast(
            "Task added successfully"
        );

    });


/* =====================================================
   SAVE TASKS
===================================================== */

function saveTasks() {

    localStorage.setItem(
        "smartAI_tasks",
        JSON.stringify(tasks)
    );

}


/* =====================================================
   RENDER TASKS
===================================================== */

function renderTasks() {

    const container =
        document.getElementById(
            "taskList"
        );

    container.innerHTML = "";


    if (tasks.length === 0) {

        container.innerHTML = `
            <div class="empty">
                No tasks available.
            </div>
        `;

    }


    tasks.forEach(task => {

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

                <span class="task-priority">
                    ${escapeHTML(task.priority)}
                </span>

            </div>

            <button class="delete-btn">
                🗑
            </button>

        `;


        item
            .querySelector(".task-check")
            .addEventListener(
                "change",
                () => {

                    task.completed =
                        !task.completed;

                    saveTasks();

                    renderTasks();

                    updateStats();

                    showToast(
                        task.completed
                            ? "Task completed"
                            : "Task reopened"
                    );

                }
            );


        item
            .querySelector(".delete-btn")
            .addEventListener(
                "click",
                () => {

                    tasks =
                        tasks.filter(
                            t =>
                                t.id !==
                                task.id
                        );

                    saveTasks();

                    renderTasks();

                    updateStats();

                    showToast(
                        "Task deleted"
                    );

                }
            );


        container.appendChild(item);

    });


    updateTaskStats();

}


/* =====================================================
   TASK STATISTICS
===================================================== */

function updateTaskStats() {

    const total =
        tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;


    document.getElementById(
        "taskTotal"
    ).textContent = total;

    document.getElementById(
        "taskCompleted"
    ).textContent = completed;

    document.getElementById(
        "taskPending"
    ).textContent = pending;

}


/* =====================================================
   NOTES
===================================================== */

document
    .getElementById("addNoteBtn")
    .addEventListener("click", () => {

        document
            .getElementById("noteModal")
            .classList.add("show");

        document
            .getElementById("noteTitle")
            .focus();

    });


document
    .querySelector(
        '[data-action="note"]'
    )
    .addEventListener("click", () => {

        openSection("notes");

        document
            .getElementById("noteModal")
            .classList.add("show");

    });


/* =====================================================
   SAVE NOTE
===================================================== */

document
    .getElementById("saveNoteBtn")
    .addEventListener("click", () => {

        const title =
            document
                .getElementById("noteTitle")
                .value
                .trim();

        const content =
            document
                .getElementById("noteContent")
                .value
                .trim();


        if (!title || !content) {

            showToast(
                "Enter title and note"
            );

            return;

        }


        notes.push({

            id: Date.now(),

            title: title,

            content: content

        });


        saveNotes();

        renderNotes();

        updateStats();

        addActivity(
            `Note created: ${title}`
        );


        document
            .getElementById("noteTitle")
            .value = "";

        document
            .getElementById("noteContent")
            .value = "";


        document
            .getElementById("noteModal")
            .classList.remove(
                "show"
            );


        showToast(
            "Note saved successfully"
        );

    });


/* =====================================================
   SAVE NOTES
===================================================== */

function saveNotes() {

    localStorage.setItem(
        "smartAI_notes",
        JSON.stringify(notes)
    );

}


/* =====================================================
   RENDER NOTES
===================================================== */

function renderNotes() {

    const container =
        document.getElementById(
            "notesGrid"
        );

    container.innerHTML = "";


    if (notes.length === 0) {

        container.innerHTML = `
            <div class="empty">
                No notes available.
            </div>
        `;

        return;

    }


    notes.forEach(note => {

        const card =
            document.createElement("div");

        card.className =
            "note-card";


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


        card
            .querySelector(".note-delete")
            .addEventListener(
                "click",
                () => {

                    notes =
                        notes.filter(
                            n =>
                                n.id !==
                                note.id
                        );

                    saveNotes();

                    renderNotes();

                    updateStats();

                    showToast(
                        "Note deleted"
                    );

                }
            );


        container.appendChild(card);

    });

}


/* =====================================================
   TEXT SUMMARIZER
===================================================== */

document
    .getElementById("summarizeBtn")
    .addEventListener("click", () => {

        const text =
            document
                .getElementById(
                    "summaryInput"
                )
                .value
                .trim();


        if (!text) {

            showToast(
                "Enter text first"
            );

            return;

        }


        const sentences =
            text
                .split(/[.!?]+/)
                .map(
                    sentence =>
                        sentence.trim()
                )
                .filter(Boolean);


        let summary;


        if (sentences.length <= 2) {

            summary = sentences.join(". ") + ".";

        } else {

            summary =
                sentences
                    .slice(0, 2)
                    .join(". ") + ".";

        }


        document.getElementById(
            "summaryResult"
        ).textContent =
            summary;


        addActivity(
            "Used text summarizer"
        );

    });


/* =====================================================
   WORD COUNTER
===================================================== */

document
    .getElementById("counterInput")
    .addEventListener(
        "input",
        updateCounter
    );


function updateCounter() {

    const text =
        document
            .getElementById(
                "counterInput"
            )
            .value;


    const words =
        text.trim()
            ? text.trim().split(/\s+/).length
            : 0;


    const characters =
        text.length;


    const sentences =
        text
            .split(/[.!?]+/)
            .filter(
                sentence =>
                    sentence.trim()
            )
            .length;


    document.getElementById(
        "words"
    ).textContent = words;

    document.getElementById(
        "characters"
    ).textContent = characters;

    document.getElementById(
        "sentences"
    ).textContent = sentences;

}


/* =====================================================
   CALCULATOR
===================================================== */

document
    .getElementById("calculateBtn")
    .addEventListener("click", calculate);


document
    .getElementById("calculatorInput")
    .addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                calculate();

            }

        }
    );


function calculate() {

    const input =
        document
            .getElementById(
                "calculatorInput"
            )
            .value
            .trim();


    if (!input) {

        showToast(
            "Enter a calculation"
        );

        return;

    }


    try {

        /*
          Only allow numbers and math operators.
          This prevents arbitrary JavaScript execution.
        */

        if (
            !/^[0-9+\-*/().%\s]+$/.test(
                input
            )
        ) {

            throw new Error();

        }


        const result =
            Function(
                `"use strict"; return (${input})`
            )();


        document.getElementById(
            "calculatorResult"
        ).textContent =
            `Result: ${result}`;

    } catch {

        document.getElementById(
            "calculatorResult"
        ).textContent =
            "Invalid calculation.";

    }

}


/* =====================================================
   DAILY GOAL
===================================================== */

function loadGoal() {

    const goalText =
        document.getElementById(
            "goalText"
        );

    if (goal) {

        goalText.textContent =
            goal;

    }

}


document
    .getElementById("saveGoalBtn")
    .addEventListener("click", () => {

        const input =
            document.getElementById(
                "goalInput"
            );

        const value =
            input.value.trim();


        if (!value) {

            showToast(
                "Enter a goal"
            );

            return;

        }


        goal = value;

        localStorage.setItem(
            "smartAI_goal",
            goal
        );


        document.getElementById(
            "goalText"
        ).textContent = goal;


        input.value = "";

        addActivity(
            `Daily goal set: ${goal}`
        );

        showToast(
            "Goal saved"
        );

    });


document
    .getElementById("completeGoalBtn")
    .addEventListener("click", () => {

        if (!goal) {

            showToast(
                "Set a goal first"
            );

            return;

        }


        showToast(
            "🎉 Goal completed!"
        );

        addActivity(
            `Completed goal: ${goal}`
        );

        goal = "";

        localStorage.removeItem(
            "smartAI_goal"
        );

        document.getElementById(
            "goalText"
        ).textContent =
            "No goal set";

    });


/* =====================================================
   QUICK SUMMARIZER
===================================================== */

document
    .querySelector(
        '[data-action="summarize"]'
    )
    .addEventListener(
        "click",
        () => {

            openSection("tools");

            document
                .getElementById(
                    "summaryInput"
                )
                .focus();

        }
    );


/* =====================================================
   QUICK ASK AI
===================================================== */

document
    .querySelector(
        '[data-action="chat"]'
    )
    .addEventListener(
        "click",
        () => {

            openSection("chat");

            chatInput.focus();

        }
    );


/* =====================================================
   THEME
===================================================== */

document
    .getElementById("themeBtn")
    .addEventListener("click", () => {

        document.body.classList.toggle(
            "dark"
        );

        darkMode =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "smartAI_dark",
            darkMode
        );


        showToast(
            darkMode
                ? "Dark mode enabled"
                : "Light mode enabled"
        );

    });


/* =====================================================
   CLEAR ALL DATA
===================================================== */

document
    .getElementById("clearDataBtn")
    .addEventListener("click", () => {

        const answer =
            confirm(
                "This will delete all tasks, notes, chat history and activity. Continue?"
            );


        if (!answer) return;


        localStorage.removeItem(
            "smartAI_tasks"
        );

        localStorage.removeItem(
            "smartAI_notes"
        );

        localStorage.removeItem(
            "smartAI_messages"
        );

        localStorage.removeItem(
            "smartAI_activity"
        );

        localStorage.removeItem(
            "smartAI_goal"
        );


        tasks = [];

        notes = [];

        messages = [];

        activities = [];

        goal = "";


        renderTasks();

        renderNotes();

        renderMessages();

        renderActivities();

        updateStats();

        loadGoal();


        showToast(
            "All data cleared"
        );

    });


/* =====================================================
   MODAL CLOSE
===================================================== */

document
    .querySelectorAll(".close-modal")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modalID =
                    button.dataset.close;

                document
                    .getElementById(
                        modalID
                    )
                    .classList.remove(
                        "show"
                    );

            }
        );

    });


/* Close modal when clicking outside */

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


/* =====================================================
   NOTIFICATION
===================================================== */

document
    .getElementById("notificationBtn")
    .addEventListener("click", () => {

        const pending =
            tasks.filter(
                task =>
                    !task.completed
            ).length;


        if (pending === 0) {

            showToast(
                "🎉 No pending tasks"
            );

        } else {

            showToast(
                `You have ${pending} pending task(s)`
            );

        }

    });


/* =====================================================
   ACTIVITIES
===================================================== */

function addActivity(text) {

    activities.unshift({

        text: text,

        time:
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )

    });


    activities =
        activities.slice(0, 10);


    localStorage.setItem(
        "smartAI_activity",
        JSON.stringify(activities)
    );


    renderActivities();

}


function renderActivities() {

    const container =
        document.getElementById(
            "recentActivity"
        );

    container.innerHTML = "";


    if (activities.length === 0) {

        container.innerHTML = `
            <div class="empty">
                No activity yet.
            </div>
        `;

        return;

    }


    activities.forEach(activity => {

        const div =
            document.createElement("div");

        div.className =
            "activity";

        div.innerHTML = `

            ${escapeHTML(activity.text)}

            <span>
                ${escapeHTML(activity.time)}
            </span>

        `;

        container.appendChild(div);

    });

}


/* =====================================================
   STATISTICS
===================================================== */

function updateStats() {

    const completed =
        tasks.filter(
            task =>
                task.completed
        ).length;


    document.getElementById(
        "messageCount"
    ).textContent =
        messages.filter(
            message =>
                message.type === "user"
        ).length;


    document.getElementById(
        "completedCount"
    ).textContent =
        completed;


    document.getElementById(
        "taskCount"
    ).textContent =
        tasks.length;


    document.getElementById(
        "noteCount"
    ).textContent =
        notes.length;

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    toastText.textContent =
        message;

    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}