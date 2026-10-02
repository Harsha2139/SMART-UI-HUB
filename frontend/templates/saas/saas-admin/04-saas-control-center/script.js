/* =====================================================
   SAAS CONTROL CENTER JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const controlViews =
    document.querySelectorAll(
        ".control-view"
    );

const controlNavs =
    document.querySelectorAll(
        ".control-nav"
    );

const controlNavigation =
    document.getElementById(
        "controlNavigation"
    );

const controlToast =
    document.getElementById(
        "controlToast"
    );

const controlToastTitle =
    document.getElementById(
        "controlToastTitle"
    );

const controlToastMessage =
    document.getElementById(
        "controlToastMessage"
    );


/* =====================================================
   VIEW SWITCH
===================================================== */

function showControlView(name) {

    controlViews.forEach(view => {

        view.classList.remove(
            "active"
        );

    });


    const selected =
        document.getElementById(name);


    if (!selected) return;


    selected.classList.add(
        "active"
    );


    controlNavs.forEach(nav => {

        nav.classList.toggle(
            "active",
            nav.dataset.view === name
        );

    });


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    if (name === "services") {

        renderServices();

    }


    if (name === "subscriptions") {

        renderSubscriptions();

    }


    if (name === "controlUsers") {

        renderControlUsers();

    }


    if (name === "controlActivity") {

        renderActivity();

    }

}


controlNavs.forEach(nav => {

    nav.addEventListener(
        "click",
        () => {

            showControlView(
                nav.dataset.view
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

                showControlView(
                    button.dataset.viewTarget
                );

            }
        );

    });


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showControlToast(
    title,
    message
) {

    controlToastTitle.textContent =
        title;

    controlToastMessage.textContent =
        message;

    controlToast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                controlToast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =====================================================
   MOBILE
===================================================== */

document
    .getElementById(
        "controlMobileMenu"
    )
    .addEventListener(
        "click",
        () => {

            controlNavigation.scrollIntoView({
                behavior: "smooth"
            });

        }
    );


/* =====================================================
   THEME
===================================================== */

document
    .getElementById(
        "controlTheme"
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
                "controlTheme",
                dark
                    ? "dark"
                    : "light"
            );


            document.getElementById(
                "controlTheme"
            ).textContent =
                dark
                    ? "☀"
                    : "☾";

        }
    );


if (
    localStorage.getItem(
        "controlTheme"
    ) === "dark"
) {

    document.body.classList.add(
        "dark"
    );

    document.getElementById(
        "controlTheme"
    ).textContent = "☀";

}


/* =====================================================
   SERVICES DATA
===================================================== */

let services = [

    {
        id: 1,
        name: "API Gateway",
        description:
            "Handles incoming API requests.",
        status: "running",
        uptime: "99.99%"
    },

    {
        id: 2,
        name: "Authentication",
        description:
            "Manages authentication and sessions.",
        status: "running",
        uptime: "99.98%"
    },

    {
        id: 3,
        name: "Database",
        description:
            "Primary application database.",
        status: "running",
        uptime: "99.99%"
    },

    {
        id: 4,
        name: "Worker Queue",
        description:
            "Processes background jobs.",
        status: "running",
        uptime: "99.95%"
    },

    {
        id: 5,
        name: "Notifications",
        description:
            "Email and push notification system.",
        status: "running",
        uptime: "99.97%"
    },

    {
        id: 6,
        name: "File Storage",
        description:
            "Stores application files.",
        status: "running",
        uptime: "99.96%"
    }

];


const serviceGrid =
    document.getElementById(
        "serviceGrid"
    );


function renderServices() {

    serviceGrid.innerHTML = "";


    services.forEach(service => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "service-card";


        const running =
            service.status === "running";


        card.innerHTML = `

            <div class="service-card-head">

                <div class="service-card-name">

                    <div class="service-card-icon">
                        ◈
                    </div>

                    <div>

                        <h3>
                            ${escapeHTML(service.name)}
                        </h3>

                        <small>
                            ${service.uptime} uptime
                        </small>

                    </div>

                </div>

                <i
                    class="service-status"
                    style="
                    background:
                    ${
                        running
                            ? "var(--emerald)"
                            : "var(--red)"
                    };
                    ">
                </i>

            </div>


            <p>
                ${escapeHTML(service.description)}
            </p>


            <div class="service-actions">

                <button
                    onclick="
                    serviceAction(
                        ${service.id},
                        'restart'
                    )">
                    Restart
                </button>

                <button
                    class="
                    ${running ? "danger" : ""}
                    "
                    onclick="
                    serviceAction(
                        ${service.id},
                        'toggle'
                    )">

                    ${
                        running
                            ? "Stop"
                            : "Start"
                    }

                </button>

            </div>

        `;


        serviceGrid.appendChild(
            card
        );

    });

}


