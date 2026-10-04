document.addEventListener("DOMContentLoaded", () => {

  // Profile button
  const profileBtn = document.getElementById("profileBtn");

  profileBtn.addEventListener("click", () => {
    profileBtn.classList.toggle("active");

    if (profileBtn.classList.contains("active")) {
      profileBtn.textContent = "✓ Profile Active";
    } else {
      profileBtn.textContent = "My Profile";
    }
  });


  // Join community
  const joinBtn = document.getElementById("joinBtn");

  joinBtn.addEventListener("click", () => {
    joinBtn.textContent = "✓ Community Joined";

    document.getElementById("feed").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Discover groups
  const discoverBtn = document.getElementById("discoverBtn");

  discoverBtn.addEventListener("click", () => {
    document.getElementById("groups").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Sort feed
  const sortBtn = document.getElementById("sortBtn");

  sortBtn.addEventListener("click", () => {
    if (sortBtn.textContent === "Latest") {
      sortBtn.textContent = "Popular";
    } else {
      sortBtn.textContent = "Latest";
    }
  });


  // Reaction buttons
  const reactButtons = document.querySelectorAll(".react-btn");

  reactButtons.forEach(button => {
    button.addEventListener("click", () => {

      button.classList.toggle("reacted");

      const number = button.textContent.match(/\d+/);

      if (button.classList.contains("reacted")) {
        button.textContent = `♥ ${number ? Number(number[0]) + 1 : 1}`;
      } else {
        button.textContent = `♡ ${number ? Number(number[0]) - 1 : 0}`;
      }

    });
  });


  // Reply buttons
  const replyButtons = document.querySelectorAll(".reply-btn");

  replyButtons.forEach(button => {
    button.addEventListener("click", () => {

      const originalText = button.textContent;

      button.textContent = "✓ Replied";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);

    });
  });


  // Share buttons
  const shareButtons = document.querySelectorAll(".share-btn");

  shareButtons.forEach(button => {
    button.addEventListener("click", () => {

      const originalText = button.textContent;

      button.textContent = "✓ Shared";

      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);

    });
  });


  // Trending topics
  const trendItems = document.querySelectorAll(".trend-item");

  trendItems.forEach(item => {
    item.addEventListener("click", () => {

      const originalText = item.querySelector("strong").textContent;

      item.querySelector("strong").textContent = "✓ Following";

      setTimeout(() => {
        item.querySelector("strong").textContent = originalText;
      }, 1200);

    });
  });


  // Group buttons
  const groupButtons = document.querySelectorAll(".group-btn");

  groupButtons.forEach(button => {
    button.addEventListener("click", () => {

      button.classList.toggle("joined");

      if (button.classList.contains("joined")) {
        button.textContent = "✓ Joined";
      } else {
        button.textContent = "Join Group";
      }

    });
  });


  // Event interest
  const eventBtn = document.getElementById("eventBtn");

  eventBtn.addEventListener("click", () => {

    eventBtn.classList.toggle("interested");

    if (eventBtn.classList.contains("interested")) {
      eventBtn.textContent = "✓ Interested";
    } else {
      eventBtn.textContent = "I'm Interested";
    }

  });

});