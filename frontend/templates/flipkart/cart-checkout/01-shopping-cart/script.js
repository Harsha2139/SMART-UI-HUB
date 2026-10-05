const cartItems = document.querySelectorAll(".cart-item");
const selectAll = document.getElementById("selectAll");
const cartBadge = document.getElementById("cartBadge");
const itemSummary = document.getElementById("itemSummary");
const subtotalElement = document.getElementById("subtotal");
const discountElement = document.getElementById("discount");
const totalElement = document.getElementById("total");
const toast = document.getElementById("toast");

let couponApplied = false;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function getSelectedItems() {
    return [...document.querySelectorAll(".cart-item")].filter(item => {
        return item.querySelector(".item-check").checked;
    });
}

function updateCart() {
    let subtotal = 0;
    let discount = 0;
    let itemCount = 0;

    document.querySelectorAll(".cart-item").forEach(item => {

        const checkbox = item.querySelector(".item-check");

        if (!checkbox.checked) {
            return;
        }

        const price = Number(item.dataset.price);
        const quantity = Number(item.querySelector(".quantity").textContent);

        subtotal += price * quantity;
        discount += (price * 0.296) * quantity;
        itemCount += quantity;
    });

    if (couponApplied && subtotal > 0) {
        discount += 200;
    }

    const total = Math.max(0, subtotal - discount);

    subtotalElement.textContent =
        "₹" + Math.round(subtotal).toLocaleString("en-IN");

    discountElement.textContent =
        "− ₹" + Math.round(discount).toLocaleString("en-IN");

    totalElement.textContent =
        "₹" + Math.round(total).toLocaleString("en-IN");

    cartBadge.textContent = itemCount;
    itemSummary.textContent =
        `${itemCount} item${itemCount === 1 ? "" : "s"} in your cart`;

    const selected = getSelectedItems().length;

    selectAll.checked =
        selected === document.querySelectorAll(".cart-item").length &&
        selected > 0;
}

document.querySelectorAll(".plus").forEach(button => {

    button.addEventListener("click", () => {

        const quantityElement =
            button.parentElement.querySelector(".quantity");

        let quantity = Number(quantityElement.textContent);

        if (quantity < 10) {
            quantity++;
            quantityElement.textContent = quantity;
            updateCart();
        }
    });
});

document.querySelectorAll(".minus").forEach(button => {

    button.addEventListener("click", () => {

        const quantityElement =
            button.parentElement.querySelector(".quantity");

        let quantity = Number(quantityElement.textContent);

        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            updateCart();
        }
    });
});

document.querySelectorAll(".item-check").forEach(checkbox => {
    checkbox.addEventListener("change", updateCart);
});

selectAll.addEventListener("change", () => {

    document.querySelectorAll(".item-check").forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });

    updateCart();
});

document.querySelectorAll(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

        const item = button.closest(".cart-item");

        item.style.opacity = "0";
        item.style.transform = "translateX(30px)";

        setTimeout(() => {
            item.remove();
            updateCart();
            showToast("Item removed from cart");
        }, 250);
    });
});

document.getElementById("removeSelected").addEventListener("click", () => {

    const selectedItems = getSelectedItems();

    if (selectedItems.length === 0) {
        showToast("No items selected");
        return;
    }

    selectedItems.forEach(item => item.remove());

    updateCart();
    showToast("Selected items removed");
});

document.getElementById("applyCoupon").addEventListener("click", () => {

    const input = document.getElementById("couponInput");
    const message = document.getElementById("couponMessage");

    if (input.value.trim().toUpperCase() === "SAVE200") {

        if (!couponApplied) {
            couponApplied = true;
            message.textContent = "✓ Coupon applied. You saved ₹200.";
            message.style.color = "#16a477";
            updateCart();
            showToast("Coupon applied successfully");
        } else {
            message.textContent = "Coupon already applied.";
        }

    } else {
        message.textContent = "Try coupon code SAVE200.";
        message.style.color = "#e04e63";
    }
});

document.getElementById("checkout").addEventListener("click", () => {

    const selectedItems = getSelectedItems();

    if (selectedItems.length === 0) {
        showToast("Select at least one item");
        return;
    }

    showToast("Opening secure checkout...");
});

document.getElementById("continueShopping").addEventListener("click", () => {
    showToast("Returning to shopping...");
});

document.querySelectorAll(".recommendation-card button").forEach(button => {

    button.addEventListener("click", () => {

        const productName =
            button.parentElement.querySelector("h3").textContent;

        showToast(`${productName} added to cart`);
    });
});

document.getElementById("searchInput").addEventListener("keydown", event => {

    if (event.key === "Enter") {

        const value = event.target.value.trim();

        if (value) {
            showToast(`Searching for "${value}"`);
        }
    }
});

updateCart();