/* =====================================================
   ENTERPRISE ADMIN JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const enterpriseViews =
    document.querySelectorAll(
        ".enterprise-view"
    );

const enterpriseLinks =
    document.querySelectorAll(
        ".enterprise-link"
    );

const enterpriseSidebar =
    document.querySelector(
        ".enterprise-sidebar"
    );

const enterpriseTitle =
    document.getElementById(
        "enterpriseTitle"
    );

const enterpriseSection =
    document.getElementById(
        "enterpriseSection"
    );

const enterpriseToast =
    document.getElementById(
        "enterpriseToast"
    );

const enterpriseToastTitle =
    document.getElementById(
        "enterpriseToastTitle"
    );

const enterpriseToastMessage =
    document.getElementById(
        "enterpriseToastMessage"
    );


/* =====================================================
   PAGE DATA
===================================================== */

const enterprisePages = {

    enterpriseDashboard: [
        "COMMAND CENTER",
        "Command Center"
    ],

    projects: [
        "WORKSPACE",
        "Projects"
    ],

    teams: [
        "WORKSPACE",
        "Teams"
    ],

    security: [
        "GOVERNANCE",
        "Security Center"
    ],

    audit: [
        "COMPLIANCE",
        "Audit Logs"
    ],

    governance: [
        "GOVERNANCE",
        "Governance"
    ],

    billing: [
        "FINANCE",
        "Billing"
    ],

    enterpriseSettings: [
        "CONFIGURATION",
        "Enterprise Settings"
    ]

};


/* =====================================================
   VIEW SWITCH
===================================================== */

function showEnterpriseView(name) {

    enterpriseViews.forEach(view => {

        view.classList.remove("active");

    });


    const view =
        document.getElementById(name);


    if (!view) return;


    view.classList.add("active");


    enterpriseLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.view === name
        );

    });


    if (enterprisePages[name]) {

        enterpriseSection.textContent =
            enterprisePages[name][0];

        enterpriseTitle.textContent =
            enterprisePages[name][1];

    }


    enterpriseSidebar.classList.remove(
        "open"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (name === "projects") {
        renderProjects();
    }

    if (name === "teams") {
        renderTeams();
    }

    if (name === "audit") {
        renderAudit();
    }

}


enterpriseLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            showEnterpriseView(
                link.dataset.view
            );

        }
    );

});


document
    .querySelectorAll(
        "[data-view-target]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showEnterpriseView(
                    button.dataset.viewTarget
                );

            }
        );

    });


/* =====================================================
   MOBILE
===================================================== */

document
    .getElementById(
        "enterpriseMobileMenu"
    )
    .addEventListener(
        "click",
        () => {

            enterpriseSidebar.classList.toggle(
                "open"
            );

        }
    );


/* =====================================================
   TOAST
===================================================== */

let enterpriseToastTimer;

function showEnterpriseToast(
    title,
    message
) {

    enterpriseToastTitle.textContent =
        title;

    enterpriseToastMessage.textContent =
        message;

    enterpriseToast.classList.add(
        "show"
    );


    clearTimeout(
        enterpriseToastTimer
    );


    enterpriseToastTimer =
        setTimeout(
            () => {

                enterpriseToast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =====================================================
   THEME
===================================================== */

document
    .getElementById(
        "enterpriseTheme"
    )
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "enterpriseTheme",
                dark
                    ? "dark"
                    : "light"
            );


            document.getElementById(
                "enterpriseTheme"
            ).textContent =
                dark
                    ? "☀"
                    : "☾";

        }
    );


if (
    localStorage.getItem(
        "enterpriseTheme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    document.getElementById(
        "enterpriseTheme"
    ).textContent = "☀";

}


/* =====================================================
   PROJECT DATA
===================================================== */

