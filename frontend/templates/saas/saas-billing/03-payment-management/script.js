const navs = document.querySelectorAll(".nav");
const views = document.querySelectorAll(".view");

const titles = {
    overview: "Payment Overview",
    transactions: "Transactions",
    methods: "Payment Methods",
    refunds: "Refund Management",
    failed: "Failed Payments",
    settings: "Payment Settings"
};

navs.forEach(nav => {

    nav.onclick = () => {

        const view = nav.dataset.view;

        navs.forEach(n => n.classList.remove("active"));
        nav.classList.add("active");

        views.forEach(v => v.classList.remove("active"));
        document.getElementById(view).classList.add("active");

        document.getElementById("title").textContent = titles[view];

        document.getElementById("sidebar").classList.remove("open");
    };

});

/* TRANSACTIONS */

let transactions = [
    {
        id: "TXN-92841",
        customer: "Acme Corp",
        email: "billing@acme.com",
        method: "Card",
        amount: 2400,
        status: "Successful"
    },
    {
        id: "TXN-92842",
        customer: "Nova Labs",
        email: "pay@nova.com",
        method: "Bank",
        amount: 1850,
        status: "Pending"
    },
    {
        id: "TXN-92843",
        customer: "Pixel Studio",
        email: "finance@pixel.com",
        method: "Wallet",
        amount: 3200,
        status: "Failed"
    },
    {
        id: "TXN-92844",
        customer: "CloudWorks",
        email: "billing@cloudworks.com",
        method: "Card",
        amount: 4200,
        status: "Successful"
    },
    {
        id: "TXN-92845",
        customer: "Bright Media",
        email: "pay@bright.com",
        method: "Card",
        amount: 920,
        status: "Successful"
    }
];

function badge(status) {
    return `<span class="status ${status.toLowerCase()}">${status}</span>`;
}

function renderTransactions(data = transactions) {

    const html = data.map((tx, index) => `
        <tr>
            <td><strong>${tx.id}</strong></td>
            <td>${tx.customer}</td>
            <td>${tx.email}</td>
            <td>${tx.method}</td>
            <td>$${tx.amount.toLocaleString()}</td>
            <td>${badge(tx.status)}</td>
            <td>
                <button class="action"
                    onclick="transactionAction(${index})">
                    View
                </button>
            </td>
        </tr>
    `).join("");

    document.getElementById("transactionTable").innerHTML =
        data.slice(0, 5).map((tx, index) => `
            <tr>
                <td>${tx.id}</td>
                <td>${tx.customer}</td>
                <td>${tx.method}</td>
                <td>$${tx.amount.toLocaleString()}</td>
                <td>${badge(tx.status)}</td>
                <td>
                    <button class="action"
                        onclick="transactionAction(${index})">
                        View
                    </button>
                </td>
            </tr>
        `).join("");

    document.getElementById("allTransactions").innerHTML = html;
}

renderTransactions();

function transactionAction(index) {

    const tx = transactions[index];

    showToast(`${tx.id}: $${tx.amount.toLocaleString()}`);
}

/* FILTER */

function filterTransactions() {

    const query =
        document.getElementById("transactionSearch").value.toLowerCase();

    const filter =
        document.getElementById("transactionFilter").value;

    const result = transactions.filter(tx => {

        const textMatch =
            tx.id.toLowerCase().includes(query) ||
            tx.customer.toLowerCase().includes(query) ||
            tx.email.toLowerCase().includes(query);

        const statusMatch =
            filter === "all" || tx.status === filter;

        return textMatch && statusMatch;
    });

    renderTransactions(result);
}

document.getElementById("transactionSearch")
    .addEventListener("input", filterTransactions);

document.getElementById("transactionFilter")
    .addEventListener("change", filterTransactions);

/* PAYMENT SIMULATION */

