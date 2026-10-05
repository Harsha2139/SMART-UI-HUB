const searchInput = document.getElementById("searchInput");
const gamesGrid = document.getElementById("gamesGrid");
const gameCards = document.querySelectorAll(".game-card");

const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
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

function openModal(title, text, actionText = "Continue") {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalAction.textContent = actionText;
    modalOverlay.classList.add("show");
}

function closeGameModal() {
    modalOverlay.classList.remove("show");
}

closeModal.addEventListener("click", closeGameModal);

modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
        closeGameModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeGameModal();
    }
});

searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.toLowerCase().trim();

    gameCards.forEach(card => {
        const gameName = card.dataset.name.toLowerCase();
        const genre = card.dataset.genre.toLowerCase();

        if (
            gameName.includes(searchValue) ||
            genre.includes(searchValue)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

document.querySelectorAll(".play-btn").forEach(button => {
    button.addEventListener("click", function () {
        const gameName = this.closest(".game-card").dataset.name;

        openModal(
            gameName,
            `Ready to start ${gameName}? This demo will open the game experience.`,
            "Start Game"
        );
    });
});

modalAction.addEventListener("click", function () {
    const title = modalTitle.textContent;

    closeGameModal();
    showToast(`${title} experience started! 🎮`);
});

document.querySelectorAll(".genre-btn").forEach(button => {
    button.addEventListener("click", function () {
        const genre = this.dataset.genre;

        searchInput.value = genre;

        gameCards.forEach(card => {
            const gameGenre = card.dataset.genre;

            card.style.display =
                gameGenre === genre ? "" : "none";
        });

        showToast(`${genre} games are now displayed.`);
    });
});

document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", function () {
        const genre = this.dataset.genre;

        searchInput.value = genre;

        gameCards.forEach(game => {
            game.style.display =
                game.dataset.genre === genre ? "" : "none";
        });

        window.scrollTo({
            top: 450,
            behavior: "smooth"
        });

        showToast(`Showing ${genre} games.`);
    });
});

document.getElementById("exploreBtn").addEventListener("click", function () {
    document.querySelector(".games-grid").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("watchBtn").addEventListener("click", function () {
    openModal(
        "Game Trailer",
        "The featured game trailer would play here in a complete gaming platform.",
        "Got It"
    );
});

document.getElementById("viewAllBtn").addEventListener("click", function () {
    searchInput.value = "";

    gameCards.forEach(card => {
        card.style.display = "";
    });

    showToast("Showing all available games.");
});

document.getElementById("notificationBtn").addEventListener("click", function () {
    openModal(
        "Notifications",
        "You have 3 new game recommendations and 2 friend requests.",
        "View Notifications"
    );
});

document.getElementById("profileBtn").addEventListener("click", function () {
    openModal(
        "Jayanth's Profile",
        "Level 24 • 1,840 XP • 16 games played this month.",
        "Open Profile"
    );
});

document.querySelectorAll(".side-link").forEach(link => {
    link.addEventListener("click", function () {
        if (
            !this.classList.contains("genre-btn") &&
            !this.classList.contains("active")
        ) {
            document.querySelectorAll(".side-link").forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            const label = this.textContent.trim();

            if (label) {
                showToast(`${label} selected.`);
            }
        }
    });
});