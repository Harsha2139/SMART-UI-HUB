"use strict";

/* =====================================================
   USERHUB - COMPLETE SCRIPT
===================================================== */

const STORAGE_KEY = "userhub_dashboard_v3";


/* =====================================================
   DEFAULT USERS
===================================================== */

const defaultUsers = [
    {
        id: "u1",
        name: "Rahul Kumar",
        email: "rahul@example.com",
        role: "Admin",
        status: "active",
        joined: "2026-08-12"
    },
    {
        id: "u2",
        name: "Priya Sharma",
        email: "priya@example.com",
        role: "Manager",
        status: "active",
        joined: "2026-08-20"
    },
    {
        id: "u3",
        name: "Arjun Rao",
        email: "arjun@example.com",
        role: "User",
        status: "pending",
        joined: "2026-09-02"
    },
    {
        id: "u4",
        name: "Ananya Singh",
        email: "ananya@example.com",
        role: "User",
        status: "active",
        joined: "2026-09-05"
    },
    {
        id: "u5",
        name: "Kiran Reddy",
        email: "kiran@example.com",
        role: "Admin",
        status: "inactive",
        joined: "2026-09-10"
    }
];


/* =====================================================
   ACTIVITIES
===================================================== */

let activities = [
    ["👤", "Priya joined the platform", "Today"],
    ["✓", "Rahul updated his profile", "2 hours ago"],
    ["🔐", "Admin security settings changed", "Yesterday"],
    ["📧", "Invitation sent to Arjun", "Yesterday"]
];


/* =====================================================
   LOAD USERS
===================================================== */

function loadUsers() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return cloneDefaultUsers();
        }

        const parsed =
            JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return cloneDefaultUsers();
        }

        return parsed;

    } catch (error) {

        console.error(
            "Error loading users:",
            error
        );

        return cloneDefaultUsers();
    }
}


let users = loadUsers();


/* =====================================================
   DOM ELEMENTS
===================================================== */

const table =
    document.getElementById("userTable");

const search =
    document.getElementById("search");

const statusFilter =
    document.getElementById("statusFilter");

const userModal =
    document.getElementById("userModal");

const userForm =
    document.getElementById("userForm");

const sidebar =
    document.getElementById("sidebar");

const emptyState =
    document.getElementById("emptyState");


/* =====================================================
   CLONE DEFAULT USERS
===================================================== */

function cloneDefaultUsers() {

    return JSON.parse(
        JSON.stringify(defaultUsers)
    );
}


/* =====================================================
   SAVE USERS
===================================================== */

function saveUsers() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(users)
        );

    } catch (error) {

        console.error(
            "Error saving users:",
            error
        );

        showToast(
            "Could not save data"
        );
    }
}


/* =====================================================
   CREATE ID
===================================================== */

