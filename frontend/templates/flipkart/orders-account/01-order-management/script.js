const tabs = document.querySelectorAll(".tab");
const orders = [...document.querySelectorAll(".order-card")];
const searchInput = document.getElementById("searchInput");
const sortOrders = document.getElementById("sortOrders");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";
let searchTerm = "";

function updateOrders() {

    let visibleOrders = orders.filter(order => {

        const status = order.dataset.status;
        const text = order.textContent.toLowerCase();

        const matchesFilter =
            activeFilter === "all" ||
            status === activeFilter;

        const matchesSearch =
            !searchTerm ||
            text.includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    const sortValue = sortOrders.value;

    visibleOrders.sort((a, b) => {

        if (sortValue === "recent") {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        }

        if (sortValue === "oldest") {
            return new Date(a.dataset.date) - new Date(b.dataset.date);
        }

        if (sortValue === "high") {
            return Number(b.dataset.price) - Number(a.dataset.price);
        }

        if (sortValue === "low") {
            return Number(a.dataset.price) - Number(b.dataset.price);
        }
    });

    orders.forEach(order => {
        order.classList.add("hidden");
    });

    visibleOrders.forEach(order => {
        order.classList.remove("hidden");
    });

    emptyState.classList.toggle(
        "show",
        visibleOrders.length === 0
    );
}

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        activeFilter = tab.dataset.filter;

        updateOrders();
    });
});

searchInput.addEventListener("input", () => {

    searchTerm = searchInput.value
        .trim()
        .toLowerCase();

    updateOrders();
});

sortOrders.addEventListener("change", updateOrders);

const modal = document.getElementById("detailsModal");

function openModal(order) {

    const title =
        order.querySelector(".product-info h3").textContent;

    const orderId =
        order.querySelector(".order-header strong").textContent;

    const date =
        order.querySelector(".order-date").textContent
            .replace("Placed on ", "");

    const price =
        order.querySelector(".product-meta strong").textContent;

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalOrderId").textContent = orderId;
    document.getElementById("modalDate").textContent = date;
    document.getElementById("modalPrice").textContent = price;

    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

document.querySelectorAll(".details-btn").forEach(button => {

    button.addEventListener("click", () => {
        openModal(button.closest(".order-card"));
    });
});

document.getElementById("closeModal")
    .addEventListener("click", closeModal);

document.getElementById("modalAction")
    .addEventListener("click", closeModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeModal();
    }
});

document.querySelectorAll(".track-btn").forEach(button => {

    button.addEventListener("click", () => {
        showToast("Live order tracking opened");
    });
});

document.querySelectorAll(".return-btn").forEach(button => {

    button.addEventListener("click", () => {
        showToast("Return request started");
    });
});

document.querySelectorAll(".cancel-btn").forEach(button => {

    button.addEventListener("click", () => {

        const order = button.closest(".order-card");
        const status = order.querySelector(".status");

        const confirmCancel =
            confirm("Are you sure you want to cancel this order?");

        if (!confirmCancel) {
            return;
        }

        order.dataset.status = "cancelled";

        status.textContent = "● Cancelled";
        status.className = "status cancelled";

        button.textContent = "Cancelled";
        button.disabled = true;

        updateOrders();
        showToast("Order cancelled successfully");
    });
});

document.querySelectorAll(".reorder-btn").forEach(button => {

    button.addEventListener("click", () => {
        showToast("Item added to your cart");
    });
});

document.getElementById("shopBtn").addEventListener("click", () => {
    showToast("Opening shopping page...");
});

document.getElementById("supportBtn").addEventListener("click", () => {
    showToast("Connecting you with customer support...");
});

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

updateOrders();