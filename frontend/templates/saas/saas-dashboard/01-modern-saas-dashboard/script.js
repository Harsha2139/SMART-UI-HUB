"use strict";

/* =========================
   DATA
========================= */

let customers = [
    {
        id: 1,
        name: "Arun Kumar",
        company: "TechNova",
        status: "Active",
        plan: "Pro",
        revenue: 4200
    },
    {
        id: 2,
        name: "Priya Sharma",
        company: "PixelWorks",
        status: "Active",
        plan: "Enterprise",
        revenue: 8200
    },
    {
        id: 3,
        name: "Rahul Verma",
        company: "CloudDesk",
        status: "Inactive",
        plan: "Starter",
        revenue: 900
    },
    {
        id: 4,
        name: "Sneha Reddy",
        company: "DataLabs",
        status: "Active",
        plan: "Pro",
        revenue: 3600
    }
];

let tasks = [
    {
        id: 1,
        title: "Prepare monthly report",
        priority: "High",
        completed: false
    },
    {
        id: 2,
        title: "Contact new customer",
        priority: "Medium",
        completed: false
    },
    {
        id: 3,
        title: "Update project documentation",
        priority: "Low",
        completed: true
    },
    {
        id: 4,
        title: "Review analytics",
        priority: "High",
        completed: false
    }
];

const activities = [
    ["👤", "New customer registered", "2 minutes ago"],
    ["💳", "Payment received", "18 minutes ago"],
    ["📁", "Project updated", "42 minutes ago"],
    ["✅", "Task completed", "1 hour ago"],
    ["🚀", "Deployment successful", "2 hours ago"]
];

/* =========================
   HELPERS
========================= */

const $ = id => document.getElementById(id);

function toast(message) {
    const box = $("toast");

    box.textContent = message;
    box.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        box.classList.remove("show");
    }, 2500);
}

function openModal(id) {
    $(id).classList.add("show");
}

function closeModal(id) {
    $(id).classList.remove("show");
}

/* =========================
   NAVIGATION
========================= */

const titles = {
    overview: ["Modern Dashboard", "Monitor your business from one place."],
    customers: ["Customers", "Manage your customer database."],
    projects: ["Projects", "Track project progress."],
    tasks: ["Tasks", "Manage your daily work."],
    reports: ["Reports", "Business performance reports."],
    settings: ["Settings", "Configure your workspace."]
};

document.querySelectorAll(".nav-btn").forEach(button => {

    button.addEventListener("click", () => {

        const view = button.dataset.view;

        document.querySelectorAll(".nav-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        document.querySelectorAll(".view").forEach(section => {
            section.classList.remove("active");
        });

        const target = $("view-" + view);

        if (target) {
            target.classList.add("active");
        }

        $("pageTitle").textContent = titles[view][0];
        $("pageSubtitle").textContent = titles[view][1];

        if (view === "overview") {
            setTimeout(drawChart, 50);
        }

        $("sidebar").classList.remove("open");
    });

});

/* =========================
   MOBILE MENU
========================= */

$("menuBtn").addEventListener("click", () => {
    $("sidebar").classList.toggle("open");
});

/* =========================
   ACTIVITY
========================= */

function renderActivities() {

    $("activityList").innerHTML = activities.map(item => `
        <div class="activity">
            <div class="activity-icon">${item[0]}</div>

            <div>
                <strong>${item[1]}</strong>
                <small>${item[2]}</small>
            </div>
        </div>
    `).join("");
}

/* =========================
   CUSTOMERS
========================= */

