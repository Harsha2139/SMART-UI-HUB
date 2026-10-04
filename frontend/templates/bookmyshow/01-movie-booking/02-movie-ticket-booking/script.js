function login() {
    alert("Sign in page opened.");
}

function changeCity() {

    const city = prompt(
        "Enter your city:",
        "Chennai"
    );

    if (city && city.trim() !== "") {

        document.querySelector(".city-btn").textContent =
            "📍 " + city.trim();

        alert("City changed to " + city.trim());
    }
}

function searchMovie() {

    const search =
        document.getElementById("movieSearch").value.trim();

    if (search === "") {
        alert("Please enter a movie or theatre name.");
        return;
    }

    alert("Searching for: " + search);
}

function startBooking() {

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function showAllMovies() {

    document.getElementById("movies").scrollIntoView({
        behavior: "smooth"
    });
}

function selectMovie(movie) {

    document.getElementById("selectedMovie").value = movie;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function findShows() {

    const city =
        document.getElementById("city").value;

    const movie =
        document.getElementById("selectedMovie").value;

    const date =
        document.getElementById("date").value;

    const theatre =
        document.getElementById("theatre").value;

    if (
        city === "" ||
        movie === "" ||
        date === "" ||
        theatre === ""
    ) {
        alert("Please select all booking details.");
        return;
    }

    alert(
        "Available shows found!\n\n" +
        "City: " + city +
        "\nMovie: " + movie +
        "\nDate: " + date +
        "\nTheatre: " + theatre
    );
}

function selectTheatre(theatre) {

    document.getElementById("theatre").value = theatre;

    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function showOffers() {

    document.getElementById("offers").scrollIntoView({
        behavior: "smooth"
    });
}