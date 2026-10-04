document.addEventListener("DOMContentLoaded", () => {

  // Profile button
  const profileBtn = document.getElementById("profileBtn");

  profileBtn.addEventListener("click", () => {
    profileBtn.textContent = "Profile Open";

    setTimeout(() => {
      profileBtn.textContent = "Venkatesh";
    }, 1500);
  });


  // Away mode
  const awayBtn = document.getElementById("awayBtn");

  awayBtn.addEventListener("click", () => {
    awayBtn.textContent = "Activating...";

    setTimeout(() => {
      awayBtn.textContent = "✓ Away Mode Active";

      setTimeout(() => {
        awayBtn.textContent = "Activate Away Mode";
      }, 1800);
    }, 1200);
  });


  // Refresh home
  const refreshBtn = document.getElementById("refreshBtn");

  refreshBtn.addEventListener("click", () => {
    refreshBtn.textContent = "Refreshing...";

    setTimeout(() => {
      refreshBtn.textContent = "✓ Home Updated";

      setTimeout(() => {
        refreshBtn.textContent = "Refresh Home";
      }, 1500);
    }, 1000);
  });


  // View all devices
  const allDevicesBtn = document.getElementById("allDevicesBtn");

  allDevicesBtn.addEventListener("click", () => {
    allDevicesBtn.textContent = "8 Devices Online";

    setTimeout(() => {
      allDevicesBtn.textContent = "View all devices";
    }, 1800);
  });


  // Room buttons
  const roomButtons = document.querySelectorAll(".room-btn");

  roomButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const roomName = button.dataset.room;

      button.textContent = "✓ " + roomName + " Open";

      setTimeout(() => {
        button.textContent = "Open Room →";
      }, 1500);

    });

  });


  // Automation routines
  const routineButtons = document.querySelectorAll(".routine-btn");

  routineButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const routineName = button.dataset.routine;

      button.textContent = "Running...";

      setTimeout(() => {

        button.textContent = "✓ Done";

        setTimeout(() => {
          button.textContent = "Run";
        }, 1600);

      }, 1000);

    });

  });


  // Manage home
  const setupBtn = document.getElementById("setupBtn");

  setupBtn.addEventListener("click", () => {

    setupBtn.textContent = "Home Manager Open ✓";

    setTimeout(() => {
      setupBtn.textContent = "Manage Home →";
    }, 1800);

  });

});