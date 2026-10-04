document.addEventListener("DOMContentLoaded", () => {

  // My Account
  const accountBtn = document.getElementById("accountBtn");

  accountBtn.addEventListener("click", () => {
    accountBtn.textContent = "Account Open";
    setTimeout(() => {
      accountBtn.textContent = "My Account";
    }, 1500);
  });


  // Find My Plan
  const findBtn = document.getElementById("findBtn");

  findBtn.addEventListener("click", () => {
    document.getElementById("plans").scrollIntoView({
      behavior: "smooth"
    });
  });


  // View All Plans
  const viewBtn = document.getElementById("viewBtn");

  viewBtn.addEventListener("click", () => {
    document.getElementById("compare").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Preference selection
  const preferenceCards = document.querySelectorAll(".preference-card");
  const recommendationText = document.getElementById("recommendationText");

  preferenceCards.forEach((card) => {

    const selectBtn = card.querySelector(".select-btn");

    selectBtn.addEventListener("click", () => {

      preferenceCards.forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".select-btn").textContent = "Select";
      });

      card.classList.add("active");
      selectBtn.textContent = "✓ Selected";

      const choice = card.dataset.choice;

      if (choice === "data") {
        recommendationText.textContent =
          "You selected more data. Explore plans designed for streaming, gaming and social media.";
      }

      if (choice === "calls") {
        recommendationText.textContent =
          "You selected more calls. Explore plans focused on reliable everyday communication.";
      }

      if (choice === "ott") {
        recommendationText.textContent =
          "You selected entertainment. Explore plans with extra data and entertainment benefits.";
      }

      if (choice === "balanced") {
        recommendationText.textContent =
          "You selected balanced usage. Explore practical plans for everyday connectivity.";
      }

      document.getElementById("compare").scrollIntoView({
        behavior: "smooth"
      });
    });

  });


  // Plan selection
  const planButtons = document.querySelectorAll(".plan-btn");

  planButtons.forEach((button) => {

    button.addEventListener("click", () => {

      planButtons.forEach((item) => {
        item.classList.remove("chosen");
        item.textContent = "Choose Plan";
      });

      button.classList.add("chosen");
      button.textContent = "✓ Plan Selected";
    });

  });


  // Help
  const helpBtn = document.getElementById("helpBtn");

  helpBtn.addEventListener("click", () => {
    helpBtn.textContent = "Help Requested ✓";

    setTimeout(() => {
      helpBtn.textContent = "Get Help";
    }, 1800);
  });

});