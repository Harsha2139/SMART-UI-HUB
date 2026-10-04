function login() {
    alert("Sign In page coming soon!");
}


function openSearch() {

    const movie = prompt(
        "What movie or series are you looking for?"
    );

    if (movie && movie.trim() !== "") {

        alert(
            "Searching for:\n\n" +
            movie.trim() +
            "\n\nResults will appear here."
        );

    }
}


function watchFeatured() {

    alert(
        "Now Playing\n\n" +
        "The Last Adventure\n\n" +
        "Streaming will start here."
    );

}


function showFeaturedInfo() {

    alert(
        "The Last Adventure\n\n" +
        "Year: 2026\n" +
        "Duration: 2h 18m\n" +
        "Genre: Action / Adventure\n\n" +
        "A legendary journey begins."
    );

}


function showAllMovies() {

    document.getElementById("trending").scrollIntoView({
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


function continueWatching() {

    alert(
        "Your Continue Watching list is displayed above."
    );

}


function playSeries(seriesName) {

    alert(
        "Playing Series\n\n" +
        seriesName +
        "\n\n" +
        "Series player will open here."
    );

}


function showSeries() {

    document.getElementById("series").scrollIntoView({
        behavior: "smooth"
    });

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