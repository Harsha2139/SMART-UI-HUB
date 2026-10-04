function login() {
    alert("Login page coming soon!");
}


function goToStatus() {

    document.getElementById("status").scrollIntoView({
        behavior: "smooth"
    });

}


function trackTrain() {

    const trainNumber =
        document.getElementById("trainNumber").value.trim();

    if (trainNumber === "") {

        alert("Please enter a train number.");

        return;
    }


    const result =
        document.getElementById("statusResult");


    result.innerHTML = `
        <div class="result-card">

            <h3>
                Live Status Found
            </h3>

            <p>
                Train Number:
                <strong>${trainNumber}</strong>
            </p>

            <p>
                Current Location:
                Chennai Central
            </p>

            <p>
                Status:
                Running On Time
            </p>

            <p>
                Next Station:
                Arakkonam
            </p>

        </div>
    `;


    document
        .querySelector(".live-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function refreshStatus() {

    const stations = [
        "Chennai Central",
        "Arakkonam",
        "Katpadi",
        "Bengaluru"
    ];

    const nextStations = [
        "Arakkonam",
        "Katpadi",
        "Bengaluru",
        "Destination Reached"
    ];

    const platforms = [
        "Platform 4",
        "Platform 2",
        "Platform 5",
        "Platform 1"
    ];


    const randomIndex =
        Math.floor(Math.random() * stations.length);


    document.getElementById("currentStation").textContent =
        stations[randomIndex];


    document.getElementById("nextStation").textContent =
        nextStations[randomIndex];


    document.getElementById("platform").textContent =
        platforms[randomIndex];


    document.getElementById("trainStatus").textContent =
        "Updated Just Now";


    alert("Train status updated successfully!");

}


function showHelp() {

    alert(
        "RailLive Support\n\n" +
        "For help with train tracking, " +
        "please contact customer support."
    );

}