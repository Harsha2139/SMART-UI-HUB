const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");

const categoryButtons = document.querySelectorAll(".category-card");
const products = [...document.querySelectorAll(".product-card")];
const sortSelect = document.getElementById("sortSelect");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const wishlistCount = document.getElementById("wishlistCount");

const accountButton = document.getElementById("accountButton");
const loginModal = document.getElementById("loginModal");
const closeModal = document.getElementById("closeModal");
const loginButton = document.getElementById("loginButton");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

const closeOffer = document.getElementById("closeOffer");

let cart = [];
let wishlist = [];
let currentCategory = "all";
let toastTimeout;

/* TOAST */

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/* OFFER BAR */

closeOffer.addEventListener("click", () => {
    document.querySelector(".top-bar").style.display = "none";
});

/* MOBILE MENU */

menuButton.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("show");
    });
});

/* SEARCH */

function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();
        const category = product.dataset.category;

        const matchesSearch =
            searchTerm === "" || name.includes(searchTerm);

        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;

        if (matchesSearch && matchesCategory) {
            product.style.display = "";
            visibleCount++;
        } else {
            product.style.display = "none";
        }
    });

    noProducts.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterProducts);

searchButton.addEventListener("click", () => {
    filterProducts();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

/* CATEGORY FILTER */

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        currentCategory = button.dataset.category;

        filterProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* DEAL BUTTONS */

document.querySelectorAll(".deal-shop").forEach(button => {
    button.addEventListener("click", () => {

        currentCategory = button.dataset.category;

        categoryButtons.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.category === currentCategory
            );
        });

        filterProducts();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* SORT */

sortSelect.addEventListener("change", () => {
    const cards = [...products];

    if (sortSelect.value === "low") {
        cards.sort((a, b) => {
            return getPrice(a) - getPrice(b);
        });
    }

    if (sortSelect.value === "high") {
        cards.sort((a, b) => {
            return getPrice(b) - getPrice(a);
        });
    }

    if (sortSelect.value === "rating") {
        cards.sort((a, b) => {
            return getRating(b) - getRating(a);
        });
    }

    cards.forEach(card => productGrid.appendChild(card));

    filterProducts();
});

function getPrice(card) {
    const button = card.querySelector(".add-cart");
    return Number(button.dataset.price);
}

function getRating(card) {
    const rating = card.querySelector(".rating").textContent;
    return (rating.match(/★/g) || []).length;
}

/* ADD TO CART */

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }

        updateCart();

        showToast(`${name} added to cart 🛒`);
    });
});

/* CART */

function updateCart() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatCurrency(totalPrice);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something you love!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">🛍️</div>

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>
                    ${formatCurrency(item.price)} × ${item.quantity}
                </span>
            </div>

            <button
                class="remove-item"
                data-id="${item.id}"
                title="Remove"
            >
                🗑️
            </button>
        </div>
    `).join("");

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {

            const id = button.dataset.id;

            cart = cart.filter(item => item.id !== id);

            updateCart();

            showToast("Item removed from cart");
        });
    });
}

function formatCurrency(value) {
    return `₹${value.toLocaleString("en-IN")}`;
}

/* OPEN CART */

function openCart() {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

/* WISHLIST */

document.querySelectorAll(".heart").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.id;

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";

            if (!wishlist.includes(id)) {
                wishlist.push(id);
            }

            showToast("Added to wishlist ❤️");

        } else {
            button.textContent = "♡";

            wishlist = wishlist.filter(item => item !== id);

            showToast("Removed from wishlist");
        }

        wishlistCount.textContent = wishlist.length;
    });
});

/* WISHLIST HEADER */

document.getElementById("wishlistButton").addEventListener("click", () => {

    if (wishlist.length === 0) {
        showToast("Your wishlist is empty ❤️");
        return;
    }

    showToast(`${wishlist.length} item(s) in your wishlist ❤️`);
});

/* LOGIN */

accountButton.addEventListener("click", () => {
    loginModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    loginModal.classList.remove("show");
});

loginModal.addEventListener("click", event => {
    if (event.target === loginModal) {
        loginModal.classList.remove("show");
    }
});

loginButton.addEventListener("click", () => {

    const phone = document.getElementById("phoneInput").value.trim();

    if (phone.length < 10) {
        showToast("Please enter a valid mobile number");
        return;
    }

    loginModal.classList.remove("show");

    showToast("Welcome to Shoply! 🎉");
});

/* SHOP NOW */

document.getElementById("shopNowButton").addEventListener("click", () => {

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

/* VIEW DEALS */

document.getElementById("dealButton").addEventListener("click", () => {

    document.getElementById("deals").scrollIntoView({
        behavior: "smooth"
    });
});

/* VIEW CATEGORIES */

document.getElementById("viewCategories").addEventListener("click", () => {

    document.getElementById("categories").scrollIntoView({
        behavior: "smooth"
    });
});

/* CHECKOUT */

document.getElementById("checkoutButton").addEventListener("click", () => {

    if (cart.length === 0) {
        showToast("Your cart is empty 🛒");
        return;
    }

    closeCartDrawer();

    showToast("Checkout page coming next! 🚀");
});

/* DEAL COUNTDOWN */

let remainingSeconds = 8 * 60 * 60 + 42 * 60 + 15;

function updateTimer() {

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    document.getElementById("dealTimer").textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;

    if (remainingSeconds > 0) {
        remainingSeconds--;
    }
}

setInterval(updateTimer, 1000);
updateCart();