let projects = [

    {
        id: 1,
        name: "AI Platform",
        department: "Product Engineering",
        progress: 84,
        budget: 84000,
        color: "blue"
    },

    {
        id: 2,
        name: "Cloud Migration",
        department: "Infrastructure",
        progress: 63,
        budget: 62000,
        color: "gold"
    },

    {
        id: 3,
        name: "Customer Experience",
        department: "Digital Transformation",
        progress: 48,
        budget: 42000,
        color: "cyan"
    },

    {
        id: 4,
        name: "Data Strategy",
        department: "Analytics",
        progress: 71,
        budget: 31000,
        color: "green"
    }

];


const projectGrid =
    document.getElementById(
        "projectGrid"
    );


function renderProjects() {

    projectGrid.innerHTML = "";


    projects.forEach(project => {

        const card =
            document.createElement("div");


        card.className =
            "project-card";


        card.innerHTML = `

            <div class="project-card-top">

                <div class="
                    project-symbol
                    ${project.color}
                ">
                    ${project.name
                        .slice(0,2)
                        .toUpperCase()}
                </div>

                <button
                    class="project-card-delete"
                    onclick="deleteProject(${project.id})">
                    Delete
                </button>

            </div>


            <h3>
                ${escapeHTML(project.name)}
            </h3>

            <p>
                ${escapeHTML(project.department)}
            </p>


            <div class="project-progress">

                <div>
                    <span
                        style="
                        width:${project.progress}%
                        ">
                    </span>
                </div>

                <small>
                    ${project.progress}%
                </small>

            </div>


            <div style="
                display:flex;
                justify-content:space-between;
                margin-top:15px;
                font-size:8px;
            ">

                <span>
                    Budget
                </span>

                <strong>
                    $${project.budget.toLocaleString()}
                </strong>

            </div>

        `;


        projectGrid.appendChild(card);

    });

}


/* =====================================================
   ADD PROJECT
===================================================== */

document
    .getElementById(
        "addProject"
    )
    .addEventListener(
        "click",
        () => {

            const name =
                prompt(
                    "Project name:"
                );

            if (!name) return;


            const department =
                prompt(
                    "Department:"
                );

            if (!department) return;


            projects.push({

                id: Date.now(),

                name,

                department,

                progress: 0,

                budget: 0,

                color: "blue"

            });


            renderProjects();


            showEnterpriseToast(
                "Project Created",
                `${name} was added to the portfolio.`
            );

        }
    );


/* =====================================================
   DELETE PROJECT
===================================================== */

function deleteProject(id) {

    const project =
        projects.find(
            item => item.id === id
        );


    if (!project) return;


    if (
        !confirm(
            `Delete ${project.name}?`
        )
    ) return;


    projects =
        projects.filter(
            item => item.id !== id
        );


    renderProjects();


    showEnterpriseToast(
        "Project Deleted",
        `${project.name} was removed.`
    );

}


/* =====================================================
   TEAM DATA
===================================================== */

let teams = [

    {
        id: 1,
        name: "Engineering",
        members: 84,
        description:
            "Product engineering and platform development.",
        color: "blue"
    },

    {
        id: 2,
        name: "Data Science",
        members: 42,
        description:
            "Analytics, AI and machine learning.",
        color: "gold"
    },

    {
        id: 3,
        name: "Marketing",
        members: 28,
        description:
            "Brand, growth and customer acquisition.",
        color: "cyan"
    },

    {
        id: 4,
        name: "Operations",
        members: 31,
        description:
            "Business operations and administration.",
        color: "green"
    }

];


const teamsGrid =
    document.getElementById(
        "teamsGrid"
    );


function renderTeams() {

    teamsGrid.innerHTML = "";


    teams.forEach(team => {

        const card =
            document.createElement("div");


        card.className =
            "team-card";


        card.innerHTML = `

            <div class="team-card-head">

                <div class="
                    team-icon
                    ${team.color}
                ">
                    ${team.name
                        .slice(0,1)
                        .toUpperCase()}
                </div>

                <div>

                    <h3>
                        ${escapeHTML(team.name)}
                    </h3>

                    <small>
                        ${team.members} members
                    </small>

                </div>

            </div>


            <p>
                ${escapeHTML(team.description)}
            </p>


            <div class="team-members">

                <div class="member">
                    JD
                </div>

                <div class="member">
                    MK
                </div>

                <div class="member">
                    AR
                </div>

                <div class="member">
                    +${Math.max(team.members - 3, 0)}
                </div>

            </div>

        `;


        teamsGrid.appendChild(card);

    });

}


