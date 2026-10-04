document.addEventListener("DOMContentLoaded", () => {

  // Project filters
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project-card");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {

      filters.forEach(item => item.classList.remove("active"));
      filter.classList.add("active");

      const selectedFilter = filter.dataset.filter;

      projects.forEach(project => {
        const status = project.dataset.status;

        if (selectedFilter === "all" || status === selectedFilter) {
          project.classList.remove("hidden");
        } else {
          project.classList.add("hidden");
        }
      });
    });
  });


  // New project modal
  const modal = document.getElementById("projectModal");
  const newProjectBtn = document.getElementById("newProjectBtn");
  const closeModal = document.getElementById("closeModal");
  const projectForm = document.getElementById("projectForm");

  newProjectBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });


  // Create a new project
  projectForm.addEventListener("submit", event => {
    event.preventDefault();

    const projectName = document.getElementById("projectName").value;
    const projectCategory =
      document.getElementById("projectCategory").value;

    const projectsGrid = document.querySelector(".projects-grid");

    const newProject = document.createElement("article");

    newProject.className = "project-card";
    newProject.dataset.status = "progress";

    newProject.innerHTML = `
      <div class="project-top">
        <span class="project-category">
          ${projectCategory}
        </span>

        <span class="status progress">
          In Progress
        </span>
      </div>

      <h3>${projectName}</h3>

      <p>
        A new project added to the ProjectHQ workspace.
      </p>

      <div class="progress-info">
        <span>Progress</span>
        <strong>0%</strong>
      </div>

      <div class="progress-bar">
        <div style="width: 0%"></div>
      </div>

      <div class="project-footer">
        <span>Just created</span>
        <button class="view-button">View →</button>
      </div>
    `;

    projectsGrid.appendChild(newProject);

    modal.classList.remove("show");
    projectForm.reset();

    alert("Project created successfully!");
  });


  // View buttons
  document.addEventListener("click", event => {
    if (event.target.classList.contains("view-button")) {
      alert("Project details are ready to view.");
    }
  });

});