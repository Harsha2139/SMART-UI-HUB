"use strict";

/* =====================================================
   TEAM DASHBOARD JAVASCRIPT
===================================================== */


/* =====================================================
   DATA
===================================================== */

let members = [
    {
        id: 1,
        name: "Arjun Kumar",
        email: "arjun@teampulse.com",
        role: "Developer",
        department: "Engineering",
        status: "Online",
        projects: 4
    },
    {
        id: 2,
        name: "Priya Menon",
        email: "priya@teampulse.com",
        role: "Designer",
        department: "Design",
        status: "Online",
        projects: 3
    },
    {
        id: 3,
        name: "Rahul Sharma",
        email: "rahul@teampulse.com",
        role: "Developer",
        department: "Engineering",
        status: "Offline",
        projects: 2
    },
    {
        id: 4,
        name: "Meena Reddy",
        email: "meena@teampulse.com",
        role: "Manager",
        department: "Management",
        status: "Online",
        projects: 5
    },
    {
        id: 5,
        name: "Kiran Patel",
        email: "kiran@teampulse.com",
        role: "Analyst",
        department: "Analytics",
        status: "Online",
        projects: 2
    },
    {
        id: 6,
        name: "Ananya Rao",
        email: "ananya@teampulse.com",
        role: "Designer",
        department: "Design",
        status: "Offline",
        projects: 3
    }
];


let tasks = [
    {
        id: 1,
        title: "Review website wireframes",
        priority: "High",
        completed: false
    },
    {
        id: 2,
        title: "Complete API integration",
        priority: "High",
        completed: true
    },
    {
        id: 3,
        title: "Prepare weekly report",
        priority: "Medium",
        completed: false
    },
    {
        id: 4,
        title: "Update project documentation",
        priority: "Low",
        completed: false
    },
    {
        id: 5,
        title: "Review mobile UI",
        priority: "Medium",
        completed: true
    }
];


let projects = [
    {
        id: 1,
        name: "Website Redesign",
        department: "Marketing Team",
        progress: 78,
        color: "purple",
        due: "Oct 12",
        members: ["AR", "PM", "RK"]
    },
    {
        id: 2,
        name: "Mobile Application",
        department: "Engineering Team",
        progress: 56,
        color: "blue",
        due: "Oct 18",
        members: ["JS", "AK", "SM"]
    },
    {
        id: 3,
        name: "AI Assistant",
        department: "AI Research Team",
        progress: 42,
        color: "green",
        due: "Oct 24",
        members: ["BK", "RN", "VP"]
    },
    {
        id: 4,
        name: "Analytics Platform",
        department: "Analytics Team",
        progress: 65,
        color: "purple",
        due: "Oct 29",
        members: ["KP", "AR", "MN"]
    },
    {
        id: 5,
        name: "Customer Portal",
        department: "Engineering Team",
        progress: 38,
        color: "blue",
        due: "Nov 02",
        members: ["RK", "AK", "SM"]
    },
    {
        id: 6,
        name: "Brand Campaign",
        department: "Marketing Team",
        progress: 81,
        color: "green",
        due: "Nov 05",
        members: ["PM", "MN", "KR"]
    }
];


/* =====================================================
   HELPERS
===================================================== */

function get(id) {
    return document.getElementById(id);
}


function initials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


function showToast(message, title = "Success") {

    const toast = get("toast");

    if (!toast) return;

    get("toastTitle").textContent = title;
    get("toastMessage").textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   NAVIGATION
===================================================== */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(button => {

    button.addEventListener("click", () => {

        const page = button.dataset.page;

        openPage(page);

    });

});


function openPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {

        page.classList.remove("active");

    });


    const targetPage = get(pageName + "Page");

    if (targetPage) {

        targetPage.classList.add("active");

    }


    navItems.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );

    });


    if (pageName === "members") {
        renderMembers();
    }

    if (pageName === "projects") {
        renderProjects();
    }

    if (pageName === "tasks") {
        renderTasks();
    }

    if (pageName === "reports") {

        setTimeout(() => {

            drawReportChart();

        }, 50);

    }

    if (pageName === "dashboard") {

        setTimeout(() => {

            drawPerformanceChart();

        }, 50);

    }


    closeMobileSidebar();

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const menuBtn = get("menuBtn");
const sidebar = get("sidebar");
const mobileOverlay = get("mobileOverlay");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");
        mobileOverlay.classList.toggle("show");

    });

}


