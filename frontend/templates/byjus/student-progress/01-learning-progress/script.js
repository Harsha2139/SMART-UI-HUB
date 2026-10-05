const modal = document.getElementById("modal");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("You're all caught up! No new notifications.");
});

document.getElementById("goalBtn").addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = "Your Weekly Goal 🎯";
    document.getElementById("modalText").textContent =
        "You've completed 7 of your 10 weekly learning hours. Just 3 more hours to reach your goal!";
    document.getElementById("modalAction").textContent = "Start Learning";

    modal.classList.add("show");
});

document.getElementById("studyBtn").addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = "Ready to Learn? 🚀";
    document.getElementById("modalText").textContent =
        "Choose a course and continue your learning journey. Every lesson brings you closer to your goal!";
    document.getElementById("modalAction").textContent = "Start Lesson";

    modal.classList.add("show");
});

document.getElementById("closeBtn").addEventListener("click", () => {
    modal.classList.remove("show");
});

document.getElementById("modalAction").addEventListener("click", () => {
    modal.classList.remove("show");
    showToast("Learning session started!");
});

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const section = item.querySelector("span").textContent;

        if (section !== "Progress") {
            showToast(`${section} section selected`);
        }
    });
});

document.querySelectorAll(".continue-btn").forEach(button => {
    button.addEventListener("click", () => {
        const courseName =
            button.closest(".course")
                .querySelector(".course-title strong")
                .textContent;

        showToast(`Continuing ${courseName}`);
    });
});

document.getElementById("filterBtn").addEventListener("click", () => {
    showToast("Progress filter: This Month");
});