/* =====================================================
   WORKSPACE MANAGEMENT
   Standalone JavaScript
===================================================== */

"use strict";


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_KEY = "workspace_management_v2";


/* =====================================================
   DEFAULT DATA
===================================================== */

const defaultData = {

    currentWorkspaceId: "ws1",

    workspaces: [

        {
            id: "ws1",
            name: "Product Team",
            description:
                "Manage product development, design and engineering.",
            color: "#7c3aed",

            members: [

                {
                    id: "m1",
                    name: "Jayanth",
                    role: "Workspace Admin"
                },

                {
                    id: "m2",
                    name: "Rahul",
                    role: "Developer"
                },

                {
                    id: "m3",
                    name: "Priya",
                    role: "UI Designer"
                }

            ],

            projects: [

                {
                    id: "p1",
                    name: "Website Redesign",
                    owner: "Priya",
                    due: "2026-10-15",
                    progress: 72
                },

                {
                    id: "p2",
                    name: "Mobile Application",
                    owner: "Rahul",
                    due: "2026-11-10",
                    progress: 45
                },

                {
                    id: "p3",
                    name: "AI Assistant",
                    owner: "Jayanth",
                    due: "2026-12-01",
                    progress: 25
                }

            ],

            tasks: [

                {
                    id: "t1",
                    title: "Create landing page",
                    projectId: "p1",
                    assignee: "Priya",
                    priority: "high",
                    status: "todo"
                },

                {
                    id: "t2",
                    title: "Build navigation system",
                    projectId: "p1",
                    assignee: "Rahul",
                    priority: "medium",
                    status: "progress"
                },

                {
                    id: "t3",
                    title: "Prepare database schema",
                    projectId: "p2",
                    assignee: "Jayanth",
                    priority: "high",
                    status: "todo"
                },

                {
                    id: "t4",
                    title: "Design dashboard",
                    projectId: "p2",
                    assignee: "Priya",
                    priority: "medium",
                    status: "done"
                },

                {
                    id: "t5",
                    title: "Create AI prompt system",
                    projectId: "p3",
                    assignee: "Jayanth",
                    priority: "low",
                    status: "progress"
                }

            ],

            activities: [

                {
                    icon: "🚀",
                    text: "Workspace created",
                    time: "Today"
                },

                {
                    icon: "✓",
                    text: "Dashboard project updated",
                    time: "2 hours ago"
                },

                {
                    icon: "👤",
                    text: "Priya joined the workspace",
                    time: "Yesterday"
                }

            ]
        },

        {
            id: "ws2",
            name: "Marketing",
            description:
                "Campaigns, content and marketing operations.",
            color: "#ec4899",

            members: [

                {
                    id: "m4",
                    name: "Ananya",
                    role: "Marketing Lead"
                },

                {
                    id: "m5",
                    name: "Kiran",
                    role: "Content Writer"
                }

            ],

            projects: [

                {
                    id: "p4",
                    name: "Social Campaign",
                    owner: "Ananya",
                    due: "2026-10-20",
                    progress: 60
                }

            ],

            tasks: [

                {
                    id: "t6",
                    title: "Create Instagram campaign",
                    projectId: "p4",
                    assignee: "Ananya",
                    priority: "high",
                    status: "progress"
                }

            ],

            activities: [

                {
                    icon: "📣",
                    text: "Marketing workspace created",
                    time: "Yesterday"
                }

            ]
        }

    ]

};


/* =====================================================
   STATE
===================================================== */

let data = loadData();

let draggedTaskId = null;

let editingWorkspace = false;
let editingProject = false;
let editingTask = false;


/* =====================================================
   DOM
===================================================== */

const workspaceList =
    document.getElementById("workspaceList");

const workspaceTitle =
    document.getElementById("workspaceTitle");

const workspaceDescription =
    document.getElementById("workspaceDescription");

const breadcrumbWorkspace =
    document.getElementById("breadcrumbWorkspace");

const projectGrid =
    document.getElementById("projectGrid");

const todoTasks =
    document.getElementById("todoTasks");

const progressTasks =
    document.getElementById("progressTasks");