/* =====================================================
   ADD TEAM
===================================================== */

document
    .getElementById(
        "addTeam"
    )
    .addEventListener(
        "click",
        () => {

            const name =
                prompt(
                    "Team name:"
                );

            if (!name) return;


            const members =
                Number(
                    prompt(
                        "Number of members:",
                        "10"
                    )
                );


            teams.push({

                id: Date.now(),

                name,

                members:
                    members || 0,

                description:
                    "New enterprise team.",

                color: "blue"

            });


            renderTeams();


            showEnterpriseToast(
                "Team Created",
                `${name} was created.`
            );

        }
    );


/* =====================================================
   AUDIT DATA
===================================================== */

const auditEvents = [

    {
        time: "10:24",
        actor: "John Doe",
        action: "Updated MFA policy",
        category: "security",
        ip: "10.24.1.20",
        status: "Success"
    },

    {
        time: "10:08",
        actor: "Olivia Martin",
        action: "Added administrator",
        category: "users",
        ip: "10.24.1.31",
        status: "Success"
    },

    {
        time: "09:42",
        actor: "Finance Bot",
        action: "Payment processed",
        category: "billing",
        ip: "10.24.1.10",
        status: "Success"
    },

    {
        time: "09:21",
        actor: "John Doe",
        action: "Changed session policy",
        category: "security",
        ip: "10.24.1.20",
        status: "Success"
    },

    {
        time: "08:55",
        actor: "Admin Service",
        action: "User access reviewed",
        category: "users",
        ip: "10.24.1.12",
        status: "Success"
    }

];


const auditTable =
    document.getElementById(
        "auditTable"
    );

const auditSearch =
    document.getElementById(
        "auditSearch"
    );

const auditType =
    document.getElementById(
        "auditType"
    );


function renderAudit() {

    const query =
        auditSearch.value
            .toLowerCase()
            .trim();

    const category =
        auditType.value;


    const filtered =
        auditEvents.filter(event => {

            const textMatch =
                event.actor
                    .toLowerCase()
                    .includes(query)

                ||

                event.action
                    .toLowerCase()
                    .includes(query);


            const categoryMatch =
                category === "all"
                ||
                event.category === category;


            return (
                textMatch &&
                categoryMatch
            );

        });


    auditTable.innerHTML = "";


    filtered.forEach(event => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${event.time}
            </td>

            <td>
                ${escapeHTML(event.actor)}
            </td>

            <td>
                ${escapeHTML(event.action)}
            </td>

            <td>

                <span class="audit-category">

                    ${event.category}

                </span>

            </td>

            <td>
                ${event.ip}
            </td>

            <td style="color:#25b987">
                ${event.status}
            </td>

        `;


        auditTable.appendChild(row);

    });


    if (!filtered.length) {

        auditTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                    text-align:center;
                    padding:30px;
                    color:#78869d;
                    "
                >
                    No audit events found.
                </td>

            </tr>

        `;

    }

}


auditSearch.addEventListener(
    "input",
    renderAudit
);

auditType.addEventListener(
    "change",
    renderAudit
);


/* =====================================================
   AUDIT EXPORT
===================================================== */

document
    .getElementById(
        "exportAudit"
    )
    .addEventListener(
        "click",
        () => {

            const csv =
`Time,Actor,Action,Category,IP,Status
${auditEvents.map(event =>
    `${event.time},${event.actor},${event.action},${event.category},${event.ip},${event.status}`
).join("\n")}`;


            downloadFile(
                "enterprise-audit.csv",
                csv,
                "text/csv"
            );


            showEnterpriseToast(
                "Export Complete",
                "Audit CSV downloaded."
            );

        }
    );


