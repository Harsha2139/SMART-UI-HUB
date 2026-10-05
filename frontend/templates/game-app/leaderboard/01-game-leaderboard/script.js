const toast = document.getElementById("toast");
const toastMessage = toast.querySelector("p");

const modalOverlay = document.getElementById("modalOverlay");
const filterBtn = document.getElementById("filterBtn");
const closeModal = document.getElementById("closeModal");
const applyFilter = document.getElementById("applyFilter");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const searchInput = document.getElementById("searchInput");
const playersList = document.getElementById("playersList");

function showToast(message) {
    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* FILTER MODAL */

filterBtn.addEventListener("click", () => {
    modalOverlay.classList.add("show");
});

closeModal.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
});

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.classList.remove("show");
    }
});

applyFilter.addEventListener("click", () => {

    const game = document.getElementById("modalGame").value;
    const period = document.getElementById("modalPeriod").value;

    modalOverlay.classList.remove("show");

    showToast(`${game} • ${period} rankings applied.`);
});

/* GAME AND PERIOD SELECT */

document.getElementById("gameSelect").addEventListener("change", (event) => {
    showToast(`${event.target.value} selected.`);
});

document.getElementById("periodSelect").addEventListener("change", (event) => {
    showToast(`${event.target.value} selected.`);
});

/* SEARCH */

searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    const rows = playersList.querySelectorAll(".player-row");

    rows.forEach((row) => {

        const name = row
            .dataset.name
            .toLowerCase();

        if (name.includes(query)) {
            row.style.display = "grid";
        } else {
            row.style.display = "none";
        }
    });
});

searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const query = searchInput.value.trim();

        if (query) {
            showToast(`Searching for "${query}"...`);
        } else {
            showToast("Enter a player name.");
        }
    }
});

/* PAGINATION */

document.querySelectorAll(".page-btn").forEach((button) => {

    button.addEventListener("click", () => {

        if (
            button.classList.contains("disabled") ||
            button.classList.contains("active")
        ) {
            return;
        }

        if (button.textContent.trim() === "›") {
            showToast("Next leaderboard page selected.");
            return;
        }

        if (button.textContent.trim() === "‹") {
            showToast("Previous leaderboard page selected.");
            return;
        }

        document.querySelectorAll(".page-btn").forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        showToast(`Leaderboard page ${button.textContent.trim()} selected.`);
    });
});

/* PROFILE */

document.getElementById("profileBtn").addEventListener("click", () => {
    showToast("Opening your player profile.");
});

/* NOTIFICATIONS */

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("You have 3 new leaderboard notifications.");
});

/* LOGOUT */

document.getElementById("logoutBtn").addEventListener("click", () => {

    const confirmed = confirm("Are you sure you want to logout?");

    if (confirmed) {
        showToast("Logout action completed.");
    }
});

/* SIDEBAR */

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        document.querySelectorAll(".nav-link").forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        const section = link.textContent.trim();

        if (section !== "Leaderboard") {
            showToast(`${section} section selected.`);
        }

        if (window.innerWidth <= 850) {
            sidebar.classList.remove("open");
        }
    });
});

/* CLOSE MOBILE SIDEBAR */

document.addEventListener("click", (event) => {

    if (
        window.innerWidth <= 850 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== menuBtn
    ) {
        sidebar.classList.remove("open");
    }
});

/* ESCAPE KEY */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        modalOverlay.classList.remove("show");
        sidebar.classList.remove("open");
    }
});