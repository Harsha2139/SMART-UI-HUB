const thumbs = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("mainImage");

thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
        thumbs.forEach(item => item.classList.remove("active"));
        thumb.classList.add("active");
        mainImage.textContent = thumb.dataset.image;
    });
});

const colors = document.querySelectorAll(".color");
const selectedColor = document.getElementById("selectedColor");

colors.forEach(color => {
    color.addEventListener("click", () => {
        colors.forEach(item => item.classList.remove("active"));
        color.classList.add("active");
        selectedColor.textContent = color.dataset.color;
    });
});

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const quantityElement = document.getElementById("quantity");

let quantity = 1;

minus.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateCartTotal();
    }
});

plus.addEventListener("click", () => {
    if (quantity < 10) {
        quantity++;
        quantityElement.textContent = quantity;
        updateCartTotal();
    }
});

function updateCartTotal() {
    const total = quantity * 4999;
    document.getElementById("cartTotal").textContent =
        "₹" + total.toLocaleString("en-IN");
}

const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

let cartCount = 0;

document.getElementById("addCart").addEventListener("click", () => {
    cartCount += quantity;
    document.getElementById("cartCount").textContent = cartCount;

    showToast(`${quantity} item${quantity > 1 ? "s" : ""} added to cart!`);
});

document.getElementById("buyNow").addEventListener("click", () => {
    showToast("Proceeding to secure checkout...");
});

const wishlistButtons = [
    document.getElementById("wishlistBtn"),
    document.getElementById("wishlistProduct")
];

wishlistButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
            showToast("Added to wishlist!");
        } else {
            button.textContent =
                button.id === "wishlistBtn" ? "♡" : "♡ Add to Wishlist";

            showToast("Removed from wishlist");
        }
    });
});

document.getElementById("checkDelivery").addEventListener("click", () => {

    const pincode = document.getElementById("pincode").value.trim();
    const message = document.getElementById("deliveryMessage");

    if (!/^\d{6}$/.test(pincode)) {
        message.textContent = "Please enter a valid 6-digit pincode.";
        message.style.color = "#e04b4b";
        return;
    }

    message.textContent = "✓ Delivery available. Expected delivery in 2–4 days.";
    message.style.color = "#168d68";
});

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

function openCart() {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
}

function closeCart() {
    cartDrawer.classList.remove("open");
    overlay.classList.remove("show");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.querySelector(".checkout-btn").addEventListener("click", () => {
    closeCart();
    showToast("Checkout page opened!");
});

document.getElementById("searchInput").addEventListener("keydown", event => {

    if (event.key === "Enter") {
        const value = event.target.value.trim();

        if (value) {
            showToast(`Searching for "${value}"`);
        }
    }
});