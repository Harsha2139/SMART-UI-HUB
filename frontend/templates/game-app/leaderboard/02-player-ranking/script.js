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

const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (
        window.innerWidth <= 900 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== menuButton
    ) {
        sidebar.classList.remove("open");
    }
});

/* NAVIGATION */

document.querySelectorAll(".nav-item").forEach((item) => {

    item.addEventListener("click", (event) => {

        event.preventDefault();

        document.querySelectorAll(".nav-item").forEach((nav) => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const section = item.textContent.trim();

        if (section !== "Player Ranking") {
            showToast(`${section} selected.`);
        }

        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }
    });
});

/* FILTER TABS */

const filterTabs = document.querySelectorAll(".filter-tab");

filterTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        filterTabs.forEach((item) => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        showToast(`${tab.textContent.trim()} rankings loaded.`);
    });
});

/* GAME FILTER */

document.getElementById("gameFilter").addEventListener("change", (event) => {
    showToast(`${event.target.value} rankings selected.`);
});

/* RANK FILTER */

const rankFilter = document.getElementById("rankFilter");
const rankingList = document.getElementById("rankingList");

rankFilter.addEventListener("change", () => {

    const rows = [...rankingList.querySelectorAll(".ranking-row")];

    const value = rankFilter.value;

    if (value === "Rating: High to Low") {

        rows.sort((a, b) => {
            return Number(b.dataset.rating) - Number(a.dataset.rating);
        });

    } else if (value === "Rating: Low to High") {

        rows.sort((a, b) => {
            return Number(a.dataset.rating) - Number(b.dataset.rating);
        });

    } else if (value === "Win Rate") {

        rows.sort((a, b) => {
            return Number(b.dataset.win) - Number(a.dataset.win);
        });
    }

    rows.forEach((row, index) => {

        const rank = row.querySelector(".rank");

        if (rank) {
            rank.firstChild.textContent =
                String(index + 1).padStart(2, "0") + " ";
        }

        rankingList.appendChild(row);
    });

    showToast(`${value} sorting applied.`);
});

/* PLAYER SEARCH */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    const rows = rankingList.querySelectorAll(".ranking-row");

    rows.forEach((row) => {

        const playerName = row.dataset.name.toLowerCase();

        row.style.display =
            playerName.includes(query) ? "grid" : "none";
    });
});

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const query = searchInput.value.trim();

        if (query) {
            showToast(`Searching rankings for "${query}"...`);
        } else {
            showToast("Enter a player name.");
        }
    }
});

/* COMPARE MODAL */

const compareModal = document.getElementById("compareModal");
const compareBtn = document.getElementById("compareBtn");
const closeCompare = document.getElementById("closeCompare");
const compareSubmit = document.getElementById("compareSubmit");

compareBtn.addEventListener("click", () => {
    compareModal.classList.add("show");
});

closeCompare.addEventListener("click", () => {
    compareModal.classList.remove("show");
});

compareModal.addEventListener("click", (event) => {

    if (event.target === compareModal) {
        compareModal.classList.remove("show");
    }
});

compareSubmit.addEventListener("click", () => {

    const playerOne = document.getElementById("playerOne").value;
    const playerTwo = document.getElementById("playerTwo").value;

    if (playerOne === playerTwo) {
        showToast("Please select two different players.");
        return;
    }

    compareModal.classList.remove("show");

    showToast(`Comparing ${playerOne} with ${playerTwo}.`);
});

/* REFRESH */

document.getElementById("refreshBtn").addEventListener("click", () => {

    const button = document.getElementById("refreshBtn");

    button.textContent = "↻ Updating...";

    setTimeout(() => {

        button.textContent = "↻ Refresh";

        showToast("Player rankings updated.");

    }, 900);
});

/* LOAD MORE */

document.getElementById("loadMoreBtn").addEventListener("click", () => {

    const button = document.getElementById("loadMoreBtn");

    button.textContent = "Loading...";

    setTimeout(() => {

        button.textContent = "Load More Players";

        showToast("More player rankings are available in the next page.");

    }, 800);
});

/* PROFILE */

document.getElementById("profileBtn").addEventListener("click", () => {
    showToast("Opening Jordan Davis profile.");
});

/* NOTIFICATIONS */

document.getElementById("bellButton").addEventListener("click", () => {
    showToast("You have 3 new ranking notifications.");
});

/* MINI PROFILE MENU */

document.getElementById("miniMenu").addEventListener("click", () => {
    showToast("Player profile options opened.");
});

/* LOGOUT */

document.getElementById("logoutBtn").addEventListener("click", () => {

    const confirmed = confirm("Are you sure you want to sign out?");

    if (confirmed) {
        showToast("Sign out action completed.");
    }
});

/* ESCAPE */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        compareModal.classList.remove("show");
        sidebar.classList.remove("open");
    }
});