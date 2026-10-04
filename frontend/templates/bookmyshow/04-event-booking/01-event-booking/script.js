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


/* SEARCH EVENTS */

function searchEvents() {

    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput.value.trim();

    if (search === "") {

        alert(
            "Please enter an event name."
        );

        return;
    }

    alert(
        "Searching for events related to:\n\n" +
        search
    );
}


/* FIND EVENTS */

function findEvents() {

    const eventName =
        document.getElementById("eventName").value.trim();

    const city =
        document.getElementById("eventCity").value;

    const date =
        document.getElementById("eventDate").value;

    if (eventName === "") {

        alert(
            "Please enter an event name."
        );

        return;
    }

    let message =
        "Searching Events\n\n" +
        "Event: " + eventName + "\n" +
        "City: " + city;

    if (date !== "") {

        message +=
            "\nDate: " + date;
    }

    alert(message);
}


/* FEATURED EVENT BOOKING */

function bookFeaturedEvent() {

    document.getElementById(
        "selectedEvent"
    ).value =
        "Chennai Music Festival 2026";

    document.getElementById(
        "bookingSection"
    ).scrollIntoView({
        behavior: "smooth"
    });

    updatePrice();
}


/* VIEW EVENT DETAILS */

function viewEventDetails() {

    alert(
        "Chennai Music Festival 2026\n\n" +
        "Date: 18 October 2026\n" +
        "Venue: Marina Convention Centre\n" +
        "Duration: 3 Hours\n" +
        "Tickets from ₹799"
    );
}


/* CATEGORY */

function openCategory(category) {

    alert(
        "Opening " +
        category +
        " events."
    );

    document
        .querySelector(".events")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* BOOK EVENT */

function bookEvent(eventName) {

    document.getElementById(
        "selectedEvent"
    ).value = eventName;

    document
        .querySelector(".booking-section")
        .scrollIntoView({
            behavior: "smooth"
        });

    updatePrice();
}


/* VIEW ALL EVENTS */

function viewAllEvents() {

    alert(
        "Loading all available events..."
    );
}


/* UPDATE PRICE */

function updatePrice() {

    const ticketCount =
        parseInt(
            document.getElementById(
                "ticketCount"
            ).value
        );

    const ticketType =
        parseInt(
            document.getElementById(
                "ticketType"
            ).value
        );

    const total =
        ticketCount * ticketType;

    document.getElementById(
        "totalPrice"
    ).innerText =
        "₹" + total.toLocaleString("en-IN");
}


/* CONFIRM BOOKING */

function confirmBooking() {

    const eventName =
        document.getElementById(
            "selectedEvent"
        ).value;

    const ticketCount =
        parseInt(
            document.getElementById(
                "ticketCount"
            ).value
        );

    const ticketType =
        parseInt(
            document.getElementById(
                "ticketType"
            ).value
        );

    const total =
        ticketCount * ticketType;

    alert(
        "Booking Summary\n\n" +
        "Event: " + eventName + "\n" +
        "Tickets: " + ticketCount + "\n" +
        "Ticket Price: ₹" +
        ticketType.toLocaleString("en-IN") +
        "\nTotal: ₹" +
        total.toLocaleString("en-IN") +
        "\n\nProceeding to payment."
    );
}


/* PRICE EVENTS */

document
    .getElementById("ticketCount")
    .addEventListener(
        "change",
        updatePrice
    );


document
    .getElementById("ticketType")
    .addEventListener(
        "change",
        updatePrice
    );


/* INITIAL PRICE */

updatePrice();