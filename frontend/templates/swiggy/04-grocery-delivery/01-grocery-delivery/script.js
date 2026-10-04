// LOGIN

document.getElementById("loginBtn").onclick = function () {
    alert("Login page opened.");
};


// START SHOPPING

document.getElementById("shopBtn").onclick = function () {

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

};


// CATEGORY BUTTONS

const categoryButtons = document.querySelectorAll(".categoryBtn");

categoryButtons.forEach(function (button) {

    button.onclick = function () {

        const category = this.getAttribute("data-category");

        document.getElementById("productMessage").textContent =
            "Showing " + category;

        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });

    };

});


// CART

let cart = [];

const addButtons = document.querySelectorAll(".addBtn");

addButtons.forEach(function (button) {

    button.onclick = function () {

        const name = this.getAttribute("data-name");
        const price = Number(this.getAttribute("data-price"));

        cart.push({
            name: name,
            price: price
        });

        updateCart();

        alert(name + " added to cart.");

    };

});


// UPDATE CART

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add groceries to start shopping.
                </p>

            </div>
        `;

        cartCount.textContent = "0 items";
        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;


    cart.forEach(function (item, index) {

        total += item.price;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-item-info">

                <strong>${item.name}</strong>

                <span>₹${item.price}</span>

            </div>

            <button class="removeBtn" type="button">
                Remove
            </button>
        `;


        div.querySelector(".removeBtn").onclick = function () {

            cart.splice(index, 1);

            updateCart();

        };


        cartItems.appendChild(div);

    });


    cartCount.textContent =
        cart.length +
        (cart.length === 1 ? " item" : " items");

    cartTotal.textContent = "₹" + total;

}


// CHECKOUT

document.getElementById("checkoutBtn").onclick = function () {

    if (cart.length === 0) {

        alert("Your cart is empty.");

    } else {

        alert("Grocery order placed successfully!");

        cart = [];

        updateCart();

    }

};


// OFFER

document.getElementById("offerBtn").onclick = function () {

    alert(
        "Coupon GROCERY100 applied!"
    );

};