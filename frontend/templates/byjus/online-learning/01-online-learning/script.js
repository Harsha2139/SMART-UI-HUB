const modal = document.getElementById("courseModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function openModal(title, text) {

    modalTitle.textContent = title;
    modalText.textContent = text;

    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

document.getElementById("startLearning")
    .addEventListener("click", () => {

        openModal(
            "Ready to Learn?",
            "Your personalized learning session is ready. Start your first lesson and begin your journey."
        );

    });

document.getElementById("continueBtn")
    .addEventListener("click", () => {

        openModal(
            "Human Body & Cells",
            "Continue Chapter 04 and complete the remaining 32% of this lesson."
        );

    });

document.getElementById("modalStart")
    .addEventListener("click", () => {

        closeModal();
        showToast("Lesson started successfully!");

    });

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }

});

document.getElementById("exploreBtn")
    .addEventListener("click", () => {

        document.getElementById("courses")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

document.getElementById("viewCourses")
    .addEventListener("click", () => {
        showToast("Showing all available courses");
    });

document.getElementById("viewSubjects")
    .addEventListener("click", () => {
        showToast("Showing all subjects");
    });

document.querySelectorAll(".subject-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const subject = card.dataset.subject;

            showToast(`Opening ${subject} courses`);

        });

    });

document.getElementById("progressBtn")
    .addEventListener("click", () => {

        showToast("Opening your learning progress");

    });

document.getElementById("searchBtn")
    .addEventListener("click", () => {

        const search = prompt("What would you like to learn?");

        if (search && search.trim()) {
            showToast(`Searching for "${search.trim()}"`);
        }

    });

document.getElementById("notificationBtn")
    .addEventListener("click", () => {

        showToast("You have 3 new learning notifications");

    });

document.getElementById("moreBtn")
    .addEventListener("click", () => {

        showToast("More lesson options opened");

    });