const doneTasks =
    document.getElementById("doneTasks");

const activityList =
    document.getElementById("activityList");

const teamList =
    document.getElementById("teamList");

const searchInput =
    document.getElementById("searchInput");


/* =====================================================
   INITIALIZE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    bindEvents();

    render();

});


/* =====================================================
   STORAGE FUNCTIONS
===================================================== */

function loadData() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (
                parsed &&
                Array.isArray(parsed.workspaces) &&
                parsed.workspaces.length
            ) {
                return parsed;
            }
        }

    } catch (error) {

        console.error(
            "Could not load saved data",
            error
        );

    }

    return JSON.parse(
        JSON.stringify(defaultData)
    );
}


function saveData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


/* =====================================================
   ID GENERATOR
===================================================== */

function makeId(prefix) {

    return (
        prefix +
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 7)
    );
}


/* =====================================================
   CURRENT WORKSPACE
===================================================== */

function getCurrentWorkspace() {

    let workspace =
        data.workspaces.find(
            ws => ws.id === data.currentWorkspaceId
        );

    if (!workspace) {

        workspace =
            data.workspaces[0];

        data.currentWorkspaceId =
            workspace.id;
    }

    return workspace;
}


/* =====================================================
   RENDER EVERYTHING
===================================================== */

function render() {

    const workspace =
        getCurrentWorkspace();

    renderWorkspaceList();

    renderHeader(workspace);

    renderStats(workspace);

    renderProjects(workspace);

    renderTasks(workspace);

    renderActivities(workspace);

    renderMembers(workspace);

    saveData();

}


/* =====================================================
   WORKSPACE LIST
===================================================== */

function renderWorkspaceList() {

    workspaceList.innerHTML = "";

    data.workspaces.forEach(function (workspace) {

        const button =
            document.createElement("button");

        button.className =
            "workspace-item";

        if (
            workspace.id ===
            data.currentWorkspaceId
        ) {
            button.classList.add("active");
        }

        button.dataset.id =
            workspace.id;

        button.innerHTML = `
            <span
                class="workspace-color"
                style="background:${escapeHTML(workspace.color)}"
            ></span>

            <span class="workspace-item-name">
                ${escapeHTML(workspace.name)}
            </span>
        `;

        workspaceList.appendChild(button);

    });

}


/* =====================================================
   HEADER
===================================================== */

function renderHeader(workspace) {

    workspaceTitle.textContent =
        workspace.name;

    workspaceDescription.textContent =
        workspace.description;

    breadcrumbWorkspace.textContent =
        workspace.name;

}


/* =====================================================
   STATS
===================================================== */

function renderStats(workspace) {

    const totalTasks =
        workspace.tasks.length;

    const completed =
        workspace.tasks.filter(
            task => task.status === "done"
        ).length;

    document.getElementById(
        "projectCount"
    ).textContent =
        workspace.projects.length;

    document.getElementById(
        "taskCount"
    ).textContent =
        totalTasks;

    document.getElementById(
        "memberCount"
    ).textContent =
        workspace.members.length;

    document.getElementById(
        "completedCount"
    ).textContent =
        completed;

}


/* =====================================================
   PROJECTS
===================================================== */

function renderProjects(workspace) {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const projects =
        workspace.projects.filter(
            project => {

                if (!search) {
                    return true;
                }

                return project.name
                    .toLowerCase()
                    .includes(search);

            }
        );


    projectGrid.innerHTML = "";


    if (!projects.length) {

        projectGrid.innerHTML = `
            <div class="empty">
                No projects found.
            </div>
        `;

        return;
    }


    projects.forEach(function (project) {

        const card =
            document.createElement("article");

        card.className =
            "project-card";

        const progress =
            Math.max(
                0,
                Math.min(
                    100,
                    Number(project.progress) || 0
                )
            );

        card.innerHTML = `

            <div class="project-top">

                <div>

                    <div class="project-name">
                        ${escapeHTML(project.name)}
                    </div>

                    <div class="project-owner">
                        Owner: ${escapeHTML(project.owner)}
                    </div>

                </div>

                <div class="project-menu">

                    <button
                        title="Edit"
                        data-action="edit-project"
                        data-id="${project.id}"
                    >
                        ✏
                    </button>

                    <button
                        title="Delete"
                        data-action="delete-project"
                        data-id="${project.id}"
                    >
                        🗑
                    </button>

                </div>

            </div>


            <div class="progress-row">

                <span>Progress</span>

                <strong>${progress}%</strong>

            </div>


            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${progress}%"
                ></div>

            </div>


            <div class="project-date">
                📅 Due ${formatDate(project.due)}
            </div>

        `;

        projectGrid.appendChild(card);

    });

}


