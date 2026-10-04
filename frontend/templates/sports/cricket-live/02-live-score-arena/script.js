document.addEventListener("DOMContentLoaded", () => {

  // Follow button
  const followBtn = document.getElementById("followBtn");

  followBtn.addEventListener("click", () => {
    followBtn.classList.toggle("following");

    if (followBtn.classList.contains("following")) {
      followBtn.textContent = "✓ Following";
    } else {
      followBtn.textContent = "☆ Follow";
    }
  });


  // Update score
  const refreshScore = document.getElementById("refreshScore");
  const mainScore = document.getElementById("mainScore");
  const mainOvers = document.getElementById("mainOvers");

  refreshScore.addEventListener("click", () => {

    mainScore.textContent = "178/5";
    mainOvers.textContent = "19.4 / 20 overs";

    refreshScore.textContent = "✓ Updated";

    setTimeout(() => {
      refreshScore.textContent = "↻ Update";
    }, 1500);
  });


  // Commentary interaction
  const commentaryItems =
    document.querySelectorAll(".commentary-item");

  commentaryItems.forEach(item => {
    item.addEventListener("click", () => {

      commentaryItems.forEach(
        element => element.classList.remove("highlight")
      );

      item.classList.add("highlight");
    });
  });

});