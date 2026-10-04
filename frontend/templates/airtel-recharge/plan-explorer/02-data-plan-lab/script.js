document.addEventListener("DOMContentLoaded", () => {

  const videoRange = document.getElementById("videoRange");
  const socialRange = document.getElementById("socialRange");
  const gamingRange = document.getElementById("gamingRange");
  const otherRange = document.getElementById("otherRange");

  const videoValue = document.getElementById("videoValue");
  const socialValue = document.getElementById("socialValue");
  const gamingValue = document.getElementById("gamingValue");
  const otherValue = document.getElementById("otherValue");

  const totalData = document.getElementById("totalData");
  const dataStatus = document.getElementById("dataStatus");
  const heroData = document.getElementById("heroData");

  const videoPercent = document.getElementById("videoPercent");
  const socialPercent = document.getElementById("socialPercent");
  const gamingPercent = document.getElementById("gamingPercent");
  const otherPercent = document.getElementById("otherPercent");

  const videoBar = document.getElementById("videoBar");
  const socialBar = document.getElementById("socialBar");
  const gamingBar = document.getElementById("gamingBar");
  const otherBar = document.getElementById("otherBar");


  // Update calculator
  function updateCalculator() {

    const video = Number(videoRange.value);
    const social = Number(socialRange.value);
    const gaming = Number(gamingRange.value);
    const other = Number(otherRange.value);

    const total = video + social + gaming + other;

    videoValue.textContent = video;
    socialValue.textContent = social;
    gamingValue.textContent = gaming;
    otherValue.textContent = other;

    totalData.textContent = `${total} GB`;
    heroData.textContent = total;

    // Calculate percentages
    const videoPct = Math.round((video / total) * 100);
    const socialPct = Math.round((social / total) * 100);
    const gamingPct = Math.round((gaming / total) * 100);
    const otherPct = Math.round((other / total) * 100);

    videoPercent.textContent = `${videoPct}%`;
    socialPercent.textContent = `${socialPct}%`;
    gamingPercent.textContent = `${gamingPct}%`;
    otherPercent.textContent = `${otherPct}%`;

    videoBar.style.width = `${videoPct}%`;
    socialBar.style.width = `${socialPct}%`;
    gamingBar.style.width = `${gamingPct}%`;
    otherBar.style.width = `${otherPct}%`;

    // Usage status
    if (total <= 12) {
      dataStatus.textContent = "Light usage";
    } else if (total <= 25) {
      dataStatus.textContent = "Balanced usage";
    } else if (total <= 40) {
      dataStatus.textContent = "Heavy usage";
    } else {
      dataStatus.textContent = "Very heavy usage";
    }
  }


  videoRange.addEventListener("input", updateCalculator);
  socialRange.addEventListener("input", updateCalculator);
  gamingRange.addEventListener("input", updateCalculator);
  otherRange.addEventListener("input", updateCalculator);


  // Start calculator
  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", () => {
    document.getElementById("calculator").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Select plans
  const planButtons = document.querySelectorAll(".plan-button");

  planButtons.forEach((button) => {

    button.addEventListener("click", () => {

      planButtons.forEach((item) => {
        item.classList.remove("selected");
        item.textContent = "Select Plan";
      });

      button.classList.add("selected");
      button.textContent = "✓ Plan Selected";
    });

  });


  // Explore plans
  const exploreBtn = document.getElementById("exploreBtn");

  exploreBtn.addEventListener("click", () => {
    document.getElementById("plans").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Reset calculator
  const resetBtn = document.getElementById("resetBtn");

  resetBtn.addEventListener("click", () => {

    videoRange.value = 6;
    socialRange.value = 4;
    gamingRange.value = 3;
    otherRange.value = 7;

    planButtons.forEach((button) => {
      button.classList.remove("selected");
      button.textContent = "Select Plan";
    });

    updateCalculator();

    document.getElementById("calculator").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Initial calculation
  updateCalculator();

});