function renderCustomers() {

    const search = $("customerSearch").value.toLowerCase();
    const filter = $("customerFilter").value;

    const result = customers.filter(customer => {

        const matchesSearch =
            customer.name.toLowerCase().includes(search) ||
            customer.company.toLowerCase().includes(search);

        const matchesFilter =
            filter === "all" ||
            customer.status.toLowerCase() === filter;

        return matchesSearch && matchesFilter;
    });

    $("customerTable").innerHTML = result.map(customer => `
        <tr>
            <td>
                <strong>${customer.name}</strong>
            </td>

            <td>${customer.company}</td>

            <td>
                <span class="status ${customer.status.toLowerCase()}">
                    ${customer.status}
                </span>
            </td>

            <td>${customer.plan}</td>

            <td>$${customer.revenue.toLocaleString()}</td>

            <td>
                <button class="delete-btn" onclick="deleteCustomer(${customer.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");

    $("customerCount").textContent =
        (1248 + customers.length - 4).toLocaleString();
}

window.deleteCustomer = function(id) {

    customers = customers.filter(customer => customer.id !== id);

    renderCustomers();

    toast("Customer deleted");
};

$("customerSearch").addEventListener("input", renderCustomers);
$("customerFilter").addEventListener("change", renderCustomers);

$("addCustomerBtn").addEventListener("click", () => {
    openModal("customerModal");
});

$("customerForm").addEventListener("submit", event => {

    event.preventDefault();

    const newCustomer = {
        id: Date.now(),
        name: $("customerName").value.trim(),
        company: $("customerCompany").value.trim(),
        status: "Active",
        plan: $("customerPlan").value,
        revenue: Math.floor(Math.random() * 5000) + 500
    };

    customers.unshift(newCustomer);

    event.target.reset();

    closeModal("customerModal");

    renderCustomers();

    toast("Customer added successfully");
});

/* =========================
   PROJECTS
========================= */

const projects = [
    {
        name: "Mobile App",
        icon: "📱",
        description: "Customer mobile application",
        progress: 82
    },
    {
        name: "Website Redesign",
        icon: "🎨",
        description: "New company website",
        progress: 65
    },
    {
        name: "AI Assistant",
        icon: "🤖",
        description: "AI customer support system",
        progress: 48
    },
    {
        name: "Analytics",
        icon: "📊",
        description: "Business analytics platform",
        progress: 91
    },
    {
        name: "CRM Migration",
        icon: "🔄",
        description: "Migration to new CRM",
        progress: 37
    },
    {
        name: "API Platform",
        icon: "⚡",
        description: "Public API development",
        progress: 73
    }
];

function renderProjects() {

    $("projectGrid").innerHTML = projects.map(project => `
        <div class="project-card">

            <div class="project-icon">${project.icon}</div>

            <h3>${project.name}</h3>

            <p>${project.description}</p>

            <div class="progress">
                <div style="width:${project.progress}%"></div>
            </div>

            <div class="progress-info">
                <span>Progress</span>
                <strong>${project.progress}%</strong>
            </div>

        </div>
    `).join("");
}

$("newProjectBtn").addEventListener("click", () => {

    const name = prompt("Enter project name:");

    if (!name || !name.trim()) {
        return;
    }

    projects.push({
        name: name.trim(),
        icon: "📌",
        description: "New workspace project",
        progress: 0
    });

    renderProjects();

    toast("Project created");
});

/* =========================
   TASKS
========================= */

let currentTaskFilter = "all";

function renderTasks() {

    let filtered = tasks;

    if (currentTaskFilter === "pending") {
        filtered = tasks.filter(task => !task.completed);
    }

    if (currentTaskFilter === "completed") {
        filtered = tasks.filter(task => task.completed);
    }

    $("taskList").innerHTML = filtered.map(task => `
        <div class="task-item ${task.completed ? "completed" : ""}">

            <input
                class="task-check"
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >

            <div class="task-content">
                <strong>${task.title}</strong>
                <small>Workspace task</small>
            </div>

            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">
                Delete
            </button>

        </div>
    `).join("");

    const completed = tasks.filter(task => task.completed).length;

    $("taskCount").textContent = 126 + completed;

    const rate = tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0;

    $("taskRate").textContent = rate + "%";
}

window.toggleTask = function(id) {

    const task = tasks.find(item => item.id === id);

    if (task) {
        task.completed = !task.completed;
    }

    renderTasks();
};

window.deleteTask = function(id) {

    tasks = tasks.filter(task => task.id !== id);

    renderTasks();

    toast("Task deleted");
};

document.querySelectorAll(".filter-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentTaskFilter = button.dataset.filter;

        renderTasks();
    });

});

$("addTaskBtn").addEventListener("click", () => {
    openModal("taskModal");
});

$("taskForm").addEventListener("submit", event => {

    event.preventDefault();

    tasks.unshift({
        id: Date.now(),
        title: $("taskName").value.trim(),
        priority: $("taskPriority").value,
        completed: false
    });

    event.target.reset();

    closeModal("taskModal");

    renderTasks();

    toast("Task created");
});

/* =========================
   QUICK ADD
========================= */

$("quickAddBtn").addEventListener("click", () => {

    const choice = prompt(
        "Type what you want to add:\n1 = Customer\n2 = Task"
    );

    if (choice === "1") {
        openModal("customerModal");
    } else if (choice === "2") {
        openModal("taskModal");
    }
});

/* =========================
   CHART
========================= */

function drawChart() {

    const canvas = $("revenueChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();

    const width = Math.max(rect.width, 300);
    const height = 290;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const values =
        $("chartPeriod").value === "12"
            ? [24, 28, 31, 27, 35, 38, 41, 39, 44, 42, 46, 48]
            : [31, 27, 35, 38, 41, 39];

    const max = 55;

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let i = 0; i < 5; i++) {

        const y = 30 + i * 50;

        ctx.beginPath();
        ctx.moveTo(35, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
    }

    const points = values.map((value, index) => {

        const x =
            40 +
            index *
            ((width - 70) / (values.length - 1));

        const y =
            height -
            35 -
            (value / max) * 220;

        return { x, y };
    });

    const gradient = ctx.createLinearGradient(0, 0, 0, height);

    gradient.addColorStop(0, "rgba(99,91,255,.25)");
    gradient.addColorStop(1, "rgba(99,91,255,0)");

    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }

    });

    ctx.lineTo(points[points.length - 1].x, height - 25);
    ctx.lineTo(points[0].x, height - 25);
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }

    });

    ctx.strokeStyle = "#635bff";
    ctx.lineWidth = 3;
    ctx.stroke();

    points.forEach(point => {

        ctx.beginPath();

        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);

        ctx.fillStyle = "#635bff";
        ctx.fill();

        ctx.beginPath();

        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);

        ctx.fillStyle = "white";
        ctx.fill();
    });
}

$("chartPeriod").addEventListener("change", drawChart);

/* =========================
   REPORT EXPORT
========================= */

$("exportReportBtn").addEventListener("click", () => {

    const rows = [
        ["Metric", "Value"],
        ["Revenue", "$48,290"],
        ["Conversion", "7.82%"],
        ["Retention", "92.4%"],
        ["Churn", "2.8%"],
        ["New Customers", "186"]
    ];

    downloadCSV(rows, "novaflow-report.csv");

    toast("Report exported");
});

function downloadCSV(rows, filename) {

    const csv = rows
        .map(row =>
            row.map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            ).join(",")
        )
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}

/* =========================
   SETTINGS
========================= */

$("saveSettingsBtn").addEventListener("click", () => {

    const name = $("workspaceName").value.trim();

    localStorage.setItem(
        "novaflow_workspace",
        name
    );

    localStorage.setItem(
        "novaflow_timezone",
        $("timezone").value
    );

    toast("Settings saved successfully");
});

const savedWorkspace =
    localStorage.getItem("novaflow_workspace");

if (savedWorkspace) {
    $("workspaceName").value = savedWorkspace;
}

/* =========================
   BUTTONS
========================= */

$("notifyBtn").addEventListener("click", () => {
    toast("You have 3 new notifications");
});

$("profileBtn").addEventListener("click", () => {
    toast("Profile menu opened");
});

$("upgradeBtn").addEventListener("click", () => {
    toast("Upgrade page opened");
});

/* =========================
   CLOSE MODALS
========================= */

document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener("click", () => {
        closeModal(button.dataset.close);
    });

});

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {
            modal.classList.remove("show");
        }

    });

});

/* =========================
   GLOBAL SEARCH
========================= */

$("globalSearch").addEventListener("input", event => {

    const value = event.target.value.toLowerCase().trim();

    if (!value) return;

    const customer = customers.find(item =>
        item.name.toLowerCase().includes(value) ||
        item.company.toLowerCase().includes(value)
    );

    const task = tasks.find(item =>
        item.title.toLowerCase().includes(value)
    );

    if (customer) {
        toast("Customer found: " + customer.name);
    } else if (task) {
        toast("Task found: " + task.title);
    }
});

/* =========================
   INITIALIZE
========================= */

renderActivities();
renderCustomers();
renderProjects();
renderTasks();

setTimeout(drawChart, 100);

window.addEventListener("resize", drawChart);