function simulatePayment() {

    const id = `TXN-${Math.floor(90000 + Math.random() * 9999)}`;

    const payment = {
        id,
        customer: "New Customer",
        email: "customer@example.com",
        method: "Card",
        amount: Math.floor(100 + Math.random() * 2000),
        status: "Successful"
    };

    transactions.unshift(payment);

    renderTransactions();

    showToast("Payment processed successfully");
}

/* PAYMENT METHODS */

function toggleMethod(button) {

    const card = button.closest(".method-card");

    card.classList.toggle("active");

    const active = card.classList.contains("active");

    const span = card.querySelector("span");

    span.textContent = active ? "Active" : "Disabled";

    button.textContent = active ? "Disable" : "Enable";

    showToast(active ? "Payment method enabled" : "Payment method disabled");
}

function addPaymentMethod() {
    showToast("Payment method setup opened");
}

/* REFUNDS */

const refunds = [
    ["REF-201", "Acme Corp", "$450", "Pending"],
    ["REF-202", "Nova Labs", "$180", "Pending"],
    ["REF-203", "Pixel Studio", "$320", "Approved"],
    ["REF-204", "Bright Media", "$95", "Pending"]
];

function renderRefunds() {

    document.getElementById("refundList").innerHTML =
        refunds.map((refund, index) => `
            <div class="refund">
                <div>
                    <strong>${refund[0]} — ${refund[1]}</strong>
                    <span>${refund[2]} · ${refund[3]}</span>
                </div>

                <button onclick="processRefund(${index})">
                    ${refund[3] === "Pending" ? "Approve" : "Processed"}
                </button>
            </div>
        `).join("");
}

renderRefunds();

function processRefund(index) {

    refunds[index][3] = "Approved";

    renderRefunds();

    showToast("Refund approved");
}

/* FAILED PAYMENTS */

const failedPayments = [
    ["TXN-92843", "Pixel Studio", "$3,200", "Insufficient funds"],
    ["TXN-92780", "Nova Labs", "$850", "Card expired"],
    ["TXN-92712", "Bright Media", "$420", "Bank declined"],
    ["TXN-92694", "CloudWorks", "$1,240", "Authentication failed"]
];

document.getElementById("failedGrid").innerHTML =
    failedPayments.map(payment => `
        <div class="failed-card">
            <div>
                <strong>${payment[0]} — ${payment[1]}</strong>
                <span>${payment[2]} · ${payment[3]}</span>
            </div>

            <button onclick="retryPayment('${payment[0]}')">
                Retry
            </button>
        </div>
    `).join("");

function retryPayment(id) {
    showToast(`${id} retry initiated`);
}

/* CSV EXPORT */

function exportTransactions() {

    let csv = "ID,Customer,Email,Method,Amount,Status\n";

    transactions.forEach(tx => {

        csv += [
            tx.id,
            tx.customer,
            tx.email,
            tx.method,
            tx.amount,
            tx.status
        ].join(",") + "\n";
    });

    const blob = new Blob([csv], {type: "text/csv"});

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "transactions.csv";

    link.click();

    URL.revokeObjectURL(url);

    showToast("CSV exported");
}

/* SETTINGS */

function saveSettings() {
    showToast("Payment settings saved");
}

/* CHART */

function drawPaymentChart() {

    const canvas = document.getElementById("paymentChart");

    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = 250;

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    const values = [40, 65, 52, 82, 75, 92, 86];

    ctx.beginPath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ec4899";

    values.forEach((value, index) => {

        const x = index * (width / 6);
        const y = height - value * 2.2;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    values.forEach((value, index) => {

        const x = index * (width / 6);
        const y = height - value * 2.2;

        ctx.fillStyle = "#06b6d4";

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

drawPaymentChart();

window.addEventListener("resize", drawPaymentChart);

document.getElementById("volumeRange").onchange = e => {
    showToast(`Showing payment volume for ${e.target.value}`);
};

/* MOBILE */

document.getElementById("menu").onclick = () => {
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