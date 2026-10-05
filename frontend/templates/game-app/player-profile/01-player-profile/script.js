const editProfileBtn = document.getElementById("editProfileBtn");
const shareBtn = document.getElementById("shareBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const saveProfileBtn = document.getElementById("saveProfileBtn");

const displayName = document.getElementById("displayName");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

const profileName = document.querySelector(".name-row h1");
const profileUsername = document.querySelector(".username");
const profileBio = document.querySelector(".bio");

const toast = document.getElementById("toast");
const toastText = toast.querySelector("p");

const tabs = document.querySelectorAll(".tab");
const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.querySelector(".sidebar");

function showToast(message) {
    toastText.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function openModal() {
    modalOverlay.classList.add("show");
}

function closeModal() {
    modalOverlay.classList.remove("show");
}

editProfileBtn.addEventListener("click", openModal);

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

saveProfileBtn.addEventListener("click", () => {
    const newName = displayName.value.trim();
    const newUsername = username.value.trim();
    const newBio = bio.value.trim();

    if (!newName || !newUsername) {
        showToast("Please enter your name and username.");
        return;
    }

    profileName.textContent = newName;
    profileUsername.textContent = newUsername;
    profileBio.textContent = newBio || "No bio added yet.";

    closeModal();
    showToast("Profile updated successfully.");
});

shareBtn.addEventListener("click", async () => {
    const shareData = {
        title: "Jordan Davis - ArenaX Profile",
        text: "Check out this gaming profile on ArenaX!"
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
            showToast("Profile sharing is unavailable.");
        }
    }
});

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((item) => item.classList.remove("active"));
        tab.classList.add("active");

        const selectedTab = tab.dataset.tab;

        if (selectedTab === "overview") {
            showToast("Overview opened.");
        } else if (selectedTab === "games") {
            showToast("Games section opened.");
        } else if (selectedTab === "achievements") {
            showToast("Achievements section opened.");
        } else {
            showToast("Activity section opened.");
        }
    });
});

document.getElementById("viewGamesBtn").addEventListener("click", () => {
    showToast("Opening complete game collection.");
});

document.getElementById("achievementsBtn").addEventListener("click", () => {
    showToast("Showing all achievements.");
});

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("You have 3 new notifications.");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        showToast("Logout action completed.");
    }
});

document.getElementById("searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const query = event.target.value.trim();

        if (query) {
            showToast(`Searching for "${query}"...`);
        } else {
            showToast("Enter something to search.");
        }
    }
});

mobileMenu.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

document.addEventListener("click", (event) => {
    if (
        window.innerWidth <= 800 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== mobileMenu
    ) {
        sidebar.classList.remove("open");
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
        sidebar.classList.remove("open");
    }
});