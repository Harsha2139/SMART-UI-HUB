document.addEventListener("DOMContentLoaded", () => {

  // System status
  const systemBtn = document.getElementById("systemBtn");

  systemBtn.addEventListener("click", () => {
    systemBtn.textContent = "Checking System...";

    setTimeout(() => {
      systemBtn.textContent = "✓ All Systems Online";

      setTimeout(() => {
        systemBtn.textContent = "System Online";
      }, 1800);
    }, 1000);
  });


  // Network scan
  const scanBtn = document.getElementById("scanBtn");

  scanBtn.addEventListener("click", () => {

    scanBtn.textContent = "Scanning...";

    setTimeout(() => {

      scanBtn.textContent = "✓ 8 Devices Found";

      setTimeout(() => {
        scanBtn.textContent = "Scan Network";
      }, 1800);

    }, 1400);
  });


  // Optimize network
  const optimizeBtn = document.getElementById("optimizeBtn");

  optimizeBtn.addEventListener("click", () => {

    optimizeBtn.textContent = "Optimizing...";

    setTimeout(() => {

      optimizeBtn.textContent = "✓ Network Optimized";

      setTimeout(() => {
        optimizeBtn.textContent = "Optimize Network";
      }, 1800);

    }, 1500);
  });


  // Refresh performance data
  const refreshBtn = document.getElementById("refreshBtn");
  const downloadValue = document.getElementById("downloadValue");

  refreshBtn.addEventListener("click", () => {

    refreshBtn.textContent = "Refreshing...";

    setTimeout(() => {

      downloadValue.textContent = "104";
      refreshBtn.textContent = "✓ Data Updated";

      setTimeout(() => {
        refreshBtn.textContent = "Refresh Data";
      }, 1600);

    }, 1000);
  });


  // Manage devices
  const deviceBtn = document.getElementById("deviceBtn");

  deviceBtn.addEventListener("click", () => {

    deviceBtn.textContent = "8 Devices Connected";

    setTimeout(() => {
      deviceBtn.textContent = "Manage Devices";
    }, 1800);

  });


  // Diagnostics
  const diagnosticsBtn =
    document.getElementById("diagnosticsBtn");

  diagnosticsBtn.addEventListener("click", () => {

    diagnosticsBtn.textContent = "Running Diagnostics...";

    setTimeout(() => {

      diagnosticsBtn.textContent = "✓ No Critical Issues";

      setTimeout(() => {
        diagnosticsBtn.textContent = "Run Diagnostics →";
      }, 2000);

    }, 1500);

  });


  // Network controls
  const commandBtn = document.getElementById("commandBtn");

  commandBtn.addEventListener("click", () => {

    commandBtn.textContent = "Controls Open ✓";

    setTimeout(() => {
      commandBtn.textContent = "Open Network Controls →";
    }, 1800);

  });

});