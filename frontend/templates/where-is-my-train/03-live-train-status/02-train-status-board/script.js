function login() {
    alert("Login page coming soon!");
}


function goToBoard() {

    document.getElementById("board").scrollIntoView({
        behavior: "smooth"
    });

}


function searchTrains() {

    const searchValue =
        document.getElementById("trainSearch").value
        .toLowerCase()
        .trim();

    const rows =
        document.querySelectorAll(".train-row");


    rows.forEach(function(row) {

        const searchText =
            row.getAttribute("data-search");

        if (searchText.includes(searchValue)) {

            row.style.display = "grid";

        } else {

            row.style.display = "none";

        }

    });

}


function refreshBoard() {

    const statuses = [
        "On Time",
        "Delayed 5 min",
        "Arriving",
        "On Time"
    ];

    const statusElements =
        document.querySelectorAll(".status");


    statusElements.forEach(function(status, index) {

        const newStatus =
            statuses[index % statuses.length];

        status.textContent = newStatus;

        status.className = "status";


        if (newStatus === "On Time") {

            status.classList.add("on-time");

        } else if (newStatus === "Arriving") {

            status.classList.add("arriving");

        } else {

            status.classList.add("delayed");

        }

    });


    alert("Train board updated successfully!");

}


function showRoute(route) {

    alert(
        "Route Information\n\n" +
        route +
        "\n\nTrain schedules are available for this route."
    );

}


function showHelp() {

    alert(
        "RailBoard Support\n\n" +
        "For help with train status and railway information, " +
        "please contact customer support."
    );

}