if (mobileOverlay) {

    mobileOverlay.addEventListener("click", closeMobileSidebar);

}


function closeMobileSidebar() {

    sidebar.classList.remove("open");
    mobileOverlay.classList.remove("show");

}


/* =====================================================
   MEMBER MODAL
===================================================== */

const memberModal = get("memberModal");

function openMemberModal() {

    memberModal.classList.add("show");

    get("newMemberName").focus();

}


function closeMemberModal() {

    memberModal.classList.remove("show");

    get("memberForm").reset();

}


get("addMemberBtn").addEventListener(
    "click",
    openMemberModal
);

get("addMemberBtn2").addEventListener(
    "click",
    openMemberModal
);

get("closeModal").addEventListener(
    "click",
    closeMemberModal
);

get("cancelModal").addEventListener(
    "click",
    closeMemberModal
);


memberModal.addEventListener("click", event => {

    if (event.target === memberModal) {

        closeMemberModal();

    }

});


/* =====================================================
   ADD MEMBER
===================================================== */

get("memberForm").addEventListener("submit", event => {

    event.preventDefault();

    const name =
        get("newMemberName").value.trim();

    const email =
        get("newMemberEmail").value.trim();

    const role =
        get("newMemberRole").value;

    const department =
        get("newMemberDepartment").value;


    if (!name || !email) {

        showToast(
            "Please fill in all required fields.",
            "Validation"
        );

        return;

    }


    if (!email.includes("@")) {

        showToast(
            "Please enter a valid email address.",
            "Validation"
        );

        return;

    }


    const exists = members.some(
        member =>
            member.email.toLowerCase() === email.toLowerCase()
    );


    if (exists) {

        showToast(
            "A member with this email already exists.",
            "Duplicate"
        );

        return;

    }


    const newMember = {

        id: Date.now(),

        name,

        email,

        role,

        department,

        status: "Online",

        projects: 0

    };


    members.push(newMember);


    renderMembers();

    updateMemberCount();

    closeMemberModal();


    showToast(
        `${name} was added to the team.`
    );

});


/* =====================================================
   MEMBER TABLE
===================================================== */

function renderMembers() {

    const table = get("membersTable");

    if (!table) return;


    const search =
        get("memberSearch").value
            .trim()
            .toLowerCase();

    const role =
        get("roleFilter").value;

    const status =
        get("statusFilter").value;


    const filtered = members.filter(member => {

        const matchesSearch =
            member.name.toLowerCase().includes(search) ||
            member.email.toLowerCase().includes(search) ||
            member.department.toLowerCase().includes(search);

        const matchesRole =
            role === "all" ||
            member.role === role;

        const matchesStatus =
            status === "all" ||
            member.status === status;

        return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        );

    });


    if (filtered.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:35px;color:#8991a4;">
                    No members found.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML = filtered.map(member => `

        <tr>

            <td>

                <div class="member-cell">

                    <div class="member-avatar">
                        ${initials(member.name)}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(member.name)}
                        </strong>

                        <small>
                            ${escapeHTML(member.email)}
                        </small>

                    </div>

                </div>

            </td>

            <td>
                ${escapeHTML(member.role)}
            </td>

            <td>
                ${escapeHTML(member.department)}
            </td>

            <td>

                <span class="status ${member.status === "Online" ? "online" : "offline"}">

                    ${member.status}

                </span>

            </td>

            <td>
                ${member.projects}
            </td>

            <td>

                <button
                    class="table-action"
                    data-toggle-member="${member.id}">
                    ${member.status === "Online" ? "Set Offline" : "Set Online"}
                </button>

                <button
                    class="table-action delete"
                    data-delete-member="${member.id}">
                    Delete
                </button>

            </td>

        </tr>

    `).join("");

}


