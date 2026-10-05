const mainEmoji = document.getElementById("mainEmoji");
const thumbnails = document.querySelectorAll(".thumbnail");
const dots = document.querySelectorAll(".dot");

const imageHeart = document.getElementById("imageHeart");
const colorOptions = document.querySelectorAll(".color-option");
const selectedColor = document.getElementById("selectedColor");

const quantityElement = document.getElementById("quantity");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");

const pincode = document.getElementById("pincode");
const checkDelivery = document.getElementById("checkDelivery");
const deliveryMessage = document.getElementById("deliveryMessage");

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

let quantity = 1;

let cart = [];

function showToast(message) {
    toast.querySelector("p").textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {

        thumbnails.forEach(item => {
            item.classList.remove("active");
        });

        thumbnail.classList.add("active");

        mainEmoji.textContent = thumbnail.dataset.emoji;

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        dots[index].classList.add("active");
    });
});

imageHeart.addEventListener("click", () => {
    imageHeart.classList.toggle("liked");

    if (imageHeart.classList.contains("liked")) {
        imageHeart.textContent = "♥";
        showToast("Product added to wishlist");
    } else {
        imageHeart.textContent = "♡";
        showToast("Product removed from wishlist");
    }
});

colorOptions.forEach(option => {
    option.addEventListener("click", () => {

        colorOptions.forEach(item => {
            item.classList.remove("active");
        });

        option.classList.add("active");

        selectedColor.textContent = option.dataset.color;

        showToast(`${option.dataset.color} selected`);
    });
});

minusButton.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
});

plusButton.addEventListener("click", () => {
    if (quantity < 10) {
        quantity++;
        quantityElement.textContent = quantity;
    } else {
        showToast("Maximum quantity reached");
    }
});

checkDelivery.addEventListener("click", () => {
    const code = pincode.value.trim();

    if (!/^\d{6}$/.test(code)) {
        deliveryMessage.textContent =
            "Please enter a valid 6-digit pincode.";
        deliveryMessage.style.color = "#ec4899";
        return;
    }

    deliveryMessage.textContent =
        "✓ Delivery available. Estimated delivery in 2–4 days.";
    deliveryMessage.style.color = "#22c55e";
});

pincode.addEventListener("input", () => {
    pincode.value = pincode.value.replace(/\D/g, "");
});

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
    });
});

function addToCart(name, price, emoji, amount = 1) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += amount;
    } else {
        cart.push({
            name,
            price,
            emoji,
            quantity: amount
        });
    }

    updateCart();

    showToast(`${name} added to cart`);
}

document.getElementById("addCart").addEventListener("click", () => {

    addToCart(
        "AirBeat Pro Wireless Headphones",
        2899,
        "🎧",
        quantity
    );
});

document.querySelectorAll(".related-add").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".related-card");
        const name = card.querySelector("h3").textContent;
        const priceText = card.querySelector("strong").textContent;
        const price = Number(
            priceText.replace(/[₹,]/g, "")
        );

        const emoji = card.querySelector(".related-image span").textContent;

        addToCart(name, price, emoji, 1);
    });
});

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>Add products to see them here.</p>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const element = document.createElement("div");

        element.className = "cart-item";

        element.innerHTML = `
            <div class="cart-icon">${item.emoji}</div>

            <div class="cart-info">
                <strong>${item.name}</strong>
                <span>
                    ₹${item.price.toLocaleString("en-IN")}
                    × ${item.quantity}
                </span>
            </div>

            <button class="remove-cart" data-index="${index}">
                Remove
            </button>
        `;

        cartItems.appendChild(element);
    });

    cartCount.textContent = count;

    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;

    document.querySelectorAll(".remove-cart").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

            showToast("Product removed from cart");
        });
    });
}

function openCart() {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
}

function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    overlay.classList.remove("show");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

document.getElementById("wishlistButton").addEventListener("click", () => {

    if (imageHeart.classList.contains("liked")) {
        showToast("You have 1 item in your wishlist");
    } else {
        showToast("Your wishlist is empty");
    }
});

document.getElementById("viewOffers").addEventListener("click", () => {
    showToast("Showing all available offers");
});

document.getElementById("buyNow").addEventListener("click", () => {

    addToCart(
        "AirBeat Pro Wireless Headphones",
        2899,
        "🎧",
        quantity
    );

    openCart();
});

document.getElementById("checkout").addEventListener("click", () => {

    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    showToast("Proceeding to checkout");
});

document.getElementById("searchBtn").addEventListener("click", () => {

    const value = document.getElementById("searchInput").value.trim();

    if (!value) {
        showToast("Enter a product to search");
        return;
    }

    showToast(`Searching for "${value}"`);
});

document.getElementById("searchInput").addEventListener("keydown", event => {

    if (event.key === "Enter") {
        document.getElementById("searchBtn").click();
    }
});

updateCart();