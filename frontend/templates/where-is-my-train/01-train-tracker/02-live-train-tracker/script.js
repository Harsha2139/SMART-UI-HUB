    function login() {
    alert("Login page coming soon!");
}

function startTracking() {
    document.getElementById("live").scrollIntoView({
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
        <div class="live-result">

            <div class="result-header">

                <div>
                    <h3>Chennai Express</h3>
                    <p class="train-number">
                        Train No: ${trainNumber}
                    </p>
                </div>

                <span class="live-badge">
                    ● LIVE
                </span>

            </div>

            <div class="result-info">

                <div class="result-box">
                    <p>Current Location</p>
                    <strong>Katpadi Junction</strong>
                </div>

                <div class="result-box">
                    <p>Train Speed</p>
                    <strong>82 km/h</strong>
                </div>

                <div class="result-box">
                    <p>Expected Arrival</p>
                    <strong>06:45 PM</strong>
                </div>

            </div>

        </div>
    `;

    document.getElementById("location").textContent =
        "Katpadi Junction";

    document.getElementById("speed").textContent =
        "82 km/h";

    document.getElementById("arrival").textContent =
        "06:45 PM";
}

function refreshStatus() {

    document.getElementById("speed").textContent =
        "84 km/h";

    document.getElementById("arrival").textContent =
        "06:42 PM";

    alert("Live train status refreshed!");
}