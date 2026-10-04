document.addEventListener("DOMContentLoaded", () => {

  // Create Content Modal
  const createBtn = document.getElementById("createBtn");
  const createModal = document.getElementById("createModal");
  const closeModal = document.getElementById("closeModal");
  const contentForm = document.getElementById("contentForm");

  createBtn.addEventListener("click", () => {
    createModal.classList.add("show");
  });

  closeModal.addEventListener("click", () => {
    createModal.classList.remove("show");
  });

  createModal.addEventListener("click", (event) => {
    if (event.target === createModal) {
      createModal.classList.remove("show");
    }
  });


  // Create content
  contentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("contentTitle").value;
    const type = document.getElementById("contentType").value;

    alert(`${type} "${title}" created successfully!`);

    contentForm.reset();
    createModal.classList.remove("show");
  });


  // Analytics period selector
  const periodSelect = document.getElementById("periodSelect");
  const chartValue = document.getElementById("chartValue");

  periodSelect.addEventListener("change", () => {

    if (periodSelect.value === "7") {
      chartValue.textContent = "38.4K";
    }

    if (periodSelect.value === "30") {
      chartValue.textContent = "142.8K";
    }

    if (periodSelect.value === "90") {
      chartValue.textContent = "428.6K";
    }
  });


  // Notification button
  const notificationBtn = document.getElementById("notificationBtn");

  notificationBtn.addEventListener("click", () => {
    alert("You have 3 new notifications.");
  });


  // View all button
  const viewAllBtn = document.getElementById("viewAllBtn");

  viewAllBtn.addEventListener("click", () => {
    document.getElementById("content").scrollIntoView({
      behavior: "smooth"
    });
  });


  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    alert("Logout action triggered.");
  });

});