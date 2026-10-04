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


/* MOVIES */

function exploreMovies() {

    document
        .getElementById("moviesSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function viewAllMovies() {

    alert(
        "Loading all available movies..."
    );
}


function bookMovie(movieName) {

    alert(
        "Opening movie booking for:\n\n" +
        movieName
    );
}


function watchFeatured() {

    alert(
        "Shadow Warriors\n\n" +
        "Action • Thriller\n" +
        "Rating: 8.5/10\n\n" +
        "Opening movie details..."
    );
}


/* EVENTS */

function exploreEvents() {

    document
        .getElementById("eventsSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function viewAllEvents() {

    alert(
        "Loading all upcoming events..."
    );
}


function bookEvent(eventName) {

    alert(
        "Opening event booking for:\n\n" +
        eventName
    );
}


/* BOOKINGS */

function viewBookings() {

    alert(
        "My Bookings\n\n" +
        "Shadow Warriors - Confirmed\n" +
        "Live Beats Concert - Confirmed\n" +
        "The Grand Play - Completed"
    );
}


/* THEATRES */

function findTheatres() {

    alert(
        "Finding theatres near Chennai..."
    );
}


/* OFFERS */

function showOffer(offerName) {

    alert(
        offerName +
        "\n\n" +
        "This offer would open in the offers section."
    );
}