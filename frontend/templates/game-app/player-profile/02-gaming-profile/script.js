const modalOverlay = document.getElementById("modalOverlay");
const editBtn = document.getElementById("editBtn");
const closeModal = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveBtn");

const nameInput = document.getElementById("nameInput");
const usernameInput = document.getElementById("usernameInput");
const bioInput = document.getElementById("bioInput");

const profileName = document.querySelector(".name-line h1");
const profileHandle = document.querySelector(".handle");
const profileDescription = document.querySelector(".description");

const toast = document.getElementById("toast");
const toastMessage = toast.querySelector("p");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

const shareBtn = document.getElementById("shareBtn");
const bellBtn = document.getElementById("bellBtn");

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function openProfileModal() {
    modalOverlay.classList.add("show");
}

function closeProfileModal() {
    modalOverlay.classList.remove("show");
}

editBtn.addEventListener("click", openProfileModal);

closeModal.addEventListener("click", closeProfileModal);

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        closeProfileModal();
    }
});

saveBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const bio = bioInput.value.trim();

    if (!name || !username) {
        showToast("Name and username are required.");
        return;
    }

    profileName.textContent = name;
    profileHandle.textContent = username;
    profileDescription.textContent = bio || "No profile description added yet.";

    closeProfileModal();
    showToast("Gaming profile updated.");
});

shareBtn.addEventListener("click", async () => {

    const shareData = {
        title: "Ryan Knight - NexusPlay",
        text: "Check out Ryan Knight's gaming profile."
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            if (error.name !== "AbortError") {
                showToast("Unable to share profile.");
            }
        }
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast("Profile link copied.");
        } catch (error) {
            showToast("Profile link could not be copied.");
        }
    }
});

bellBtn.addEventListener("click", () => {
    showToast("You have 4 new gaming notifications.");
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        document.querySelectorAll(".nav-link").forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        const label = link.textContent.trim();

        if (label !== "Profile") {
            showToast(`${label} section selected.`);
        }
    });
});

document.getElementById("allGamesBtn").addEventListener("click", () => {
    showToast("Opening your complete game collection.");
});

document.getElementById("periodSelect").addEventListener("change", (event) => {
    showToast(`${event.target.value} performance selected.`);
});

document.getElementById("searchInput").addEventListener("keydown", (event) => {

    if (event.key !== "Enter") {
        return;
    }

    const query = event.target.value.trim();

    if (!query) {
        showToast("Enter something to search.");
        return;
    }

    showToast(`Searching for "${query}"...`);
});

document.querySelectorAll(".game-card").forEach((card) => {
    card.addEventListener("click", () => {
        const gameName = card.querySelector("h3").textContent;
        showToast(`${gameName} selected.`);
    });
});

document.getElementById("logoutBtn").addEventListener("click", () => {

    const confirmed = confirm("Are you sure you want to sign out?");

    if (confirmed) {
        showToast("Sign out action completed.");
    }
});

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

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

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeProfileModal();
        sidebar.classList.remove("open");
    }
});