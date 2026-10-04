// LOGOUT

document.getElementById("logoutBtn").addEventListener("click", function () {

    alert("You have been logged out.");

});


// NOTIFICATIONS

document.getElementById("notificationBtn").addEventListener("click", function () {

    alert("You have 3 new notifications.");

});


// PROFILE

document.querySelector(".profile").addEventListener("click", function () {

    alert("Profile opened.");

});


// ANALYTICS

document.getElementById("period").addEventListener("change", function () {

    alert("Analytics changed to: " + this.value);

});


// VIEW ALL ORDERS

document.getElementById("allOrders").addEventListener("click", function () {

    alert("All orders are being displayed.");

});


// CUSTOMERS

document.getElementById("customerBtn").addEventListener("click", function () {

    alert("Customer management opened.");

});


// RESTAURANTS

document.getElementById("restaurantBtn").addEventListener("click", function () {

    alert("Restaurant management opened.");

});


// SETTINGS

document.getElementById("settingsBtn").addEventListener("click", function () {

    alert("Settings opened.");

});


// SIDEBAR LINKS

const links = document.querySelectorAll(".sidebar nav a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        links.forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// CURRENT TIME

function updateTime() {

    const now = new Date();

    document.getElementById("time").textContent =
        "Last updated: " +
        now.toLocaleTimeString();

}

updateTime();

setInterval(updateTime, 60000);