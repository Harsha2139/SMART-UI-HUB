document.addEventListener("DOMContentLoaded", () => {

  // Notifications
  const notifyBtn = document.getElementById("notifyBtn");

  notifyBtn.addEventListener("click", () => {
    notifyBtn.classList.toggle("active");

    if (notifyBtn.classList.contains("active")) {
      notifyBtn.textContent = "✓ Notifications On";
    } else {
      notifyBtn.textContent = "Notifications";
    }
  });


  // Enable Smart Recharge
  const smartBtn = document.getElementById("smartBtn");

  smartBtn.addEventListener("click", () => {
    smartBtn.classList.toggle("enabled");

    if (smartBtn.classList.contains("enabled")) {
      smartBtn.textContent = "✓ Smart Recharge Enabled";
    } else {
      smartBtn.textContent = "Enable Smart Recharge";
    }
  });


  // View usage
  const usageBtn = document.getElementById("usageBtn");

  usageBtn.addEventListener("click", () => {
    document.getElementById("usage").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Choose recommended plan
  const chooseBtn = document.getElementById("chooseBtn");

  chooseBtn.addEventListener("click", () => {
    chooseBtn.classList.toggle("chosen");

    if (chooseBtn.classList.contains("chosen")) {
      chooseBtn.textContent = "✓ Plan Chosen";
    } else {
      chooseBtn.textContent = "Choose This Plan";
    }
  });


  // Activity filter
  const filterBtn = document.getElementById("filterBtn");

  filterBtn.addEventListener("click", () => {
    if (filterBtn.textContent === "All Activity") {
      filterBtn.textContent = "Recent";
    } else {
      filterBtn.textContent = "All Activity";
    }
  });


  // Activate Smart Mode
  const activateBtn = document.getElementById("activateBtn");

  activateBtn.addEventListener("click", () => {
    activateBtn.classList.toggle("active");

    if (activateBtn.classList.contains("active")) {
      activateBtn.textContent = "✓ Smart Mode Active";
    } else {
      activateBtn.textContent = "Activate Smart Mode";
    }
  });

});