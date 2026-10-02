"use strict";

const STORAGE = "admin_center_v1";

const defaultAdmins = [
    {
        id: "a1",
        name: "Arjun Kumar",
        email: "arjun@admin.com",
        role: "Super Admin",
        status: "active",
        login: "Today, 10:30 AM"
    },
    {
        id: "a2",
        name: "Priya Sharma",
        email: "priya@admin.com",
        role: "Administrator",
        status: "active",
        login: "Today, 09:15 AM"
    },
    {
        id: "a3",
        name: "Rahul Reddy",
        email: "rahul@admin.com",
        role: "Moderator",
        status: "pending",
        login: "Never"
    },
    {
        id: "a4",
        name: "Ananya Singh",
        email: "ananya@admin.com",
        role: "Administrator",
        status: "suspended",
        login: "Sep 25, 2026"
    }
];

let admins = loadAdmins();

let logs = [
    "Arjun Kumar logged into the administration panel.",
    "Priya Sharma changed user permissions.",
    "A new administrator invitation was created."
];

function loadAdmins() {

    try {
        const data =
            localStorage.getItem(STORAGE);

        return data
            ? JSON.parse(data)
            : structuredClone(defaultAdmins);

    } catch {
        return structuredClone(defaultAdmins);
    }
}

function saveAdmins() {
    localStorage.setItem(
        STORAGE,
        JSON.stringify(admins)
    );
}

function id() {
    return "a" + Date.now();
}

function initials(name) {
    return name
        .split(" ")
        .map(x => x[0])
        .join("")
        .substring(0,2)
        .toUpperCase();
}

function toast(message) {

    const element =
        document.getElementById("toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 2200);
}

function render() {

    renderTable();
    renderCards();
    renderStats();
    renderLogs();
}

function renderTable() {

    const table =
        document.getElementById("adminTable");

    table.innerHTML = "";

    const query =
        document.getElementById("search")
        .value
        .toLowerCase();

    admins
        .filter(admin =>
            admin.name.toLowerCase().includes(query) ||
            admin.email.toLowerCase().includes(query) ||
            admin.role.toLowerCase().includes(query)
        )
        .forEach(admin => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>
                    <input
                        type="checkbox"
                        class="adminCheck"
                        data-id="${admin.id}">
                </td>

                <td>

                    <div class="user-info">

                        <div class="user-avatar">
                            ${initials(admin.name)}
                        </div>

                        <div>
                            <strong>
                                ${admin.name}
                            </strong>

                            <small>
                                ${admin.email}
                            </small>
                        </div>

                    </div>

                </td>

                <td>${admin.role}</td>

                <td>
                    <span class="status ${admin.status}">
                        ${admin.status}
                    </span>
                </td>

                <td>${admin.login}</td>

                <td>

                    <div class="row-actions">

                        <button
                            data-edit="${admin.id}">
                            ✏️
                        </button>

                        <button
                            data-delete="${admin.id}">
                            🗑️
                        </button>

                        <button
                            data-toggle="${admin.id}">
                            ${
                                admin.status === "active"
                                ? "⛔"
                                : "✓"
                            }
                        </button>

                    </div>

                </td>
            `;

            table.appendChild(row);
        });
}

function renderCards() {

    const container =
        document.getElementById("adminCards");

    container.innerHTML = "";

    admins.forEach(admin => {

        const card =
            document.createElement("div");

        card.className = "admin-card";

        card.innerHTML = `

            <div class="big-avatar">
                ${initials(admin.name)}
            </div>

            <h3>${admin.name}</h3>

            <p>${admin.email}</p>

            <p>${admin.role}</p>

            <p>
                Status:
                <strong>
                    ${admin.status}
                </strong>
            </p>

            <div class="admin-card-actions">

                <button
                    data-edit="${admin.id}">
                    Edit
                </button>

                <button
                    data-delete="${admin.id}">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}

function renderStats() {

    document.getElementById("adminCount")
        .textContent = admins.length;

    document.getElementById("activeCount")
        .textContent =
            admins.filter(x => x.status === "active").length;

    document.getElementById("pendingCount")
        .textContent =
            admins.filter(x => x.status === "pending").length;

    document.getElementById("suspendedCount")
        .textContent =
            admins.filter(x => x.status === "suspended").length;
}

function renderLogs() {

    const container =
        document.getElementById("activityLog");

    container.innerHTML = "";

    logs.forEach((log,index) => {

        const div =
            document.createElement("div");

        div.className = "log-item";

        div.innerHTML = `
            <strong>${log}</strong>
            <small>
                ${index + 1} • Recent activity
            </small>
        `;

        container.appendChild(div);
    });
}

function openModal(admin = null) {

    document
        .getElementById("adminModal")
        .classList.add("show");

    if (admin) {

        document.getElementById("modalTitle")
            .textContent =
            "Edit Administrator";

        document.getElementById("adminId")
            .value = admin.id;

        document.getElementById("adminName")
            .value = admin.name;

        document.getElementById("adminEmail")
            .value = admin.email;

        document.getElementById("adminRole")
            .value = admin.role;

        document.getElementById("adminStatus")
            .value = admin.status;

    } else {

        document.getElementById("modalTitle")
            .textContent =
            "Add Administrator";

        document.getElementById("adminForm")
            .reset();

        document.getElementById("adminId")
            .value = "";
    }
}

function closeModal() {

    document
        .getElementById("adminModal")
        .classList.remove("show");
}

function saveAdmin(event) {

    event.preventDefault();

    const adminId =
        document.getElementById("adminId").value;

    const name =
        document.getElementById("adminName").value.trim();

    const email =
        document.getElementById("adminEmail").value.trim();

    const role =
        document.getElementById("adminRole").value;

    const status =
        document.getElementById("adminStatus").value;

    if (!name || !email) {
        toast("Please complete the form.");
        return;
    }

    if (adminId) {

        const admin =
            admins.find(x => x.id === adminId);

        admin.name = name;
        admin.email = email;
        admin.role = role;
        admin.status = status;

        logs.unshift(
            `${name} administrator account was updated.`
        );

        toast("Administrator updated.");

    } else {

        admins.push({
            id: id(),
            name,
            email,
            role,
            status,
            login: "Never"
        });

        logs.unshift(
            `${name} was added as an administrator.`
        );

        toast("Administrator added.");
    }

    saveAdmins();

    closeModal();

    render();
}

function deleteAdmin(adminId) {

    const admin =
        admins.find(x => x.id === adminId);

    if (!admin) return;

    if (!confirm(
        `Delete ${admin.name}?`
    )) return;

    admins =
        admins.filter(
            x => x.id !== adminId
        );

    logs.unshift(
        `${admin.name} was deleted.`
    );

    saveAdmins();

    render();

    toast("Administrator deleted.");
}

function toggleAdmin(adminId) {

    const admin =
        admins.find(x => x.id === adminId);

    if (!admin) return;

    admin.status =
        admin.status === "active"
            ? "suspended"
            : "active";

    logs.unshift(
        `${admin.name} status changed to ${admin.status}.`
    );

    saveAdmins();

    render();

    toast("Status updated.");
}

function selectedAdmins() {

    return [
        ...document.querySelectorAll(
            ".adminCheck:checked"
        )
    ].map(x => x.dataset.id);
}

document
    .querySelectorAll(".nav")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".nav")
                    .forEach(x =>
                        x.classList.remove("active")
                    );

                button.classList.add("active");

                const page =
                    button.dataset.page;

                document
                    .querySelectorAll(".page")
                    .forEach(x =>
                        x.classList.remove(
                            "active-page"
                        )
                    );

                document
                    .getElementById(page)
                    .classList.add(
                        "active-page"
                    );

                document.getElementById(
                    "pageTitle"
                ).textContent =
                    button.textContent.trim();

            }
        );
    });


