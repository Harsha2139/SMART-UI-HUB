const messages =
    document.getElementById("messages");

const input =
    document.getElementById("messageInput");

const sendBtn =
    document.getElementById("sendBtn");

const typing =
    document.getElementById("typing");

const roomTitle =
    document.getElementById("roomTitle");

const searchInput =
    document.getElementById("searchInput");

const emojiPanel =
    document.getElementById("emojiPanel");

let currentRoom = "general";

let roomMessages =
    JSON.parse(
        localStorage.getItem("teamMessages")
    ) || {};


/* =========================
   SAVE
========================= */

function save() {

    localStorage.setItem(
        "teamMessages",
        JSON.stringify(roomMessages)
    );

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================
   INITIAL ROOM
========================= */

if (!roomMessages.general) {

    roomMessages.general = [

        {
            name: "Alex AI",
            avatar: "A",
            text: "Welcome to the team workspace! 👋",
            time: "Now",
            mine: false
        },

        {
            name: "Maya AI",
            avatar: "M",
            text: "We can collaborate on projects, code and ideas here.",
            time: "Now",
            mine: false
        }

    ];

    save();

}


/* =========================
   RENDER
========================= */

function renderMessages() {

    messages.innerHTML = "";

    const list =
        roomMessages[currentRoom] || [];

    list.forEach((item, index) => {

        createMessage(item, index);

    });

    messages.scrollTop =
        messages.scrollHeight;

}

function createMessage(item, index) {

    const div =
        document.createElement("div");

    div.className =
        "message" +
        (item.mine ? " mine" : "");

    div.dataset.index = index;

    div.innerHTML = `

        <div class="message-avatar">
            ${escapeHTML(item.avatar)}
        </div>

        <div class="message-content">

            <div class="message-head">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <small>
                    ${escapeHTML(item.time)}
                </small>

            </div>

            <div class="message-text">
                ${escapeHTML(item.text)}
            </div>

            <div class="reactions">

                <button class="reaction"
                        data-reaction="👍">
                    👍
                </button>

                <button class="reaction"
                        data-reaction="❤️">
                    ❤️
                </button>

            </div>

        </div>
    `;

    div.querySelectorAll(".reaction")
    .forEach(button => {

        button.addEventListener("click", () => {

            button.textContent =
                button.dataset.reaction + " 1";

        });

    });

    messages.appendChild(div);

}


/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const text =
        input.value.trim();

    if (!text) return;

    if (!roomMessages[currentRoom]) {
        roomMessages[currentRoom] = [];
    }

    roomMessages[currentRoom].push({

        name: "You",

        avatar: "Y",

        text,

        time: getTime(),

        mine: true

    });

    save();

    input.value = "";

    renderMessages();

    showTyping();

    setTimeout(() => {

        aiReply(text);

    }, 900);

}

sendBtn.addEventListener(
    "click",
    sendMessage
);

input.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================
   AI REPLY
========================= */

function aiReply(text) {

    const lower =
        text.toLowerCase();

    let agent = "Alex AI";

    let avatar = "A";

    let reply =
        "I can help the team with that! 🤖";

    if (
        lower.includes("code") ||
        lower.includes("bug") ||
        lower.includes("javascript") ||
        lower.includes("python")
    ) {

        agent = "Developer AI";
        avatar = "D";

        reply =
            "Developer AI: I can help analyze the code, find bugs and suggest improvements.";

    }

    else if (
        lower.includes("design") ||
        lower.includes("ui") ||
        lower.includes("ux")
    ) {

        agent = "Designer AI";
        avatar = "🎨";

        reply =
            "Designer AI: I can help with layouts, colors, typography and user experience.";

    }

    else if (
        lower.includes("data") ||
        lower.includes("analysis") ||
        lower.includes("chart")
    ) {

        agent = "Analyst AI";
        avatar = "📊";

        reply =
            "Analyst AI: I can help analyze data, identify patterns and design useful visualizations.";

    }

    else if (
        lower.includes("hello") ||
        lower.includes("hi")
    ) {

        reply =
            "Hello team! 👋 What are we working on today?";

    }

    roomMessages[currentRoom].push({

        name: agent,

        avatar,

        text: reply,

        time: getTime(),

        mine: false

    });

    save();

    hideTyping();

    renderMessages();

}


/* =========================
   TYPING
========================= */

function showTyping() {

    typing.style.display = "block";

}

function hideTyping() {

    typing.style.display = "none";

}


/* =========================
   TIME
========================= */

function getTime() {

    return new Date()
        .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

}


/* =========================
   ROOMS
========================= */

document.querySelectorAll(".room")
.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".room")
        .forEach(x =>
            x.classList.remove("active")
        );

        button.classList.add("active");

        currentRoom =
            button.dataset.room;

        roomTitle.textContent =
            "# " + currentRoom;

        renderMessages();

    });

});


/* =========================
   NEW ROOM
========================= */

document.getElementById("newRoom")
.addEventListener("click", () => {

    const name =
        prompt("Enter room name:");

    if (!name || !name.trim()) return;

    const clean =
        name.trim()
            .toLowerCase()
            .replace(/\s+/g, "-");

    if (!roomMessages[clean]) {

        roomMessages[clean] = [];

        save();

    }

    currentRoom = clean;

    roomTitle.textContent =
        "# " + clean;

    renderMessages();

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    function() {

        const query =
            this.value.toLowerCase();

        document
            .querySelectorAll(".message")
            .forEach(message => {

                message.style.display =
                    message.textContent
                        .toLowerCase()
                        .includes(query)
                        ? "flex"
                        : "none";

            });

    }
);


/* =========================
   CLEAR ROOM
========================= */

document.getElementById("clearBtn")
.addEventListener("click", () => {

    if (
        !confirm(
            "Clear this room's messages?"
        )
    ) return;

    roomMessages[currentRoom] = [];

    save();

    renderMessages();

});


/* =========================
   THEME
========================= */

document.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "teamDark",
        document.body.classList.contains("dark")
    );

});

if (
    localStorage.getItem("teamDark")
    === "true"
) {

    document.body.classList.add("dark");

}


/* =========================
   ATTACHMENT
========================= */

document.getElementById("attachBtn")
.addEventListener("click", () => {

    const fileInput =
        document.createElement("input");

    fileInput.type = "file";

    fileInput.onchange = () => {

        if (fileInput.files.length) {

            input.value +=
                ` 📎 ${fileInput.files[0].name}`;

            input.focus();

        }

    };

    fileInput.click();

});


/* =========================
   EMOJI
========================= */

document.getElementById("emojiBtn")
.addEventListener("click", () => {

    emojiPanel.classList.toggle("show");

});

emojiPanel.addEventListener(
    "click",
    event => {

        const emoji =
            event.target.textContent.trim();

        if (emoji) {

            input.value += emoji;

            input.focus();

            emojiPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================
   AI AGENTS
========================= */

document.querySelectorAll(".agent")
.forEach(agent => {

    agent.addEventListener("click", () => {

        const type =
            agent.dataset.agent;

        if (type === "developer") {

            input.value =
                "@Developer AI help me debug my code";

        }

        if (type === "designer") {

            input.value =
                "@Designer AI help me design this UI";

        }

        if (type === "analyst") {

            input.value =
                "@Analyst AI help me analyze this data";

        }

        input.focus();

    });

});


renderMessages();