/* =====================================================
   TASKS
===================================================== */

function renderTasks(workspace) {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const columns = {

        todo: todoTasks,

        progress: progressTasks,

        done: doneTasks

    };


    Object.values(columns).forEach(
        element => {
            element.innerHTML = "";
        }
    );


    const counts = {
        todo: 0,
        progress: 0,
        done: 0
    };


    const tasks =
        workspace.tasks.filter(
            task => {

                if (!search) {
                    return true;
                }

                const project =
                    workspace.projects.find(
                        p =>
                            p.id ===
                            task.projectId
                    );

                const projectName =
                    project
                        ? project.name
                        : "";

                return (
                    task.title
                        .toLowerCase()
                        .includes(search) ||

                    projectName
                        .toLowerCase()
                        .includes(search)
                );

            }
        );


    tasks.forEach(function (task) {

        if (columns[task.status]) {

            counts[task.status]++;

            columns[task.status]
                .appendChild(
                    createTaskCard(
                        task,
                        workspace
                    )
                );
        }

    });


    document.getElementById(
        "todoCount"
    ).textContent =
        counts.todo;

    document.getElementById(
        "progressCount"
    ).textContent =
        counts.progress;

    document.getElementById(
        "doneCount"
    ).textContent =
        counts.done;


    Object.entries(columns).forEach(
        function ([status, element]) {

            if (
                element.children.length ===
                0
            ) {

                element.innerHTML = `
                    <div class="empty">
                        Drop tasks here
                    </div>
                `;

            }

        }
    );

}


/* =====================================================
   CREATE TASK CARD
===================================================== */

function createTaskCard(task, workspace) {

    const card =
        document.createElement("article");

    card.className =
        "task-card";

    card.draggable = true;

    card.dataset.id =
        task.id;


    const project =
        workspace.projects.find(
            p => p.id === task.projectId
        );


    const initials =
        getInitials(task.assignee);


    card.innerHTML = `

        <div class="task-title">
            ${escapeHTML(task.title)}
        </div>

        <div class="task-project">
            📁 ${
                project
                    ? escapeHTML(project.name)
                    : "No Project"
            }
        </div>

        <div class="task-bottom">

            <span class="priority ${task.priority}">
                ${escapeHTML(task.priority)}
            </span>

            <div
                class="task-assignee"
                title="${escapeHTML(task.assignee)}"
            >
                ${escapeHTML(initials)}
            </div>

        </div>

        <div class="task-actions">

            <button
                data-action="edit-task"
                data-id="${task.id}"
            >
                ✏ Edit
            </button>

            <button
                data-action="delete-task"
                data-id="${task.id}"
            >
                🗑 Delete
            </button>

        </div>

    `;


    card.addEventListener(
        "dragstart",
        function () {

            draggedTaskId =
                task.id;

            card.classList.add(
                "dragging"
            );

        }
    );


    card.addEventListener(
        "dragend",
        function () {

            card.classList.remove(
                "dragging"
            );

            draggedTaskId = null;

        }
    );


    return card;
}


/* =====================================================
   ACTIVITIES
===================================================== */

function renderActivities(workspace) {

    activityList.innerHTML = "";


    const activities =
        workspace.activities || [];


    if (!activities.length) {

        activityList.innerHTML = `
            <div class="empty">
                No recent activity.
            </div>
        `;

        return;
    }


    activities
        .slice(0, 6)
        .forEach(function (activity) {

            const item =
                document.createElement("div");

            item.className =
                "activity-item";

            item.innerHTML = `

                <div class="activity-icon">
                    ${escapeHTML(activity.icon)}
                </div>

                <div>

                    <div class="activity-text">
                        ${escapeHTML(activity.text)}
                    </div>

                    <div class="activity-time">
                        ${escapeHTML(activity.time)}
                    </div>

                </div>

            `;

            activityList.appendChild(item);

        });

}