document
    .getElementById("addAdmin")
    .addEventListener(
        "click",
        () => openModal()
    );


document
    .getElementById("addAdmin2")
    .addEventListener(
        "click",
        () => openModal()
    );


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("cancelModal")
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById("adminForm")
    .addEventListener(
        "submit",
        saveAdmin
    );


document
    .getElementById("search")
    .addEventListener(
        "input",
        renderTable
    );


document
    .getElementById("selectAll")
    .addEventListener(
        "change",
        event => {

            document
                .querySelectorAll(".adminCheck")
                .forEach(check =>
                    check.checked =
                        event.target.checked
                );

        }
    );


document
    .getElementById("approveSelected")
    .addEventListener(
        "click",
        () => {

            const ids =
                selectedAdmins();

            admins.forEach(admin => {

                if (ids.includes(admin.id)) {

                    admin.status =
                        "active";
                }
            });

            saveAdmins();

            render();

            toast(
                `${ids.length} administrator(s) approved.`
            );
        }
    );


document
    .getElementById("suspendSelected")
    .addEventListener(
        "click",
        () => {

            const ids =
                selectedAdmins();

            admins.forEach(admin => {

                if (ids.includes(admin.id)) {

                    admin.status =
                        "suspended";
                }
            });

            saveAdmins();

            render();

            toast(
                `${ids.length} administrator(s) suspended.`
            );
        }
    );


document
    .getElementById("adminTable")
    .addEventListener(
        "click",
        event => {

            const edit =
                event.target.closest(
                    "[data-edit]"
                );

            const del =
                event.target.closest(
                    "[data-delete]"
                );

            const toggle =
                event.target.closest(
                    "[data-toggle]"
                );


            if (edit) {

                const admin =
                    admins.find(
                        x =>
                            x.id ===
                            edit.dataset.edit
                    );

                openModal(admin);
            }


            if (del) {

                deleteAdmin(
                    del.dataset.delete
                );
            }


            if (toggle) {

                toggleAdmin(
                    toggle.dataset.toggle
                );
            }
        }
    );


document
    .getElementById("adminCards")
    .addEventListener(
        "click",
        event => {

            const edit =
                event.target.closest(
                    "[data-edit]"
                );

            const del =
                event.target.closest(
                    "[data-delete]"
                );

            if (edit) {

                const admin =
                    admins.find(
                        x =>
                            x.id ===
                            edit.dataset.edit
                    );

                openModal(admin);
            }

            if (del) {

                deleteAdmin(
                    del.dataset.delete
                );
            }
        }
    );


document
    .getElementById("savePermissions")
    .addEventListener(
        "click",
        () => {

            const permissions =
                [
                    ...document.querySelectorAll(
                        ".permission-grid input"
                    )
                ].filter(x => x.checked)
                .length;

            logs.unshift(
                `${permissions} permissions were enabled.`
            );

            renderLogs();

            toast(
                "Permissions saved successfully."
            );
        }
    );


document
    .getElementById("clearActivity")
    .addEventListener(
        "click",
        () => {

            logs = [];

            renderLogs();

            toast(
                "Activity log cleared."
            );
        }
    );


document
    .getElementById("menuBtn")
    .addEventListener(
        "click",
        () => {

            document
                .querySelector(".sidebar")
                .classList.toggle("open");

        }
    );


render();