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

const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {

    if (
        window.innerWidth <= 900 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== mobileMenu
    ) {
        sidebar.classList.remove("open");
    }

});

/* SIDEBAR NAVIGATION */

document.querySelectorAll(".nav-item").forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        document.querySelectorAll(".nav-item").forEach((nav) => {
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

/* GAME DATA */

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

/* GAME MODAL */

const gameModal = document.getElementById("gameModal");
const modalTitle = document.getElementById("modalTitle");
const modalRank = document.getElementById("modalRank");
const modalIcon = document.getElementById("modalIcon");

document.querySelectorAll(".game-play").forEach((button) => {

    button.addEventListener("click", () => {

        const game = button.dataset.game;
        const data = gameData[game];

        modalTitle.textContent = game;
        modalRank.textContent = data.rank;
        modalIcon.textContent = data.icon;

        gameModal.classList.add("show");

    });

});

document.getElementById("closeModal").addEventListener("click", () => {
    gameModal.classList.remove("show");
});

gameModal.addEventListener("click", (event) => {

    if (event.target === gameModal) {
        gameModal.classList.remove("show");
    }

});

/* LAUNCH GAME */

document.getElementById("launchBtn").addEventListener("click", () => {

    gameModal.classList.remove("show");

    showToast(`Launching ${modalTitle.textContent}...`);

});

/* HERO PLAY */

document.getElementById("playHero").addEventListener("click", () => {

    modalTitle.textContent = "Shadow Strike Championship";
    modalRank.textContent = "Diamond II";
    modalIcon.textContent = "⚔";

    gameModal.classList.add("show");

});

/* HERO DETAILS */

document.getElementById("detailsBtn").addEventListener("click", () => {

    showToast("Championship details opened.");

});

/* SEARCH */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const query = searchInput.value.trim();

        if (query) {
            showToast(`Searching for "${query}"...`);
        } else {
            showToast("Enter a search term.");
        }

    }

});

/* SEARCH SHORTCUT */

document.addEventListener("keydown", (event) => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.style.display = "flex";
        searchInput.focus();

    }

});

/* NOTIFICATIONS */

document.getElementById("notificationBtn").addEventListener("click", () => {

    showToast("You have 3 new notifications.");

});

/* MESSAGES */

document.getElementById("messageBtn").addEventListener("click", () => {

    showToast("You have 2 unread messages.");

});

/* VIEW ALL GAMES */

document.getElementById("viewAllGames").addEventListener("click", () => {

    showToast("Opening complete game library.");

});

/* MATCH HISTORY */

document.getElementById("historyBtn").addEventListener("click", () => {

    showToast("Opening match history.");

});

/* RANKING */

document.getElementById("rankingBtn").addEventListener("click", () => {

    showToast("Opening global leaderboard.");

});

/* ACHIEVEMENTS */

document.getElementById("achievementBtn").addEventListener("click", () => {

    showToast("Opening all achievements.");

});

/* PROFILE MENU */

document.getElementById("profileMenu").addEventListener("click", () => {

    showToast("Player profile options opened.");

});

/* PRO */

document.getElementById("proBtn").addEventListener("click", () => {

    showToast("Opening NexusPlay Pro.");

});

/* SIGN OUT */

document.getElementById("signoutBtn").addEventListener("click", () => {

    const confirmed = confirm("Are you sure you want to sign out?");

    if (confirmed) {
        showToast("Sign out action completed.");
    }

});

/* TOP PROFILE */

document.querySelector(".top-avatar").addEventListener("click", () => {

    showToast("Opening Jordan Davis profile.");

});

/* ESCAPE */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        gameModal.classList.remove("show");
        sidebar.classList.remove("open");

    }

});