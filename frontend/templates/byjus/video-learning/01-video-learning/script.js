const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalAction = document.getElementById("modalAction");

const playButton = document.getElementById("playButton");
const playControl = document.getElementById("playControl");
const timelineProgress = document.getElementById("timelineProgress");
const currentTime = document.getElementById("currentTime");

let isPlaying = false;
let progress = 60;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}

function showModal(title, text, action) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modalAction.textContent = action;
    modal.classList.add("active");
}

function hideModal() {
    modal.classList.remove("active");
}

function toggleVideo() {
    isPlaying = !isPlaying;

    playButton.querySelector(".play-circle").textContent =
        isPlaying ? "❚❚" : "▶";

    playControl.textContent = isPlaying ? "❚❚" : "▶";

    if (isPlaying) {
        showToast("Video playing");
    } else {
        showToast("Video paused");
    }
}

playButton.addEventListener("click", toggleVideo);
playControl.addEventListener("click", toggleVideo);

document.getElementById("backwardBtn").addEventListener("click", function() {
    showToast("Rewound 10 seconds");
});

document.getElementById("forwardBtn").addEventListener("click", function() {
    showToast("Skipped forward 10 seconds");
});

document.getElementById("volumeBtn").addEventListener("click", function() {
    this.textContent = this.textContent === "🔊" ? "🔇" : "🔊";
    showToast(this.textContent === "🔇" ? "Sound muted" : "Sound enabled");
});

document.getElementById("speedBtn").addEventListener("click", function() {
    const speeds = ["1x", "1.25x", "1.5x", "1.75x", "2x"];
    const current = speeds.indexOf(this.textContent);
    this.textContent = speeds[(current + 1) % speeds.length];

    showToast(`Playback speed: ${this.textContent}`);
});

document.getElementById("fullscreenBtn").addEventListener("click", function() {
    const player = document.getElementById("videoPlayer");

    if (!document.fullscreenElement) {
        player.requestFullscreen().catch(() => {
            showToast("Fullscreen is not available");
        });
    } else {
        document.exitFullscreen();
    }
});

document.querySelector(".timeline").addEventListener("click", function(event) {
    const rect = this.getBoundingClientRect();
    const percentage = ((event.clientX - rect.left) / rect.width) * 100;

    progress = Math.max(0, Math.min(100, percentage));
    timelineProgress.style.width = progress + "%";

    const seconds = Math.round((progress / 100) * 1455);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    currentTime.textContent =
        `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
});

document.getElementById("completeBtn").addEventListener("click", function() {
    this.classList.toggle("completed");

    if (this.classList.contains("completed")) {
        this.textContent = "✓ Completed";
        showToast("Lesson marked as complete!");
    } else {
        this.textContent = "✓ Mark Complete";
        showToast("Lesson marked incomplete.");
    }
});

document.querySelectorAll(".tab").forEach(function(tab) {
    tab.addEventListener("click", function() {
        const target = this.dataset.tab;

        document.querySelectorAll(".tab").forEach(function(item) {
            item.classList.remove("active");
        });

        document.querySelectorAll(".tab-panel").forEach(function(panel) {
            panel.classList.remove("active");
        });

        this.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});

document.querySelectorAll(".lesson").forEach(function(lesson) {
    lesson.addEventListener("click", function() {

        if (this.classList.contains("locked")) {
            showToast("Complete the previous lessons first.");
            return;
        }

        document.querySelectorAll(".lesson").forEach(function(item) {
            item.classList.remove("current");
        });

        this.classList.add("current");

        const lessonName = this.querySelector("strong").textContent;

        showToast(`Opening ${lessonName}`);
    });
});

document.getElementById("saveNotes").addEventListener("click", function() {
    const notes = document.getElementById("notesInput").value.trim();

    if (!notes) {
        showToast("Write something before saving.");
        return;
    }

    localStorage.setItem("learnlyLessonNotes", notes);

    document.getElementById("savedText").textContent =
        "Saved just now ✓";

    showToast("Your notes have been saved.");
});

const savedNotes = localStorage.getItem("learnlyLessonNotes");

if (savedNotes) {
    document.getElementById("notesInput").value = savedNotes;
}

document.getElementById("nextLessonBtn").addEventListener("click", function() {
    showModal(
        "Semantic HTML",
        "Lesson 04 is ready. Learn how semantic elements improve structure and accessibility.",
        "Start Lesson"
    );
});

document.getElementById("instructorBtn").addEventListener("click", function() {
    showModal(
        "Maya Kumar",
        "Senior Web Developer with 8+ years of experience in modern web development and education.",
        "Close"
    );
});

document.getElementById("commentBtn").addEventListener("click", function() {
    showModal(
        "Join Discussion",
        "Ask questions, share your solutions and learn together with other students.",
        "Join Now"
    );
});

document.querySelectorAll(".resource").forEach(function(resource) {
    resource.addEventListener("click", function() {
        const title = this.querySelector("strong").textContent;
        showToast(`${title} is ready to download.`);
    });
});

document.getElementById("notificationBtn").addEventListener("click", function() {
    showToast("You have 3 new notifications.");
});

document.getElementById("messageBtn").addEventListener("click", function() {
    showToast("You have 2 unread messages.");
});

document.getElementById("videoMore").addEventListener("click", function() {
    showToast("More video options opened.");
});

document.getElementById("backCourseBtn").addEventListener("click", function() {
    showToast("Returning to course overview...");
});

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const query = this.value.trim();

        if (query) {
            showToast(`Searching for "${query}"...`);
        } else {
            showToast("Enter a lesson or course name.");
        }
    }
});

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        hideModal();
    }
});

modalAction.addEventListener("click", function() {
    hideModal();
    showToast("Action completed successfully!");
});