get("memberSearch").addEventListener(
    "input",
    renderMembers
);

get("roleFilter").addEventListener(
    "change",
    renderMembers
);

get("statusFilter").addEventListener(
    "change",
    renderMembers
);


/* =====================================================
   MEMBER ACTIONS
===================================================== */

get("membersTable").addEventListener(
    "click",
    event => {

        const toggleButton =
            event.target.closest("[data-toggle-member]");

        const deleteButton =
            event.target.closest("[data-delete-member]");


        if (toggleButton) {

            const id =
                Number(toggleButton.dataset.toggleMember);

            const member =
                members.find(item => item.id === id);

            if (!member) return;

            member.status =
                member.status === "Online"
                    ? "Offline"
                    : "Online";

            renderMembers();

            showToast(
                `${member.name} is now ${member.status}.`
            );

        }


        if (deleteButton) {

            const id =
                Number(deleteButton.dataset.deleteMember);

            const member =
                members.find(item => item.id === id);

            if (!member) return;


            members =
                members.filter(item => item.id !== id);


            renderMembers();

            updateMemberCount();


            showToast(
                `${member.name} was removed.`,
                "Member Removed"
            );

        }

    }
);


/* =====================================================
   MEMBER COUNT
===================================================== */

function updateMemberCount() {

    get("memberCount").textContent =
        members.length;

}


/* =====================================================
   PROJECTS
===================================================== */

function renderProjects() {

    const container = get("allProjects");

    if (!container) return;


    container.innerHTML = projects.map(project => `

        <div class="project-card">

            <div class="project-top">

                <div class="project-logo ${project.color}">
                    ${project.name.charAt(0)}
                </div>

                <button
                    class="more-btn"
                    data-project-id="${project.id}">
                    ⋮
                </button>

            </div>

            <h3>
                ${escapeHTML(project.name)}
            </h3>

            <p>
                ${escapeHTML(project.department)}
            </p>

            <div class="progress-info">

                <span>Progress</span>

                <strong>
                    ${project.progress}%
                </strong>

            </div>

            <div class="progress">

                <div
                    style="width:${project.progress}%">
                </div>

            </div>

            <div class="project-footer">

                <div class="mini-avatars">

                    ${project.members.map(member =>
                        `<span>${member}</span>`
                    ).join("")}

                </div>

                <small>
                    Due ${project.due}
                </small>

            </div>

        </div>

    `).join("");

}


get("allProjects").addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("[data-project-id]");

        if (!button) return;

        const project =
            projects.find(
                item =>
                    item.id === Number(button.dataset.projectId)
            );

        if (!project) return;

        showToast(
            `${project.name}: ${project.progress}% completed.`,
            "Project Details"
        );

    }
);


get("viewProjectsBtn").addEventListener(
    "click",
    () => openPage("projects")
);


get("newProjectBtn").addEventListener(
    "click",
    () => {

        const name =
            prompt("Enter new project name:");

        if (!name || !name.trim()) return;


        projects.push({

            id: Date.now(),

            name: name.trim(),

            department: "New Team",

            progress: 0,

            color: "purple",

            due: "To be decided",

            members: ["BJ"]

        });


        renderProjects();

        get("projectCount").textContent =
            projects.length;

        showToast(
            `"${name.trim()}" was created.`
        );

    }
);


/* =====================================================
   TASKS
===================================================== */

