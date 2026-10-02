/* =========================================================
   BASIC ADMIN JAVASCRIPT
========================================================= */


/* =========================================================
   DATA
========================================================= */

let users = [

    {
        id: 1,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "Customer",
        status: "active",
        plan: "Pro"
    },

    {
        id: 2,
        name: "Mike Kumar",
        email: "mike@example.com",
        role: "Manager",
        status: "active",
        plan: "Business"
    },

    {
        id: 3,
        name: "Alex Roy",
        email: "alex@example.com",
        role: "Customer",
        status: "pending",
        plan: "Free"
    },

    {
        id: 4,
        name: "Emma Johnson",
        email: "emma@example.com",
        role: "Customer",
        status: "active",
        plan: "Pro"
    },

    {
        id: 5,
        name: "David Smith",
        email: "david@example.com",
        role: "Manager",
        status: "blocked",
        plan: "Business"
    },

    {
        id: 6,
        name: "Priya Sharma",
        email: "priya@example.com",
        role: "Customer",
        status: "active",
        plan: "Free"
    }

];


/* =========================================================
   DOM
========================================================= */

const navItems =
    document.querySelectorAll(".nav-item");

const views =
    document.querySelectorAll(".view");

const pageTitle =
    document.getElementById("pageTitle");

const pageSubtitle =
    document.getElementById("pageSubtitle");

const globalSearch =
    document.getElementById("globalSearch");

const themeBtn =
    document.getElementById("themeBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.querySelector(".sidebar");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const userModal =
    document.getElementById("userModal");

const userForm =
    document.getElementById("userForm");

const usersBody =
    document.getElementById("usersBody");

const userSearch =
    document.getElementById("userSearch");

const statusFilter =
    document.getElementById("statusFilter");


/* =========================================================
   PAGE INFORMATION
========================================================= */

const pageInfo = {

    dashboard: {

        title: "Dashboard",

        subtitle:
            "Welcome back! Here's what's happening today."

    },

    users: {

        title: "Users",

        subtitle:
            "Manage all registered users."

    },

    orders: {

        title: "Orders",

        subtitle:
            "Track and manage customer orders."

    },

    products: {

        title: "Products",

        subtitle:
            "Manage your SaaS products."

    },

    reports: {

        title: "Reports",

        subtitle:
            "Analyze your SaaS performance."

    },

    notifications: {

        title: "Notifications",

        subtitle:
            "View system and account notifications."

    },

    settings: {

        title: "Settings",

        subtitle:
            "Configure your admin panel."

    }

};


/* =========================================================
   VIEW SWITCHING
========================================================= */

function showView(viewName) {

    views.forEach(view => {

        view.classList.remove("active");

    });


    const selected =
        document.getElementById(viewName);

    if (!selected) return;

    selected.classList.add("active");


    navItems.forEach(item => {

        item.classList.remove("active");

        if (
            item.dataset.view === viewName
        ) {

            item.classList.add("active");

        }

    });


    if (pageInfo[viewName]) {

        pageTitle.textContent =
            pageInfo[viewName].title;

        pageSubtitle.textContent =
            pageInfo[viewName].subtitle;

    }


    sidebar.classList.remove("open");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    if (viewName === "users") {

        renderUsers();

    }

}


/* NAVIGATION */

navItems.forEach(item => {

    item.addEventListener("click", () => {

        showView(item.dataset.view);

    });

});


/* OTHER VIEW BUTTONS */

document
    .querySelectorAll("[data-view-target]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showView(
                button.dataset.viewTarget
            );

        });

    });


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("open");

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(
    title,
    message
) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================================
   RENDER USERS
========================================================= */

