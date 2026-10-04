document.addEventListener("DOMContentLoaded", () => {

  // Follow league
  const followBtn = document.getElementById("followBtn");

  followBtn.addEventListener("click", () => {
    followBtn.classList.toggle("active");

    if (followBtn.classList.contains("active")) {
      followBtn.textContent = "✓ Following League";
    } else {
      followBtn.textContent = "☆ Follow League";
    }
  });


  // Match filter
  const filterBtn = document.getElementById("filterBtn");

  filterBtn.addEventListener("click", () => {
    if (filterBtn.textContent === "All Matches") {
      filterBtn.textContent = "Playoffs";
    } else {
      filterBtn.textContent = "All Matches";
    }
  });


  // Match centre buttons
  const matchButtons = document.querySelectorAll(".match-btn");

  matchButtons.forEach(button => {
    button.addEventListener("click", () => {

      const originalText = button.textContent;

      button.textContent = "✓ Selected";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);
    });
  });

});