/* =====================================================
   SECURITY SCAN
===================================================== */

document
    .getElementById(
        "runSecurityScan"
    )
    .addEventListener(
        "click",
        () => {

            showEnterpriseToast(
                "Security Scan",
                "Scan completed. No critical issues found."
            );

        }
    );


/* =====================================================
   BILLING DOWNLOAD
===================================================== */

document
    .getElementById(
        "downloadBilling"
    )
    .addEventListener(
        "click",
        () => {

            const statement =
`ENTERPRISE BILLING STATEMENT

Current Month: $284,420
Annual Budget: $3,400,000
Next Payment: $28,420

Invoice,Date,Amount,Status
ENT-1024,Sep 15,28420,Paid
ENT-1023,Aug 15,27820,Paid
ENT-1022,Jul 15,29120,Paid`;


            downloadFile(
                "enterprise-billing.txt",
                statement,
                "text/plain"
            );


            showEnterpriseToast(
                "Statement Downloaded",
                "Billing statement is ready."
            );

        }
    );


/* =====================================================
   ORGANIZATION
===================================================== */

document
    .getElementById(
        "organizationButton"
    )
    .addEventListener(
        "click",
        () => {

            showEnterpriseToast(
                "Organization",
                "Organization selector opened."
            );

        }
    );


/* =====================================================
   NOTIFICATIONS
===================================================== */

document
    .getElementById(
        "enterpriseNotifications"
    )
    .addEventListener(
        "click",
        () => {

            showEnterpriseToast(
                "Notifications",
                "3 enterprise notifications."
            );

        }
    );


/* =====================================================
   LOGOUT
===================================================== */

document
    .getElementById(
        "enterpriseLogout"
    )
    .addEventListener(
        "click",
        () => {

            if (
                confirm(
                    "Sign out of EnterpriseOS?"
                )
            ) {

                showEnterpriseToast(
                    "Signed Out",
                    "Demo sign-out completed."
                );

            }

        }
    );


/* =====================================================
   SETTINGS
===================================================== */

document
    .getElementById(
        "saveEnterpriseSettings"
    )
    .addEventListener(
        "click",
        () => {

            const name =
                document
                    .getElementById(
                        "enterpriseOrgName"
                    )
                    .value
                    .trim();


            localStorage.setItem(
                "enterpriseOrgName",
                name
            );


            showEnterpriseToast(
                "Settings Saved",
                "Enterprise configuration updated."
            );

        }
    );


const savedEnterpriseName =
    localStorage.getItem(
        "enterpriseOrgName"
    );


if (savedEnterpriseName) {

    document
        .getElementById(
            "enterpriseOrgName"
        )
        .value =
        savedEnterpriseName;

}


/* =====================================================
   SEARCH
===================================================== */

document
    .getElementById(
        "enterpriseSearch"
    )
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) return;


            const query =
                event.target.value
                    .trim()
                    .toLowerCase();


            if (!query) return;


            const project =
                projects.find(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(query)
                );


            if (project) {

                showEnterpriseView(
                    "projects"
                );


                showEnterpriseToast(
                    "Search Result",
                    project.name
                );

            } else {

                showEnterpriseToast(
                    "No Results",
                    `Nothing found for "${query}".`
                );

            }

        }
    );


/* =====================================================
   CURRENT DATE
===================================================== */

const dateElement =
    document.getElementById(
        "currentDate"
    );


const now =
    new Date();


dateElement.textContent =
    now.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "2-digit"
        }
    ).toUpperCase();


/* =====================================================
   ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


/* =====================================================
   DOWNLOAD
===================================================== */

function downloadFile(
    filename,
    content,
    type
) {

    const blob =
        new Blob(
            [content],
            {type}
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


/* =====================================================
   INITIALIZE
===================================================== */

renderProjects();

renderTeams();

renderAudit();

showEnterpriseView(
    "enterpriseDashboard"
);