/* =====================================================
   MEMBERS
===================================================== */

function renderMembers(workspace) {

    teamList.innerHTML = "";


    if (!workspace.members.length) {

        teamList.innerHTML = `
            <div class="empty">
                No members yet.
            </div>
        `;

        return;
    }


    workspace.members.forEach(
        function (member) {

            const item =
                document.createElement("div");

            item.className =
                "team-member";

            item.innerHTML = `

                <div class="member-avatar">
                    ${escapeHTML(
                        getInitials(member.name)
                    )}
                </div>

                <div class="member-info">

                    <strong>
                        ${escapeHTML(member.name)}
                    </strong>

                    <span>
                        ${escapeHTML(member.role)}
                    </span>

                </div>

            `;

            teamList.appendChild(item);

        }
    );

}


/* =====================================================
   EVENTS
===================================================== */

function bindEvents() {


    /* CREATE WORKSPACE */

    document
        .getElementById("openWorkspaceBtn")
        .addEventListener(
            "click",
            function () {

                openWorkspaceModal(false);

            }
        );


    /* ADD PROJECT */

    document
        .getElementById("addProjectBtn")
        .addEventListener(
            "click",
            function () {

                openProjectModal(false);

            }
        );


    /* ADD TASK */

    document
        .getElementById("addTaskBtn")
        .addEventListener(
            "click",
            function () {

                openTaskModal(false);

            }
        );


    /* ADD MEMBER */

    document
        .getElementById("addMemberBtn")
        .addEventListener(
            "click",
            function () {

                openModal("memberModal");

            }
        );


    /* SETTINGS */

    document
        .getElementById("settingsBtn")
        .addEventListener(
            "click",
            function () {

                openModal("settingsModal");

            }
        );


    /* SEARCH */

    searchInput.addEventListener(
        "input",
        function () {

            const workspace =
                getCurrentWorkspace();

            renderProjects(workspace);

            renderTasks(workspace);

        }
    );


    /* WORKSPACE LIST */

    workspaceList.addEventListener(
        "click",
        function (event) {

            const item =
                event.target.closest(
                    ".workspace-item"
                );

            if (!item) {
                return;
            }

            data.currentWorkspaceId =
                item.dataset.id;

            render();

            closeAllModals();

            showToast(
                "Workspace switched"
            );

        }
    );


    /* PROJECT ACTIONS */

    projectGrid.addEventListener(
        "click",
        handleProjectActions
    );


    /* TASK ACTIONS */

    document.addEventListener(
        "click",
        handleTaskActions
    );


    /* FORMS */

    document
        .getElementById("workspaceForm")
        .addEventListener(
            "submit",
            saveWorkspace
        );


    document
        .getElementById("projectForm")
        .addEventListener(
            "submit",
            saveProject
        );


    document
        .getElementById("taskForm")
        .addEventListener(
            "submit",
            saveTask
        );


    document
        .getElementById("memberForm")
        .addEventListener(
            "submit",
            saveMember
        );


    /* DELETE WORKSPACE */

    document
        .getElementById(
            "deleteWorkspaceBtn"
        )
        .addEventListener(
            "click",
            deleteCurrentWorkspace
        );


    /* EXPORT */

    document
        .getElementById("exportBtn")
        .addEventListener(
            "click",
            exportData
        );


    /* RESET */

    document
        .getElementById("resetBtn")
        .addEventListener(
            "click",
            resetDemo
        );


    /* NOTIFICATION */

    document
        .getElementById("notificationBtn")
        .addEventListener(
            "click",
            function () {

                showToast(
                    "You have 3 workspace updates"
                );

            }
        );


    /* VIEW ALL */

    document
        .getElementById("viewAllProjects")
        .addEventListener(
            "click",
            function () {

                searchInput.value = "";

                document
                    .getElementById("addProjectBtn")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

                showToast(
                    "Showing all projects"
                );

            }
        );


    /* CLOSE BUTTONS */

    document.addEventListener(
        "click",
        function (event) {

            const closeButton =
                event.target.closest(
                    "[data-close]"
                );

            if (closeButton) {

                closeModal(
                    closeButton.dataset.close
                );

            }

        }
    );


    /* MODAL BACKDROP */

    document.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "modal-overlay"
                )
            ) {

                event.target.classList.remove(
                    "show"
                );

            }

        }
    );


    /* ESCAPE */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeAllModals();

            }

        }
    );


    /* MOBILE MENU */

    document
        .getElementById("mobileMenu")
        .addEventListener(
            "click",
            function () {

                document
                    .getElementById("sidebar")
                    .classList.toggle("open");

            }
        );


    /* DRAG & DROP */

    document
        .querySelectorAll(".kanban-column")
        .forEach(
            function (column) {

                column.addEventListener(
                    "dragover",
                    function (event) {

                        event.preventDefault();

                        column.classList.add(
                            "drag-over"
                        );

                    }
                );


                column.addEventListener(
                    "dragleave",
                    function () {

                        column.classList.remove(
                            "drag-over"
                        );

                    }
                );


                column.addEventListener(
                    "drop",
                    function (event) {

                        event.preventDefault();

                        column.classList.remove(
                            "drag-over"
                        );

                        moveTask(
                            draggedTaskId,
                            column.dataset.status
                        );

                    }
                );

            }
        );

}


