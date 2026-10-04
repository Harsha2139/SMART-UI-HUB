document.addEventListener("DOMContentLoaded", () => {

  // Follow player
  const followBtn = document.getElementById("followBtn");

  followBtn.addEventListener("click", () => {
    followBtn.classList.toggle("active");

    if (followBtn.classList.contains("active")) {
      followBtn.textContent = "✓ Following";
    } else {
      followBtn.textContent = "☆ Follow Player";
    }
  });


  // Change statistics period
  const periodBtn = document.getElementById("periodBtn");

  periodBtn.addEventListener("click", () => {
    if (periodBtn.textContent === "Last 12 Months") {
      periodBtn.textContent = "Last 24 Months";
    } else {
      periodBtn.textContent = "Last 12 Months";
    }
  });


  // Compare player
  const compareBtn = document.getElementById("compareBtn");

  compareBtn.addEventListener("click", () => {
    compareBtn.textContent = "✓ Comparison Ready";

    setTimeout(() => {
      compareBtn.textContent = "Compare Player";
    }, 1500);
  });

});