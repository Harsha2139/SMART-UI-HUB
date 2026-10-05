const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const productGrid = document.getElementById("productGrid");
const productCards = [...document.querySelectorAll(".product-card")];
const categoryButtons = [...document.querySelectorAll(".category")];
const sortSelect = document.getElementById("sortSelect");
const noResults = document.getElementById("noResults");

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

let selectedCategory = "all";
let cart = [];

function showToast(message) {
    toast.querySelector("p").textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

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

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleProducts = 0;

    productCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const category = card.dataset.category;

        const matchesSearch = name.includes(searchTerm);
        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        card.style.display = shouldShow ? "" : "block";

        if (shouldShow) {
            visibleProducts++;
        }
    });

    noResults.style.display = visibleProducts === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterProducts);
searchBtn.addEventListener("click", filterProducts);

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(item => item.classList.remove("active"));

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        filterProducts();

        document.getElementById("productsSection").scrollIntoView({
            behavior: "smooth"
        });
    });
});

sortSelect.addEventListener("change", () => {
    const products = [...productCards];

    if (sortSelect.value === "price-low") {
        products.sort((a, b) =>
            Number(a.dataset.price) - Number(b.dataset.price)
        );
    }

    if (sortSelect.value === "price-high") {
        products.sort((a, b) =>
            Number(b.dataset.price) - Number(a.dataset.price)
        );
    }

    if (sortSelect.value === "rating") {
        products.sort((a, b) =>
            Number(b.dataset.rating) - Number(a.dataset.rating)
        );
    }

    if (sortSelect.value === "featured") {
        products.sort((a, b) =>
            Number(b.dataset.rating) - Number(a.dataset.rating)
        );
    }

    products.forEach(product => productGrid.appendChild(product));

    filterProducts();
});

document.querySelectorAll(".heart-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");

        if (button.classList.contains("liked")) {
            button.textContent = "♥";
            showToast("Added to your wishlist!");
        } else {
            button.textContent = "♡";
            showToast("Removed from wishlist");
        }
    });
});

document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
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
                <p>Add products to see them here.</p>
            </div>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";
        return;
    }

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-icon">🛍️</div>

            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</span>
            </div>

            <button class="remove-item" data-index="${index}">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = `₹${total.toLocaleString("en-IN")}`;

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.index);

            cart.splice(index, 1);
            updateCart();

            showToast("Product removed from cart");
        });
    });
}

document.getElementById("exploreBtn").addEventListener("click", () => {
    document.getElementById("productsSection").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("trendingBtn").addEventListener("click", () => {
    selectedCategory = "all";

    categoryButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === "all"
        );
    });

    document.getElementById("productsSection").scrollIntoView({
        behavior: "smooth"
    });

    showToast("Showing all trending products");
});

document.getElementById("allCategoriesBtn").addEventListener("click", () => {
    categoryButtons.forEach(button => {
        button.classList.remove("active");
    });

    categoryButtons[0].classList.add("active");
    selectedCategory = "all";

    filterProducts();

    window.scrollTo({
        top: document.querySelector(".categories-section").offsetTop - 70,
        behavior: "smooth"
    });
});

document.getElementById("personalizeBtn").addEventListener("click", () => {
    showToast("Your personalized feed is being prepared!");
});

document.getElementById("wishlistBtn").addEventListener("click", () => {
    const likedProducts = document.querySelectorAll(".heart-btn.liked");

    if (likedProducts.length === 0) {
        showToast("Your wishlist is empty");
    } else {
        showToast(`${likedProducts.length} item(s) in your wishlist`);
    }
});

document.querySelector(".checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Add a product before checkout");
        return;
    }

    showToast("Checkout page opened!");
});

filterProducts();
updateCart();