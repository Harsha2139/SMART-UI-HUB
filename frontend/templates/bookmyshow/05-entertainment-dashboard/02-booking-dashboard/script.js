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

function searchContent() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .trim();

    if (search === "") {

        alert(
            "Please enter something to search."
        );

        return;
    }

    alert(
        "Searching for:\n\n" +
        search
    );
}


/* UPCOMING */

function viewUpcoming() {

    document
        .getElementById("upcomingSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* HISTORY */

function viewHistory() {

    document
        .getElementById("historySection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ALL BOOKINGS */

function viewAllBookings() {

    alert(
        "Your Bookings\n\n" +
        "Upcoming: 3\n" +
        "Completed: 3\n" +
        "Cancelled: 1"
    );
}


/* OPEN BOOKING */

function openBooking(bookingName) {

    alert(
        "Booking Details\n\n" +
        bookingName +
        "\n\n" +
        "Your ticket details would open here."
    );
}


/* CANCEL BOOKING */

function cancelBooking(bookingName) {

    const confirmCancel =
        confirm(
            "Do you want to cancel this booking?\n\n" +
            bookingName
        );

    if (confirmCancel) {

        alert(
            bookingName +
            "\n\nBooking cancellation request submitted."
        );
    }
}


/* PAYMENT */

function viewPayments() {

    alert(
        "Payment History\n\n" +
        "Movies: ₹5,240\n" +
        "Events: ₹6,120\n" +
        "Other: ₹1,040\n\n" +
        "Total: ₹12,400"
    );
}


/* QUICK ACTIONS */

function findMovies() {

    alert(
        "Opening movie booking..."
    );
}


function findEvents() {

    alert(
        "Opening event discovery..."
    );
}


function findTheatres() {

    alert(
        "Finding theatres near Chennai..."
    );
}


function openOffers() {

    alert(
        "Opening available offers..."
    );
}