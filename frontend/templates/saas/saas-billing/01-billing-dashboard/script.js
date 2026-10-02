const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");
const pageTitle = document.getElementById("pageTitle");

const titles = {
    dashboard: "Billing Dashboard",
    invoices: "Invoices",
    customers: "Customers",
    payments: "Payments",
    expenses: "Expenses",
    settings: "Billing Settings"
};

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const view = button.dataset.view;

        navButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        views.forEach(section => section.classList.remove("active"));

        document.getElementById(view).classList.add("active");

        pageTitle.textContent = titles[view];

        document.getElementById("sidebar").classList.remove("open");
    });

});

/* DATA */

let invoices = [
    {
        id: "INV-1001",
        customer: "Acme Corp",
        email: "billing@acme.com",
        amount: 2400,
        date: "Sep 28, 2026",
        status: "Paid"
    },
    {
        id: "INV-1002",
        customer: "Nova Labs",
        email: "hello@nova.com",
        amount: 1850,
        date: "Sep 27, 2026",
        status: "Pending"
    },
    {
        id: "INV-1003",
        customer: "Pixel Studio",
        email: "pay@pixel.com",
        amount: 3200,
        date: "Sep 25, 2026",
        status: "Overdue"
    },
    {
        id: "INV-1004",
        customer: "CloudWorks",
        email: "finance@cloudworks.com",
        amount: 4200,
        date: "Sep 23, 2026",
        status: "Paid"
    }
];

function statusHTML(status) {
    return `<span class="status ${status.toLowerCase()}">${status}</span>`;
}

function renderInvoices(data = invoices) {

    const dashboardTable = document.getElementById("invoiceTable");
    const fullTable = document.getElementById("invoiceFullTable");

    const rows = data.map(invoice => `
        <tr>
            <td><strong>${invoice.id}</strong></td>
            <td>${invoice.customer}</td>
            <td>${invoice.email}</td>
            <td>$${invoice.amount.toLocaleString()}</td>
            <td>${statusHTML(invoice.status)}</td>
            <td>
                <button class="action" onclick="viewInvoice('${invoice.id}')">
                    View
                </button>
            </td>
        </tr>
    `).join("");

    if (dashboardTable) {
        dashboardTable.innerHTML = data.slice(0, 4).map(invoice => `
            <tr>
                <td>${invoice.id}</td>
                <td>${invoice.customer}</td>
                <td>$${invoice.amount.toLocaleString()}</td>
                <td>${invoice.date}</td>
                <td>${statusHTML(invoice.status)}</td>
                <td>
                    <button class="action" onclick="viewInvoice('${invoice.id}')">View</button>
                </td>
            </tr>
        `).join("");
    }

    if (fullTable) {
        fullTable.innerHTML = rows;
    }
}

renderInvoices();

/* SEARCH */

const invoiceSearch = document.getElementById("invoiceSearch");
const statusFilter = document.getElementById("statusFilter");

function filterInvoices() {

    const query = invoiceSearch.value.toLowerCase();
    const status = statusFilter.value;

    const filtered = invoices.filter(invoice => {

        const matchesText =
            invoice.customer.toLowerCase().includes(query) ||
            invoice.id.toLowerCase().includes(query) ||
            invoice.email.toLowerCase().includes(query);

        const matchesStatus =
            status === "all" || invoice.status === status;

        return matchesText && matchesStatus;
    });

    renderInvoices(filtered);
}

invoiceSearch.addEventListener("input", filterInvoices);
statusFilter.addEventListener("change", filterInvoices);

document.getElementById("globalSearch").addEventListener("input", e => {

    const query = e.target.value.toLowerCase();

    if (query.length > 0) {

        const results = invoices.filter(invoice =>
            invoice.customer.toLowerCase().includes(query) ||
            invoice.id.toLowerCase().includes(query)
        );

        renderInvoices(results);
    } else {
        renderInvoices();
    }
});