function renderTasks() {

    const list = get("taskList");

    if (!list) return;


    if (tasks.length === 0) {

        list.innerHTML = `
            <div style="text-align:center;padding:30px;color:#8991a4;">
                No tasks available.
            </div>
        `;

        get("taskSummary").textContent =
            "0 tasks";

        return;

    }


    list.innerHTML = tasks.map(task => `

        <div class="task ${task.completed ? "completed" : ""}">

            <input
                type="checkbox"
                class="task-check"
                data-task-toggle="${task.id}"
                ${task.completed ? "checked" : ""}
            >

            <div class="task-content">

                <strong>
                    ${escapeHTML(task.title)}
                </strong>

            </div>

            <span class="priority ${task.priority}">
                ${task.priority}
            </span>

            <button
                class="task-delete"
                data-task-delete="${task.id}">
                ×
            </button>

        </div>

    `).join("");


    const completed =
        tasks.filter(task => task.completed).length;


    get("taskSummary").textContent =
        `${completed}/${tasks.length} completed`;

}


get("taskForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const title =
            get("taskTitle").value.trim();

        const priority =
            get("taskPriority").value;


        if (!title) return;


        tasks.unshift({

            id: Date.now(),

            title,

            priority,

            completed: false

        });


        get("taskForm").reset();

        renderTasks();


        showToast(
            "New task added to the team."
        );

    }
);


get("taskList").addEventListener(
    "click",
    event => {

        const checkbox =
            event.target.closest("[data-task-toggle]");

        const deleteButton =
            event.target.closest("[data-task-delete]");


        if (checkbox) {

            const id =
                Number(checkbox.dataset.taskToggle);

            const task =
                tasks.find(item => item.id === id);

            if (!task) return;

            task.completed =
                checkbox.checked;

            renderTasks();

            updateCompletedCount();

        }


        if (deleteButton) {

            const id =
                Number(deleteButton.dataset.taskDelete);

            tasks =
                tasks.filter(
                    item => item.id !== id
                );

            renderTasks();

            showToast(
                "Task deleted.",
                "Task Removed"
            );

        }

    }
);


function updateCompletedCount() {

    const completed =
        tasks.filter(task => task.completed).length;

    get("completedCount").textContent =
        126 + completed;

}


/* =====================================================
   PERFORMANCE CHART
===================================================== */

