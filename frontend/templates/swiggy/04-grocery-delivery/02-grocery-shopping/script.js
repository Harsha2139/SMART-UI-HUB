let cart = [];

function login() {
    alert("Login page coming soon!");
}

function startShopping() {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "0";

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>
                    ₹${item.price} × ${item.quantity}
                    = ₹${item.price * item.quantity}
                </p>
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total;
}

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];

    updateCart();
}

function applyCoupon() {

    alert(
        "Coupon GROCERY100 applied!\n\n" +
        "You can get ₹100 OFF on your grocery order."
    );
}

function searchProducts() {

    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const name =
            product
            .getAttribute("data-name")
            .toLowerCase();

        if (name.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}

function filterCategory(category) {

    const products =
        document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productCategory =
            product.getAttribute("data-category");

        if (
            category === "All" ||
            productCategory === category
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}

updateCart();