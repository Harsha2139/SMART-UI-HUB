document.addEventListener("DOMContentLoaded", () => {

  // Follow tournament
  const followBtn = document.getElementById("followBtn");

  followBtn.addEventListener("click", () => {
    followBtn.classList.toggle("active");

    if (followBtn.classList.contains("active")) {
      followBtn.textContent = "✓ Following Tournament";
    } else {
      followBtn.textContent = "☆ Follow Tournament";
    }
  });


  // Explore tournament
  const exploreBtn = document.getElementById("exploreBtn");

  exploreBtn.addEventListener("click", () => {
    document.getElementById("fixtures").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Schedule button
  const scheduleBtn = document.getElementById("scheduleBtn");

  scheduleBtn.addEventListener("click", () => {
    document.getElementById("fixtures").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Fixture filter
  const filterBtn = document.getElementById("filterBtn");

  filterBtn.addEventListener("click", () => {
    if (filterBtn.textContent === "All Fixtures") {
      filterBtn.textContent = "Playoffs";
    } else {
      filterBtn.textContent = "All Fixtures";
    }
  });


  // Match centre buttons
  const matchButtons = document.querySelectorAll(".match-btn");

  matchButtons.forEach(button => {
    button.addEventListener("click", () => {

      button.classList.add("selected");

      const originalText = button.textContent;
      button.textContent = "✓ Selected";

      setTimeout(() => {
        button.classList.remove("selected");
        button.textContent = originalText;
      }, 1200);

    });
  });

});