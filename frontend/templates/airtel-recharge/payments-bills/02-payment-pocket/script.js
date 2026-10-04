document.addEventListener("DOMContentLoaded", () => {

  // Menu button
  const menuBtn = document.getElementById("menuBtn");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");

    if (menuBtn.classList.contains("active")) {
      menuBtn.textContent = "Menu Open";
    } else {
      menuBtn.textContent = "Menu";
    }
  });


  // Add payment method
  const addMoneyBtn = document.getElementById("addMoneyBtn");

  addMoneyBtn.addEventListener("click", () => {
    document.querySelector(".methods").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Quick payment buttons
  const paymentButtons = document.querySelectorAll(".card-btn");

  paymentButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const action = button.dataset.action;

      button.textContent = `✓ ${action} Ready`;
      button.classList.add("selected");

      setTimeout(() => {
        button.textContent = "Pay Now →";
        button.classList.remove("selected");
      }, 1800);

    });

  });


  // Saved payment methods
  const methodButtons = document.querySelectorAll(".method-btn");

  methodButtons.forEach((button) => {

    if (!button.dataset.method) {
      return;
    }

    button.addEventListener("click", () => {

      methodButtons.forEach((item) => {
        item.classList.remove("selected");
        if (item.dataset.method) {
          item.textContent = "Use This";
        }
      });

      button.classList.add("selected");
      button.textContent = "✓ Selected";
    });

  });


  // Add new method
  const newMethodBtn = document.getElementById("newMethodBtn");

  newMethodBtn.addEventListener("click", () => {

    newMethodBtn.textContent = "✓ Method Added";

    setTimeout(() => {
      newMethodBtn.textContent = "Add Method";
    }, 1800);

  });


  // View activity
  const historyBtn = document.getElementById("historyBtn");

  historyBtn.addEventListener("click", () => {

    historyBtn.textContent = "Showing All Activity ✓";

    setTimeout(() => {
      historyBtn.textContent = "View All Activity";
    }, 1800);

  });


  // Security details
  const securityBtn = document.getElementById("securityBtn");

  securityBtn.addEventListener("click", () => {

    securityBtn.textContent = "Security Verified ✓";

    setTimeout(() => {
      securityBtn.textContent = "Security Details";
    }, 1800);

  });

});