function login() {
    alert("Sign In page coming soon!");
}


function searchContent() {

    const content = prompt(
        "Search for a movie or series:"
    );

    if (content && content.trim() !== "") {

        alert(
            "Searching for:\n\n" +
            content.trim() +
            "\n\nResults will appear here."
        );

    }
}


function startWatching() {

    alert(
        "Starting Movie\n\n" +
        "Shadow Warriors\n\n" +
        "The video player will open here."
    );

}


function showDetails() {

    alert(
        "Shadow Warriors\n\n" +
        "Year: 2026\n" +
        "Duration: 2h 25m\n" +
        "Genre: Action\n\n" +
        "An ancient enemy returns."
    );

}


function viewAllMovies() {

    document.getElementById("movies").scrollIntoView({
        behavior: "smooth"
    });

}


function playMovie(movieName) {

    alert(
        "Playing Movie\n\n" +
        movieName +
        "\n\n" +
        "Video player will open here."
    );

}


function continueMovie() {

    alert(
        "Your Continue Watching movies are shown above."
    );

}


function viewAllSeries() {

    document.getElementById("series").scrollIntoView({
        behavior: "smooth"
    });

}


function playSeries(seriesName) {

    alert(
        "Playing Series\n\n" +
        seriesName +
        "\n\n" +
        "Series player will open here."
    );

}


function openGenre(genre) {

    alert(
        "Genre Selected\n\n" +
        genre +
        "\n\n" +
        "Movies from this genre will appear here."
    );

}


function explorePlans() {

    alert(
        "Streaming Plans\n\n" +
        "Basic Plan\n" +
        "Standard Plan\n" +
        "Premium Plan\n\n" +
        "Plan selection coming soon!"
    );

}