function createId() {

    return (
        "u_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   INITIALS
===================================================== */

function initials(name) {

    return String(name)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase();
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================================
   RENDER USERS
===================================================== */

function renderUsers() {

    if (!table) {
        return;
    }

    const query =
        search
            ? search.value.trim().toLowerCase()
            : "";

    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const filteredUsers =
        users.filter(user => {

            const name =
                String(user.name)
                    .toLowerCase();

            const email =
                String(user.email)
                    .toLowerCase();

            const role =
                String(user.role)
                    .toLowerCase();


            const matchesSearch =
                name.includes(query) ||
                email.includes(query) ||
                role.includes(query);


            const matchesStatus =
                selectedStatus === "all" ||
                user.status === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    table.innerHTML = "";


    if (
        emptyState &&
        filteredUsers.length === 0
    ) {

        emptyState.style.display =
            "block";

    } else if (emptyState) {

        emptyState.style.display =
            "none";
    }


    filteredUsers.forEach(user => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="user-cell">

                    <div class="user-avatar">
                        ${escapeHTML(
                            initials(user.name)
                        )}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(
                                user.name
                            )}
                        </strong>

                        <div class="user-email">
                            ${escapeHTML(
                                user.email
                            )}
                        </div>

                    </div>

                </div>

            </td>


            <td>
                ${escapeHTML(user.role)}
            </td>


            <td>

                <span
                    class="badge ${escapeHTML(
                        user.status
                    )}"
                >
                    ${escapeHTML(
                        user.status
                    )}
                </span>

            </td>


            <td>
                ${escapeHTML(
                    formatDate(user.joined)
                )}
            </td>


            <td>

                <div class="actions">

                    <button
                        type="button"
                        data-action="edit"
                        data-id="${escapeHTML(user.id)}"
                        title="Edit User"
                    >
                        ✏️
                    </button>

                    <button
                        type="button"
                        data-action="toggle"
                        data-id="${escapeHTML(user.id)}"
                        title="Change Status"
                    >
                        ${
                            user.status === "active"
                                ? "⏸️"
                                : "▶️"
                        }
                    </button>

                    <button
                        type="button"
                        data-action="delete"
                        data-id="${escapeHTML(user.id)}"
                        title="Delete User"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        table.appendChild(row);

    });


    updateStats();

    renderActivity();
}


/* =====================================================
   UPDATE DASHBOARD STATS
===================================================== */

function updateStats() {

    const total =
        users.length;


    const active =
        users.filter(
            user =>
                user.status === "active"
        ).length;


    const pending =
        users.filter(
            user =>
                user.status === "pending"
        ).length;


    const admins =
        users.filter(
            user =>
                user.role === "Admin"
        ).length;


    const totalElement =
        document.getElementById(
            "totalUsers"
        );

    const activeElement =
        document.getElementById(
            "activeUsers"
        );

    const pendingElement =
        document.getElementById(
            "pendingUsers"
        );

    const adminElement =
        document.getElementById(
            "adminUsers"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (activeElement) {
        activeElement.textContent = active;
    }

    if (pendingElement) {
        pendingElement.textContent = pending;
    }

    if (adminElement) {
        adminElement.textContent = admins;
    }
}


/* =====================================================
   ACTIVITY
===================================================== */

function renderActivity() {

    const container =
        document.getElementById(
            "activity"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    activities
        .slice(0, 8)
        .forEach(item => {

            const element =
                document.createElement("div");

            element.className =
                "activity";


            element.innerHTML = `

                <div class="activity-icon">
                    ${escapeHTML(item[0])}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(item[1])}
                    </strong>

                    <small>
                        ${escapeHTML(item[2])}
                    </small>

                </div>

            `;


            container.appendChild(
                element
            );

        });
}


/* =====================================================
   OPEN ADD USER MODAL
===================================================== */

function openAddModal() {

    if (!userForm || !userModal) {
        return;
    }


    userForm.reset();


    document.getElementById(
        "userId"
    ).value = "";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Add User";


    const description =
        document.getElementById(
            "modalDescription"
        );

    if (description) {

        description.textContent =
            "Create a new user account";
    }


    const saveButton =
        document.querySelector(
            ".save"
        );

    if (saveButton) {

        saveButton.textContent =
            "Save User";
    }


    userModal.classList.add(
        "show"
    );

    userModal.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(() => {

        const nameInput =
            document.getElementById(
                "userName"
            );

        if (nameInput) {
            nameInput.focus();
        }

    }, 50);
}


/* =====================================================
   OPEN EDIT USER MODAL
===================================================== */

function openEditModal(id) {

    const user =
        users.find(
            item => item.id === id
        );


    if (!user) {

        showToast(
            "User not found"
        );

        return;
    }


    document.getElementById(
        "userId"
    ).value = user.id;


    document.getElementById(
        "userName"
    ).value = user.name;


    document.getElementById(
        "userEmail"
    ).value = user.email;


    document.getElementById(
        "userRole"
    ).value = user.role;


    document.getElementById(
        "userStatus"
    ).value = user.status;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit User";


    const description =
        document.getElementById(
            "modalDescription"
        );

    if (description) {

        description.textContent =
            "Update user account details";
    }


    const saveButton =
        document.querySelector(
            ".save"
        );

    if (saveButton) {

        saveButton.textContent =
            "Update User";
    }


    userModal.classList.add(
        "show"
    );

    userModal.setAttribute(
        "aria-hidden",
        "false"
    );
}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    if (!userModal) {
        return;
    }


    userModal.classList.remove(
        "show"
    );


    userModal.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* =====================================================
   SAVE USER
===================================================== */

function saveUser(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "userId"
        ).value;


    const name =
        document.getElementById(
            "userName"
        ).value.trim();


    const email =
        document.getElementById(
            "userEmail"
        ).value.trim();


    const role =
        document.getElementById(
            "userRole"
        ).value;


    const status =
        document.getElementById(
            "userStatus"
        ).value;


    if (!name || !email) {

        showToast(
            "Please fill all required fields"
        );

        return;
    }


    if (id) {

        const user =
            users.find(
                item => item.id === id
            );


        if (!user) {

            showToast(
                "User not found"
            );

            return;
        }


        user.name = name;
        user.email = email;
        user.role = role;
        user.status = status;


        activities.unshift([
            "✏️",
            `${name} was updated`,
            "Just now"
        ]);


        showToast(
            "User updated successfully"
        );

    } else {

        const newUser = {

            id: createId(),

            name: name,

            email: email,

            role: role,

            status: status,

            joined:
                new Date()
                    .toISOString()
                    .slice(0, 10)

        };


        users.unshift(
            newUser
        );


        activities.unshift([
            "👤",
            `${name} was added`,
            "Just now"
        ]);


        showToast(
            "User added successfully"
        );
    }


    saveUsers();

    closeModal();

    renderUsers();

    renderAnalytics();
}


/* =====================================================
   DELETE USER
===================================================== */

function deleteUser(id) {

    const user =
        users.find(
            item => item.id === id
        );


    if (!user) {

        showToast(
            "User not found"
        );

        return;
    }


    const confirmed =
        window.confirm(
            `Delete ${user.name}?`
        );


    if (!confirmed) {
        return;
    }


    users =
        users.filter(
            item => item.id !== id
        );


    activities.unshift([
        "🗑️",
        `${user.name} was deleted`,
        "Just now"
    ]);


    saveUsers();

    renderUsers();

    renderAnalytics();


    showToast(
        "User deleted successfully"
    );
}


/* =====================================================
   TOGGLE USER
===================================================== */

function toggleUser(id) {

    const user =
        users.find(
            item => item.id === id
        );


    if (!user) {

        showToast(
            "User not found"
        );

        return;
    }


    if (user.status === "active") {

        user.status =
            "inactive";

    } else {

        user.status =
            "active";
    }


    activities.unshift([
        "🔄",
        `${user.name} is now ${user.status}`,
        "Just now"
    ]);


    saveUsers();

    renderUsers();

    renderAnalytics();


    showToast(
        `${user.name} is now ${user.status}`
    );
}


/* =====================================================
   EXPORT USERS
===================================================== */

function exportUsers() {

    if (users.length === 0) {

        showToast(
            "No users to export"
        );

        return;
    }


    const headers = [
        "Name",
        "Email",
        "Role",
        "Status",
        "Joined"
    ];


    const rows =
        users.map(user => {

            return [

                csvEscape(user.name),

                csvEscape(user.email),

                csvEscape(user.role),

                csvEscape(user.status),

                csvEscape(user.joined)

            ].join(",");

        });


    const csv =
        [
            headers.join(","),
            ...rows
        ].join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "userhub-users.csv";


    document.body.appendChild(
        link
    );


    link.click();

    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Users exported successfully"
    );
}


/* =====================================================
   CSV ESCAPE
===================================================== */

function csvEscape(value) {

    return `"${String(value ?? "")
        .replace(/"/g, '""')}"`;
}


/* =====================================================
   RESET DEMO
===================================================== */

function resetDemo() {

    const confirmed =
        window.confirm(
            "Reset all users to original demo data?"
        );


    if (!confirmed) {
        return;
    }


    users =
        cloneDefaultUsers();


    activities = [
        ["👤", "Priya joined the platform", "Today"],
        ["✓", "Rahul updated his profile", "2 hours ago"],
        ["🔐", "Admin security settings changed", "Yesterday"],
        ["📧", "Invitation sent to Arjun", "Yesterday"]
    ];


    saveUsers();


    if (search) {
        search.value = "";
    }


    if (statusFilter) {
        statusFilter.value = "all";
    }


    renderUsers();

    renderAnalytics();


    showToast(
        "Demo data reset successfully"
    );
}


/* =====================================================
   TOAST
===================================================== */

let toastTimer = null;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);
}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

    if (!sidebar) {
        return;
    }


    sidebar.classList.toggle(
        "open"
    );
}


