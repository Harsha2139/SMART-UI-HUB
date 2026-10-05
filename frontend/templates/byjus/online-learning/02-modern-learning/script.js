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

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById("exploreBtn").addEventListener("click", function() {
    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("continueBtn").addEventListener("click", function() {
    showModal(
        "Continue Learning",
        "Your Modern Web Development course is 64% complete. Ready for the next lesson?",
        "Start Lesson"
    );
});

document.getElementById("playBtn").addEventListener("click", function() {
    showModal(
        "Lesson Preview",
        "Playing the preview for Modern Web Development.",
        "Watch Now"
    );
});

document.getElementById("modalAction").addEventListener("click", function() {
    closeModal();
    showToast("Lesson started successfully!");
});

document.getElementById("saveBtn").addEventListener("click", function() {
    this.textContent = this.textContent === "♡" ? "♥" : "♡";
    showToast(
        this.textContent === "♥"
            ? "Course saved to your wishlist"
            : "Course removed from wishlist"
    );
});

document.getElementById("viewAllBtn").addEventListener("click", function() {
    showToast("Showing all available categories");
});

document.querySelectorAll(".category-card").forEach(function(card) {
    card.addEventListener("click", function() {
        const category = this.dataset.category;
        showModal(
            category,
            `Explore ${category} courses and start learning today.`,
            "Explore"
        );
    });
});

document.querySelectorAll(".heart").forEach(function(button) {
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
        const courseName = this.closest(".course-card")
            .querySelector("h3")
            .textContent;

        showModal(
            "Enroll Now",
            `You're about to enroll in "${courseName}".`,
            "Confirm Enrollment"
        );
    });
});

document.getElementById("lessonBtn").addEventListener("click", function() {
    showModal(
        "Continue Lesson",
        "Your next lesson is ready. Keep your 7-day streak going!",
        "Start Learning"
    );
});

document.getElementById("communityBtn").addEventListener("click", function() {
    showModal(
        "Join Learnova Community",
        "Connect with learners, share projects and discuss new ideas.",
        "Join Now"
    );
});

document.getElementById("searchBtn").addEventListener("click", function() {
    showToast("Search is ready — explore courses from the categories below.");
});

document.getElementById("bellBtn").addEventListener("click", function() {
    showToast("You have 3 new learning notifications.");
});