/* =====================================================
   PROJECT ACTIONS
===================================================== */

function handleProjectActions(event) {

    const button =
        event.target.closest(
            "[data-action]"
        );

    if (!button) {
        return;
    }


    const action =
        button.dataset.action;

    const id =
        button.dataset.id;


    if (
        action ===
        "edit-project"
    ) {

        openProjectModal(
            true,
            id
        );

    }


    if (
        action ===
        "delete-project"
    ) {

        deleteProject(id);

    }

}


/* =====================================================
   TASK ACTIONS
===================================================== */

function handleTaskActions(event) {

    const button =
        event.target.closest(
            "[data-action]"
        );

    if (!button) {
        return;
    }


    const action =
        button.dataset.action;

    const id =
        button.dataset.id;


    if (
        action ===
        "edit-task"
    ) {

        openTaskModal(
            true,
            id
        );

    }


    if (
        action ===
        "delete-task"
    ) {

        deleteTask(id);

    }

}


/* =====================================================
   WORKSPACE MODAL
===================================================== */

function openWorkspaceModal(
    editing,
    id = null
) {

    editingWorkspace =
        editing;


    const form =
        document.getElementById(
            "workspaceForm"
        );

    form.reset();


    document.getElementById(
        "workspaceModalTitle"
    ).textContent =
        editing
            ? "Edit Workspace"
            : "Create Workspace";


    if (editing && id) {

        const workspace =
            data.workspaces.find(
                ws => ws.id === id
            );

        if (!workspace) {
            return;
        }

        document.getElementById(
            "workspaceId"
        ).value =
            workspace.id;

        document.getElementById(
            "workspaceName"
        ).value =
            workspace.name;

        document.getElementById(
            "workspaceDesc"
        ).value =
            workspace.description;

        document.getElementById(
            "workspaceColor"
        ).value =
            workspace.color;

    } else {

        document.getElementById(
            "workspaceId"
        ).value = "";

        document.getElementById(
            "workspaceColor"
        ).value =
            "#7c3aed";

    }


    openModal("workspaceModal");

}


/* =====================================================
   SAVE WORKSPACE
===================================================== */

