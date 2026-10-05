const searchInput = document.getElementById("searchInput");
const heroSearch = document.getElementById("heroSearch");
const searchBtn = document.getElementById("searchBtn");
const smartSearchBtn = document.getElementById("smartSearchBtn");
const clearSearch = document.getElementById("clearSearch");

const productGrid = document.getElementById("productGrid");
const productCards = [...document.querySelectorAll(".product-card")];
const filters = [...document.querySelectorAll(".filter")];
const sortSelect = document.getElementById("sortSelect");
const emptyState = document.getElementById("emptyState");

const cartDrawer = document.getElementById("cartDrawer");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const toast = document.getElementById("toast");

let selectedFilter = "all";
let cart = [];

function showToast(message) {
    toast.querySelector("p").textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

function performSearch(value) {
    const query = value.trim();

    searchInput.value = query;
    heroSearch.value = query;

    if (!query) {
        showToast("Enter something to search");
        return;
    }

    const normalizedQuery = query.toLowerCase();

    if (
        normalizedQuery.includes("electronics") ||
        normalizedQuery.includes("headphone") ||
        normalizedQuery.includes("watch")
    ) {
        selectedFilter = "electronics";
    } else if (
        normalizedQuery.includes("fashion") ||
        normalizedQuery.includes("shoe") ||
        normalizedQuery.includes("running")
    ) {
        selectedFilter = "fashion";
    } else if (normalizedQuery.includes("home")) {
        selectedFilter = "home";
    } else if (
        normalizedQuery.includes("beauty") ||
        normalizedQuery.includes("skin")
    ) {
        selectedFilter = "beauty";
    } else if (
        normalizedQuery.includes("sport") ||
        normalizedQuery.includes("basketball")
    ) {
        selectedFilter = "sports";
    } else {
        selectedFilter = "all";
    }

    filters.forEach(filter => {
        filter.classList.toggle(
            "active",
            filter.dataset.filter === selectedFilter
        );
    });

    filterProducts(query);

    document.getElementById("resultsSection").scrollIntoView({
        behavior: "smooth"
    });

    document.getElementById("resultsTitle").textContent =
        `Results for "${query}"`;

    document.getElementById("resultsDescription").textContent =
        "Smart matches based on your search.";

    showToast(`Smart search completed for "${query}"`);
}

function filterProducts(searchTerm = "") {
    const query = searchTerm.toLowerCase().trim();
    let visibleCount = 0;

    productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch =
            !query ||
            name.includes(query) ||
            category.includes(query) ||
            query.includes(category);

        const matchesFilter =
            selectedFilter === "all" ||
            category === selectedFilter;

        const visible = matchesSearch && matchesFilter;

        card.style.display = visible ? "" : "none";

        if (visible) {
            visibleCount++;
        }
    });

    emptyState.style.display =
        visibleCount === 0 ? "block" : "none";
}

searchBtn.addEventListener("click", () => {
    performSearch(searchInput.value);
});

smartSearchBtn.addEventListener("click", () => {
    performSearch(heroSearch.value);
});

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        performSearch(searchInput.value);
    }
});

heroSearch.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        performSearch(heroSearch.value);
    }
});

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    heroSearch.value = "";
    selectedFilter = "all";

    filters.forEach(filter => {
        filter.classList.toggle(
            "active",
            filter.dataset.filter === "all"
        );
    });

    document.getElementById("resultsTitle").textContent =
        "Recommended for you";

    document.getElementById("resultsDescription").textContent =
        "Personalized products based on popular searches.";

    filterProducts();

    searchInput.focus();
});

document.querySelectorAll("[data-query]").forEach(button => {
    button.addEventListener("click", () => {
        const query = button.dataset.query;

        heroSearch.value = query;
        searchInput.value = query;

        performSearch(query);
    });
});

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));

        filter.classList.add("active");

        selectedFilter = filter.dataset.filter;

        filterProducts(searchInput.value);

        document.getElementById("resultsSection").scrollIntoView({
            behavior: "smooth"
        });
    });
});

sortSelect.addEventListener("change", () => {
    const products = [...productCards];

    if (sortSelect.value === "price-low") {
        products.sort(
            (a, b) =>
                Number(a.dataset.price) -
                Number(b.dataset.price)
        );
    }

    if (sortSelect.value === "price-high") {
        products.sort(
            (a, b) =>
                Number(b.dataset.price) -
                Number(a.dataset.price)
        );
    }

    if (sortSelect.value === "rating") {
        products.sort(
            (a, b) =>
                Number(b.dataset.rating) -
                Number(a.dataset.rating)
        );
    }

    if (sortSelect.value === "recommended") {
        products.sort(
            (a, b) =>
                Number(b.dataset.rating) -
                Number(a.dataset.rating)
        );
    }

    products.forEach(product => {
        productGrid.appendChild(product);
    });

    filterProducts(searchInput.value);
});

document.querySelectorAll(".heart").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
            showToast("Added to wishlist");
        } else {
            button.textContent = "♡";
            showToast("Removed from wishlist");
        }
    });
});

document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                name,
                price,
                quantity: 1
            });
        }

        updateCart();
        showToast(`${name} added to cart`);
    });
});

function updateCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>Add products to continue.</p>
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
            <div class="cart-item-icon">🛍️</div>

            <div class="cart-item-info">
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

checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    showToast("Checkout started!");
});

document.getElementById("gridView").addEventListener("click", () => {
    productGrid.classList.remove("list-mode");

    document.getElementById("gridView").classList.add("active");
    document.getElementById("listView").classList.remove("active");
});

document.getElementById("listView").addEventListener("click", () => {
    productGrid.classList.add("list-mode");

    document.getElementById("listView").classList.add("active");
    document.getElementById("gridView").classList.remove("active");
});

document.getElementById("voiceBtn").addEventListener("click", () => {
    showToast("Voice search activated");
});

filterProducts();
updateCart();