const searchInput = document.getElementById("searchInput");
const gameGrid = document.getElementById("gameGrid");
const resultCount = document.getElementById("resultCount");
const sortSelect = document.getElementById("sortSelect");

const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilter = document.getElementById("closeFilter");
const genreFilter = document.getElementById("genreFilter");
const typeFilter = document.getElementById("typeFilter");
const applyFilter = document.getElementById("applyFilter");

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
    }, 2400);
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

function updateCount() {
    const visible = [...document.querySelectorAll(".game-card")]
        .filter(card => card.style.display !== "none");

    resultCount.textContent =
        `Showing ${visible.length} ${visible.length === 1 ? "game" : "games"}`;
}

function filterGames() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;
    const selectedType = typeFilter.value;

    document.querySelectorAll(".game-card").forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const genre = card.dataset.genre;
        const type = card.dataset.type;

        const matchesSearch = name.includes(searchValue);
        const matchesGenre =
            selectedGenre === "all" || genre === selectedGenre;
        const matchesType =
            selectedType === "all" || type === selectedType;

        card.style.display =
            matchesSearch && matchesGenre && matchesType
                ? ""
                : "none";
    });

    updateCount();
}

searchInput.addEventListener("input", filterGames);

document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", function () {

        document.querySelectorAll(".nav-item").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        const genre = this.dataset.genre;
        const filter = this.dataset.filter;

        if (genre) {
            genreFilter.value = genre;
            typeFilter.value = "all";
        } else if (filter) {
            typeFilter.value = filter === "all" ? "all" : filter;
            genreFilter.value = "all";
        }

        searchInput.value = "";
        filterGames();

        showToast(`${this.textContent.trim()} selected.`);
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

    if (this.value === "price") {
        cards.sort((a, b) =>
            Number(a.dataset.price) - Number(b.dataset.price)
        );
    }

    if (this.value === "recommended") {
        cards.sort((a, b) =>
            Number(b.dataset.rating) - Number(a.dataset.rating)
        );
    }

    cards.forEach(card => gameGrid.appendChild(card));

    showToast(
        `Sorted by ${this.options[this.selectedIndex].text}.`
    );
});

document.querySelectorAll(".favorite").forEach(button => {
    button.addEventListener("click", function () {
        this.classList.toggle("liked");

        if (this.classList.contains("liked")) {
            this.textContent = "♥";
            showToast("Game added to wishlist ❤️");
        } else {
            this.textContent = "♡";
            showToast("Game removed from wishlist.");
        }
    });
});

document.querySelectorAll(".view-game").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".game-card");
        const name = card.dataset.name;
        const rating = card.dataset.rating;
        const genre = card.dataset.genre;
        const price = Number(card.dataset.price);

        const priceText = price === 0
            ? "Free to play"
            : `$${price}.99`;

        openModal(
            name,
            `${genre} game • ⭐ ${rating} • ${priceText}. Explore the complete game details and features.`,
            "🎮",
            "View Details"
        );
    });
});

filterBtn.addEventListener("click", function () {
    filterPanel.classList.add("show");
});

closeFilter.addEventListener("click", function () {
    filterPanel.classList.remove("show");
});

applyFilter.addEventListener("click", function () {
    filterGames();
    filterPanel.classList.remove("show");
    showToast("Filters applied successfully.");
});

filterPanel.addEventListener("click", function (event) {
    if (event.target === filterPanel) {
        filterPanel.classList.remove("show");
    }
});

document.getElementById("featuredBtn").addEventListener("click", function () {
    openModal(
        "Legends Awaken",
        "A fantasy RPG featuring legendary heroes, massive battles and an evolving multiplayer world.",
        "🐉",
        "Play Now"
    );
});

document.getElementById("trailerBtn").addEventListener("click", function () {
    openModal(
        "Legends Awaken Trailer",
        "The game trailer would play here in a complete gaming platform.",
        "▶️",
        "Close Trailer"
    );
});

document.getElementById("weeklyBtn").addEventListener("click", function () {
    searchInput.value = "";
    genreFilter.value = "all";
    typeFilter.value = "new";

    filterGames();

    window.scrollTo({
        top: 500,
        behavior: "smooth"
    });

    showToast("Showing this week's fresh picks.");
});

document.getElementById("wishlistBtn").addEventListener("click", function () {
    openModal(
        "Your Wishlist",
        "You have 4 games saved to your wishlist.",
        "❤️",
        "Open Wishlist"
    );
});

document.getElementById("notificationBtn").addEventListener("click", function () {
    openModal(
        "Notifications",
        "You have 3 new game recommendations and 2 special offers.",
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

modalAction.addEventListener("click", function () {
    const action = this.textContent;

    hideModal();

    if (action === "Play Now") {
        showToast("Launching Legends Awaken! 🎮");
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
        filterPanel.classList.remove("show");
    }
});

updateCount();