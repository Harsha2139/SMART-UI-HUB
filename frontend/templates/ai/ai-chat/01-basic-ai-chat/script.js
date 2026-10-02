const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");
const toast = document.getElementById("toast");

let chatHistory =
    JSON.parse(localStorage.getItem("basicAIChat")) || [];

function saveChat() {
    localStorage.setItem(
        "basicAIChat",
        JSON.stringify(chatHistory)
    );
}

function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function addMessage(text, type, save = true) {

    const message = document.createElement("div");
    message.className = `message ${type}`;

    if (type === "ai") {
        message.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="bubble">${escapeHTML(text)}</div>
        `;
    } else {
        message.innerHTML = `
            <div class="bubble">${escapeHTML(text)}</div>
        `;
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;

    if (save) {
        chatHistory.push({
            text,
            type
        });

        saveChat();
    }
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function getResponse(text) {

    const msg = text.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
        return "Hello! 👋 Nice to meet you.";
    }

    if (msg.includes("what is ai")) {
        return "AI means Artificial Intelligence. It allows computers to perform tasks that normally require human intelligence.";
    }

    if (msg.includes("python")) {
        return "Python is a beginner-friendly programming language widely used in AI, data science, automation and web development.";
    }

    if (msg.includes("study")) {
        return "Try this routine: 2 hours DSA, 1 hour Python, 1 hour projects and 30 minutes revision.";
    }

    if (msg.includes("joke")) {
        return "Why did the programmer quit his job? Because he didn't get arrays! 😄";
    }

    return `I received: "${text}". This is a demo AI response. You can connect a real AI API later.`;
}

function sendMessage(text) {

    text = text.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {
        addMessage(getResponse(text), "ai");
    }, 700);
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    sendMessage(input.value);
});

document.querySelectorAll(".suggestions button")
.forEach(button => {

    button.addEventListener("click", () => {
        sendMessage(button.textContent);
    });

});

clearBtn.addEventListener("click", () => {

    messages.innerHTML = `
        <div class="message ai">
            <div class="avatar">🤖</div>
            <div class="bubble">
                Chat cleared! How can I help you?
            </div>
        </div>
    `;

    chatHistory = [];
    saveChat();

    showToast("Chat cleared");
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "basicTheme",
        document.body.classList.contains("dark")
    );

});

if (localStorage.getItem("basicTheme") === "true") {
    document.body.classList.add("dark");
}

if (chatHistory.length) {

    messages.innerHTML = "";

    chatHistory.forEach(item => {
        addMessage(item.text, item.type, false);
    });
}