/* =====================================================
   SERVICE ACTION
===================================================== */

function serviceAction(
    id,
    action
) {

    const service =
        services.find(
            item => item.id === id
        );


    if (!service) return;


    if (action === "restart") {

        showControlToast(
            "Service Restart",
            `${service.name} restart initiated.`
        );

        return;

    }


    if (action === "toggle") {

        service.status =
            service.status === "running"
                ? "stopped"
                : "running";


        renderServices();


        showControlToast(
            "Service Updated",
            `${service.name} is now ${service.status}.`
        );

    }

}


/* =====================================================
   RESTART ALL
===================================================== */

document
    .getElementById(
        "restartAll"
    )
    .addEventListener(
        "click",
        () => {

            showControlToast(
                "Restart Initiated",
                "All services restart sequence started."
            );

        }
    );


/* =====================================================
   SUBSCRIPTIONS
===================================================== */

let subscriptions = [

    {
        name: "Acme Corporation",
        plan: "Enterprise",
        mrr: 8420,
        renewal: "Oct 15",
        status: "Active"
    },

    {
        name: "Wilson Labs",
        plan: "Business",
        mrr: 4820,
        renewal: "Oct 12",
        status: "Active"
    },

    {
        name: "Kumar Tech",
        plan: "Pro",
        mrr: 1280,
        renewal: "Oct 08",
        status: "Active"
    },

    {
        name: "Roy Digital",
        plan: "Pro",
        mrr: 920,
        renewal: "Oct 20",
        status: "Active"
    }

];


const subscriptionTable =
    document.getElementById(
        "subscriptionTable"
    );