function drawPerformanceChart() {

    const canvas =
        get("performanceChart");

    if (!canvas) return;


    const parent =
        canvas.parentElement;

    const width =
        parent.clientWidth - 40;

    if (width <= 0) return;


    const height = 280;

    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    const ctx =
        canvas.getContext("2d");

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    const period =
        get("chartPeriod").value;


    let values;

    let labels;


    if (period === "month") {

        values =
            [42, 55, 49, 67, 72, 81, 87, 92];

        labels =
            ["W1","W2","W3","W4","W5","W6","W7","W8"];

    }
    else if (period === "quarter") {

        values =
            [55, 61, 68, 72, 78, 84];

        labels =
            ["Jan","Feb","Mar","Apr","May","Jun"];

    }
    else {

        values =
            [35, 48, 42, 61, 57, 74, 87];

        labels =
            ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    }


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /* GRID */

    ctx.strokeStyle = "#e9ecf4";
    ctx.lineWidth = 1;


    for (let i = 0; i <= 4; i++) {

        const y =
            25 + i * 48;

        ctx.beginPath();

        ctx.moveTo(10, y);

        ctx.lineTo(width - 10, y);

        ctx.stroke();

    }


    /* LINE */

    const max =
        Math.max(...values) + 10;

    const min =
        Math.max(0, Math.min(...values) - 10);


    const chartWidth =
        width - 35;

    const chartHeight =
        205;


    const points =
        values.map((value, index) => {

            const x =
                20 +
                index *
                (chartWidth / (values.length - 1));

            const y =
                20 +
                ((max - value) /
                (max - min)) *
                chartHeight;

            return {x, y};

        });


    /* AREA */

    ctx.beginPath();

    ctx.moveTo(
        points[0].x,
        points[0].y
    );


    points.forEach(point => {

        ctx.lineTo(
            point.x,
            point.y
        );

    });


    ctx.lineTo(
        points[points.length - 1].x,
        245
    );

    ctx.lineTo(
        points[0].x,
        245
    );

    ctx.closePath();


    const gradient =
        ctx.createLinearGradient(
            0,
            20,
            0,
            245
        );

    gradient.addColorStop(
        0,
        "rgba(99,91,255,.22)"
    );

    gradient.addColorStop(
        1,
        "rgba(99,91,255,0)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fill();


    /* LINE */

    ctx.beginPath();

    ctx.moveTo(
        points[0].x,
        points[0].y
    );


    points.slice(1).forEach(point => {

        ctx.lineTo(
            point.x,
            point.y
        );

    });


    ctx.strokeStyle =
        "#635bff";

    ctx.lineWidth = 3;

    ctx.lineJoin = "round";

    ctx.stroke();


    /* POINTS */

    points.forEach(point => {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#635bff";

        ctx.fill();

        ctx.strokeStyle =
            "#ffffff";

        ctx.lineWidth = 2;

        ctx.stroke();

    });


    /* LABELS */

    ctx.fillStyle =
        "#9299aa";

    ctx.font =
        "10px Arial";

    ctx.textAlign =
        "center";


    labels.forEach((label, index) => {

        const x =
            20 +
            index *
            (chartWidth / (labels.length - 1));

        ctx.fillText(
            label,
            x,
            270
        );

    });

}


/* =====================================================
   REPORT CHART
===================================================== */

function drawReportChart() {

    const canvas =
        get("reportChart");

    if (!canvas) return;


    const parent =
        canvas.parentElement;

    const width =
        parent.clientWidth - 40;

    if (width <= 0) return;


    const height = 280;

    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        width * ratio;

    canvas.height =
        height * ratio;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";


    const ctx =
        canvas.getContext("2d");

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    const period =
        Number(get("reportPeriod").value);


    let values =
        period === 7
            ? [55,62,58,71,68,82,87]
            : period === 14
                ? [48,55,62,58,66,70,74,72,79,82,77,85,88,91]
                : [45,48,53,55,58,61,65,63,69,72,75,78,80,82,84];


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    ctx.strokeStyle =
        "#e9ecf4";

    ctx.lineWidth = 1;


    for (let i = 0; i < 5; i++) {

        const y =
            25 + i * 48;

        ctx.beginPath();

        ctx.moveTo(10, y);

        ctx.lineTo(width - 10, y);

        ctx.stroke();

    }


    const max = 100;

    const chartHeight = 210;

    const chartWidth = width - 35;


    const points =
        values.map((value, index) => {

            const x =
                20 +
                index *
                (chartWidth / (values.length - 1));

            const y =
                20 +
                ((max - value) / max) *
                chartHeight;

            return {x, y};

        });


    ctx.beginPath();

    points.forEach((point, index) => {

        if (index === 0) {

            ctx.moveTo(
                point.x,
                point.y
            );

        }
        else {

            ctx.lineTo(
                point.x,
                point.y
            );

        }

    });


    ctx.strokeStyle =
        "#16a34a";

    ctx.lineWidth = 3;

    ctx.stroke();


    points.forEach(point => {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#16a34a";

        ctx.fill();

        ctx.strokeStyle =
            "white";

        ctx.lineWidth = 2;

        ctx.stroke();

    });


    ctx.fillStyle =
        "#9299aa";

    ctx.font =
        "10px Arial";

    ctx.textAlign =
        "center";


    values.forEach((_, index) => {

        const x =
            20 +
            index *
            (chartWidth / (values.length - 1));

        ctx.fillText(
            index + 1,
            x,
            270
        );

    });

}


/* =====================================================
   CHART CONTROLS
===================================================== */

get("chartPeriod").addEventListener(
    "change",
    drawPerformanceChart
);

get("reportPeriod").addEventListener(
    "change",
    drawReportChart
);


/* =====================================================
   GLOBAL SEARCH
===================================================== */

get("globalSearch").addEventListener(
    "input",
    event => {

        const query =
            event.target.value
                .trim()
                .toLowerCase();


        if (!query) return;


        const memberResults =
            members.filter(member =>
                member.name.toLowerCase().includes(query) ||
                member.email.toLowerCase().includes(query) ||
                member.role.toLowerCase().includes(query)
            );


        const projectResults =
            projects.filter(project =>
                project.name.toLowerCase().includes(query) ||
                project.department.toLowerCase().includes(query)
            );


        const taskResults =
            tasks.filter(task =>
                task.title.toLowerCase().includes(query)
            );


        if (
            memberResults.length > 0 ||
            projectResults.length > 0 ||
            taskResults.length > 0
        ) {

            showToast(
                `${memberResults.length} members, ${projectResults.length} projects, ${taskResults.length} tasks found.`,
                "Search Results"
            );

        }

    }
);


/* =====================================================
   NOTIFICATIONS
===================================================== */

get("notificationBtn").addEventListener(
    "click",
    () => {

        showToast(
            "You have 3 new team notifications.",
            "Notifications"
        );

    }
);


/* =====================================================
   ACTIVITY
===================================================== */

get("viewActivityBtn").addEventListener(
    "click",
    () => {

        showToast(
            "Showing the latest team activity.",
            "Activity"
        );

    }
);


/* =====================================================
   PROJECT QUICK MENU
===================================================== */

document.querySelectorAll("[data-project-menu]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const project =
                    button.dataset.projectMenu;

                showToast(
                    `${project} selected.`,
                    "Project"
                );

            }
        );

    });


