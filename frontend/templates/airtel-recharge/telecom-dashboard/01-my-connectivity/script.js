document.addEventListener("DOMContentLoaded", () => {

  // Account button
  const accountBtn = document.getElementById("accountBtn");

  accountBtn.addEventListener("click", () => {
    accountBtn.textContent = "Account Open";

    setTimeout(() => {
      accountBtn.textContent = "My Account";
    }, 1500);
  });


  // Check connection
  const checkBtn = document.getElementById("checkBtn");

  checkBtn.addEventListener("click", () => {
    checkBtn.textContent = "Checking...";

    setTimeout(() => {
      checkBtn.textContent = "✓ Connection Excellent";

      setTimeout(() => {
        checkBtn.textContent = "Check Connection";
      }, 1800);
    }, 1200);
  });


  // View usage
  const usageBtn = document.getElementById("usageBtn");

  usageBtn.addEventListener("click", () => {
    document.getElementById("usage").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Manage services
  const manageBtn = document.getElementById("manageBtn");

  manageBtn.addEventListener("click", () => {
    manageBtn.textContent = "3 Services Active";

    setTimeout(() => {
      manageBtn.textContent = "Manage Services";
    }, 1800);
  });


  // Individual service buttons
  const serviceButtons = document.querySelectorAll(".service-btn");

  serviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const serviceName = button.dataset.service;

      button.textContent = "✓ " + serviceName + " Open";

      setTimeout(() => {
        button.textContent = "Manage →";
      }, 1600);

    });

  });


  // Usage details
  const detailsBtn = document.getElementById("detailsBtn");

  detailsBtn.addEventListener("click", () => {

    detailsBtn.textContent = "640 GB Used • 64%";

    setTimeout(() => {
      detailsBtn.textContent = "View Usage Details →";
    }, 1800);

  });


  // Refresh devices
  const refreshDevicesBtn =
    document.getElementById("refreshDevicesBtn");

  refreshDevicesBtn.addEventListener("click", () => {

    refreshDevicesBtn.textContent = "Refreshing...";

    setTimeout(() => {
      refreshDevicesBtn.textContent = "✓ 4 Devices Found";

      setTimeout(() => {
        refreshDevicesBtn.textContent = "Refresh";
      }, 1800);

    }, 1000);

  });


  // Network support check
  const supportBtn = document.getElementById("supportBtn");

  supportBtn.addEventListener("click", () => {

    supportBtn.textContent = "Running Check...";

    setTimeout(() => {

      supportBtn.textContent = "✓ Network Looks Good";

      setTimeout(() => {
        supportBtn.textContent = "Run Network Check →";
      }, 2000);

    }, 1500);

  });

});