function renderSubscriptions() {

    subscriptionTable.innerHTML = "";


    subscriptions.forEach(
        subscription => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    ${escapeHTML(
                        subscription.name
                    )}
                </td>

                <td>

                    <span class="plan-tag">

                        ${escapeHTML(
                            subscription.plan
                        )}

                    </span>

                </td>

                <td>
                    $${subscription.mrr.toLocaleString()}
                </td>

                <td>
                    ${subscription.renewal}
                </td>

                <td style="color:var(--emerald-dark)">
                    ${subscription.status}
                </td>

                <td>

                    <button
                        class="table-action"
                        onclick="
                        subscriptionDetails(
                            '${escapeJS(subscription.name)}'
                        )">

                        View

                    </button>

                </td>

            `;


            subscriptionTable.appendChild(
                row
            );

        }
    );

}


/* =====================================================
   NEW SUBSCRIPTION
===================================================== */

document
    .getElementById(
        "newSubscription"
    )
    .addEventListener(
        "click",
        () => {

            const customer =
                prompt(
                    "Customer name:"
                );


            if (!customer) return;


            const plan =
                prompt(
                    "Plan:",
                    "Pro"
                );


            if (!plan) return;


            subscriptions.push({

                name: customer,

                plan: plan,

                mrr: 0,

                renewal: "New",

                status: "Active"

            });


            renderSubscriptions();


            showControlToast(
                "Subscription Created",
                `${customer} was subscribed.`
            );

        }
    );


function subscriptionDetails(
    customer
) {

    showControlToast(
        "Subscription",
        `${customer} subscription details opened.`
    );

}


/* =====================================================
   USAGE PERIOD
===================================================== */

document
    .getElementById(
        "usagePeriod"
    )
    .addEventListener(
        "change",
        event => {

            showControlToast(
                "Usage Period",
                event.target.value
            );

        }
    );


/* =====================================================
   INCIDENT
===================================================== */

document
    .getElementById(
        "createIncident"
    )
    .addEventListener(
        "click",
        () => {

            const title =
                prompt(
                    "Incident title:"
                );


            if (!title) return;


            const description =
                prompt(
                    "Description:"
                );


            const list =
                document.getElementById(
                    "incidentList"
                );


            const article =
                document.createElement(
                    "article"
                );


            article.innerHTML = `

                <div class="incident-status"
                     style="
                     background:#fff0f3;
                     color:var(--red);
                     ">
                    !
                </div>

                <div>

                    <strong>
                        ${escapeHTML(title)}
                    </strong>

                    <p>
                        ${escapeHTML(
                            description ||
                            "New reported incident."
                        )}
                    </p>

                    <small>
                        Reported just now
                    </small>

                </div>

                <span
                    style="
                    background:#fff0f3;
                    color:var(--red);
                    ">
                    Investigating
                </span>

            `;


            list.prepend(
                article
            );


            showControlToast(
                "Incident Created",
                `${title} has been reported.`
            );

        }
    );


/* =====================================================
   USERS
===================================================== */

let controlUsers = [

    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        active: "2 minutes ago"
    },

    {
        id: 2,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        role: "Developer",
        active: "18 minutes ago"
    },

    {
        id: 3,
        name: "Mike Kumar",
        email: "mike@example.com",
        role: "Viewer",
        active: "1 hour ago"
    },

    {
        id: 4,
        name: "Alex Roy",
        email: "alex@example.com",
        role: "Developer",
        active: "3 hours ago"
    }

];


const controlUserTable =
    document.getElementById(
        "controlUserTable"
    );

const controlUserSearch =
    document.getElementById(
        "controlUserSearch"
    );

const controlUserRole =
    document.getElementById(
        "controlUserRole"
    );


function renderControlUsers() {

    const query =
        controlUserSearch.value
            .toLowerCase()
            .trim();


    const role =
        controlUserRole.value;


    const filtered =
        controlUsers.filter(
            user => {

                const textMatch =
                    user.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    user.email
                        .toLowerCase()
                        .includes(query);


                const roleMatch =
                    role === "all"
                    ||
                    user.role === role;


                return (
                    textMatch &&
                    roleMatch
                );

            }
        );


    controlUserTable.innerHTML =
        "";


    filtered.forEach(
        user => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <div
                        style="
                        display:flex;
                        align-items:center;
                        gap:8px;
                        ">

                        <div
                            style="
                            width:28px;
                            height:28px;
                            border-radius:7px;
                            background:
                            linear-gradient(
                            135deg,
                            var(--emerald),
                            var(--cyan)
                            );
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            color:white;
                            font-size:7px;
                            font-weight:900;
                            ">

                            ${user.name
                                .split(" ")
                                .map(
                                    x => x[0]
                                )
                                .join("")
                                .slice(0,2)}

                        </div>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    user.name
                                )}
                            </strong>

                            <small
                                style="
                                display:block;
                                color:var(--muted);
                                margin-top:2px;
                                ">

                                ${escapeHTML(
                                    user.email
                                )}

                            </small>

                        </div>

                    </div>

                </td>

                <td>
                    ${escapeHTML(user.role)}
                </td>

                <td>
                    ${escapeHTML(user.active)}
                </td>

                <td style="color:var(--emerald-dark)">
                    Active
                </td>

                <td>

                    <button
                        class="table-action"
                        onclick="
                        controlUserDetails(
                        ${user.id}
                        )">

                        View

                    </button>

                </td>

            `;


            controlUserTable.appendChild(
                row
            );

        });


    if (!filtered.length) {

        controlUserTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="
                    text-align:center;
                    padding:30px;
                    color:var(--muted);
                    ">

                    No users found.

                </td>

            </tr>

        `;

    }

}


controlUserSearch.addEventListener(
    "input",
    renderControlUsers
);


controlUserRole.addEventListener(
    "change",
    renderControlUsers
);


/* =====================================================
   ADD USER
===================================================== */

document
    .getElementById(
        "addControlUser"
    )
    .addEventListener(
        "click",
        () => {

            const name =
                prompt(
                    "User name:"
                );


            if (!name) return;


            const email =
                prompt(
                    "Email:"
                );


            if (!email) return;


            const role =
                prompt(
                    "Role:",
                    "Viewer"
                );


            controlUsers.push({

                id: Date.now(),

                name,

                email,

                role:
                    role || "Viewer",

                active:
                    "Just now"

            });


            renderControlUsers();


            showControlToast(
                "User Added",
                `${name} was added.`
            );

        }
    );


function controlUserDetails(id) {

    const user =
        controlUsers.find(
            item => item.id === id
        );


    if (!user) return;


    showControlToast(
        "User",
        `${user.name} — ${user.role}`
    );

}


/* =====================================================
   BILLING EXPORT
===================================================== */

document
    .getElementById(
        "downloadControlBilling"
    )
    .addEventListener(
        "click",
        () => {

            const csv =
`Invoice,Customer,Amount,Date,Status
INV-8291,Acme Corp,4820,2026-10-01,Paid
INV-8290,Wilson Labs,2420,2026-09-30,Paid
INV-8289,Kumar Tech,1280,2026-09-29,Pending`;


            downloadFile(
                "saas-billing.csv",
                csv,
                "text/csv"
            );


            showControlToast(
                "Export Complete",
                "Billing statement downloaded."
            );

        }
    );


/* =====================================================
   ACTIVITY
===================================================== */

let activityData = [

    {
        color: "green",
        title: "Deployment successful",
        detail: "api-gateway v4.8.2",
        time: "2 minutes ago"
    },

    {
        color: "cyan",
        title: "Enterprise subscription created",
        detail: "Acme Corporation",
        time: "8 minutes ago"
    },

    {
        color: "pink",
        title: "API key created",
        detail: "Production application",
        time: "15 minutes ago"
    },

    {
        color: "orange",
        title: "User permissions changed",
        detail: "John Doe",
        time: "28 minutes ago"
    },

    {
        color: "green",
        title: "Database backup completed",
        detail: "Primary production database",
        time: "42 minutes ago"
    }

];


const largeActivityFeed =
    document.getElementById(
        "largeActivityFeed"
    );


function renderActivity() {

    largeActivityFeed.innerHTML = "";


    activityData.forEach(
        item => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "activity-item";


            element.innerHTML = `

                <i
                    style="
                    background:
                    var(--${
                        item.color === "green"
                            ? "emerald"
                            : item.color
                    });
                    ">
                </i>

                <div>

                    <strong>
                        ${escapeHTML(
                            item.title
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            item.detail
                        )}
                    </span>

                </div>

                <time>
                    ${escapeHTML(
                        item.time
                    )}
                </time>

            `;


            largeActivityFeed.appendChild(
                element
            );

        }
    );

}


/* =====================================================
   CLEAR ACTIVITY
===================================================== */

document
    .getElementById(
        "clearControlActivity"
    )
    .addEventListener(
        "click",
        () => {

            activityData = [

                {
                    color: "green",
                    title: "Activity feed cleared",
                    detail:
                        "New events will appear here.",
                    time: "Just now"
                }

            ];


            renderActivity();


            showControlToast(
                "Feed Cleared",
                "Older activity was removed."
            );

        }
    );


/* =====================================================
   SEARCH
===================================================== */

document
    .getElementById(
        "controlSearch"
    )
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) return;


            const query =
                event.target.value
                    .toLowerCase()
                    .trim();


            if (!query) return;


            const service =
                services.find(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(query)
                );


            const subscription =
                subscriptions.find(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(query)
                );


            const user =
                controlUsers.find(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(query)
                );


            if (service) {

                showControlView(
                    "services"
                );


                showControlToast(
                    "Search Result",
                    service.name
                );

                return;

            }


            if (subscription) {

                showControlView(
                    "subscriptions"
                );


                showControlToast(
                    "Search Result",
                    subscription.name
                );

                return;

            }


            if (user) {

                showControlView(
                    "controlUsers"
                );


                showControlToast(
                    "Search Result",
                    user.name
                );

                return;

            }


            showControlToast(
                "No Results",
                `Nothing found for "${query}".`
            );

        }
    );


/* =====================================================
   NOTIFICATIONS
===================================================== */

document
    .getElementById(
        "controlNotification"
    )
    .addEventListener(
        "click",
        () => {

            showControlToast(
                "Notifications",
                "4 new system notifications."
            );

        }
    );


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


function escapeJS(value) {

    return String(value)
        .replaceAll("\\","\\\\")
        .replaceAll("'","\\'");

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
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download = filename;

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
        url
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

renderServices();

renderSubscriptions();

renderControlUsers();

renderActivity();

showControlView(
    "controlOverview"
);