/* =====================================================
   UPGRADE
===================================================== */

get("upgradeBtn").addEventListener(
    "click",
    () => {

        showToast(
            "Team Pro upgrade flow opened.",
            "Team Pro"
        );

    }
);


/* =====================================================
   LOGOUT
===================================================== */

get("logoutBtn").addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Are you sure you want to log out?"
            );

        if (!confirmed) return;

        showToast(
            "Demo logout completed.",
            "Logged Out"
        );

    }
);


/* =====================================================
   SETTINGS
===================================================== */

get("settingsForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            get("organizationName").value.trim();

        const email =
            get("adminEmail").value.trim();


        if (!name || !email) {

            showToast(
                "Please complete the settings.",
                "Validation"
            );

            return;

        }


        localStorage.setItem(
            "teamOrganization",
            name
        );

        localStorage.setItem(
            "teamAdminEmail",
            email
        );

        localStorage.setItem(
            "teamTimezone",
            get("timezone").value
        );


        showToast(
            "Your organization settings were saved."
        );

    }
);


/* =====================================================
   DARK MODE
===================================================== */

get("darkMode").addEventListener(
    "change",
    event => {

        document.body.classList.toggle(
            "dark",
            event.target.checked
        );

        showToast(
            event.target.checked
                ? "Dark mode enabled."
                : "Light mode enabled.",
            "Appearance"
        );

    }
);


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMemberModal();

            closeMobileSidebar();

        }

    }
);


/* =====================================================
   WINDOW RESIZE
===================================================== */

window.addEventListener(
    "resize",
    () => {

        const dashboard =
            get("dashboardPage");

        const reports =
            get("reportsPage");


        if (
            dashboard &&
            dashboard.classList.contains("active")
        ) {

            drawPerformanceChart();

        }


        if (
            reports &&
            reports.classList.contains("active")
        ) {

            drawReportChart();

        }

    }
);


/* =====================================================
   LOAD SAVED SETTINGS
===================================================== */

function loadSettings() {

    const organization =
        localStorage.getItem(
            "teamOrganization"
        );

    const email =
        localStorage.getItem(
            "teamAdminEmail"
        );

    const timezone =
        localStorage.getItem(
            "teamTimezone"
        );


    if (organization) {

        get("organizationName").value =
            organization;

    }


    if (email) {

        get("adminEmail").value =
            email;

    }


    if (timezone) {

        get("timezone").value =
            timezone;

    }

}


/* =====================================================
   INITIALIZE
===================================================== */

function initialize() {

    loadSettings();

    renderMembers();

    renderProjects();

    renderTasks();

    updateMemberCount();

    setTimeout(() => {

        drawPerformanceChart();

    }, 100);

}


initialize();