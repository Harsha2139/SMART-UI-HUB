function login() {
    alert("Login page coming soon!");
}

function startBooking() {
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function searchTrains() {

    const from =
        document.getElementById("fromStation").value.trim();

    const to =
        document.getElementById("toStation").value.trim();

    const date =
        document.getElementById("journeyDate").value;

    const result =
        document.getElementById("searchResult");

    if (from === "" || to === "") {
        alert("Please enter both departure and destination stations.");
        return;
    }

    if (date === "") {
        alert("Please select a journey date.");
        return;
    }

    result.innerHTML = `
        <div class="search-result">

            <h3>Trains Found</h3>

            <p>
                Showing trains from
                <strong>${from}</strong>
                to
                <strong>${to}</strong>
            </p>

            <p>
                Journey Date: <strong>${date}</strong>
            </p>

            <button onclick="selectTrain('Available Express')">
                Select Train
            </button>

        </div>
    `;

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function selectTrain(trainName) {

    alert(
        trainName +
        " selected!\n\n" +
        "Continue to passenger details to complete your booking."
    );
}

function showHelp() {

    alert(
        "How booking works:\n\n" +
        "1. Enter your departure station.\n" +
        "2. Enter your destination.\n" +
        "3. Select your journey date.\n" +
        "4. Search available trains.\n" +
        "5. Select your preferred train."
    );
}