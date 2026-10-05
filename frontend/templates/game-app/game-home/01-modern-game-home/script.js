const modal = document.getElementById("modal");
const searchOverlay = document.getElementById("searchOverlay");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function openModal(title, text, icon, actionText) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalText").textContent = text;
    document.getElementById("modalIcon").textContent = icon;
    document.getElementById("modalAction").textContent = actionText;

    modal.classList.add("show");
}

document.getElementById("playBtn").addEventListener("click", () => {
    openModal(
        "Neon Realm",
        "Your adventure is ready! Prepare your character and enter the Neon Realm.",
        "🎮",
        "Start Game"
    );
});

document.getElementById("detailsBtn").addEventListener("click", () => {
    openModal(
        "Neon Realm",
        "Explore futuristic cities, complete missions, compete with players and unlock powerful equipment.",
        "⚡",
        "Got It"
    );
});

document.getElementById("loginBtn").addEventListener("click", () => {
    openModal(
        "Welcome Back",
        "Sign in to access your games, achievements, friends and personalized recommendations.",
        "👤",
        "Continue"
    );
});

document.getElementById("viewAllBtn").addEventListener("click", () => {
    document.getElementById("games").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Showing all trending games");
});

document.querySelectorAll(".small-play").forEach(button => {
    button.addEventListener("click", () => {
        const gameName = button
            .closest(".game-card")
            .querySelector("h3")
            .textContent;

        openModal(
            gameName,
            `You selected ${gameName}. Explore the game and discover everything it has to offer.`,
            "🎮",
            "Explore Game"
        );
    });
});

document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
        const category =
            button.querySelector("strong").textContent;

        showToast(`${category} games selected`);
    });
});

document.getElementById("communityBtn").addEventListener("click", () => {
    openModal(
        "GameHub Community",
        "Join gamers, create squads, share achievements and discover new gaming communities.",
        "👥",
        "Join Now"
    );
});

document.getElementById("searchBtn").addEventListener("click", () => {
    searchOverlay.classList.add("show");

    setTimeout(() => {
        document.getElementById("gameSearch").focus();
    }, 100);
});

document.getElementById("closeSearch").addEventListener("click", () => {
    searchOverlay.classList.remove("show");
});

document.getElementById("closeBtn").addEventListener("click", () => {
    modal.classList.remove("show");
});

document.getElementById("modalAction").addEventListener("click", () => {
    modal.classList.remove("show");
    showToast("Action started successfully!");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

searchOverlay.addEventListener("click", event => {
    if (event.target === searchOverlay) {
        searchOverlay.classList.remove("show");
    }
});

document.getElementById("gameSearch").addEventListener("input", event => {
    const query = event.target.value.trim().toLowerCase();
    const result = document.getElementById("searchResult");

    if (!query) {
        result.textContent =
            "Start typing to search the game collection.";
        return;
    }

    const games = [
        "Cyber Warriors",
        "Kingdom Rise",
        "Velocity X",
        "Galaxy Frontier",
        "Neon Realm"
    ];

    const matches = games.filter(game =>
        game.toLowerCase().includes(query)
    );

    if (matches.length) {
        result.textContent =
            `Games found: ${matches.join(", ")}`;
    } else {
        result.textContent =
            "No games found. Try another search.";
    }
});

document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".main-nav a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});