document.addEventListener("DOMContentLoaded", () => {

  // Follow button
  const followBtn = document.getElementById("followBtn");

  followBtn.addEventListener("click", () => {
    followBtn.classList.toggle("active");

    if (followBtn.classList.contains("active")) {
      followBtn.textContent = "✓ Following";
    } else {
      followBtn.textContent = "☆ Follow";
    }
  });


  // Update score
  const updateBtn = document.getElementById("updateBtn");
  const score = document.getElementById("score");
  const overs = document.getElementById("overs");
  const needRuns = document.getElementById("needRuns");

  updateBtn.addEventListener("click", () => {

    score.textContent = "178/5";
    overs.textContent = "19.4 overs";
    needRuns.textContent = "11";

    updateBtn.textContent = "✓ Updated";

    setTimeout(() => {
      updateBtn.textContent = "↻ Update Score";
    }, 1500);
  });


  // Ball selection
  const balls = document.querySelectorAll(".ball");

  balls.forEach(ball => {
    ball.addEventListener("click", () => {

      balls.forEach(item => {
        item.classList.remove("highlight");
      });

      ball.classList.add("highlight");
    });
  });

});