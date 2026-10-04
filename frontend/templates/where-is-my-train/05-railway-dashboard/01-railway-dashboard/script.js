function login() {
    alert("Login page coming soon!");
}


function goToDashboard() {

    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });

}


function refreshDashboard() {

    alert(
        "Dashboard refreshed successfully!\n\n" +
        "Train information is up to date."
    );

}


function viewTrains() {

    document.getElementById("trains").scrollIntoView({
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


function viewPassengers() {

    alert(
        "Passenger Report\n\n" +
        "Total Passengers Today: 8,540\n" +
        "Confirmed: 7,920\n" +
        "Waiting List: 620"
    );

}


function showAlerts() {

    document.getElementById("alerts").scrollIntoView({
        behavior: "smooth"
    });

}


function showHelp() {

    alert(
        "RailDesk Support\n\n" +
        "For railway dashboard support, " +
        "please contact customer support."
    );

}