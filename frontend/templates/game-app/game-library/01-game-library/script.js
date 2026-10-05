const searchInput = document.getElementById("searchInput");
const gamesGrid = document.getElementById("gamesGrid");
const gameCount = document.getElementById("gameCount");
const sortSelect = document.getElementById("sortSelect");

const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalAction = document.getElementById("modalAction");

const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function openModal(title, text, icon = "🎮", action = "Continue") {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalIcon.textContent = icon;
    modalAction.textContent = action;

    modalOverlay.classList.add("show");
}

function hideModal() {
    modalOverlay.classList.remove("show");
}

function getVisibleCards() {
    return [...document.querySelectorAll(".game-card")]
        .filter(card => card.style.display !== "none");
}

function updateCount() {
    const count = getVisibleCards().length;
    gameCount.textContent =
        `Showing ${count} ${count === 1 ? "game" : "games"}`;
}

function filterGames(value) {
    const searchValue = value.toLowerCase().trim();

    document.querySelectorAll(".game-card").forEach(card => {
        const name = card.dataset.name.toLowerCase();

        card.style.display =
            name.includes(searchValue) ? "" : "none";
    });

    updateCount();
}

searchInput.addEventListener("input", function () {
    filterGames(this.value);
});

document.querySelectorAll(".heart").forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("liked");

        if (this.classList.contains("liked")) {
            this.textContent = "♥";
            showToast("Game added to favorites ❤️");
        } else {
            this.textContent = "♡";
            showToast("Game removed from favorites.");
        }
    });
});

document.querySelectorAll(".play-game").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".game-card");
        const gameName = card.dataset.name;

        openModal(
            gameName,
            `Launching ${gameName}. Your saved progress will be loaded automatically.`,
            "🎮",
            "Launch Game"
        );
    });
});

document.querySelectorAll(".menu-item").forEach(button => {
    button.addEventListener("click", function () {

        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const filter = this.dataset.filter;

        if (!filter) {
            document.querySelectorAll(".game-card").forEach(card => {
                card.style.display = "";
            });

            searchInput.value = "";
            updateCount();
            showToast("Showing all games.");
            return;
        }

        document.querySelectorAll(".game-card").forEach(card => {
            card.style.display =
                card.dataset.status === filter ? "" : "none";
        });

        searchInput.value = "";
        updateCount();
        showToast(`${filter} games displayed.`);
    });
});

sortSelect.addEventListener("change", function () {
    const cards = [...document.querySelectorAll(".game-card")];

    if (this.value === "name") {
        cards.sort((a, b) =>
            a.dataset.name.localeCompare(b.dataset.name)
        );
    }

    if (this.value === "rating") {
        cards.sort((a, b) =>
            Number(b.dataset.rating) - Number(a.dataset.rating)
        );
    }

    if (this.value === "default") {
        cards.sort((a, b) =>
            Number(b.dataset.rating) - Number(a.dataset.rating)
        );
    }

    cards.forEach(card => gamesGrid.appendChild(card));

    showToast(`Games sorted by ${this.options[this.selectedIndex].text}.`);
});

document.getElementById("browseBtn").addEventListener("click", function () {
    openModal(
        "Browse Games",
        "Explore the complete GameVault catalog and discover new adventures.",
        "🕹️",
        "Explore"
    );
});

document.getElementById("downloadBtn").addEventListener("click", function () {
    openModal(
        "Downloads",
        "You currently have 2 games waiting for updates.",
        "⬇️",
        "Check Updates"
    );
});

document.getElementById("notificationBtn").addEventListener("click", function () {
    openModal(
        "Notifications",
        "You have 3 new game recommendations and 2 achievement updates.",
        "🔔",
        "View Notifications"
    );
});

document.getElementById("profileBtn").addEventListener("click", function () {
    openModal(
        "Jayanth's Profile",
        "Level 24 • 148 hours played • 38 achievements unlocked.",
        "👤",
        "Open Profile"
    );
});

document.getElementById("manageStorage").addEventListener("click", function () {
    openModal(
        "Manage Storage",
        "680 GB of your 1 TB gaming storage is currently being used.",
        "💾",
        "Manage"
    );
});

modalAction.addEventListener("click", function () {
    const action = this.textContent;

    hideModal();

    if (action === "Launch Game") {
        showToast("Game launched successfully! 🎮");
    } else {
        showToast(`${action} selected.`);
    }
});

closeModal.addEventListener("click", hideModal);

modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        hideModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideModal();
    }
});

updateCount();