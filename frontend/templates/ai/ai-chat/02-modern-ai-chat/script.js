const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const form = document.getElementById("chatForm");
const newChat = document.getElementById("newChat");
const clearBtn = document.getElementById("clearBtn");
const themeBtn = document.getElementById("themeBtn");
const chatList = document.getElementById("chatList");

let chats =
    JSON.parse(localStorage.getItem("novaChats")) || [];

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

function addMessage(text, type, save = true) {

    document.querySelector(".welcome")?.remove();

    const div = document.createElement("div");

    div.className = `message ${type}`;

    div.innerHTML = `
        <div class="message-bubble">
            ${escapeHTML(text)}
        </div>
    `;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

    if (save) {

        chats.push({
            text,
            type
        });

        saveChats();
        renderHistory();
    }
}

function saveChats() {
    localStorage.setItem(
        "novaChats",
        JSON.stringify(chats)
    );
}

function response(text) {

    const msg = text.toLowerCase();

    if (msg.includes("machine learning")) {
        return "Machine Learning is a branch of AI where computers learn patterns from data and use those patterns to make predictions or decisions.";
    }

    if (msg.includes("code")) {
        return "Sure! Tell me the programming language and the problem you want to solve.";
    }

    if (msg.includes("study")) {
        return "A simple plan: DSA for 2 hours, Python/AI for 2 hours, project work for 1 hour and revision for 30 minutes.";
    }

    if (msg.includes("project")) {
        return "Try building an AI chatbot, recommendation system, document analyzer, smart attendance system or AI study assistant.";
    }

    return "Interesting question! 🤖 I'm a frontend demo assistant. Connect an AI API to make my responses intelligent.";
}

function send(text) {

    text = text.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    setTimeout(() => {
        addMessage(response(text), "ai");
    }, 800);
}

form.addEventListener("submit", e => {

    e.preventDefault();

    send(input.value);

});

document.querySelectorAll(".suggestions button")
.forEach(button => {

    button.addEventListener("click", () => {
        send(button.textContent.replace(/^.{2}/, ""));
    });

});

newChat.addEventListener("click", () => {

    messages.innerHTML = `
        <div class="welcome">
            <div class="welcome-icon">✦</div>
            <h2>How can I help you?</h2>
            <p>
                Ask questions, learn concepts,
                generate ideas or solve problems.
            </p>
        </div>
    `;

    chats = [];

    saveChats();

    renderHistory();
});

clearBtn.addEventListener("click", () => {

    chats = [];

    saveChats();

    messages.innerHTML = `
        <div class="welcome">
            <div class="welcome-icon">✦</div>
            <h2>Chat cleared</h2>
            <p>Start a new conversation.</p>
        </div>
    `;

    renderHistory();
});

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "novaDark",
        document.body.classList.contains("dark")
    );

});

function renderHistory() {

    chatList.innerHTML = "";

    const recent = chats
        .filter(item => item.type === "user")
        .slice(-8)
        .reverse();

    recent.forEach(item => {

        const button = document.createElement("button");

        button.className = "history-item";

        button.textContent = item.text;

        button.onclick = () => {

            messages.innerHTML = "";

            chats
                .filter(x => x.text === item.text)
                .forEach(x => addMessage(
                    x.text,
                    x.type,
                    false
                ));
        };

        chatList.appendChild(button);
    });
}

if (localStorage.getItem("novaDark") === "true") {
    document.body.classList.add("dark");
}

if (chats.length) {

    messages.innerHTML = "";

    chats.forEach(item => {
        addMessage(
            item.text,
            item.type,
            false
        );
    });

}

renderHistory();

document.getElementById("attachBtn")
.addEventListener("click", () => {
    alert("Demo attachment feature: connect this button to a file upload/API.");
});

document.getElementById("voiceBtn")
.addEventListener("click", () => {

    if (!("webkitSpeechRecognition" in window)) {
        alert("Speech recognition is not supported in this browser.");
        return;
    }

    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = event => {

        input.value =
            event.results[0][0].transcript;

        input.focus();
    };
});