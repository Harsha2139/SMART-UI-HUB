document.addEventListener("DOMContentLoaded", () => {

  // Account button
  const accountBtn = document.getElementById("accountBtn");

  accountBtn.addEventListener("click", () => {
    accountBtn.textContent = "Account Open";

    setTimeout(() => {
      accountBtn.textContent = "My Account";
    }, 1500);
  });


  // Speed test
  const speedBtn = document.getElementById("speedBtn");
  const downloadSpeed = document.getElementById("downloadSpeed");
  const downloadBtn = document.getElementById("downloadBtn");

  function runSpeedTest(button) {

    button.textContent = "Testing...";

    setTimeout(() => {

      const speeds = [96, 98, 101, 104, 107];
      const newSpeed = speeds[Math.floor(Math.random() * speeds.length)];

      downloadSpeed.textContent = newSpeed;

      button.textContent = "✓ Test Complete";

      setTimeout(() => {
        button.textContent = button === speedBtn
          ? "Run Speed Test"
          : "Test Again";
      }, 1500);

    }, 1200);
  }

  speedBtn.addEventListener("click", () => {
    runSpeedTest(speedBtn);
  });

  downloadBtn.addEventListener("click", () => {
    runSpeedTest(downloadBtn);
  });


  // Restart router
  const restartBtn = document.getElementById("restartBtn");

  restartBtn.addEventListener("click", () => {

    restartBtn.textContent = "Restarting...";

    setTimeout(() => {
      restartBtn.textContent = "✓ Router Online";

      setTimeout(() => {
        restartBtn.textContent = "Restart Router";
      }, 1500);

    }, 1800);
  });


  // Router details
  const routerBtn = document.getElementById("routerBtn");

  routerBtn.addEventListener("click", () => {
    routerBtn.textContent = "Details Open ✓";

    setTimeout(() => {
      routerBtn.textContent = "Router Details";
    }, 1500);
  });


  // Device management
  const deviceButtons = document.querySelectorAll(".device-btn");

  deviceButtons.forEach((button) => {

    button.addEventListener("click", () => {

      deviceButtons.forEach((item) => {
        item.classList.remove("managed");
        item.textContent = "Manage";
      });

      button.classList.add("managed");
      button.textContent = "✓ Managed";
    });

  });


  // Settings toggles
  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((button) => {

    button.addEventListener("click", () => {

      button.classList.toggle("active");

      if (button.classList.contains("active")) {
        button.textContent = "ON";
      } else {
        button.textContent = "OFF";
      }

    });

  });


  // Diagnostics
  const supportBtn = document.getElementById("supportBtn");

  supportBtn.addEventListener("click", () => {

    supportBtn.textContent = "Checking Network...";

    setTimeout(() => {
      supportBtn.textContent = "✓ Network Looks Good";

      setTimeout(() => {
        supportBtn.textContent = "Run Diagnostics →";
      }, 1800);

    }, 1500);
  });

});