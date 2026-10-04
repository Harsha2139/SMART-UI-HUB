function login() {

    alert(
        "Sign In page coming soon!"
    );

}


function changeCity() {

    const city = prompt(
        "Enter your city:\n\n" +
        "Chennai\n" +
        "Bengaluru\n" +
        "Hyderabad\n" +
        "Mumbai\n" +
        "Delhi"
    );

    if (city && city.trim() !== "") {

        alert(
            "Location changed to " +
            city.trim() +
            "!"
        );

    }

}


function findTheatres() {

    document
        .getElementById("theatres")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function searchTheatres() {

    const city =
        document.getElementById("city").value;

    const movie =
        document.getElementById("movie").value;

    const date =
        document.getElementById("date").value;


    if (movie === "") {

        alert("Please select a movie.");

        return;

    }


    if (date === "") {

        alert("Please select a date.");

        return;

    }


    alert(
        "Shows Found!\n\n" +
        "City: " + city + "\n" +
        "Movie: " + movie + "\n" +
        "Date: " + date +
        "\n\n" +
        "Available theatres will appear here."
    );

}


function showAllTheatres() {

    document
        .getElementById("theatres")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function bookTheatre(theatreName) {

    alert(
        "Theatre Selected\n\n" +
        theatreName +
        "\n\n" +
        "Choose a movie and showtime to continue."
    );

}


function selectShow(showTime) {

    alert(
        "Showtime Selected\n\n" +
        showTime +
        "\n\n" +
        "Proceeding to seat selection."
    );

}


function showOffers() {

    alert(
        "SPECIAL OFFERS\n\n" +
        "Get 20% OFF on selected bookings.\n\n" +
        "Use Code: MOVIE20"
    );

}