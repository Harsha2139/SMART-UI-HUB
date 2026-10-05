const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalAction = document.getElementById("modalAction");

const toast = document.getElementById("toast");

function showModal(title, text, action = "Continue") {
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

menuBtn.addEventListener("click", function() {
    sidebar.classList.toggle("open");
});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.querySelectorAll(".sidebar nav a").forEach(function(link) {
    link.addEventListener("click", function() {
        document.querySelectorAll(".sidebar nav a").forEach(function(item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        if (window.innerWidth <= 800) {
            sidebar.classList.remove("open");
        }
    });
});

document.getElementById("learningBtn").addEventListener("click", function() {
    showModal(
        "Continue Learning",
        "Your next lesson in Data Structures & Algorithms is ready.",
        "Start Lesson"
    );
});

document.getElementById("classesBtn").addEventListener("click", function() {
    showToast("Showing all your classes...");
});

document.getElementById("assignmentsBtn").addEventListener("click", function() {
    showToast("Opening your assignment list...");
});

document.getElementById("gradesBtn").addEventListener("click", function() {
    showModal(
        "Grade Details",
        "Your current average grade is 92%. You are performing above your monthly target.",
        "View Grades"
    );
});

document.getElementById("todayBtn").addEventListener("click", function() {
    document.getElementById("calendar").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("messageBtn").addEventListener("click", function() {
    showToast("You have 2 unread messages.");
});

document.getElementById("notificationBtn").addEventListener("click", function() {
    showToast("You have 4 new notifications.");
});

document.getElementById("helpBtn").addEventListener("click", function(event) {
    event.preventDefault();

    showModal(
        "Help Center",
        "Find answers to common questions or contact student support.",
        "Get Help"
    );
});

document.getElementById("settingsBtn").addEventListener("click", function(event) {
    event.preventDefault();

    showModal(
        "Settings",
        "Manage your profile, notifications and learning preferences.",
        "Open Settings"
    );
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    showModal(
        "Log Out",
        "Are you sure you want to log out of your student account?",
        "Log Out"
    );
});

document.querySelectorAll(".class-action").forEach(function(button) {
    button.addEventListener("click", function() {
        const course = this.dataset.course;

        showModal(
            course,
            "Your course is ready. Continue from your latest lesson.",
            "Continue Course"
        );
    });
});

document.querySelectorAll(".assignment-btn").forEach(function(button) {
    button.addEventListener("click", function() {
        const assignment = this
            .closest(".assignment")
            .querySelector(".assignment-info strong")
            .textContent;

        showModal(
            assignment,
            "Review the assignment instructions and submit your work before the deadline.",
            "Open Assignment"
        );
    });
});

document.getElementById("prevMonth").addEventListener("click", function() {
    showToast("Previous month selected");
});

document.getElementById("nextMonth").addEventListener("click", function() {
    showToast("Next month selected");
});

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const value = this.value.trim();

        if (value) {
            showToast(`Searching for "${value}"...`);
        } else {
            showToast("Enter something to search.");
        }
    }
});

modalAction.addEventListener("click", function() {
    closeModal();
    showToast("Action completed successfully!");
});