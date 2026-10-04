let selectedSeats = [];

const ticketPrice = 220;


/* LOGIN */

function login() {
    alert("Sign in page opened.");
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

        alert("Location changed to " + city.trim());
    }
}


/* SEARCH */

function searchMovie() {

    const search = document
        .getElementById("searchInput")
        .value
        .trim();

    if (search === "") {

        alert("Please enter a movie or event name.");

    } else {

        alert(
            "Searching for: " + search
        );
    }
}


/* CHOOSE SHOW */

function selectShow() {

    document
        .querySelector(".seat-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* VIEW MOVIE */

function viewMovie() {

    alert(
        "Shadow Warriors\n\n" +
        "Genre: Action, Thriller\n" +
        "Duration: 2h 25m\n" +
        "Rating: 8.5/10"
    );
}


/* SEAT SELECTION */

function selectSeat(button) {

    if (button.classList.contains("sold")) {
        return;
    }

    const seatNumber = button.innerText;

    if (button.classList.contains("selected")) {

        button.classList.remove("selected");

        selectedSeats = selectedSeats.filter(
            seat => seat !== seatNumber
        );

    } else {

        if (selectedSeats.length >= 6) {

            alert("You can select a maximum of 6 seats.");

            return;
        }

        button.classList.add("selected");

        selectedSeats.push(seatNumber);
    }

    updateSummary();
}


/* UPDATE SUMMARY */

function updateSummary() {

    const seatText =
        selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "None";

    document.getElementById(
        "selectedSeats"
    ).innerText = seatText;

    document.getElementById(
        "ticketCount"
    ).innerText = selectedSeats.length;

    const total =
        selectedSeats.length * ticketPrice;

    document.getElementById(
        "totalPrice"
    ).innerText = "₹" + total;
}


/* CONTINUE BOOKING */

function continueBooking() {

    if (selectedSeats.length === 0) {

        alert(
            "Please select at least one seat."
        );

        return;
    }

    const total =
        selectedSeats.length * ticketPrice;

    alert(
        "Booking Summary\n\n" +
        "Movie: Shadow Warriors\n" +
        "Theatre: INOX Marina Mall\n" +
        "Seats: " + selectedSeats.join(", ") + "\n" +
        "Tickets: " + selectedSeats.length + "\n" +
        "Total: ₹" + total +
        "\n\nProceeding to payment."
    );
}


/* BOOK OTHER MOVIE */

function bookMovie(movieName) {

    alert(
        "Opening booking for " +
        movieName
    );
}


/* EXTRA FUNCTION */

function refreshSeats() {

    selectedSeats = [];

    const seats =
        document.querySelectorAll(".seat.selected");

    seats.forEach(function(seat) {
        seat.classList.remove("selected");
    });

    updateSummary();
}