function saveWorkspace(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "workspaceName"
            )
            .value
            .trim();

    const description =
        document
            .getElementById(
                "workspaceDesc"
            )
            .value
            .trim();

    const color =
        document
            .getElementById(
                "workspaceColor"
            )
            .value;


    if (!name || !description) {

        showToast(
            "Please fill all fields"
        );

        return;
    }


    const id =
        document.getElementById(
            "workspaceId"
        ).value;


    if (editingWorkspace && id) {

        const workspace =
            data.workspaces.find(
                ws => ws.id === id
            );

        if (workspace) {

            workspace.name =
                name;

            workspace.description =
                description;

            workspace.color =
                color;

            addActivity(
                workspace,
                "✏",
                "Workspace settings updated"
            );

            showToast(
                "Workspace updated"
            );

        }

    } else {

        const workspace = {

            id: makeId("ws"),

            name,

            description,

            color,

            members: [],

            projects: [],

            tasks: [],

            activities: [

                {
                    icon: "🚀",
                    text: "Workspace created",
                    time: "Just now"
                }

            ]

        };


        data.workspaces.push(
            workspace
        );

        data.currentWorkspaceId =
            workspace.id;


        showToast(
            "Workspace created"
        );

    }


    closeModal(
        "workspaceModal"
    );

    render();

}


/* =====================================================
   PROJECT MODAL
===================================================== */

function openProjectModal(
    editing,
    id = null
) {

    editingProject =
        editing;


    const form =
        document.getElementById(
            "projectForm"
        );

    form.reset();


    document.getElementById(
        "projectModalTitle"
    ).textContent =
        editing
            ? "Edit Project"
            : "Add Project";


    if (editing && id) {

        const workspace =
            getCurrentWorkspace();

        const project =
            workspace.projects.find(
                p => p.id === id
            );

        if (!project) {
            return;
        }


        document.getElementById(
            "projectId"
        ).value =
            project.id;

        document.getElementById(
            "projectName"
        ).value =
            project.name;

        document.getElementById(
            "projectOwner"
        ).value =
            project.owner;

        document.getElementById(
            "projectDate"
        ).value =
            project.due;

        document.getElementById(
            "projectProgress"
        ).value =
            project.progress;

    }


    openModal(
        "projectModal"
    );

}


/* =====================================================
   SAVE PROJECT
===================================================== */

function saveProject(event) {

    event.preventDefault();


    const workspace =
        getCurrentWorkspace();


    const name =
        document
            .getElementById(
                "projectName"
            )
            .value
            .trim();

    const owner =
        document
            .getElementById(
                "projectOwner"
            )
            .value
            .trim();

    const due =
        document
            .getElementById(
                "projectDate"
            )
            .value;

    let progress =
        Number(
            document
                .getElementById(
                    "projectProgress"
                )
                .value
        );


    progress =
        Math.max(
            0,
            Math.min(
                100,
                progress
            )
        );


    if (
        !name ||
        !owner ||
        !due
    ) {

        showToast(
            "Please complete the project form"
        );

        return;
    }


    const id =
        document.getElementById(
            "projectId"
        ).value;


    if (
        editingProject &&
        id
    ) {

        const project =
            workspace.projects.find(
                p => p.id === id
            );

        if (project) {

            project.name =
                name;

            project.owner =
                owner;

            project.due =
                due;

            project.progress =
                progress;

            addActivity(
                workspace,
                "✏",
                `Project "${name}" updated`
            );

            showToast(
                "Project updated"
            );

        }

    } else {

        workspace.projects.push({

            id: makeId("p"),

            name,

            owner,

            due,

            progress

        });


        addActivity(
            workspace,
            "📁",
            `Project "${name}" created`
        );


        showToast(
            "Project created"
        );

    }


    closeModal(
        "projectModal"
    );

    render();

}


/* =====================================================
   DELETE PROJECT
===================================================== */

function deleteProject(id) {

    const workspace =
        getCurrentWorkspace();

    const project =
        workspace.projects.find(
            p => p.id === id
        );

    if (!project) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${project.name}"?`
        );


    if (!confirmed) {
        return;
    }


    workspace.projects =
        workspace.projects.filter(
            p => p.id !== id
        );


    workspace.tasks =
        workspace.tasks.filter(
            task =>
                task.projectId !== id
        );


    addActivity(
        workspace,
        "🗑",
        `Project "${project.name}" deleted`
    );


    showToast(
        "Project deleted"
    );


    render();

}


