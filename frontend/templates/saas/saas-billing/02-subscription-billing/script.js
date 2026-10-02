const navs = document.querySelectorAll(".nav");
const views = document.querySelectorAll(".view");

const titles = {
    overview: "Subscription Overview",
    plans: "Pricing Plans",
    subscribers: "Subscribers",
    renewals: "Upcoming Renewals",
    coupons: "Coupons",
    settings: "Subscription Settings"
};

navs.forEach(nav => {

    nav.addEventListener("click", () => {

        const view = nav.dataset.view;

        navs.forEach(item => item.classList.remove("active"));
        nav.classList.add("active");

        views.forEach(item => item.classList.remove("active"));
        document.getElementById(view).classList.add("active");

        document.getElementById("title").textContent = titles[view];

        document.getElementById("sidebar").classList.remove("open");
    });

});

/* SUBSCRIBERS */

let subscribers = [
    ["Aarav Sharma", "aarav@example.com", "Pro", "$49", "Active"],
    ["Priya Reddy", "priya@example.com", "Business", "$99", "Active"],
    ["Rahul Kumar", "rahul@example.com", "Starter", "$19", "Trial"],
    ["Sneha Patel", "sneha@example.com", "Pro", "$49", "Cancelled"],
    ["David Miller", "david@example.com", "Business", "$99", "Active"],
    ["Ananya Rao", "ananya@example.com", "Starter", "$19", "Active"]
];

function statusBadge(status) {
    return `<span class="status ${status.toLowerCase()}">${status}</span>`;
}

function renderSubscribers(data = subscribers) {

    const table = document.getElementById("subscriberTable");

    table.innerHTML = data.map((sub, index) => `
        <tr>
            <td><strong>${sub[0]}</strong></td>
            <td>${sub[1]}</td>
            <td>${sub[2]}</td>
            <td>${sub[3]}</td>
            <td>${statusBadge(sub[4])}</td>
            <td>
                <button class="action" onclick="changeSubscription(${index})">
                    ${sub[4] === "Cancelled" ? "Renew" : "Manage"}
                </button>
            </td>
        </tr>
    `).join("");
}

renderSubscribers();

/* RECENT */

document.getElementById("recentTable").innerHTML =
    subscribers.slice(0, 4).map((sub, index) => `
        <tr>
            <td><strong>${sub[0]}</strong></td>
            <td>${sub[2]}</td>
            <td>Monthly</td>
            <td>${sub[3]}</td>
            <td>${statusBadge(sub[4])}</td>
            <td>
                <button class="action" onclick="changeSubscription(${index})">
                    Manage
                </button>
            </td>
        </tr>
    `).join("");

function changeSubscription(index) {

    if (subscribers[index][4] === "Cancelled") {
        subscribers[index][4] = "Active";
        showToast("Subscription renewed");
    } else {
        subscribers[index][4] = "Cancelled";
        showToast("Subscription cancelled");
    }

    renderSubscribers();

    document.getElementById("recentTable").innerHTML =
        subscribers.slice(0, 4).map((sub, index) => `
            <tr>
                <td><strong>${sub[0]}</strong></td>
                <td>${sub[2]}</td>
                <td>Monthly</td>
                <td>${sub[3]}</td>
                <td>${statusBadge(sub[4])}</td>
                <td>
                    <button class="action" onclick="changeSubscription(${index})">
                        Manage
                    </button>
                </td>
            </tr>
        `).join("");
}

/* SEARCH */

function filterSubscribers() {

    const query =
        document.getElementById("subscriberSearch").value.toLowerCase();

    const filter =
        document.getElementById("subscriberFilter").value;

    const result = subscribers.filter(sub => {

        const matchesText =
            sub[0].toLowerCase().includes(query) ||
            sub[1].toLowerCase().includes(query) ||
            sub[2].toLowerCase().includes(query);

        const matchesStatus =
            filter === "all" || sub[4] === filter;

        return matchesText && matchesStatus;
    });

    renderSubscribers(result);
}

