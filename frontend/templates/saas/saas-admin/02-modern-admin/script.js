/* =====================================================
   MODERN ADMIN JAVASCRIPT
===================================================== */

const modernViews =
    document.querySelectorAll(".modern-view");

const topLinks =
    document.querySelectorAll(".top-link");

const mobileLinks =
    document.querySelectorAll(".mobile-navigation button");

const mobileNavigation =
    document.getElementById("mobileNavigation");

const toast =
    document.getElementById("modernToast");

const toastTitle =
    document.getElementById("toastModernTitle");

const toastMessage =
    document.getElementById("toastModernMessage");


/* =====================================================
   VIEW SWITCH
===================================================== */

function showModernView(name) {

    modernViews.forEach(view => {
        view.classList.remove("active");
    });

    const selected =
        document.getElementById(name);

    if (!selected) return;

    selected.classList.add("active");


    topLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.dataset.view === name
        );

    });


    mobileNavigation.classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (name === "customers") {
        renderCustomers();
    }
}


topLinks.forEach(link => {

    link.addEventListener("click", () => {

        showModernView(
            link.dataset.view
        );

    });

});


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        showModernView(
            link.dataset.view
        );

    });

});


document
    .querySelectorAll("[data-view-target]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showModernView(
                button.dataset.viewTarget
            );

        });

    });


/* =====================================================
   MOBILE MENU
===================================================== */

document
    .getElementById("mobileMenu")
    .addEventListener("click", () => {

        mobileNavigation.classList.toggle(
            "show"
        );

    });


/* =====================================================
   TOAST
===================================================== */

let toastTimer;

function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* =====================================================
   THEME
===================================================== */

document
    .getElementById("themeToggle")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "modernTheme",
            dark ? "dark" : "light"
        );

        document.getElementById(
            "themeToggle"
        ).textContent =
            dark ? "☀" : "☾";

    });


if (
    localStorage.getItem("modernTheme")
    ===
    "dark"
) {

    document.body.classList.add("dark");

    document.getElementById(
        "themeToggle"
    ).textContent = "☀";

}


/* =====================================================
   CUSTOMERS DATA
===================================================== */

let customers = [

    {
        id: 1,
        name: "Sarah Wilson",
        company: "Wilson Labs",
        plan: "Enterprise",
        revenue: 18420
    },

    {
        id: 2,
        name: "Mike Kumar",
        company: "Kumar Tech",
        plan: "Business",
        revenue: 12840
    },

    {
        id: 3,
        name: "Alex Roy",
        company: "Roy Digital",
        plan: "Pro",
        revenue: 9280
    },

    {
        id: 4,
        name: "Priya Sharma",
        company: "Sharma Studio",
        plan: "Business",
        revenue: 7920
    },

    {
        id: 5,
        name: "David Smith",
        company: "Smith Systems",
        plan: "Free",
        revenue: 3200
    }

];


const customerTable =
    document.getElementById(
        "customerTable"
    );

const customerSearch =
    document.getElementById(
        "customerSearch"
    );

const customerPlan =
    document.getElementById(
        "customerPlan"
    );