function closeMobileMenu() {

    if (!sidebar) {
        return;
    }


    sidebar.classList.remove(
        "open"
    );
}


/* =====================================================
   ACTIVE NAV
===================================================== */

function setActiveNav(button) {

    document
        .querySelectorAll(".nav")
        .forEach(nav => {

            nav.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );
    }
}


/* =====================================================
   DASHBOARD NAVIGATION
===================================================== */

function dashboardNavigation() {

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    const analytics =
        document.getElementById(
            "analyticsPage"
        );


    if (dashboard) {
        dashboard.style.display =
            "block";
    }


    if (analytics) {
        analytics.style.display =
            "none";
    }


    setActiveNav(
        document.getElementById(
            "dashboardNav"
        )
    );


    closeMobileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   USERS NAVIGATION
===================================================== */

function usersNavigation() {

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    const analytics =
        document.getElementById(
            "analyticsPage"
        );


    if (dashboard) {
        dashboard.style.display =
            "block";
    }


    if (analytics) {
        analytics.style.display =
            "none";
    }


    setActiveNav(
        document.getElementById(
            "usersNav"
        )
    );


    const usersSection =
        document.getElementById(
            "usersSection"
        );


    if (usersSection) {

        usersSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }


    closeMobileMenu();
}


/* =====================================================
   ANALYTICS NAVIGATION
===================================================== */

function analyticsNavigation() {

    const dashboard =
        document.getElementById(
            "dashboardPage"
        );

    const analytics =
        document.getElementById(
            "analyticsPage"
        );


    if (dashboard) {

        dashboard.style.display =
            "none";
    }


    if (analytics) {

        analytics.style.display =
            "block";
    }


    setActiveNav(
        document.getElementById(
            "analyticsNav"
        )
    );


    renderAnalytics();


    closeMobileMenu();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   NOTIFICATIONS
===================================================== */

function notificationsNavigation() {

    setActiveNav(
        document.getElementById(
            "notificationsNav"
        )
    );


    const active =
        users.filter(
            user =>
                user.status === "active"
        ).length;


    const pending =
        users.filter(
            user =>
                user.status === "pending"
        ).length;


    let message;


    if (pending > 0) {

        message =
            `🔔 You have ${pending} pending user account${pending === 1 ? "" : "s"}.`;

    } else {

        message =
            `🔔 No pending accounts. ${active} users are active.`;
    }


    showToast(message);


    closeMobileMenu();
}


/* =====================================================
   SETTINGS
===================================================== */

function settingsNavigation() {

    setActiveNav(
        document.getElementById(
            "settingsNav"
        )
    );


    const currentTheme =
        localStorage.getItem(
            "userhub_theme"
        ) || "light";


    const action =
        window.confirm(
            `Settings\n\nCurrent theme: ${currentTheme}\n\nPress OK to switch theme.`
        );


    if (action) {

        toggleTheme();
    }


    closeMobileMenu();
}


/* =====================================================
   THEME
===================================================== */

function toggleTheme() {

    const current =
        localStorage.getItem(
            "userhub_theme"
        ) || "light";


    const next =
        current === "light"
            ? "dark"
            : "light";


    localStorage.setItem(
        "userhub_theme",
        next
    );


    document.body.classList.toggle(
        "dark-mode",
        next === "dark"
    );


    showToast(
        `${next === "dark" ? "Dark" : "Light"} mode enabled`
    );
}


/* =====================================================
   LOAD THEME
===================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem(
            "userhub_theme"
        ) || "light";


    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );
    }
}


/* =====================================================
   ANALYTICS
===================================================== */

function renderAnalytics() {

    const analyticsPage =
        document.getElementById(
            "analyticsPage"
        );


    if (!analyticsPage) {
        return;
    }


    const total =
        users.length;


    const active =
        users.filter(
            user =>
                user.status === "active"
        ).length;


    const pending =
        users.filter(
            user =>
                user.status === "pending"
        ).length;


    const inactive =
        users.filter(
            user =>
                user.status === "inactive"
        ).length;


    const admins =
        users.filter(
            user =>
                user.role === "Admin"
        ).length;


    const activeRate =
        total === 0
            ? 0
            : Math.round(
                (active / total) * 100
            );


    /* ---------------------------------------------
       SUMMARY
    --------------------------------------------- */

    const analyticsTotal =
        document.getElementById(
            "analyticsTotal"
        );


    const activeRateElement =
        document.getElementById(
            "activeRate"
        );


    const analyticsAdmins =
        document.getElementById(
            "analyticsAdmins"
        );


    const newThisMonth =
        document.getElementById(
            "newThisMonth"
        );


    if (analyticsTotal) {

        analyticsTotal.textContent =
            total;
    }


    if (activeRateElement) {

        activeRateElement.textContent =
            activeRate + "%";
    }


    if (analyticsAdmins) {

        analyticsAdmins.textContent =
            admins;
    }


    if (newThisMonth) {

        newThisMonth.textContent =
            getNewUsersThisMonth();
    }


    renderGrowthChart();

    renderStatusChart(
        active,
        pending,
        inactive
    );

    renderRoleChart();

    renderInsights(
        total,
        active,
        pending,
        inactive,
        admins
    );
}


/* =====================================================
   NEW USERS THIS MONTH
===================================================== */

function getNewUsersThisMonth() {

    const now =
        new Date();


    return users.filter(user => {

        const date =
            new Date(
                user.joined +
                "T00:00:00"
            );


        return (
            date.getMonth() ===
                now.getMonth() &&
            date.getFullYear() ===
                now.getFullYear()
        );

    }).length;
}


/* =====================================================
   GROWTH CHART
===================================================== */

function renderGrowthChart() {

    const chart =
        document.getElementById(
            "growthChart"
        );


    if (!chart) {
        return;
    }


    chart.innerHTML = "";


    const now =
        new Date();


    const months = [];


    for (
        let i = 5;
        i >= 0;
        i--
    ) {

        const date =
            new Date(
                now.getFullYear(),
                now.getMonth() - i,
                1
            );


        months.push({

            month:
                date.getMonth(),

            year:
                date.getFullYear(),

            label:
                date.toLocaleDateString(
                    "en-IN",
                    {
                        month: "short"
                    }
                )

        });

    }


    const counts =
        months.map(month => {

            return users.filter(user => {

                const joined =
                    new Date(
                        user.joined +
                        "T00:00:00"
                    );


                return (
                    joined.getMonth() ===
                        month.month &&
                    joined.getFullYear() ===
                        month.year
                );

            }).length;

        });


    const maximum =
        Math.max(
            ...counts,
            1
        );


    months.forEach(
        (month, index) => {

            const count =
                counts[index];


            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "growth-bar-wrapper";


            const value =
                document.createElement(
                    "div"
                );

            value.className =
                "growth-value";

            value.textContent =
                count;


            const bar =
                document.createElement(
                    "div"
                );

            bar.className =
                "growth-bar";


            const height =
                Math.max(
                    5,
                    (count / maximum) * 150
                );


            bar.style.height =
                height + "px";


            const label =
                document.createElement(
                    "div"
                );

            label.className =
                "growth-label";

            label.textContent =
                month.label;


            wrapper.appendChild(
                value
            );

            wrapper.appendChild(
                bar
            );

            wrapper.appendChild(
                label
            );


            chart.appendChild(
                wrapper
            );

        }
    );
}


/* =====================================================
   STATUS CHART
===================================================== */

function renderStatusChart(
    active,
    pending,
    inactive
) {

    const chart =
        document.getElementById(
            "statusChart"
        );


    if (!chart) {
        return;
    }


    chart.innerHTML = "";


    const total =
        active +
        pending +
        inactive;


    const statuses = [

        {
            name: "Active",
            value: active,
            className: "active"
        },

        {
            name: "Pending",
            value: pending,
            className: "pending"
        },

        {
            name: "Inactive",
            value: inactive,
            className: "inactive"
        }

    ];


    statuses.forEach(status => {

        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (status.value / total) * 100
                );


        const row =
            document.createElement(
                "div"
            );

        row.className =
            "status-row";


        row.innerHTML = `

            <span>
                ${status.name}
            </span>

            <div class="status-track">

                <div
                    class="status-fill ${status.className}"
                    style="width:${percentage}%"
                ></div>

            </div>

            <strong>
                ${status.value}
            </strong>

        `;


        chart.appendChild(row);

    });
}


/* =====================================================
   ROLE CHART
===================================================== */

function renderRoleChart() {

    const chart =
        document.getElementById(
            "roleChart"
        );


    if (!chart) {
        return;
    }


    chart.innerHTML = "";


    const roles = [
        {
            name: "Admin",
            icon: "👑"
        },
        {
            name: "Manager",
            icon: "💼"
        },
        {
            name: "User",
            icon: "👤"
        }
    ];


    const total =
        users.length;


    roles.forEach(role => {

        const count =
            users.filter(
                user =>
                    user.role === role.name
            ).length;


        const percentage =
            total === 0
                ? 0
                : Math.round(
                    (count / total) * 100
                );


        const row =
            document.createElement(
                "div"
            );

        row.className =
            "role-row";


        row.innerHTML = `

            <div class="role-icon">
                ${role.icon}
            </div>

            <div class="role-info">

                <div class="role-info-top">

                    <strong>
                        ${role.name}
                    </strong>

                    <span>
                        ${count} user${count === 1 ? "" : "s"}
                    </span>

                </div>

                <div class="role-progress">

                    <div
                        style="width:${percentage}%"
                    ></div>

                </div>

            </div>

        `;


        chart.appendChild(row);

    });
}


/* =====================================================
   ANALYTICS INSIGHTS
===================================================== */

function renderInsights(
    total,
    active,
    pending,
    inactive,
    admins
) {

    const container =
        document.getElementById(
            "analyticsInsights"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    const activeRate =
        total === 0
            ? 0
            : Math.round(
                (active / total) * 100
            );


    const insights = [

        {
            icon: "🟢",

            title: "Active Users",

            text:
                `${activeRate}% of your users are currently active.`
        },

        {
            icon: "⏳",

            title: "Pending Accounts",

            text:
                `${pending} pending user account${pending === 1 ? "" : "s"} waiting for activation.`
        },

        {
            icon: "👑",

            title: "Administrators",

            text:
                `${admins} administrator${admins === 1 ? "" : "s"} currently have admin access.`
        },

        {
            icon: "🔴",

            title: "Inactive Accounts",

            text:
                `${inactive} inactive user${inactive === 1 ? "" : "s"} found in your dashboard.`
        }

    ];


    insights.forEach(item => {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "insight";


        element.innerHTML = `

            <div class="insight-icon">
                ${item.icon}
            </div>

            <div>

                <strong>
                    ${item.title}
                </strong>

                <p>
                    ${item.text}
                </p>

            </div>

        `;


        container.appendChild(
            element
        );

    });
}


/* =====================================================
   REFRESH ANALYTICS
===================================================== */

function refreshAnalytics() {

    renderAnalytics();

    showToast(
        "Analytics refreshed"
    );
}


/* =====================================================
   EVENT LISTENERS
===================================================== */


/* Add User */

const addUserButton =
    document.getElementById(
        "addUserBtn"
    );


if (addUserButton) {

    addUserButton.addEventListener(
        "click",
        openAddModal
    );
}


/* Close */

const closeButton =
    document.getElementById(
        "closeModalBtn"
    );


if (closeButton) {

    closeButton.addEventListener(
        "click",
        closeModal
    );
}


/* Cancel */

const cancelButton =
    document.getElementById(
        "cancelBtn"
    );


if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        closeModal
    );
}


