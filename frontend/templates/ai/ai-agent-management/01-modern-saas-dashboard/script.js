document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("appContent");
    const title = document.getElementById("pageTitle");
    const subtitle = document.getElementById("pageSubtitle");
    const toast = document.getElementById("toast");

    const originalOverview = app.innerHTML;

    function showToast(message, detail = "") {
        toast.querySelector("strong").textContent = message;
        toast.querySelector("span").textContent = detail;
        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2800);
    }

    function modal(titleText, content) {

        closeModal();

        const bg = document.createElement("div");
        bg.className = "modal-bg";

        bg.innerHTML = `
            <div class="modal">
                <button class="close-modal">×</button>
                <h2>${titleText}</h2>
                ${content}
            </div>
        `;

        document.body.appendChild(bg);

        bg.querySelector(".close-modal").onclick = closeModal;

        bg.addEventListener("click", e => {
            if (e.target === bg) closeModal();
        });

        return bg;
    }

    function closeModal() {
        document.querySelector(".modal-bg")?.remove();
    }

    function setHeading(name, text) {
        title.innerHTML = name;
        subtitle.textContent = text;
    }

    function activate(page) {

        document.querySelectorAll(".nav-link").forEach(btn => {
            btn.classList.toggle(
                "active",
                btn.dataset.page === page
            );
        });

        document.querySelector(".sidebar")?.classList.remove("open");
    }


    /* SIDEBAR */

    document.querySelectorAll(".nav-link").forEach(btn => {

        btn.addEventListener("click", () => {

            const page = btn.dataset.page;

            activate(page);

            if (page === "overview") loadOverview();
            if (page === "analytics") loadAnalytics();
            if (page === "customers") loadCustomers();
            if (page === "projects") loadProjects();
            if (page === "automations") loadAutomations();
            if (page === "team") loadTeam();
            if (page === "reports") loadReports();
            if (page === "settings") loadSettings();

        });

    });


    function loadOverview() {

        app.innerHTML = originalOverview;

        setHeading(
            "Good morning, Harsha ✦",
            "Here's what's happening with your business today."
        );

        bindDynamicButtons();
    }


    function loadAnalytics() {

        setHeading(
            "Analytics",
            "Track traffic, conversions and business performance."
        );

        app.innerHTML = `

            <section class="stats-grid">

                <article class="stat-card">
                    <span class="stat-label">VISITORS</span>
                    <div class="stat-value">248,640</div>
                    <div class="stat-footer">
                        <span class="positive">↑ 22.8%</span>
                        <span>this month</span>
                    </div>
                </article>

                <article class="stat-card">
                    <span class="stat-label">SESSIONS</span>
                    <div class="stat-value">184,920</div>
                    <div class="stat-footer">
                        <span class="positive">↑ 16.4%</span>
                        <span>this month</span>
                    </div>
                </article>

                <article class="stat-card">
                    <span class="stat-label">CONVERSION</span>
                    <div class="stat-value">24.8%</div>
                    <div class="stat-footer">
                        <span class="positive">↑ 4.2%</span>
                        <span>this month</span>
                    </div>
                </article>

                <article class="stat-card">
                    <span class="stat-label">AVG SESSION</span>
                    <div class="stat-value">4m 32s</div>
                    <div class="stat-footer">
                        <span class="positive">↑ 9.6%</span>
                        <span>this month</span>
                    </div>
                </article>

            </section>

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">
                        <div>
                            <h2>Traffic Analytics</h2>
                            <p>Website traffic performance</p>
                        </div>
                    </div>

                    <div class="bars">
                        <i style="height:45%"></i>
                        <i style="height:62%"></i>
                        <i style="height:55%"></i>
                        <i style="height:76%"></i>
                        <i style="height:68%"></i>
                        <i style="height:88%"></i>
                        <i style="height:96%"></i>
                    </div>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Traffic Sources</h2>
                            <p>Top channels</p>
                        </div>
                    </div>

                    <div class="activity-list">

                        <div class="activity">
                            <div class="activity-avatar blue">G</div>
                            <div>
                                <strong>Google</strong>
                                <p>Organic Search</p>
                                <small>42%</small>
                            </div>
                        </div>

                        <div class="activity">
                            <div class="activity-avatar purple">S</div>
                            <div>
                                <strong>Social</strong>
                                <p>Social Media</p>
                                <small>28%</small>
                            </div>
                        </div>

                        <div class="activity">
                            <div class="activity-avatar cyan">D</div>
                            <div>
                                <strong>Direct</strong>
                                <p>Direct Traffic</p>
                                <small>19%</small>
                            </div>
                        </div>

                    </div>

                </article>

            </section>
        `;
    }


    function loadCustomers() {

        setHeading(
            "Customers",
            "Manage your customers and subscriptions."
        );

        app.innerHTML = `

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">

                        <div>
                            <h2>Customer Directory</h2>
                            <p>8,249 active customers</p>
                        </div>

                        <button class="primary-btn" id="newCustomer">
                            ＋ Add Customer
                        </button>

                    </div>

                    <div class="activity-list">

                        ${customer("JD","Jordan Davis","Professional")}
                        ${customer("MK","Maria Kim","Business")}
                        ${customer("AR","Alex Rivera","Starter")}
                        ${customer("SL","Sarah Lee","Enterprise")}

                    </div>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Customer Growth</h2>
                            <p>New customers</p>
                        </div>
                    </div>

                    <div class="big-number">
                        1,842
                        <span class="positive">↑ 14.8%</span>
                    </div>

                    <div class="bars">
                        <i style="height:42%"></i>
                        <i style="height:55%"></i>
                        <i style="height:65%"></i>
                        <i style="height:78%"></i>
                        <i style="height:94%"></i>
                    </div>

                </article>

            </section>
        `;

        document.getElementById("newCustomer").onclick = () => {

            const box = modal(
                "Add Customer",
                `
                    <form id="customerForm">

                        <label>Name</label>
                        <input id="customerName" required placeholder="Customer name">

                        <label>Email</label>
                        <input type="email" required placeholder="customer@email.com">

                        <label>Plan</label>
                        <select>
                            <option>Starter</option>
                            <option>Professional</option>
                            <option>Business</option>
                            <option>Enterprise</option>
                        </select>

                        <button class="modal-submit">
                            Add Customer
                        </button>

                    </form>
                `
            );

            box.querySelector("form").onsubmit = e => {
                e.preventDefault();
                closeModal();
                showToast(
                    "Customer Added",
                    "Customer was added successfully."
                );
            };
        };
    }


    function customer(initials, name, plan) {

        return `
            <div class="activity">

                <div class="activity-avatar blue">
                    ${initials}
                </div>

                <div>
                    <strong>${name}</strong>
                    <p>${plan} Plan</p>
                    <small>Active customer</small>
                </div>

            </div>
        `;
    }


    function loadProjects() {

        setHeading(
            "Projects",
            "Create and manage workspace projects."
        );

        app.innerHTML = `

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">

                        <div>
                            <h2>Projects</h2>
                            <p>Current workspace projects</p>
                        </div>

                        <button class="primary-btn" id="newProject">
                            ＋ New Project
                        </button>

                    </div>

                    <div class="activity-list">

                        ${project("NA","Nova App","78%")}
                        ${project("WR","Website Redesign","100%")}
                        ${project("MB","Mobile Banking","56%")}
                        ${project("AI","AI Assistant","24%")}

                    </div>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Overall Progress</h2>
                            <p>All projects</p>
                        </div>
                    </div>

                    <div class="big-number">74%</div>

                    <div class="bars">
                        <i style="height:74%"></i>
                        <i style="height:62%"></i>
                        <i style="height:84%"></i>
                        <i style="height:55%"></i>
                        <i style="height:91%"></i>
                    </div>

                </article>

            </section>
        `;

        document.getElementById("newProject").onclick =
            createProject;
    }


    function project(initials, name, progress) {

        return `
            <div class="activity">

                <div class="activity-avatar purple">
                    ${initials}
                </div>

                <div>
                    <strong>${name}</strong>
                    <p>Project workspace</p>
                    <small>${progress} complete</small>
                </div>

            </div>
        `;
    }


    function createProject() {

        const box = modal(
            "Create Project",
            `
                <form id="projectForm">

                    <label>Project Name</label>
                    <input id="projectName" required placeholder="Project name">

                    <label>Description</label>
                    <textarea placeholder="Project description"></textarea>

                    <label>Status</label>
                    <select>
                        <option>Planning</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                    </select>

                    <button class="modal-submit">
                        Create Project
                    </button>

                </form>
            `
        );

        box.querySelector("form").onsubmit = e => {

            e.preventDefault();

            const name =
                document.getElementById("projectName").value;

            closeModal();

            showToast(
                "Project Created",
                `${name} was created successfully.`
            );
        };
    }


    function loadAutomations() {

        setHeading(
            "Automations",
            "Automate repetitive workspace tasks."
        );

        app.innerHTML = `

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">

                        <div>
                            <h2>Automation Rules</h2>
                            <p>Active workflow automations</p>
                        </div>

                        <button class="primary-btn" id="newAutomation">
                            ＋ Create Rule
                        </button>

                    </div>

                    <div class="activity-list">

                        ${automation("✓","Welcome Email","Send email to new customers")}
                        ${automation("↗","Revenue Alert","Notify admin about revenue changes")}
                        ${automation("◈","Project Reminder","Remind members about deadlines")}

                    </div>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Active Rules</h2>
                            <p>Automation status</p>
                        </div>
                    </div>

                    <div class="big-number">18</div>
                    <p>Active automation rules</p>

                </article>

            </section>
        `;

        document.getElementById("newAutomation").onclick = () => {
            showToast(
                "Automation",
                "Automation rule creation started."
            );
        };
    }


    function automation(icon, name, description) {

        return `
            <div class="activity">

                <div class="activity-avatar cyan">
                    ${icon}
                </div>

                <div>
                    <strong>${name}</strong>
                    <p>${description}</p>
                    <small>Active</small>
                </div>

            </div>
        `;
    }


    function loadTeam() {

        setHeading(
            "Team",
            "Manage workspace members and roles."
        );

        app.innerHTML = `

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">

                        <div>
                            <h2>Team Members</h2>
                            <p>8 members</p>
                        </div>

                        <button class="primary-btn" id="inviteMember">
                            ＋ Invite Member
                        </button>

                    </div>

                    <div class="activity-list">

                        ${member("HR","Harsha Reddy","Administrator")}
                        ${member("JD","Jordan Davis","Product Manager")}
                        ${member("MK","Maria Kim","Designer")}
                        ${member("AR","Alex Rivera","Developer")}

                    </div>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Team Capacity</h2>
                            <p>Current workload</p>
                        </div>
                    </div>

                    <div class="big-number">82%</div>

                    <div class="bars">
                        <i style="height:62%"></i>
                        <i style="height:75%"></i>
                        <i style="height:68%"></i>
                        <i style="height:82%"></i>
                        <i style="height:90%"></i>
                    </div>

                </article>

            </section>
        `;

        document.getElementById("inviteMember").onclick =
            inviteMember;
    }


    function member(initials, name, role) {

        return `
            <div class="activity">

                <div class="activity-avatar green">
                    ${initials}
                </div>

                <div>
                    <strong>${name}</strong>
                    <p>${role}</p>
                    <small>Workspace member</small>
                </div>

            </div>
        `;
    }


    function inviteMember() {

        const box = modal(
            "Invite Team Member",
            `
                <form id="inviteForm">

                    <label>Name</label>
                    <input required placeholder="Member name">

                    <label>Email</label>
                    <input type="email" required placeholder="member@email.com">

                    <label>Role</label>
                    <select>
                        <option>Member</option>
                        <option>Manager</option>
                        <option>Administrator</option>
                    </select>

                    <button class="modal-submit">
                        Send Invitation
                    </button>

                </form>
            `
        );

        box.querySelector("form").onsubmit = e => {

            e.preventDefault();

            closeModal();

            showToast(
                "Invitation Sent",
                "Team member invitation sent."
            );
        };
    }


    function loadReports() {

        setHeading(
            "Reports",
            "Generate and download business reports."
        );

        app.innerHTML = `

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">

                        <div>
                            <h2>Available Reports</h2>
                            <p>Business intelligence reports</p>
                        </div>

                    </div>

                    <div class="activity-list">

                        ${report("Revenue Report","Revenue performance")}
                        ${report("Customer Report","Customer growth")}
                        ${report("Project Report","Project progress")}

                    </div>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Export</h2>
                            <p>Download your data</p>
                        </div>
                    </div>

                    <button class="primary-btn" id="downloadReport">
                        Download CSV
                    </button>

                </article>

            </section>
        `;

        document.getElementById("downloadReport").onclick =
            downloadReport;

        document.querySelectorAll(".report-download").forEach(btn => {
            btn.onclick = downloadReport;
        });
    }


    function report(name, description) {

        return `
            <div class="activity">

                <div class="activity-avatar blue">
                    ▤
                </div>

                <div style="flex:1">
                    <strong>${name}</strong>
                    <p>${description}</p>
                    <small>Available now</small>
                </div>

                <button class="select-btn report-download">
                    Export
                </button>

            </div>
        `;
    }


    function downloadReport() {

        const csv =
`Metric,Value,Change
Total Revenue,$128420,18.6%
Active Customers,8249,12.4%
Conversion Rate,24.8%,4.2%
Monthly Growth,32.6%,8.1%`;

        const blob =
            new Blob([csv], {
                type: "text/csv"
            });

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;
        a.download = "syncora-report.csv";

        a.click();

        URL.revokeObjectURL(url);

        showToast(
            "Report Downloaded",
            "CSV report generated successfully."
        );
    }


    function loadSettings() {

        setHeading(
            "Settings",
            "Manage workspace and account settings."
        );

        app.innerHTML = `

            <section class="content-grid">

                <article class="panel large">

                    <div class="panel-header">
                        <div>
                            <h2>Workspace Settings</h2>
                            <p>Update workspace information</p>
                        </div>
                    </div>

                    <form id="settingsForm">

                        <label>Workspace Name</label>
                        <input value="Acme Workspace">

                        <label>Email</label>
                        <input value="admin@example.com">

                        <label>Timezone</label>

                        <select>
                            <option>India Standard Time</option>
                            <option>UTC</option>
                            <option>Eastern Time</option>
                            <option>Pacific Time</option>
                        </select>

                        <br><br>

                        <button class="primary-btn">
                            Save Changes
                        </button>

                    </form>

                </article>

                <article class="panel">

                    <div class="panel-header">
                        <div>
                            <h2>Security</h2>
                            <p>Account protection</p>
                        </div>
                    </div>

                    <div class="activity-list">

                        <div class="activity">
                            <div class="activity-avatar green">✓</div>
                            <div>
                                <strong>Two-Factor Authentication</strong>
                                <p>Extra protection enabled</p>
                                <small>Enabled</small>
                            </div>
                        </div>

                        <div class="activity">
                            <div class="activity-avatar green">✓</div>
                            <div>
                                <strong>Password Protection</strong>
                                <p>Strong password enabled</p>
                                <small>Secure</small>
                            </div>
                        </div>

                    </div>

                </article>

            </section>
        `;

        document.getElementById("settingsForm").onsubmit = e => {

            e.preventDefault();

            showToast(
                "Settings Saved",
                "Workspace settings updated."
            );
        };
    }


    function bindDynamicButtons() {

        document.querySelectorAll(".quick-card").forEach(btn => {

            btn.onclick = () => {

                if (btn.dataset.action === "project")
                    createProject();

                if (btn.dataset.action === "member")
                    inviteMember();

                if (btn.dataset.action === "report")
                    downloadReport();
            };

        });

        document.getElementById("viewActivity")?.addEventListener(
            "click",
            () => {

                modal(
                    "Recent Activity",
                    `
                    <div class="activity-list">

                        ${customer("JD","Jordan Davis","Created Nova App")}
                        ${customer("MK","Maria Kim","Invited 3 members")}
                        ${customer("AR","Alex Rivera","Completed Website Redesign")}

                    </div>
                    `
                );
            }
        );
    }


    /* TOP BUTTONS */

    document.getElementById("addBtn").onclick = () => {

        modal(
            "Add New",
            `
            <div class="modal-list">

                <button id="mProject">
                    ＋ Create Project
                </button>

                <button id="mMember">
                    ♙ Invite Member
                </button>

                <button id="mReport">
                    ▤ Generate Report
                </button>

            </div>
            `
        );

        document.getElementById("mProject").onclick = () => {
            closeModal();
            createProject();
        };

        document.getElementById("mMember").onclick = () => {
            closeModal();
            inviteMember();
        };

        document.getElementById("mReport").onclick = () => {
            closeModal();
            downloadReport();
        };
    };


    document.getElementById("notificationBtn").onclick = () => {

        modal(
            "Notifications",
            `
            <div class="activity-list">

                ${customer("✓","Project Completed","Website Redesign completed")}
                ${customer("+","New Members","3 new members invited")}
                ${customer("↑","Revenue Increased","Revenue increased by 18.6%")}

            </div>
            `
        );
    };


    document.getElementById("dateBtn").onclick = () => {

        const box = modal(
            "Date Range",
            `
            <div class="modal-list">

                <button data-date="Today">Today</button>
                <button data-date="Last 7 days">Last 7 days</button>
                <button data-date="Last 30 days">Last 30 days</button>
                <button data-date="Last 90 days">Last 90 days</button>

            </div>
            `
        );

        box.querySelectorAll("[data-date]").forEach(btn => {

            btn.onclick = () => {

                document.getElementById("dateBtn").textContent =
                    btn.dataset.date + " ▾";

                closeModal();

                showToast(
                    "Date Updated",
                    `${btn.dataset.date} selected.`
                );
            };

        });
    };


    document.getElementById("workspaceBtn").onclick = () => {

        modal(
            "Switch Workspace",
            `
            <div class="modal-list">

                <button>
                    <strong>Acme Workspace</strong><br>
                    <small>Pro Plan</small>
                </button>

                <button>
                    <strong>Personal Workspace</strong><br>
                    <small>Free Plan</small>
                </button>

            </div>
            `
        );
    };


    document.getElementById("upgradeBtn").onclick = () => {

        modal(
            "Upgrade Plan",
            `
            <div class="activity-list">

                <div class="activity">
                    <div class="activity-avatar blue">P</div>
                    <div>
                        <strong>Professional</strong>
                        <p>Advanced analytics</p>
                        <small>$49 / month</small>
                    </div>
                </div>

                <div class="activity">
                    <div class="activity-avatar purple">B</div>
                    <div>
                        <strong>Business</strong>
                        <p>Advanced automation</p>
                        <small>$99 / month</small>
                    </div>
                </div>

                <button class="primary-btn" id="upgradeConfirm">
                    Continue
                </button>

            </div>
            `
        );

        document.getElementById("upgradeConfirm").onclick = () => {
            closeModal();
            showToast(
                "Upgrade",
                "Professional plan selected."
            );
        };
    };


    document.getElementById("profileBtn").onclick = () => {

        modal(
            "Profile",
            `
            <div class="activity">

                <div class="activity-avatar blue">
                    HR
                </div>

                <div>
                    <strong>Harsha Reddy</strong>
                    <p>Administrator</p>
                    <small>Acme Workspace</small>
                </div>

            </div>
            `
        );
    };


    /* MOBILE */

    const mobileButton =
        document.createElement("button");

    mobileButton.textContent = "☰";

    mobileButton.style.cssText = `
        position:fixed;
        left:12px;
        top:12px;
        z-index:100;
        border:0;
        background:#315cff;
        color:white;
        padding:10px 13px;
        border-radius:8px;
        font-size:18px;
    `;

    document.body.appendChild(mobileButton);

    mobileButton.onclick = () => {
        document.querySelector(".sidebar")
            .classList.toggle("open");
    };


    bindDynamicButtons();

});