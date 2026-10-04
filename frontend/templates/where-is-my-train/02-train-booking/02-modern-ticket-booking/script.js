function login() {
    alert("Login page coming soon!");
}

function startBooking() {
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });
}

function swapStations() {
    const from = document.getElementById("from");
    const to = document.getElementById("to");

    const temp = from.value;
    from.value = to.value;
    to.value = temp;
}

function searchTrains() {

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const passengers = document.getElementById("passengers").value;

    if (from === "" || to === "") {
        alert("Please enter From and To stations.");
        return;
    }

    if (date === "") {
        alert("Please select a journey date.");
        return;
    }

    const result = document.getElementById("searchResult");

    result.innerHTML = `
        <div class="search-result">
            <h3>Trains Available</h3>

            <p>
                ${from} → ${to}
            </p>

            <p>
                Journey Date: ${date}
            </p>

            <p>
                Passengers: ${passengers}
            </p>

            <p>
                Available trains are shown below.
            </p>
        </div>
    `;

    document.getElementById("trains").scrollIntoView({
        behavior: "smooth"
    });
}

function bookTrain(trainName, price) {

    const passengers =
        parseInt(document.getElementById("passengers").value);

    const from =
        document.getElementById("from").value || "Chennai";

    const to =
        document.getElementById("to").value || "Bengaluru";

    const date =
        document.getElementById("date").value || "Selected Date";

    const total = price * passengers;

    const summaryBox =
        document.getElementById("summaryBox");

    summaryBox.innerHTML = `
        <div class="summary-card">

            <h3>Booking Details</h3>

            <div class="summary-row">
                <span>Train</span>
                <strong>${trainName}</strong>
            </div>

            <div class="summary-row">
                <span>Route</span>
                <strong>${from} → ${to}</strong>
            </div>

            <div class="summary-row">
                <span>Journey Date</span>
                <strong>${date}</strong>
            </div>

            <div class="summary-row">
                <span>Passengers</span>
                <strong>${passengers}</strong>
            </div>

            <div class="summary-row">
                <span>Price per Passenger</span>
                <strong>₹${price}</strong>
            </div>

            <div class="summary-total">
                <span>Total</span>
                <strong>₹${total}</strong>
            </div>

            <button
                class="confirm-btn"
                onclick="confirmBooking()">
                Confirm Booking
            </button>

        </div>
    `;

    document.getElementById("summary").scrollIntoView({
        behavior: "smooth"
    });
}

function confirmBooking() {
    alert(
        "Booking confirmed successfully!\n\n" +
        "Your train ticket has been reserved."
    );
}

function applyOffer(code) {
    alert(
        "Offer " + code +
        " applied successfully!"
    );
}