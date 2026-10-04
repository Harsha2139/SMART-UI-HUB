/* LOGIN */

function login() {

    alert(
        "Sign In\n\n" +
        "The login page would open here."
    );
}


/* CHANGE CITY */

function changeCity() {

    const city = prompt(
        "Enter your city:",
        "Chennai"
    );

    if (city && city.trim() !== "") {

        document.querySelector(".location").innerHTML =
            "📍 " + city.trim();

        alert(
            "Location changed to " +
            city.trim()
        );
    }
}


/* SEARCH */

function searchEvents() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .trim();

    if (search === "") {

        alert(
            "Please enter an event name."
        );

        return;
    }

    alert(
        "Searching for:\n\n" +
        search
    );
}


/* EXPLORE EVENTS */

function exploreEvents() {

    document
        .getElementById("eventsSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* FEATURED */

function showFeatured() {

    document
        .querySelector(".featured")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* DISCOVER EVENTS */

function discoverEvents() {

    const type =
        document
            .getElementById("eventType")
            .value
            .trim();

    const city =
        document
            .getElementById("citySelect")
            .value;

    const date =
        document
            .getElementById("dateFilter")
            .value;

    let message =
        "Event Discovery\n\n" +
        "City: " + city + "\n" +
        "Date: " + date;

    if (type !== "") {

        message +=
            "\nEvent Type: " + type;
    }

    alert(message);
}


/* CATEGORY FILTER */

function filterCategory(category) {

    alert(
        "Showing " +
        category +
        " events."
    );

    document
        .getElementById("eventsSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* BOOK EVENT */

function bookEvent(eventName) {

    alert(
        "Opening booking for:\n\n" +
        eventName +
        "\n\nYou can select tickets on the booking page."
    );
}


/* VIEW ALL */

function viewAllEvents() {

    alert(
        "Loading all available events..."
    );
}


/* SUBSCRIBE */

function subscribe() {

    const email =
        document
            .getElementById("emailInput")
            .value
            .trim();

    if (email === "") {

        alert(
            "Please enter your email address."
        );

        return;
    }

    if (!email.includes("@")) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }

    alert(
        "Subscribed successfully!\n\n" +
        "Updates will be sent to:\n" +
        email
    );

    document.getElementById(
        "emailInput"
    ).value = "";
}