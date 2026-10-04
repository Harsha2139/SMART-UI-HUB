// LOGIN BUTTON

document.getElementById("loginBtn").onclick = function () {
    alert("Login page opened.");
};


// SEARCH BUTTON

document.getElementById("searchBtn").onclick = function () {

    let searchInput = document.getElementById("searchInput");
    let searchText = searchInput.value.trim();

    if (searchText === "") {
        alert("Please enter a restaurant or food name.");
    } else {
        alert("Searching for: " + searchText);
    }

};


// FOOD CATEGORY BUTTONS

let categories = document.querySelectorAll(".category");

categories.forEach(function (category) {

    category.onclick = function () {

        let food = this.getAttribute("data-food");

        document.getElementById("searchInput").value = food;

        alert("Searching for " + food);

    };

});


// ORDER BUTTONS

let orderButtons = document.querySelectorAll(".orderBtn");

orderButtons.forEach(function (button) {

    button.onclick = function () {

        let restaurant =
            this.parentElement.querySelector("h3").textContent;

        alert("Order started from " + restaurant);

    };

});


// VIEW ALL BUTTON

document.getElementById("viewAllBtn").onclick = function () {

    alert("Showing all restaurants.");

};


// COUPON BUTTON

document.getElementById("couponBtn").onclick = function () {

    let button = document.getElementById("couponBtn");

    button.textContent = "Copied!";

    alert("Coupon code WELCOME50 copied.");

    setTimeout(function () {
        button.textContent = "Copy Code";
    }, 1500);

};