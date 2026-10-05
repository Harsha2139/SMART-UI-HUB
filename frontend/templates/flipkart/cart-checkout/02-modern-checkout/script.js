const paymentTabs = document.querySelectorAll(".payment-tab");

const panels = {
    upi: document.getElementById("upiPanel"),
    card: document.getElementById("cardPanel"),
    netbanking: document.getElementById("netbankingPanel"),
    cod: document.getElementById("codPanel")
};

paymentTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        paymentTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        Object.values(panels).forEach(panel => {
            panel.classList.add("hidden");
        });

        panels[tab.dataset.payment].classList.remove("hidden");
    });
});

const deliveryOptions = document.querySelectorAll(".delivery-option");
const deliveryCharge = document.getElementById("deliveryCharge");
const grandTotal = document.getElementById("grandTotal");

let currentDeliveryCharge = 0;
let couponDiscount = 0;

function updateTotal() {

    const subtotal = 4398;
    const discount = 600;
    const total =
        subtotal -
        discount -
        couponDiscount +
        currentDeliveryCharge;

    grandTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

    if (currentDeliveryCharge === 0) {
        deliveryCharge.textContent = "FREE";
        deliveryCharge.style.color = "#18a477";
    } else {
        deliveryCharge.textContent =
            "₹" + currentDeliveryCharge;
        deliveryCharge.style.color = "#4d4a5d";
    }
}

deliveryOptions.forEach(option => {

    option.addEventListener("click", () => {

        deliveryOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        const radio = option.querySelector("input");
        radio.checked = true;

        currentDeliveryCharge = Number(radio.value);

        updateTotal();
    });
});

const addressOptions = document.querySelectorAll(".address-option");

addressOptions.forEach(option => {

    option.addEventListener("click", event => {

        if (event.target.classList.contains("edit-address")) {
            return;
        }

        addressOptions.forEach(item => {
            item.classList.remove("selected");
        });

        option.classList.add("selected");

        option.querySelector("input").checked = true;
    });
});

document.getElementById("verifyUpi").addEventListener("click", () => {

    const input = document.getElementById("upiInput");
    const message = document.getElementById("upiMessage");

    const value = input.value.trim();

    if (!/^[\w.-]+@[\w.-]+$/.test(value)) {
        message.textContent = "Enter a valid UPI ID, for example user@upi.";
        message.style.color = "#e34e63";
        return;
    }

    message.textContent = "✓ UPI ID verified successfully.";
    message.style.color = "#18a477";
});

document.getElementById("cardNumber").addEventListener("input", event => {

    let value = event.target.value.replace(/\D/g, "").slice(0, 16);

    value = value.replace(/(.{4})/g, "$1 ").trim();

    event.target.value = value;
});

document.getElementById("expiry").addEventListener("input", event => {

    let value = event.target.value.replace(/\D/g, "").slice(0, 4);

    if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }

    event.target.value = value;
});

const couponMessage = document.getElementById("couponMessage");

document.getElementById("applyCoupon").addEventListener("click", () => {

    const input = document.getElementById("coupon");
    const code = input.value.trim().toUpperCase();

    if (code === "SAVE200") {

        if (couponDiscount === 0) {
            couponDiscount = 200;
            couponMessage.textContent = "✓ Coupon applied. You saved ₹200.";
            couponMessage.style.color = "#18a477";
            updateTotal();
            showToast("Coupon applied successfully");
        } else {
            couponMessage.textContent = "Coupon is already applied.";
        }

    } else {

        couponMessage.textContent =
            "Invalid code. Try SAVE200.";

        couponMessage.style.color = "#e34e63";
    }
});

const modal = document.getElementById("successModal");

function showModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

document.getElementById("placeOrder").addEventListener("click", () => {

    const activePayment =
        document.querySelector(".payment-tab.active").dataset.payment;

    if (activePayment === "upi") {

        const upi = document.getElementById("upiInput").value.trim();

        if (!/^[\w.-]+@[\w.-]+$/.test(upi)) {
            showToast("Please verify your UPI ID first");
            return;
        }
    }

    if (activePayment === "card") {

        const card = document.getElementById("cardNumber").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;
        const name = document.getElementById("cardName").value.trim();

        if (
            card.replace(/\s/g, "").length !== 16 ||
            !/^\d{2}\/\d{2}$/.test(expiry) ||
            !/^\d{3}$/.test(cvv) ||
            !name
        ) {
            showToast("Please complete your card details");
            return;
        }
    }

    if (activePayment === "netbanking") {

        const bank = document.getElementById("bankSelect").value;

        if (!bank) {
            showToast("Please select your bank");
            return;
        }
    }

    showModal();
});

document.getElementById("closeModal").addEventListener("click", closeModal);

document.getElementById("continueBtn").addEventListener("click", () => {
    closeModal();
    showToast("Returning to shopping...");
});

document.getElementById("changeAddress").addEventListener("click", () => {
    showToast("New address form opened");
});

document.querySelectorAll(".edit-address").forEach(button => {

    button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        showToast("Address editing opened");
    });
});

document.getElementById("supportBtn").addEventListener("click", () => {
    showToast("Connecting you with support...");
});

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}

updateTotal();