function renderUsers() {

    const search =
        userSearch.value
            .toLowerCase()
            .trim();

    const status =
        statusFilter.value;


    const filtered =
        users.filter(user => {

            const matchesSearch =

                user.name
                    .toLowerCase()
                    .includes(search)

                ||

                user.email
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "all"

                ||

                user.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    usersBody.innerHTML = "";


    if (filtered.length === 0) {

        usersBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                    text-align:center;
                    padding:35px;
                    color:#77809a;
                    "
                >

                    No users found.

                </td>

            </tr>

        `;

        return;

    }


    filtered.forEach(user => {

        const initials =
            user.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="user-cell">

                    <div class="mini-avatar purple-bg">

                        ${initials}

                    </div>

                    ${escapeHTML(user.name)}

                </div>

            </td>


            <td>

                ${escapeHTML(user.email)}

            </td>


            <td>

                ${escapeHTML(user.role)}

            </td>


            <td>

                <span class="status ${user.status}">

                    ${
                        user.status
                            .charAt(0)
                            .toUpperCase()
                        +
                        user.status.slice(1)
                    }

                </span>

            </td>


            <td>

                ${escapeHTML(user.plan)}

            </td>


            <td>

                <button
                    class="table-edit"
                    onclick="editUser(${user.id})"
                    style="
                    background:#eeeaff;
                    color:#6045ef;
                    padding:6px 8px;
                    border-radius:6px;
                    font-size:10px;
                    margin-right:4px;
                    "
                >
                    Edit
                </button>


                <button
                    class="table-delete"
                    onclick="deleteUser(${user.id})"
                    style="
                    background:#ffe8ee;
                    color:#d22f54;
                    padding:6px 8px;
                    border-radius:6px;
                    font-size:10px;
                    "
                >
                    Delete
                </button>

            </td>

        `;


        usersBody.appendChild(row);

    });


    updateUserCount();

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   USER COUNT
========================================================= */

function updateUserCount() {

    const counter =
        document.getElementById("totalUsers");

    if (!counter) return;

    const base =
        1248 + users.length - 6;

    counter.textContent =
        base.toLocaleString();

}


/* =========================================================
   USER SEARCH
========================================================= */

userSearch.addEventListener(
    "input",
    renderUsers
);


statusFilter.addEventListener(
    "change",
    renderUsers
);


/* =========================================================
   CLEAR FILTERS
========================================================= */

document
    .getElementById("clearFilters")
    .addEventListener("click", () => {

        userSearch.value = "";

        statusFilter.value = "all";

        renderUsers();

    });


/* =========================================================
   MODAL
========================================================= */

const addUserBtn =
    document.getElementById("addUserBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const modalTitle =
    document.getElementById("modalTitle");

const editUserId =
    document.getElementById("editUserId");

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const userRole =
    document.getElementById("userRole");

const userPlan =
    document.getElementById("userPlan");


function openUserModal() {

    modalTitle.textContent =
        "Add User";

    editUserId.value = "";

    userName.value = "";

    userEmail.value = "";

    userRole.value = "Customer";

    userPlan.value = "Free";

    userModal.classList.add("show");

}


addUserBtn.addEventListener(
    "click",
    openUserModal
);


function closeUserModal() {

    userModal.classList.remove("show");

}


closeModal.addEventListener(
    "click",
    closeUserModal
);


cancelModal.addEventListener(
    "click",
    closeUserModal
);


userModal.addEventListener(
    "click",
    event => {

        if (
            event.target === userModal
        ) {

            closeUserModal();

        }

    }
);


/* =========================================================
   ADD / EDIT USER
========================================================= */

userForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            userName.value.trim();

        const email =
            userEmail.value.trim();

        const role =
            userRole.value;

        const plan =
            userPlan.value;


        if (!name || !email) {

            showToast(
                "Error",
                "Please fill all required fields."
            );

            return;

        }


        const id =
            Number(editUserId.value);


        if (id) {

            const user =
                users.find(
                    item => item.id === id
                );


            if (user) {

                user.name = name;

                user.email = email;

                user.role = role;

                user.plan = plan;

                showToast(
                    "User Updated",
                    `${name} was updated successfully.`
                );

            }

        } else {

            const newUser = {

                id:
                    Date.now(),

                name,

                email,

                role,

                status:
                    "active",

                plan

            };


            users.unshift(newUser);


            showToast(
                "User Added",
                `${name} was added successfully.`
            );

        }


        closeUserModal();

        renderUsers();

        updateUserCount();

    }
);


/* =========================================================
   EDIT USER
========================================================= */

function editUser(id) {

    const user =
        users.find(
            item => item.id === id
        );


    if (!user) return;


    modalTitle.textContent =
        "Edit User";

    editUserId.value =
        user.id;

    userName.value =
        user.name;

    userEmail.value =
        user.email;

    userRole.value =
        user.role;

    userPlan.value =
        user.plan;


    userModal.classList.add("show");

}


/* =========================================================
   DELETE USER
========================================================= */

function deleteUser(id) {

    const user =
        users.find(
            item => item.id === id
        );


    if (!user) return;


    const confirmed =
        confirm(
            `Delete ${user.name}?`
        );


    if (!confirmed) return;


    users =
        users.filter(
            item => item.id !== id
        );


    renderUsers();

    updateUserCount();


    showToast(
        "User Deleted",
        `${user.name} was removed.`
    );

}


/* =========================================================
   THEME
========================================================= */

themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent = "☀️";

            localStorage.setItem(
                "basicAdminTheme",
                "dark"
            );

        } else {

            themeBtn.textContent = "🌙";

            localStorage.setItem(
                "basicAdminTheme",
                "light"
            );

        }

    }
);


/* LOAD THEME */

if (
    localStorage.getItem(
        "basicAdminTheme"
    ) === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

globalSearch.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Enter"
        ) return;


        const value =
            globalSearch.value
                .trim()
                .toLowerCase();


        if (!value) return;


        const foundUser =
            users.find(user =>

                user.name
                    .toLowerCase()
                    .includes(value)

                ||

                user.email
                    .toLowerCase()
                    .includes(value)

            );


        if (foundUser) {

            showView("users");

            userSearch.value =
                value;

            renderUsers();

            showToast(
                "Search Result",
                `Found ${foundUser.name}.`
            );

        } else {

            showToast(
                "No Results",
                `Nothing found for "${value}".`
            );

        }

    }
);


