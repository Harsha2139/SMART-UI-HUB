function login() {
    alert("Login page coming soon!");
}


function goToDashboard() {

    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });

}


function refreshData() {

    alert(
        "Dashboard refreshed successfully!\n\n" +
        "Latest railway information has been loaded."
    );

}


function viewTrains() {

    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });

}


function viewSchedule() {

    document.getElementById("schedule").scrollIntoView({
        behavior: "smooth"
    });

}


function viewPlatforms() {

    alert(
        "Platform Status\n\n" +
        "Platform 1: Shatabdi Express\n" +
        "Platform 2: Bengaluru Express\n" +
        "Platform 4: Chennai Express\n" +
        "Platform 6: Hyderabad Express"
    );

}


function showAlerts() {

    document.querySelector(".alerts-section").scrollIntoView({
        behavior: "smooth"
    });

}


function showHelp() {

    alert(
        "RailHub Support\n\n" +
        "For railway dashboard support, " +
        "please contact customer support."
    );

}