/* =====================================================
   TASK MODAL
===================================================== */

function openTaskModal(
    editing,
    id = null
) {

    editingTask =
        editing;


    const workspace =
        getCurrentWorkspace();


    if (!workspace.projects.length) {

        showToast(
            "Create a project first"
        );

        return;
    }


    populateProjectSelect(
        workspace
    );


    document
        .getElementById("taskForm")
        .reset();


    document.getElementById(
        "taskModalTitle"
    ).textContent =
        editing
            ? "Edit Task"
            : "Add Task";


    if (editing && id) {

        const task =
            workspace.tasks.find(
                t => t.id === id
            );

        if (!task) {
            return;
        }


        document.getElementById(
            "taskId"
        ).value =
            task.id;

        document.getElementById(
            "taskTitle"
        ).value =
            task.title;

        document.getElementById(
            "taskProject"
        ).value =
            task.projectId;

        document.getElementById(
            "taskAssignee"
        ).value =
            task.assignee;

        document.getElementById(
            "taskPriority"
        ).value =
            task.priority;

        document.getElementById(
            "taskStatus"
        ).value =
            task.status;

    } else {

        document.getElementById(
            "taskId"
        ).value = "";

        document.getElementById(
            "taskStatus"
        ).value =
            "todo";

    }


    openModal(
        "taskModal"
    );

}


/* =====================================================
   PROJECT SELECT
===================================================== */

function populateProjectSelect(
    workspace
) {

    const select =
        document.getElementById(
            "taskProject"
        );

    select.innerHTML = "";


    workspace.projects.forEach(
        function (project) {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                project.id;

            option.textContent =
                project.name;

            select.appendChild(
                option
            );

        }
    );

}


/* =====================================================
   SAVE TASK
===================================================== */

function saveTask(event) {

    event.preventDefault();


    const workspace =
        getCurrentWorkspace();


    const title =
        document
            .getElementById(
                "taskTitle"
            )
            .value
            .trim();

    const projectId =
        document
            .getElementById(
                "taskProject"
            )
            .value;

    const assignee =
        document
            .getElementById(
                "taskAssignee"
            )
            .value
            .trim();

    const priority =
        document
            .getElementById(
                "taskPriority"
            )
            .value;

    const status =
        document
            .getElementById(
                "taskStatus"
            )
            .value;


    if (
        !title ||
        !projectId ||
        !assignee
    ) {

        showToast(
            "Please complete all task fields"
        );

        return;
    }


    const id =
        document.getElementById(
            "taskId"
        ).value;


    if (
        editingTask &&
        id
    ) {

        const task =
            workspace.tasks.find(
                t => t.id === id
            );

        if (task) {

            task.title =
                title;

            task.projectId =
                projectId;

            task.assignee =
                assignee;

            task.priority =
                priority;

            task.status =
                status;


            addActivity(
                workspace,
                "✏",
                `Task "${title}" updated`
            );


            showToast(
                "Task updated"
            );

        }

    } else {

        workspace.tasks.push({

            id: makeId("t"),

            title,

            projectId,

            assignee,

            priority,

            status

        });


        addActivity(
            workspace,
            "✓",
            `Task "${title}" created`
        );


        showToast(
            "Task created"
        );

    }


    closeModal(
        "taskModal"
    );

    render();

}


/* =====================================================
   DELETE TASK
===================================================== */

function deleteTask(id) {

    const workspace =
        getCurrentWorkspace();


    const task =
        workspace.tasks.find(
            t => t.id === id
        );


    if (!task) {
        return;
    }


    if (
        !confirm(
            `Delete "${task.title}"?`
        )
    ) {
        return;
    }


    workspace.tasks =
        workspace.tasks.filter(
            t => t.id !== id
        );


    addActivity(
        workspace,
        "🗑",
        `Task "${task.title}" deleted`
    );


    showToast(
        "Task deleted"
    );


    render();

}


/* =====================================================
   MOVE TASK
===================================================== */

