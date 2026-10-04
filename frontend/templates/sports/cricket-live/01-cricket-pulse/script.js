document.addEventListener("DOMContentLoaded", () => {

  // Refresh live score
  const refreshBtn = document.getElementById("refreshBtn");
  const scoreElement = document.getElementById("score");
  const oversElement = document.getElementById("overs");

  refreshBtn.addEventListener("click", () => {

    scoreElement.textContent = "190/4";
    oversElement.textContent = "18.6 overs";

    refreshBtn.textContent = "✓ Updated";

    setTimeout(() => {
      refreshBtn.textContent = "↻ Refresh";
    }, 1500);
  });


  // View all matches
  const showAllBtn = document.getElementById("showAllBtn");

  showAllBtn.addEventListener("click", () => {
    alert("All recent matches are available in the Match Center.");
  });


  // News buttons
  const readButtons = document.querySelectorAll(".read-button");

  readButtons.forEach(button => {
    button.addEventListener("click", () => {
      alert("Opening cricket story...");
    });
  });

});