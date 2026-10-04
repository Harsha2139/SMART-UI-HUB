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


  // View full stats
  const statsBtn = document.getElementById("statsBtn");

  statsBtn.addEventListener("click", () => {
    document.getElementById("stats").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Share profile
  const shareBtn = document.getElementById("shareBtn");

  shareBtn.addEventListener("click", () => {
    shareBtn.textContent = "✓ Profile Copied";

    setTimeout(() => {
      shareBtn.textContent = "Share Profile";
    }, 1500);
  });

});