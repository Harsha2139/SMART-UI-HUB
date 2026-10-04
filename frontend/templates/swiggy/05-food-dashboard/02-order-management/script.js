function adminLogin() {
    alert("Admin panel opened.");
}

function refreshOrders() {
    document.getElementById("totalOrders").textContent = "1,260";
    document.getElementById("pendingOrders").textContent = "21";
    document.getElementById("deliveryOrders").textContent = "41";
    document.getElementById("deliveredOrders").textContent = "1,198";

    alert("Order data refreshed successfully!");
}

function updateOrder(button) {
    const row = button.closest("tr");
    const statusElement = row.querySelector(".status");

    statusElement.textContent = "On Delivery";
    statusElement.className = "status delivery";
    row.setAttribute("data-status", "On Delivery");

    button.textContent = "Updated";

    alert("Order status updated to On Delivery.");
}

function viewOrder(button) {
    const row = button.closest("tr");
    const orderId = row.cells[0].textContent;

    alert("Viewing order " + orderId);
}

function trackOrder(orderId) {
    alert("Tracking order #" + orderId);
}

function filterOrders(status) {
    const rows = document.querySelectorAll("#orderTable tr");

    rows.forEach(row => {
        const rowStatus = row.getAttribute("data-status");

        if (status === "All" || rowStatus === status) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function searchOrders() {
    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#orderTable tr");

    rows.forEach(row => {
        const rowText = row.textContent.toLowerCase();

        if (rowText.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}