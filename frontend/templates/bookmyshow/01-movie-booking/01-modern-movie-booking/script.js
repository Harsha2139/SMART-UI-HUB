function login() {
    alert("Sign in page opened.");
}

function changeLocation() {
    const city = prompt(
        "Enter your city:",
        "Chennai"
    );

    if (city && city.trim() !== "") {
        document.querySelector(".location-btn").textContent =
            "📍 " + city.trim();

        alert("Location changed to " + city.trim());
    }
}

function searchMovie() {

    const search =
        document.getElementById("movieSearch").value.trim();

    if (search === "") {
        alert("Please enter a movie, event or theatre.");
        return;
    }

    alert("Searching for: " + search);
}

function browseMovies() {

    document.getElementById("movies").scrollIntoView({
        behavior: "smooth"
    });
}

function viewAllMovies() {
    alert("Showing all available movies.");
}

function bookMovie(movie) {

    alert(
        "Booking started for " +
        movie +
        ". Select your theatre and show time next."
    );
}

function findShows() {

    const city = document.getElementById("city").value;
    const movie = document.getElementById("movie").value;
    const date = document.getElementById("date").value;

    if (city === "" || movie === "" || date === "") {
        alert("Please select city, movie and date.");
        return;
    }

    alert(
        "Shows found!\n\n" +
        "City: " + city +
        "\nMovie: " + movie +
        "\nDate: " + date
    );
}

function bookTheatre(theatre) {

    alert(
        "Showing available movies and timings at " +
        theatre + "."
    );
}

function showEvents() {

    document.getElementById("events").scrollIntoView({
        behavior: "smooth"
    });
}

function showOffers() {

    document.getElementById("offers").scrollIntoView({
        behavior: "smooth"
    });
}