document.getElementById("subscriberSearch")
    .addEventListener("input", filterSubscribers);

document.getElementById("subscriberFilter")
    .addEventListener("change", filterSubscribers);

/* PLANS */

const plans = [
    {
        name: "Starter",
        price: 19,
        color: "#16a34a",
        features: ["5 Users", "10 GB Storage", "Email Support", "Basic Analytics"]
    },
    {
        name: "Pro",
        price: 49,
        color: "#f97316",
        features: ["25 Users", "100 GB Storage", "Priority Support", "Advanced Analytics"],
        featured: true
    },
    {
        name: "Business",
        price: 99,
        color: "#9333ea",
        features: ["Unlimited Users", "1 TB Storage", "24/7 Support", "Enterprise Analytics"]
    }
];

function renderPlans() {

    document.getElementById("pricingGrid").innerHTML =
        plans.map(plan => `
            <div class="plan ${plan.featured ? "featured" : ""}">

                <h3>${plan.name}</h3>

                <div class="price">$${plan.price}<small>/mo</small></div>

                <ul>
                    ${plan.features.map(feature => `
                        <li>✓ ${feature}</li>
                    `).join("")}
                </ul>

                <button onclick="selectPlan('${plan.name}')">
                    Select Plan
                </button>

            </div>
        `).join("");
}

renderPlans();

function selectPlan(name) {
    showToast(`${name} plan selected`);
}

/* CREATE PLAN */

const planModal = document.getElementById("planModal");

function openPlanModal() {
    planModal.classList.add("show");
}

function closePlanModal() {
    planModal.classList.remove("show");
}

document.getElementById("planForm").addEventListener("submit", e => {

    e.preventDefault();

    const name = document.getElementById("planName").value;
    const price = Number(document.getElementById("planPrice").value);
    const description =
        document.getElementById("planDescription").value;

    plans.push({
        name,
        price,
        color: "#2563eb",
        features: description
            ? [description]
            : ["Custom features"]
    });

    renderPlans();

    closePlanModal();

    e.target.reset();

    showToast("New subscription plan created");
});

/* RENEWALS */

const renewals = [
    ["Acme Corporation", "Pro Plan", "$49", "Tomorrow"],
    ["Nova Labs", "Business Plan", "$99", "Oct 4"],
    ["Pixel Studio", "Starter Plan", "$19", "Oct 6"],
    ["CloudWorks", "Business Plan", "$99", "Oct 8"]
];

document.getElementById("renewalList").innerHTML =
    renewals.map(item => `
        <div class="renewal">
            <div>
                <strong>${item[0]}</strong>
                <span>${item[1]} · ${item[2]}</span>
            </div>

            <strong>${item[3]}</strong>
        </div>
    `).join("");

/* COUPONS */

function disableCoupon(button) {

    button.textContent = "Disabled";
    button.disabled = true;
    button.style.opacity = ".5";

    showToast("Coupon disabled");
}

document.getElementById("couponBtn").onclick = () => {
    showToast("Coupon creation form opened");
};

document.getElementById("saveBtn").onclick = () => {
    showToast("Subscription settings saved");
};

document.getElementById("bell").onclick = () => {
    showToast("You have new subscription alerts");
};

/* CHART */

function drawGrowthChart() {

    const canvas = document.getElementById("growthChart");

    const ctx = canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = 250;
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.scale(ratio, ratio);

    const values = [35, 44, 48, 61, 73, 86];

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#16a34a";

    values.forEach((value, index) => {

        const x = index * (width / 5);
        const y = height - value * 2.3;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    values.forEach((value, index) => {

        const x = index * (width / 5);
        const y = height - value * 2.3;

        ctx.fillStyle = "#f97316";

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

drawGrowthChart();

window.addEventListener("resize", drawGrowthChart);

document.getElementById("growthRange").onchange = e => {
    showToast(`Growth range: ${e.target.value}`);
};

/* MOBILE */

document.getElementById("menuBtn").onclick = () => {
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