function renderCustomers() {

    const query =
        customerSearch.value
            .toLowerCase()
            .trim();

    const plan =
        customerPlan.value;


    const filtered =
        customers.filter(customer => {

            const matchesText =
                customer.name
                    .toLowerCase()
                    .includes(query)

                ||

                customer.company
                    .toLowerCase()
                    .includes(query);


            const matchesPlan =
                plan === "all"
                ||
                customer.plan === plan;


            return matchesText && matchesPlan;

        });


    customerTable.innerHTML = "";


    if (!filtered.length) {

        customerTable.innerHTML = `

            <tr>
                <td colspan="6"
                    style="
                    text-align:center;
                    padding:30px;
                    color:#8c879d;
                    ">
                    No customers found.
                </td>
            </tr>

        `;

        return;
    }


    filtered.forEach(customer => {

        const initials =
            customer.name
                .split(" ")
                .map(word => word[0])
                .join("")
                .slice(0,2)
                .toUpperCase();


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="table-user">

                    <div class="table-avatar">
                        ${initials}
                    </div>

                    ${escapeHTML(customer.name)}

                </div>

            </td>

            <td>
                ${escapeHTML(customer.company)}
            </td>

            <td>
                <span class="plan-badge">
                    ${escapeHTML(customer.plan)}
                </span>
            </td>

            <td>
                $${customer.revenue.toLocaleString()}
            </td>

            <td>
                <span class="customer-active">
                    Active
                </span>
            </td>

            <td>

                <button
                    class="action-button"
                    onclick="customerDetails(${customer.id})">
                    View
                </button>

                <button
                    class="action-button"
                    onclick="removeCustomer(${customer.id})">
                    Delete
                </button>

            </td>

        `;

        customerTable.appendChild(row);

    });

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");

}


customerSearch.addEventListener(
    "input",
    renderCustomers
);

customerPlan.addEventListener(
    "change",
    renderCustomers
);


/* =====================================================
   CUSTOMER DETAILS
===================================================== */

function customerDetails(id) {

    const customer =
        customers.find(
            item => item.id === id
        );

    if (!customer) return;

    showToast(
        "Customer",
        `${customer.name} — $${customer.revenue.toLocaleString()} revenue`
    );

}


/* =====================================================
   REMOVE CUSTOMER
===================================================== */

function removeCustomer(id) {

    const customer =
        customers.find(
            item => item.id === id
        );

    if (!customer) return;


    if (
        !confirm(
            `Remove ${customer.name}?`
        )
    ) {
        return;
    }


    customers =
        customers.filter(
            item => item.id !== id
        );


    renderCustomers();


    showToast(
        "Customer Removed",
        `${customer.name} was removed.`
    );

}


/* =====================================================
   ADD CUSTOMER
===================================================== */

document
    .getElementById("addCustomer")
    .addEventListener("click", () => {

        const name =
            prompt("Customer name:");

        if (!name) return;

        const company =
            prompt("Company:");

        if (!company) return;

        const plan =
            prompt(
                "Plan: Enterprise, Business, Pro or Free",
                "Pro"
            );

        if (!plan) return;


        customers.push({

            id: Date.now(),

            name,

            company,

            plan,

            revenue: 0

        });


        renderCustomers();


        showToast(
            "Customer Added",
            `${name} was added.`
        );

    });


/* =====================================================
   INVOICE MODAL
===================================================== */

const invoiceModal =
    document.getElementById(
        "invoiceModal"
    );


function openInvoiceModal() {

    invoiceModal.classList.add("show");

}


function closeInvoiceModal() {

    invoiceModal.classList.remove("show");

}


document
    .getElementById("createInvoice")
    .addEventListener(
        "click",
        openInvoiceModal
    );


document
    .getElementById("newInvoiceButton")
    .addEventListener(
        "click",
        openInvoiceModal
    );


document
    .getElementById("closeInvoice")
    .addEventListener(
        "click",
        closeInvoiceModal
    );


invoiceModal.addEventListener(
    "click",
    event => {

        if (
            event.target === invoiceModal
        ) {

            closeInvoiceModal();

        }

    }
);


/* =====================================================
   INVOICE FORM
===================================================== */

document
    .getElementById("invoiceForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const customer =
                document
                    .getElementById(
                        "invoiceCustomer"
                    )
                    .value
                    .trim();


            const amount =
                document
                    .getElementById(
                        "invoiceAmount"
                    )
                    .value;


            if (!customer || !amount) {

                showToast(
                    "Missing Information",
                    "Enter customer and amount."
                );

                return;

            }


            closeInvoiceModal();


            event.target.reset();


            showToast(
                "Invoice Created",
                `$${amount} invoice created for ${customer}.`
            );

        }
    );


/* =====================================================
   INVOICE VIEW BUTTONS
===================================================== */

document
    .querySelectorAll(".view-invoice")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showToast(
                    "Invoice",
                    "Invoice details opened."
                );

            }
        );

    });


/* =====================================================
   SEARCH
===================================================== */

const searchOverlay =
    document.getElementById(
        "searchOverlay"
    );


document
    .getElementById("searchOpen")
    .addEventListener("click", () => {

        searchOverlay.classList.add("show");

        document
            .getElementById(
                "workspaceSearch"
            )
            .focus();

    });


document
    .getElementById("closeSearch")
    .addEventListener("click", () => {

        searchOverlay.classList.remove("show");

    });


searchOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target === searchOverlay
        ) {

            searchOverlay.classList.remove(
                "show"
            );

        }

    }
);


document
    .getElementById("workspaceSearch")
    .addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .toLowerCase()
                    .trim();


            const results =
                document.getElementById(
                    "searchResults"
                );


            if (!query) {

                results.innerHTML = "";

                return;

            }


            const matches =
                customers.filter(customer =>

                    customer.name
                        .toLowerCase()
                        .includes(query)

                    ||

                    customer.company
                        .toLowerCase()
                        .includes(query)

                    ||

                    customer.plan
                        .toLowerCase()
                        .includes(query)

                );


            if (!matches.length) {

                results.innerHTML = `

                    <div class="search-result">
                        No results found.
                    </div>

                `;

                return;

            }


            results.innerHTML =
                matches.map(customer => `

                    <div class="search-result">

                        <strong>
                            ${escapeHTML(customer.name)}
                        </strong>

                        —
                        ${escapeHTML(customer.company)}

                        <small>
                            ${escapeHTML(customer.plan)}
                        </small>

                    </div>

                `).join("");

        }
    );


/* =====================================================
   ANALYTICS EXPORT
===================================================== */

document
    .getElementById("exportAnalytics")
    .addEventListener("click", () => {

        const csv =
`Metric,Value,Change
MRR,84290,+18.4%
ARR,1010000,+22.7%
ARPU,48.22,+5.4%
LTV,2842,+11.9%`;


        downloadFile(
            "modern-analytics.csv",
            csv,
            "text/csv"
        );


        showToast(
            "Export Complete",
            "Analytics CSV downloaded."
        );

    });


/* =====================================================
   CHART SELECT
===================================================== */

document
    .getElementById("chartSelect")
    .addEventListener(
        "change",
        event => {

            showToast(
                "Chart Updated",
                `Showing ${event.target.value}.`
            );

        }
    );


/* =====================================================
   ANALYTICS PERIOD
===================================================== */

document
    .getElementById("analyticsPeriod")
    .addEventListener(
        "change",
        event => {

            showToast(
                "Period Changed",
                event.target.value
            );

        }
    );


/* =====================================================
   CLEAR ACTIVITY
===================================================== */

document
    .getElementById("clearActivity")
    .addEventListener(
        "click",
        () => {

            const feed =
                document.getElementById(
                    "activityFeed"
                );


            feed.innerHTML = `

                <article>

                    <div class="feed-icon green">
                        ✓
                    </div>

                    <div>

                        <strong>
                            Activity cleared
                        </strong>

                        <p>
                            There are no older activity events.
                        </p>

                        <small>
                            Just now
                        </small>

                    </div>

                </article>

            `;


            showToast(
                "Activity Cleared",
                "Older events were removed."
            );

        }
    );


/* =====================================================
   SETTINGS
===================================================== */

document
    .getElementById("saveModernSettings")
    .addEventListener(
        "click",
        () => {

            const name =
                document
                    .getElementById(
                        "workspaceName"
                    )
                    .value
                    .trim();


            localStorage.setItem(
                "modernWorkspace",
                name
            );


            showToast(
                "Settings Saved",
                "Workspace settings updated."
            );

        }
    );


const savedWorkspace =
    localStorage.getItem(
        "modernWorkspace"
    );


if (savedWorkspace) {

    document
        .getElementById(
            "workspaceName"
        )
        .value = savedWorkspace;

}


/* =====================================================
   NOTIFICATION
===================================================== */

document
    .getElementById("notificationButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Notifications",
                "3 new notifications."
            );

        }
    );


/* =====================================================
   DOWNLOAD HELPER
===================================================== */

function downloadFile(
    filename,
    content,
    type
) {

    const blob =
        new Blob(
            [content],
            {type: type}
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

showModernView("overview");
renderCustomers();