const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const products = [...document.querySelectorAll(".product")];
const productsGrid = document.getElementById("productsGrid");
const emptyResults = document.getElementById("emptyResults");

const categoryButtons = document.querySelectorAll(".category");
const sortSelect = document.getElementById("sortSelect");

const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const filterButtons = document.querySelectorAll(".filter-panel button");

const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const quickModal = document.getElementById("quickModal");
const closeQuick = document.getElementById("closeQuick");
const quickImage = document.getElementById("quickImage");
const quickCategory = document.getElementById("quickCategory");
const quickName = document.getElementById("quickName");
const quickPrice = document.getElementById("quickPrice");
const quickAdd = document.getElementById("quickAdd");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

let cartItems = [];
let activeCategory = "all";
let activePriceFilter = "all";
let toastTimer;
let quickProduct = null;

/* TOAST */

function showToast(message) {
    toastText.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

/* PRODUCT FILTERING */

function applyFilters() {

    const searchTerm = searchInput.value.trim().toLowerCase();
    let visible = 0;

    products.forEach(product => {

        const name = product.dataset.name.toLowerCase();
        const category = product.dataset.category;
        const price = Number(product.dataset.price);

        const searchMatch =
            searchTerm === "" || name.includes(searchTerm);

        const categoryMatch =
            activeCategory === "all" ||
            category === activeCategory;

        let priceMatch = true;

        if (activePriceFilter === "under1000") {
            priceMatch = price < 1000;
        }

        if (activePriceFilter === "under5000") {
            priceMatch = price < 5000;
        }

        if (activePriceFilter === "premium") {
            priceMatch = price >= 5000;
        }

        if (searchMatch && categoryMatch && priceMatch) {
            product.style.display = "";
            visible++;
        } else {
            product.style.display = "none";
        }
    });

    emptyResults.style.display = visible === 0 ? "block" : "none";
}

searchInput.addEventListener("input", applyFilters);

searchBtn.addEventListener("click", () => {
    applyFilters();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

/* CATEGORY */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        applyFilters();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* OFFER BUTTONS */

document.querySelectorAll("[data-offer]").forEach(button => {

    button.addEventListener("click", () => {

        activeCategory = button.dataset.offer;

        categoryButtons.forEach(category => {
            category.classList.toggle(
                "active",
                category.dataset.category === activeCategory
            );
        });

        applyFilters();

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* FILTER PANEL */

filterBtn.addEventListener("click", () => {
    filterPanel.classList.toggle("show");
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item => {
            item.style.background = "white";
            item.style.color = "#302d43";
        });

        button.style.background = "#6547f5";
        button.style.color = "white";

        activePriceFilter = button.dataset.filter;

        applyFilters();
    });
});

/* SORT */

sortSelect.addEventListener("change", () => {

    const sorted = [...products];

    if (sortSelect.value === "low") {
        sorted.sort((a, b) =>
            Number(a.dataset.price) - Number(b.dataset.price)
        );
    }

    if (sortSelect.value === "high") {
        sorted.sort((a, b) =>
            Number(b.dataset.price) - Number(a.dataset.price)
        );
    }

    if (sortSelect.value === "rating") {
        sorted.sort((a, b) =>
            Number(b.dataset.rating) - Number(a.dataset.rating)
        );
    }

    sorted.forEach(product => {
        productsGrid.appendChild(product);
    });

    applyFilters();
});

/* CART */

function addToCart(button) {

    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existing = cartItems.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cartItems.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    updateCart();

    showToast(`${name} added to cart 🛒`);
}

document.querySelectorAll(".add").forEach(button => {

    button.addEventListener("click", () => {
        addToCart(button);
    });
});

function updateCart() {

    const itemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartCount.textContent = itemCount;
    cartTotal.textContent = formatPrice(total);

    if (cartItems.length === 0) {

        cartList.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>Add products to get started.</p>
            </div>
        `;

        return;
    }

    cartList.innerHTML = cartItems.map(item => `
        <div class="cart-item">

            <div class="cart-item-picture">
                🛍️
            </div>

            <div>
                <h4>${item.name}</h4>
                <p>
                    ${formatPrice(item.price)} × ${item.quantity}
                </p>
            </div>

            <button class="remove" data-id="${item.id}">
                🗑️
            </button>

        </div>
    `).join("");

    document.querySelectorAll(".remove").forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.id;

            cartItems = cartItems.filter(
                item => item.id !== id
            );

            updateCart();

            showToast("Product removed");
        });
    });
}

function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}

/* OPEN CART */

function openCart() {
    cart.classList.add("open");
    overlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
    cart.classList.remove("open");
    overlay.classList.remove("show");
    document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", closeCartDrawer);

/* WISHLIST */

document.querySelectorAll(".wish").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
            showToast("Added to wishlist ❤️");
        } else {
            button.textContent = "♡";
            showToast("Removed from wishlist");
        }
    });
});

/* QUICK PRODUCT VIEW */

products.forEach(product => {

    product.addEventListener("dblclick", () => {
        openQuickView(product);
    });
});

function openQuickView(product) {

    quickProduct = product;

    const emoji = product.querySelector(".product-picture span").textContent;

    quickImage.textContent = emoji;
    quickCategory.textContent = product.dataset.category;
    quickName.textContent =
        product.querySelector("h3").textContent;

    quickPrice.textContent =
        formatPrice(Number(product.dataset.price));

    quickModal.classList.add("show");
}

closeQuick.addEventListener("click", () => {
    quickModal.classList.remove("show");
});

quickModal.addEventListener("click", event => {

    if (event.target === quickModal) {
        quickModal.classList.remove("show");
    }
});

quickAdd.addEventListener("click", () => {

    if (!quickProduct) {
        return;
    }

    const button = quickProduct.querySelector(".add");

    addToCart(button);

    quickModal.classList.remove("show");
});

/* EXPLORE BUTTON */

document.getElementById("exploreBtn").addEventListener("click", () => {

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

/* OFFER BUTTON */

document.getElementById("offerBtn").addEventListener("click", () => {

    document.getElementById("offers").scrollIntoView({
        behavior: "smooth"
    });
});

/* ALL CATEGORIES */

document.getElementById("allCategories").addEventListener("click", () => {

    document.getElementById("categories").scrollIntoView({
        behavior: "smooth"
    });
});

/* LOCATION */

document.getElementById("locationBtn").addEventListener("click", () => {
    showToast("Location feature opened 📍");
});

/* LOGIN */

document.getElementById("loginBtn").addEventListener("click", () => {
    showToast("Login feature opened 👤");
});

/* NEWSLETTER */

document.getElementById("newsletterForm").addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("emailInput").value.trim();

    if (email) {
        showToast("Successfully subscribed! 🎉");
        event.target.reset();
    }
});

/* CHECKOUT */

document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cartItems.length === 0) {
        showToast("Your cart is empty 🛒");
        return;
    }

    closeCartDrawer();

    showToast("Checkout started! 🚀");
});

/* MOBILE MENU */

document.getElementById("mobileMenu").addEventListener("click", () => {
    showToast("Use the sections below to explore Marketly 📱");
});

updateCart();