/* =========================================================
   NOTIFICATIONS
========================================================= */

document
    .getElementById("notificationBtn")
    .addEventListener(
        "click",
        () => {

            showView("notifications");

        }
    );


document
    .getElementById("markAllRead")
    .addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(
                    ".notification.unread"
                )
                .forEach(item => {

                    item.classList.remove(
                        "unread"
                    );

                });


            document
                .querySelector(
                    ".notification-count"
                )
                .textContent = "0";


            document
                .querySelector(
                    ".dot"
                )
                .style.display = "none";


            showToast(
                "Notifications",
                "All notifications marked as read."
            );

        }
    );


/* =========================================================
   QUICK ACTION
========================================================= */

document
    .getElementById("quickActionBtn")
    .addEventListener(
        "click",
        () => {

            showView("users");

            setTimeout(
                openUserModal,
                200
            );

        }
    );


/* =========================================================
   UPGRADE
========================================================= */

document
    .getElementById("upgradeBtn")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Upgrade",
                "Upgrade flow opened."
            );

        }
    );


/* =========================================================
   LOGOUT
========================================================= */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmed) {

                showToast(
                    "Logged Out",
                    "Demo logout completed."
                );

            }

        }
    );


/* =========================================================
   SETTINGS
========================================================= */

document
    .getElementById("saveSettings")
    .addEventListener(
        "click",
        () => {

            const company =
                document.getElementById(
                    "companyName"
                ).value.trim();


            localStorage.setItem(
                "companyName",
                company
            );


            showToast(
                "Settings Saved",
                "Your settings were saved successfully."
            );

        }
    );


/* LOAD COMPANY */

const savedCompany =
    localStorage.getItem(
        "companyName"
    );


if (savedCompany) {

    document.getElementById(
        "companyName"
    ).value = savedCompany;

}


/* =========================================================
   ORDERS EXPORT
========================================================= */

document
    .getElementById("exportOrders")
    .addEventListener(
        "click",
        () => {

            const csv =

`Order ID,Customer,Amount,Date,Status
ORD-1024,Sarah Wilson,249,2026-10-01,Completed
ORD-1023,Mike Kumar,129,2026-10-01,Processing
ORD-1022,Alex Roy,499,2026-09-30,Completed`;


            downloadFile(
                "orders.csv",
                csv,
                "text/csv"
            );


            showToast(
                "Export Complete",
                "Orders CSV downloaded."
            );

        }
    );


/* =========================================================
   REPORT DOWNLOAD
========================================================= */

document
    .getElementById("downloadReport")
    .addEventListener(
        "click",
        () => {

            const report =

`SAAS ADMIN REPORT
=================

Revenue: $48,290
Users: 1,248
Orders: 3,842
Conversion: 7.82%
Retention: 91.4%

Generated:
${new Date().toLocaleString()}
`;


            downloadFile(
                "saas-report.txt",
                report,
                "text/plain"
            );


            showToast(
                "Report Downloaded",
                "Your report is ready."
            );

        }
    );


/* =========================================================
   ADD PRODUCT
========================================================= */

document
    .getElementById("addProductBtn")
    .addEventListener(
        "click",
        () => {

            const name =
                prompt(
                    "Enter product name:"
                );


            if (!name) return;


            const price =
                prompt(
                    "Enter monthly price:"
                );


            if (!price) return;


            const product =
                document.createElement(
                    "div"
                );


            product.className =
                "product-card";


            product.innerHTML = `

                <div class="product-icon purple-product">
                    ✨
                </div>

                <h3>
                    ${escapeHTML(name)}
                </h3>

                <p>
                    Newly created SaaS product.
                </p>

                <div class="product-bottom">

                    <strong>
                        $${escapeHTML(price)}/month
                    </strong>

                    <span class="status active">
                        Active
                    </span>

                </div>

            `;


            document
                .querySelector(
                    ".product-grid"
                )
                .appendChild(product);


            showToast(
                "Product Added",
                `${name} was created.`
            );

        }
    );


/* =========================================================
   REVENUE PERIOD
========================================================= */

document
    .getElementById("revenuePeriod")
    .addEventListener(
        "change",
        event => {

            showToast(
                "Chart Updated",
                `Showing ${event.target.value}.`
            );

        }
    );


/* =========================================================
   DOWNLOAD HELPER
========================================================= */

function downloadFile(
    filename,
    content,
    type
) {

    const blob =
        new Blob(
            [content],
            { type }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

}


/* =========================================================
   INITIALIZE
========================================================= */

renderUsers();

showView("dashboard");