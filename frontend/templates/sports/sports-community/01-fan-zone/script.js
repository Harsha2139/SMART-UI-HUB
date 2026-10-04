document.addEventListener("DOMContentLoaded", () => {

  // Join Fan Club
  const joinBtn = document.getElementById("joinBtn");

  joinBtn.addEventListener("click", () => {
    joinBtn.classList.toggle("active");

    if (joinBtn.classList.contains("active")) {
      joinBtn.textContent = "✓ Joined Fan Club";
    } else {
      joinBtn.textContent = "Join Fan Club";
    }
  });


  // Enter Community
  const communityBtn = document.getElementById("communityBtn");

  communityBtn.addEventListener("click", () => {
    document.getElementById("community").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Vote in Poll
  const pollBtn = document.getElementById("pollBtn");

  pollBtn.addEventListener("click", () => {
    document.getElementById("polls").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Refresh Feed
  const refreshBtn = document.getElementById("refreshBtn");

  refreshBtn.addEventListener("click", () => {
    const originalText = refreshBtn.textContent;

    refreshBtn.textContent = "✓ Feed Refreshed";

    setTimeout(() => {
      refreshBtn.textContent = originalText;
    }, 1200);
  });


  // Like buttons
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(button => {
    button.addEventListener("click", () => {

      button.classList.toggle("liked");

      const currentText = button.textContent;
      const number = currentText.match(/\d+/);

      if (button.classList.contains("liked")) {
        button.textContent = `♥ ${number ? Number(number[0]) + 1 : 1}`;
      } else {
        button.textContent = `♡ ${number ? Number(number[0]) - 1 : 0}`;
      }

    });
  });


  // Poll options
  const pollOptions = document.querySelectorAll(".poll-option");

  pollOptions.forEach(option => {
    option.addEventListener("click", () => {

      pollOptions.forEach(item => {
        item.classList.remove("selected");
      });

      option.classList.add("selected");

    });
  });


  // Comment buttons
  const commentButtons = document.querySelectorAll(".comment-btn");

  commentButtons.forEach(button => {
    button.addEventListener("click", () => {

      const originalText = button.textContent;

      button.textContent = "✓ Comment Added";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);

    });
  });

});