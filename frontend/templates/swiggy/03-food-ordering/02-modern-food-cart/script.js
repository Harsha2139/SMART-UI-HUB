// LOGIN

document.getElementById("loginBtn").onclick = function () {
    alert("Login page opened.");
};


// START ORDERING

document.getElementById("startBtn").onclick = function () {

    document.getElementById("food").scrollIntoView({
        behavior: "smooth"
    });

};


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

    const itemCount = document.getElementById("itemCount");

    const subtotalElement = document.getElementById("subtotal");

    const deliveryElement = document.getElementById("delivery");

    const discountElement = document.getElementById("discount");

    const totalElement = document.getElementById("total");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious food to get started.
                </p>

            </div>
        `;

        cartCount.textContent = "0 items";

        itemCount.textContent = "0 items";

        subtotalElement.textContent = "₹0";

        deliveryElement.textContent = "₹0";

        discountElement.textContent = "₹0";

        totalElement.textContent = "₹0";

        return;
    }


    let subtotal = 0;


    cart.forEach(function (item, index) {

        subtotal += item.price;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <strong>${item.name}</strong>

                <span>₹${item.price}</span>

            </div>

            <button
                class="removeBtn"
                type="button">
                Remove
            </button>

        `;


        cartItem.querySelector(".removeBtn").onclick = function () {

            cart.splice(index, 1);

            updateCart();

        };


        cartItems.appendChild(cartItem);

    });


    const delivery = 40;

    const discount = subtotal >= 500 ? 50 : 0;

    const total = subtotal + delivery - discount;


    cartCount.textContent =
        cart.length +
        (cart.length === 1 ? " item" : " items");


    itemCount.textContent =
        cart.length +
        (cart.length === 1 ? " item" : " items");


    subtotalElement.textContent =
        "₹" + subtotal;


    deliveryElement.textContent =
        "₹" + delivery;


    discountElement.textContent =
        "-₹" + discount;


    totalElement.textContent =
        "₹" + total;

}


// CHECKOUT

document.getElementById("checkoutBtn").onclick = function () {

    if (cart.length === 0) {

        alert("Your cart is empty. Add some food first.");

    } else {

        alert("Order placed successfully!");

        cart = [];

        updateCart();

    }

};


// OFFER

document.getElementById("offerBtn").onclick = function () {

    alert(
        "FIRST50 applied! You can get a special discount on your order."
    );

};