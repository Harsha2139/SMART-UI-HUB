const navs = document.querySelectorAll(".nav");
const views = document.querySelectorAll(".view");

const titles = {
    dashboard: "Revenue Overview",
    mrr: "MRR Analytics",
    arr: "ARR Analytics",
    customers: "Revenue Customers",
    reports: "Revenue Reports",
    settings: "Revenue Settings"
};

navs.forEach(nav => {

    nav.onclick = () => {

        const view = nav.dataset.view;

        navs.forEach(item =>
            item.classList.remove("active")
        );

        nav.classList.add("active");

        views.forEach(item =>
            item.classList.remove("active")
        );

        document.getElementById(view)
            .classList.add("active");

        document.getElementById("pageTitle")
            .textContent = titles[view];

        document.getElementById("sidebar")
            .classList.remove("open");

        if (view === "mrr") {
            setTimeout(drawMRRChart, 50);
        }

        if (view === "arr") {
            setTimeout(drawARRChart, 50);
        }

    };

});

/* CUSTOMER DATA */

const customers = [
    {
        name: "Acme Corporation",
        plan: "Enterprise",
        mrr: 12400,
        growth: "24%"
    },
    {
        name: "CloudWorks",
        plan: "Enterprise",
        mrr: 9800,
        growth: "18%"
    },
    {
        name: "Nova Labs",
        plan: "Business",
        mrr: 7200,
        growth: "31%"
    },
    {
        name: "Pixel Studio",
        plan: "Business",
        mrr: 5400,
        growth: "14%"
    },
    {
        name: "Bright Media",
        plan: "Pro",
        mrr: 3200,
        growth: "22%"
    },
    {
        name: "TechNova",
        plan: "Pro",
        mrr: 2900,
        growth: "19%"
    }
];

function renderCustomers(data = customers) {

    const html = data.map((customer, index) => {

        const arr = customer.mrr * 12;

        return `
            <tr>

                <td>
                    <strong>${customer.name}</strong>
                </td>

                <td>${customer.plan}</td>

                <td>
                    $${customer.mrr.toLocaleString()}
                </td>

                <td>
                    $${arr.toLocaleString()}
                </td>

                <td class="growth">
                    ↑ ${customer.growth}
                </td>

                <td>
                    <button class="action"
                            onclick="viewCustomer(${index})">
                        View
                    </button>
                </td>

            </tr>
        `;

    }).join("");

    document.getElementById("customerTable")
        .innerHTML = html;

    document.getElementById("customerFullTable")
        .innerHTML = data.map(customer => {

            const arr = customer.mrr * 12;

            return `
                <tr>

                    <td>
                        <strong>${customer.name}</strong>
                    </td>

                    <td>${customer.plan}</td>

                    <td>
                        $${customer.mrr.toLocaleString()}
                    </td>

                    <td>
                        $${arr.toLocaleString()}
                    </td>

                    <td class="growth">
                        ↑ ${customer.growth}
                    </td>

                    <td>
                        <span class="growth">
                            Active
                        </span>
                    </td>

                </tr>
            `;

        }).join("");
}

renderCustomers();

/* CUSTOMER SEARCH */

function filterCustomers() {

    const search =
        document.getElementById("customerSearch")
            .value
            .toLowerCase();

    const plan =
        document.getElementById("customerPlan").value;

    const result = customers.filter(customer => {

        const matchesSearch =
            customer.name
                .toLowerCase()
                .includes(search);

        const matchesPlan =
            plan === "all" ||
            customer.plan === plan;

        return matchesSearch && matchesPlan;
    });

    renderCustomers(result);
}

document.getElementById("customerSearch")
    .addEventListener("input", filterCustomers);

document.getElementById("customerPlan")
    .addEventListener("change", filterCustomers);

/* CUSTOMER VIEW */

function viewCustomer(index) {

    const customer = customers[index];

    showToast(
        `${customer.name}: $${customer.mrr.toLocaleString()} MRR`
    );
}

/* REVENUE CHART */

function createChart(canvasId, values, lineColor) {

    const canvas =
        document.getElementById(canvasId);

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;

    const height = 260;

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    const max =
        Math.max(...values);

    ctx.beginPath();

    ctx.strokeStyle = lineColor;

    ctx.lineWidth = 4;

    values.forEach((value, index) => {

        const x =
            index *
            (width / (values.length - 1));

        const y =
            height -
            (value / max) * 210 -
            15;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

    });

    ctx.stroke();

    values.forEach((value, index) => {

        const x =
            index *
            (width / (values.length - 1));

        const y =
            height -
            (value / max) * 210 -
            15;

        ctx.fillStyle = "#facc15";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}

/* MAIN REVENUE */

function drawRevenueChart() {

    createChart(
        "revenueChart",
        [42, 48, 55, 63, 72, 84],
        "#7c3aed"
    );
}

drawRevenueChart();

/* MRR */

function drawMRRChart() {

    createChart(
        "mrrChart",
        [30, 39, 45, 53, 67, 84],
        "#ec4899"
    );
}

/* ARR */

function drawARRChart() {

    createChart(
        "arrChart",
        [420, 510, 610, 720, 850, 1011],
        "#f59e0b"
    );
}

window.addEventListener("resize", () => {

    drawRevenueChart();

    if (
        document.getElementById("mrr")
            .classList.contains("active")
    ) {
        drawMRRChart();
    }

    if (
        document.getElementById("arr")
            .classList.contains("active")
    ) {
        drawARRChart();
    }

});

/* PERIOD */

document.getElementById("globalPeriod")
    .addEventListener("change", e => {

        showToast(
            `Revenue period: ${e.target.value}`
        );

    });

document.getElementById("chartPeriod")
    .addEventListener("change", e => {

        showToast(
            `Chart range changed to ${e.target.value}`
        );

    });

/* REPORT */

function generateReport() {

    const report =
        `Revenue Report
Generated: ${new Date().toLocaleString()}

MRR: $84,260
ARR: $1,011,120
Growth: 24.8%
`;

    downloadFile(
        report,
        "revenue-report.txt",
        "text/plain"
    );

    showToast("Revenue report generated");
}

/* DOWNLOAD REPORT */

function downloadReport(type) {

    const content =
        `${type} Report

Revenue: $84,260
ARR: $1,011,120
Growth: 24.8%
Generated: ${new Date().toLocaleString()}
`;

    downloadFile(
        content,
        `${type.toLowerCase().replaceAll(" ", "-")}-report.txt`,
        "text/plain"
    );

    showToast(`${type} report downloaded`);
}

/* CUSTOMER EXPORT */

function exportCustomers() {

    let csv =
        "Customer,Plan,MRR,ARR,Growth\n";

    customers.forEach(customer => {

        csv += [
            customer.name,
            customer.plan,
            customer.mrr,
            customer.mrr * 12,
            customer.growth
        ].join(",") + "\n";

    });

    downloadFile(
        csv,
        "revenue-customers.csv",
        "text/csv"
    );

    showToast("Customer revenue exported");
}

/* FILE DOWNLOAD */

function downloadFile(
    content,
    filename,
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

    link.click();

    URL.revokeObjectURL(url);
}

/* SETTINGS */

function saveRevenueSettings() {

    showToast(
        "Revenue settings saved successfully"
    );
}

/* MOBILE */

document.getElementById("menu")
    .onclick = () => {

        document.getElementById("sidebar")
            .classList.toggle("open");

    };

/* TOAST */

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}