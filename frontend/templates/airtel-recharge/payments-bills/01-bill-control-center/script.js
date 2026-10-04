document.addEventListener("DOMContentLoaded", () => {

  // Account button
  const profileBtn = document.getElementById("profileBtn");

  profileBtn.addEventListener("click", () => {
    profileBtn.textContent = "Account Open";

    setTimeout(() => {
      profileBtn.textContent = "Account";
    }, 1500);
  });


  // Pay current bill
  const payHeroBtn = document.getElementById("payHeroBtn");
  const payBillBtn = document.getElementById("payBillBtn");

  function payBill(button) {
    button.textContent = "✓ Payment Successful";
    button.style.background = "#198754";

    setTimeout(() => {
      button.textContent = button === payHeroBtn
        ? "Pay Current Bill"
        : "Pay ₹749";

      button.style.background = "";
    }, 2000);
  }

  payHeroBtn.addEventListener("click", () => {
    payBill(payHeroBtn);
  });

  payBillBtn.addEventListener("click", () => {
    payBill(payBillBtn);
  });


  // Reminder from hero
  const reminderHeroBtn = document.getElementById("reminderHeroBtn");

  reminderHeroBtn.addEventListener("click", () => {
    document.querySelector(".reminder-section").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Autopay
  const autopayBtn = document.getElementById("autopayBtn");
  const autopayStatus = document.getElementById("autopayStatus");

  autopayBtn.addEventListener("click", () => {

    if (autopayStatus.textContent === "ON") {
      autopayStatus.textContent = "OFF";
      autopayStatus.style.color = "#e4002b";
      autopayBtn.textContent = "Turn On";
    } else {
      autopayStatus.textContent = "ON";
      autopayStatus.style.color = "";
      autopayBtn.textContent = "Turn Off";
    }

  });


  // Change payment method
  const changePaymentBtn = document.getElementById("changePaymentBtn");
  const paymentMethod = document.getElementById("paymentMethod");

  changePaymentBtn.addEventListener("click", () => {

    if (paymentMethod.textContent === "UPI") {
      paymentMethod.textContent = "Card";
    } else if (paymentMethod.textContent === "Card") {
      paymentMethod.textContent = "Net Banking";
    } else {
      paymentMethod.textContent = "UPI";
    }

    changePaymentBtn.textContent = "Method Updated ✓";

    setTimeout(() => {
      changePaymentBtn.textContent = "Change Method →";
    }, 1500);
  });


  // Full history
  const historyBtn = document.getElementById("historyBtn");

  historyBtn.addEventListener("click", () => {
    historyBtn.textContent = "Showing Full History ✓";

    setTimeout(() => {
      historyBtn.textContent = "View Full History";
    }, 1800);
  });


  // Payment reminder
  const reminderBtn = document.getElementById("reminderBtn");

  reminderBtn.addEventListener("click", () => {

    reminderBtn.classList.toggle("active");

    if (reminderBtn.classList.contains("active")) {
      reminderBtn.textContent = "✓ Reminders Enabled";
    } else {
      reminderBtn.textContent = "Reminders On";
    }

  });

});