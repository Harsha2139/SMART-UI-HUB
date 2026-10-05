const toast = document.getElementById("toast");
const toastText = toast.querySelector("p");

let toastTimer;

function showToast(message) {
    toastText.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* MOBILE SIDEBAR */

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {

    if (
        window.innerWidth <= 900 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== menuBtn
    ) {
        sidebar.classList.remove("open");
    }

});

/* SIDEBAR NAVIGATION */

document.querySelectorAll(".nav").forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        document.querySelectorAll(".nav").forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const page = item.textContent.trim();

        if (page !== "Dashboard") {
            showToast(`${page} selected.`);
        }

        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }

    });

});

/* GAME PLAY MODAL */

const gameModal = document.getElementById("gameModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalRank = document.getElementById("modalRank");
const modalGameIcon = document.getElementById("modalGameIcon");

const gameData = {
    "Shadow Strike": {
        icon: "⚔",
        rank: "Diamond II"
    },
    "Galaxy Rush": {
        icon: "🚀",
        rank: "Platinum I"
    },
    "Velocity X": {
        icon: "🏎",
        rank: "Gold III"
    }
};

document.querySelectorAll(".play-btn").forEach((button) => {

    button.addEventListener("click", () => {

        const game = button.dataset.game;
        const data = gameData[game];

        modalTitle.textContent = game;
        modalRank.textContent = data.rank;
        modalGameIcon.textContent = data.icon;

        gameModal.classList.add("show");

    });

});

closeModal.addEventListener("click", () => {
    gameModal.classList.remove("show");
});

gameModal.addEventListener("click", (event) => {

    if (event.target === gameModal) {
        gameModal.classList.remove("show");
    }

});

document.getElementById("startGame").addEventListener("click", () => {

    gameModal.classList.remove("show");

    showToast(`Launching ${modalTitle.textContent}...`);

});

/* PERFORMANCE FILTER */

document.getElementById("performanceRange").addEventListener("change", (event) => {

    showToast(`${event.target.value} performance loaded.`);

});

/* SEARCH */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const query = searchInput.value.trim();

        if (query) {
            showToast(`Searching for "${query}"...`);
        } else {
            showToast("Type something to search.");
        }

    }

});

/* SEARCH BUTTON */

document.getElementById("searchBtn").addEventListener("click", () => {

    searchInput.focus();

    if (window.innerWidth <= 650) {
        searchInput.style.display = "flex";
    }

});

/* NOTIFICATIONS */

document.getElementById("notificationBtn").addEventListener("click", () => {

    showToast("You have 3 new notifications.");

});

/* VIEW ALL GAMES */

document.getElementById("viewGames").addEventListener("click", () => {

    showToast("Opening your complete game library.");

});

/* MATCH HISTORY */

document.getElementById("matchHistory").addEventListener("click", () => {

    showToast("Opening complete match history.");

});

/* ACTIVITY */

document.getElementById("activityBtn").addEventListener("click", () => {

    showToast("Activity options opened.");

});

/* USER MENU */

document.getElementById("userMenu").addEventListener("click", () => {

    showToast("Player profile options opened.");

});

/* UPGRADE */

document.getElementById("upgradeBtn").addEventListener("click", () => {

    showToast("Pro upgrade page opened.");

});

/* LOGOUT */

document.getElementById("logoutBtn").addEventListener("click", () => {

    const confirmed = confirm("Are you sure you want to sign out?");

    if (confirmed) {
        showToast("Sign out action completed.");
    }

});

/* PROFILE */

document.querySelector(".profile-btn").addEventListener("click", () => {

    showToast("Opening Jordan Davis profile.");

});

/* ESCAPE */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        gameModal.classList.remove("show");
        sidebar.classList.remove("open");
    }

});