/* Form */

if (userForm) {

    userForm.addEventListener(
        "submit",
        saveUser
    );
}


/* Search */

if (search) {

    search.addEventListener(
        "input",
        renderUsers
    );
}


/* Filter */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        renderUsers
    );
}


/* Export */

const exportButton =
    document.getElementById(
        "exportBtn"
    );


if (exportButton) {

    exportButton.addEventListener(
        "click",
        exportUsers
    );
}


/* Reset */

const resetButton =
    document.getElementById(
        "resetBtn"
    );


if (resetButton) {

    resetButton.addEventListener(
        "click",
        resetDemo
    );
}


/* Mobile Menu */

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        toggleMobileMenu
    );
}


/* Dashboard Navigation */

const dashboardNav =
    document.getElementById(
        "dashboardNav"
    );


if (dashboardNav) {

    dashboardNav.addEventListener(
        "click",
        dashboardNavigation
    );
}


/* Users Navigation */

const usersNav =
    document.getElementById(
        "usersNav"
    );


if (usersNav) {

    usersNav.addEventListener(
        "click",
        usersNavigation
    );
}


/* Analytics Navigation */

const analyticsNav =
    document.getElementById(
        "analyticsNav"
    );


if (analyticsNav) {

    analyticsNav.addEventListener(
        "click",
        analyticsNavigation
    );
}


