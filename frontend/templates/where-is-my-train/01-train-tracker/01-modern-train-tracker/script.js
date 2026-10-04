function login() {
    alert("Login page coming soon!");
}

function startTracking() {
    document.getElementById("tracker").scrollIntoView({
        behavior: "smooth"
    });
}

function trackTrain() {

    const trainNumber =
        document.getElementById("trainNumber").value.trim();

    const result =
        document.getElementById("trainResult");

    if (trainNumber === "") {
        alert("Please enter a train number.");
        return;
    }

    result.innerHTML = `
        <div class="result-card">

            <div class="result-header">

                <div>
                    <h3>Chennai Express</h3>
                    <p class="train-number">
                        Train No: ${trainNumber}
                    </p>
                </div>

                <span class="live">● LIVE</span>

            </div>

            <div class="route">

                <div class="station-point">
                    <strong>Chennai Central</strong>
                    <span>MAS</span>
                </div>

                <div class="route-line"></div>

                <div class="station-point">
                    <strong>Bengaluru</strong>
                    <span>SBC</span>
                </div>

            </div>

            <div class="train-info">

                <div class="info-box">
                    <p>Current Station</p>
                    <strong>Katpadi Junction</strong>
                </div>

                <div class="info-box">
                    <p>Expected Arrival</p>
                    <strong>06:45 PM</strong>
                </div>

                <div class="info-box">
                    <p>Delay</p>
                    <strong>10 Minutes</strong>
                </div>

            </div>

        </div>
    `;
}

function showStation(station) {

    alert(
        "Station: " + station +
        "\n\n" +
        "Live station information will be displayed here."
    );
}

function showHelp() {

    alert(
        "How to track a train:\n\n" +
        "1. Enter the train number.\n" +
        "2. Click Search Train.\n" +
        "3. View the train's current status."
    );
}