/* MODAL */

const modal = document.getElementById("invoiceModal");

function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

document.getElementById("newInvoiceBtn").onclick = openModal;
document.getElementById("invoiceBtn").onclick = openModal;

document.getElementById("closeModal").onclick = closeModal;

modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
});

/* CREATE INVOICE */

document.getElementById("invoiceForm").addEventListener("submit", e => {

    e.preventDefault();

    const customer = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    const amount = Number(document.getElementById("invoiceAmount").value);

    const newInvoice = {
        id: `INV-${1000 + invoices.length + 1}`,
        customer,
        email,
        amount,
        date: new Date().toLocaleDateString(),
        status: "Pending"
    };

    invoices.unshift(newInvoice);

    renderInvoices();

    e.target.reset();
    closeModal();

    showToast("Invoice created successfully");
});

/* OTHER BUTTONS */

document.getElementById("customerBtn").onclick = () => {
    showToast("Customer creation form opened");
};

document.getElementById("expenseBtn").onclick = () => {
    showToast("Expense form opened");
};

document.getElementById("saveSettings").onclick = () => {
    showToast("Billing settings saved");
};

document.getElementById("logoutBtn").onclick = () => {
    showToast("Logout action triggered");
};

document.querySelector(".notification").onclick = () => {
    showToast("You have 3 new notifications");
};

function viewInvoice(id) {

    const invoice = invoices.find(item => item.id === id);

    if (!invoice) return;

    showToast(`${invoice.id} — $${invoice.amount.toLocaleString()}`);
}

/* CUSTOMERS */

const customers = [
    ["Acme Corporation", "billing@acme.com", "$12,400"],
    ["Nova Labs", "hello@nova.com", "$8,250"],
    ["Pixel Studio", "pay@pixel.com", "$6,840"],
    ["CloudWorks", "finance@cloudworks.com", "$18,200"],
    ["Bright Media", "admin@bright.com", "$4,900"],
    ["TechNova", "finance@technova.com", "$11,600"]
];

document.getElementById("customerGrid").innerHTML =
    customers.map(customer => `
        <div class="customer-card">
            <strong>${customer[0]}</strong>
            <span>${customer[1]}</span>
            <br>
            <strong>${customer[2]}</strong>
        </div>
    `).join("");

/* PAYMENTS */

const payments = [
    ["Acme Corp", "$2,400", "Successful"],
    ["CloudWorks", "$4,200", "Successful"],
    ["Nova Labs", "$1,850", "Pending"],
    ["Pixel Studio", "$3,200", "Failed"]
];

document.getElementById("paymentList").innerHTML =
    payments.map(payment => `
        <div class="payment-item">
            <strong>${payment[0]}</strong>
            <span>${payment[1]}</span>
            ${statusHTML(
                payment[2] === "Successful"
                    ? "Paid"
                    : payment[2] === "Pending"
                    ? "Pending"
                    : "Overdue"
            )}
        </div>
    `).join("");

/* CHART */

function drawRevenueChart() {

    const canvas = document.getElementById("revenueChart");
    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = 260;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    ctx.clearRect(0, 0, width, height);

    const values = [42, 55, 49, 70, 64, 84];

    const max = 100;
    const gap = width / (values.length - 1);

    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 4;
    ctx.beginPath();

    values.forEach((value, index) => {

        const x = index * gap;
        const y = height - (value / max) * 210 - 20;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    values.forEach((value, index) => {

        const x = index * gap;
        const y = height - (value / max) * 210 - 20;

        ctx.fillStyle = "#7c3aed";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

drawRevenueChart();
window.addEventListener("resize", drawRevenueChart);

document.getElementById("revenuePeriod").addEventListener("change", e => {
    showToast(`Showing ${e.target.value}`);
});

/* MOBILE */

document.getElementById("mobileMenu").onclick = () => {
    document.getElementById("sidebar").classList.toggle("open");
};

/* TOAST */

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}