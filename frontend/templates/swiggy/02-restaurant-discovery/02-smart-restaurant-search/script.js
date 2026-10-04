// LOGIN

document.getElementById("loginBtn").onclick = function () {
    alert("Login page opened.");
};


// SEARCH

document.getElementById("searchBtn").onclick = function () {

    const input = document.getElementById("searchInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter something to search.");
        return;
    }

    document.getElementById("resultTitle").textContent =
        "Results for: " + text;

    alert("Searching for: " + text);

};


// QUICK SEARCH

const quickButtons = document.querySelectorAll(".quickBtn");

quickButtons.forEach(function (button) {

    button.onclick = function () {

        const food = this.textContent;

        document.getElementById("searchInput").value = food;

        document.getElementById("resultTitle").textContent =
            "Results for: " + food;

    };

});


// RESTAURANT BUTTONS

const orderButtons = document.querySelectorAll(".orderBtn");

orderButtons.forEach(function (button) {

    button.onclick = function () {

        const restaurant =
            this.parentElement.querySelector("h3").textContent;

        alert("Opening " + restaurant);

    };

});


// COUPON

document.getElementById("couponBtn").onclick = function () {

    this.textContent = "Copied!";

    alert("Coupon code FIRST50 copied.");

    setTimeout(function () {

        document.getElementById("couponBtn").textContent =
            "Copy Code";

    }, 1500);

};