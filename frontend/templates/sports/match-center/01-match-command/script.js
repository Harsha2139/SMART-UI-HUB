document.addEventListener("DOMContentLoaded", () => {

  // Follow matches button
  const notifyBtn = document.getElementById("notifyBtn");

  notifyBtn.addEventListener("click", () => {
    notifyBtn.classList.toggle("active");

    if (notifyBtn.classList.contains("active")) {
      notifyBtn.textContent = "✓ Following Matches";
    } else {
      notifyBtn.textContent = "☆ Follow Matches";
    }
  });


  // Filter button
  const filterBtn = document.getElementById("filterBtn");

  filterBtn.addEventListener("click", () => {
    if (filterBtn.textContent === "All Matches") {
      filterBtn.textContent = "Live Matches";
    } else {
      filterBtn.textContent = "All Matches";
    }
  });


  // Match buttons
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      const originalText = button.textContent;

      button.textContent = "✓ Selected";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);
    });
  });

});