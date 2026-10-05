const modal = document.getElementById("modal");
const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function openModal(title, text, icon = "🚀") {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalText").textContent = text;
    document.getElementById("modalIcon").textContent = icon;

    modal.classList.add("show");
}

document.getElementById("notificationBtn").addEventListener("click", () => {
    showToast("No new notifications. You're all caught up!");
});

document.getElementById("practiceBtn").addEventListener("click", () => {
    openModal(
        "Practice Session",
        "Start a focused practice session and work on the areas that need improvement.",
        "🚀"
    );
});

document.getElementById("subjectBtn").addEventListener("click", () => {
    openModal(
        "Subject Details",
        "Your strongest subject is JavaScript with a 94% average score.",
        "📚"
    );
});

document.getElementById("periodBtn").addEventListener("click", () => {
    showToast("Performance period: Last 6 Months");
});

document.querySelectorAll(".practice").forEach(button => {
    button.addEventListener("click", () => {
        const subject = button
            .closest(".focus-item")
            .querySelector("strong")
            .textContent;

        openModal(
            `Practice ${subject}`,
            `Your current average in ${subject} is below your overall score. Start practicing to improve your performance.`,
            "🎯"
        );
    });
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {

        document.querySelectorAll(".nav-item").forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        const name = item.querySelector("span").textContent;

        if (name !== "Overview") {
            showToast(`${name} section selected`);
        }
    });
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
});

document.getElementById("modalAction").addEventListener("click", () => {
    modal.classList.remove("show");
    showToast("Practice session started!");
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});