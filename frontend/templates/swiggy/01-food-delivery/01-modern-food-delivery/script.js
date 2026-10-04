// ================================
// SWIGGY MODERN FOOD DELIVERY
// ================================


// LOGIN BUTTON
const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function () {
    alert("Login feature coming soon!");
});


// SEARCH
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        alert("Please enter a restaurant or dish.");
        return;
    }

    alert("Searching for: " + searchText);
});


// SEARCH USING ENTER KEY
searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// FOOD CATEGORIES
const categories = document.querySelectorAll(".category");

categories.forEach(function (category) {

    category.addEventListener("click", function () {

        const foodName = category.getAttribute("data-food");

        searchInput.value = foodName;

        searchInput.focus();

    });

});


// ORDER BUTTONS
const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const restaurantName = button.getAttribute("data-name");

        alert(
            "You selected " +
            restaurantName +
            ".\n\nYour order page will open soon!"
        );

    });

});


// COPY COUPON
const copyBtn = document.getElementById("copyBtn");
const couponCode = document.getElementById("couponCode");

copyBtn.addEventListener("click", function () {

    navigator.clipboard.writeText(couponCode.textContent);

    copyBtn.textContent = "Copied!";

    setTimeout(function () {
        copyBtn.textContent = "Copy";
    }, 2000);

});


// VIEW ALL
const viewAllBtn = document.getElementById("viewAllBtn");

viewAllBtn.addEventListener("click", function () {

    alert("More restaurants will be available soon!");

});


// HEADER NAVIGATION
const navLinks = document.querySelectorAll(".header nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.style.color = "#333";
        });

        link.style.color = "#fc8019";

    });

});


// SIMPLE SCROLL EFFECT
window.addEventListener("scroll", function () {

    const header = document.querySelector(".header");

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }

});