/* Notifications */

const notificationsNav =
    document.getElementById(
        "notificationsNav"
    );


if (notificationsNav) {

    notificationsNav.addEventListener(
        "click",
        notificationsNavigation
    );
}


/* Settings */

const settingsNav =
    document.getElementById(
        "settingsNav"
    );


if (settingsNav) {

    settingsNav.addEventListener(
        "click",
        settingsNavigation
    );
}


/* Refresh Analytics */

const refreshButton =
    document.getElementById(
        "refreshAnalytics"
    );


if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        refreshAnalytics
    );
}


/* =====================================================
   TABLE ACTIONS
===================================================== */

if (table) {

    table.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button[data-action]"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.action;


            const id =
                button.dataset.id;


            if (action === "edit") {

                openEditModal(id);

            }

            else if (action === "toggle") {

                toggleUser(id);

            }

            else if (action === "delete") {

                deleteUser(id);
            }

        }
    );
}


/* =====================================================
   MODAL BACKGROUND
===================================================== */

if (userModal) {

    userModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                userModal
            ) {

                closeModal();
            }

        }
    );
}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (
                userModal &&
                userModal.classList.contains(
                    "show"
                )
            ) {

                closeModal();
            }

        }

    }
);


/* =====================================================
   TODAY
===================================================== */

const today =
    document.getElementById(
        "today"
    );


if (today) {

    today.textContent =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
}


/* =====================================================
   START APPLICATION
===================================================== */

loadTheme();

renderUsers();

renderAnalytics();

console.log(
    "UserHub Dashboard loaded successfully."
);