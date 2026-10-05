const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalAction = document.getElementById("modalAction");
const toast = document.getElementById("toast");

function openModal(title, text, action = "Continue") {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalAction.textContent = action;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById("menuBtn").addEventListener("click", function() {
    document.querySelector(".sidebar").classList.toggle("open");
});

document.querySelectorAll(".side-nav a").forEach(function(link) {
    link.addEventListener("click", function() {
        document.querySelectorAll(".side-nav a").forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        if (window.innerWidth <= 800) {
            document.querySelector(".sidebar").classList.remove("open");
        }
    });
});

document.getElementById("continueBtn").addEventListener("click", function() {
    openModal(
        "Continue Lesson",
        "You're on Lesson 14 of Modern Web Development. Continue from where you stopped?",
        "Start Lesson"
    );
});

document.getElementById("allCoursesBtn").addEventListener("click", function() {
    showToast("Opening your complete course library...");
});

document.getElementById("upgradeBtn").addEventListener("click", function() {
    openModal(
        "Upgrade Your Plan",
        "Unlock premium courses, certificates and advanced learning features.",
        "View Plans"
    );
});

document.getElementById("scheduleBtn").addEventListener("click", function() {
    openModal(
        "Learning Calendar",
        "Your upcoming classes and assessments will appear here.",
        "Open Calendar"
    );
});

document.getElementById("discoverBtn").addEventListener("click", function() {
    showToast("Discovering new courses for you...");
});

document.getElementById("achievementBtn").addEventListener("click", function() {
    openModal(
        "Achievements",
        "You've earned 12 achievements. Keep learning to unlock more!",
        "View Achievements"
    );
});

document.getElementById("helpBtn").addEventListener("click", function(event) {
    event.preventDefault();
    openModal(
        "Help Center",
        "Find answers to common questions or contact the Learnova support team.",
        "Get Help"
    );
});

document.getElementById("settingsBtn").addEventListener("click", function(event) {
    event.preventDefault();
    openModal(
        "Settings",
        "Manage your account, notifications and learning preferences.",
        "Open Settings"
    );
});

document.getElementById("profileMenu").addEventListener("click", function() {
    showToast("Profile options opened");
});

document.getElementById("notificationBtn").addEventListener("click", function() {
    showToast("You have 3 new notifications");
});

document.getElementById("calendarBtn").addEventListener("click", function() {
    showToast("Today's calendar is up to date");
});

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const query = this.value.trim();

        if (query) {
            showToast(`Searching for "${query}"...`);
        } else {
            showToast("Type a course name to search");
        }
    }
});

document.querySelectorAll(".join-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const course = this.closest(".schedule-item")
            .querySelector(".schedule-details strong")
            .textContent;

        showToast(`${course} selected`);
    });
});

document.querySelectorAll(".favorite").forEach(function(button) {
    button.addEventListener("click", function() {
        this.textContent = this.textContent === "♡" ? "♥" : "♡";

        showToast(
            this.textContent === "♥"
                ? "Course added to wishlist"
                : "Course removed from wishlist"
        );
    });
});

document.querySelectorAll(".enroll-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const course = this.closest(".course-card")
            .querySelector("h3")
            .textContent;

        openModal(
            course,
            "Explore the course curriculum, lessons and learning outcomes.",
            "View Course"
        );
    });
});

modalAction.addEventListener("click", function() {
    closeModal();
    showToast("Action completed successfully!");
});