function moveTask(
    taskId,
    newStatus
) {

    if (!taskId) {
        return;
    }


    const workspace =
        getCurrentWorkspace();


    const task =
        workspace.tasks.find(
            t => t.id === taskId
        );


    if (!task) {
        return;
    }


    if (
        task.status ===
        newStatus
    ) {
        return;
    }


    task.status =
        newStatus;


    addActivity(
        workspace,
        "↔",
        `"${task.title}" moved to ${statusName(newStatus)}`
    );


    saveData();

    render();

}


/* =====================================================
   MEMBER
===================================================== */

function saveMember(event) {

    event.preventDefault();


    const workspace =
        getCurrentWorkspace();


    const name =
        document
            .getElementById(
                "memberName"
            )
            .value
            .trim();

    const role =
        document
            .getElementById(
                "memberRole"
            )
            .value
            .trim();


    if (!name || !role) {

        showToast(
            "Enter member name and role"
        );

        return;
    }


    workspace.members.push({

        id: makeId("m"),

        name,

        role

    });


    addActivity(
        workspace,
        "👤",
        `${name} joined the workspace`
    );


    document
        .getElementById("memberForm")
        .reset();


    closeModal(
        "memberModal"
    );


    showToast(
        "Member added"
    );


    render();

}


/* =====================================================
   DELETE CURRENT WORKSPACE
===================================================== */

function deleteCurrentWorkspace() {

    if (
        data.workspaces.length <= 1
    ) {

        showToast(
            "You must keep at least one workspace"
        );

        return;
    }


    const workspace =
        getCurrentWorkspace();


    if (
        !confirm(
            `Delete "${workspace.name}" and all its data?`
        )
    ) {
        return;
    }


    data.workspaces =
        data.workspaces.filter(
            ws =>
                ws.id !==
                workspace.id
        );


    data.currentWorkspaceId =
        data.workspaces[0].id;


    closeModal(
        "settingsModal"
    );


    showToast(
        "Workspace deleted"
    );


    render();

}


/* =====================================================
   ACTIVITY
===================================================== */

function addActivity(
    workspace,
    icon,
    text
) {

    if (!workspace.activities) {
        workspace.activities = [];
    }


    workspace.activities.unshift({

        icon,

        text,

        time: "Just now"

    });


    workspace.activities =
        workspace.activities.slice(
            0,
            15
        );

}


/* =====================================================
   MODALS
===================================================== */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


function closeAllModals() {

    document
        .querySelectorAll(
            ".modal-overlay"
        )
        .forEach(
            modal =>
                modal.classList.remove(
                    "show"
                )
        );

}


/* =====================================================
   EXPORT
===================================================== */

function exportData() {

    const workspace =
        getCurrentWorkspace();


    const exportObject = {

        exportedAt:
            new Date().toISOString(),

        workspace

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    exportObject,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement(
            "a"
        );

    link.href =
        url;

    link.download =
        workspace.name
            .replace(
                /[^a-z0-9]/gi,
                "_"
            )
            .toLowerCase() +
        "_workspace.json";


    document.body.appendChild(
        link
    );

    link.click();

    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Workspace exported"
    );

}


/* =====================================================
   RESET
===================================================== */

function resetDemo() {

    if (
        !confirm(
            "Reset the workspace demo? All your saved changes will be removed."
        )
    ) {
        return;
    }


    data =
        JSON.parse(
            JSON.stringify(
                defaultData
            )
        );


    searchInput.value = "";


    render();


    showToast(
        "Demo reset successfully"
    );

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(
    message,
    icon = "✓"
) {

    const toast =
        document.getElementById(
            "toast"
        );

    document.getElementById(
        "toastMessage"
    ).textContent =
        message;

    document.getElementById(
        "toastIcon"
    ).textContent =
        icon;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
   HELPERS
===================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "No date";
    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return dateString;
    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ).format(date);

}


function getInitials(name) {

    if (!name) {
        return "?";
    }


    const parts =
        name
            .trim()
            .split(/\s+/);


    if (parts.length === 1) {

        return parts[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();

}


function statusName(status) {

    if (status === "todo") {
        return "To Do";
    }

    if (status === "progress") {
        return "In Progress";
    }

    if (status === "done") {
        return "Done";
    }

    return status;

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}