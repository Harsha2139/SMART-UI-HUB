function login() {
    alert("Login page coming soon!");
}


function goToDashboard() {

    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });

}


function checkPNR() {

    alert(
        "PNR Status\n\n" +
        "PNR: 4215689347\n" +
        "Status: Confirmed\n" +
        "Train: Chennai Express\n" +
        "Coach: S4\n" +
        "Seat: 42"
    );

}


function trackTrain() {

    alert(
        "Train Tracking\n\n" +
        "Train: Chennai Express\n" +
        "Train Number: 12627\n" +
        "Current Location: Chennai Central\n" +
        "Status: Running On Time\n" +
        "Next Station: Arakkonam"
    );

}


function downloadTicket() {

    alert(
        "Ticket download started!\n\n" +
        "Your ticket PDF will be available shortly."
    );

}


function viewBooking() {

    alert(
        "Booking Details\n\n" +
        "Train: Chennai Express\n" +
        "Route: Chennai → Bengaluru\n" +
        "PNR: 4215689347\n" +
        "Coach: S4\n" +
        "Seat: 42\n" +
        "Status: Confirmed"
    );

}


function showHelp() {

    alert(
        "RailPNR Support\n\n" +
        "For help with railway bookings, " +
        "please contact customer support."
    );

}