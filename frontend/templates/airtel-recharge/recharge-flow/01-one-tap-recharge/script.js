document.addEventListener("DOMContentLoaded", () => {

  // Account button
  const accountBtn = document.getElementById("accountBtn");

  accountBtn.addEventListener("click", () => {
    accountBtn.classList.toggle("active");

    if (accountBtn.classList.contains("active")) {
      accountBtn.textContent = "✓ Account Open";
    } else {
      accountBtn.textContent = "My Account";
    }
  });


  // Main recharge button
  const rechargeBtn = document.getElementById("rechargeBtn");

  rechargeBtn.addEventListener("click", () => {
    document.getElementById("plans").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Explore plans
  const plansBtn = document.getElementById("plansBtn");

  plansBtn.addEventListener("click", () => {
    document.getElementById("plans").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Quick recharge
  const quickRechargeBtn = document.getElementById("quickRechargeBtn");

  quickRechargeBtn.addEventListener("click", () => {
    quickRechargeBtn.classList.add("done");
    quickRechargeBtn.textContent = "✓ Recharge Ready";

    setTimeout(() => {
      quickRechargeBtn.classList.remove("done");
      quickRechargeBtn.textContent = "Quick Recharge";
    }, 1500);
  });


  // Edit number
  const editBtn = document.getElementById("editBtn");

  editBtn.addEventListener("click", () => {
    const newNumber = prompt("Enter mobile number:");

    if (newNumber && newNumber.trim() !== "") {
      document.querySelector(".number").textContent = newNumber.trim();
    }
  });


  // View all plans
  const viewAllBtn = document.getElementById("viewAllBtn");

  viewAllBtn.addEventListener("click", () => {
    const originalText = viewAllBtn.textContent;

    viewAllBtn.textContent = "✓ All Plans";

    setTimeout(() => {
      viewAllBtn.textContent = originalText;
    }, 1200);
  });


  // Select plan
  const planButtons = document.querySelectorAll(".select-plan");

  planButtons.forEach(button => {
    button.addEventListener("click", () => {

      planButtons.forEach(item => {
        item.classList.remove("selected");
        item.textContent = "Select";
      });

      button.classList.add("selected");
      button.textContent = "✓ Selected";

    });
  });

});