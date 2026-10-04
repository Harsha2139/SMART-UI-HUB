function login() {
    alert("Login page coming soon!");
}


function goToPNR() {

    document.getElementById("pnr").scrollIntoView({
        behavior: "smooth"
    });

}


function checkPNR() {

    const pnr =
        document.getElementById("pnrNumber").value.trim();


    if (pnr === "") {

        alert("Please enter your PNR number.");

        return;
    }


    if (!/^\d{10}$/.test(pnr)) {

        alert("Please enter a valid 10-digit PNR number.");

        return;
    }


    const result =
        document.getElementById("pnrResult");


    result.innerHTML = `
        <div class="result-card">

            <div class="result-header">

                <h3>
                    PNR Status Details
                </h3>

                <span class="confirmed-badge">
                    CONFIRMED
                </span>

            </div>


            <div class="result-grid">

                <div class="detail">

                    <span>PNR Number</span>

                    <strong>${pnr}</strong>

                </div>


                <div class="detail">

                    <span>Train</span>

                    <strong>Chennai Express</strong>

                </div>


                <div class="detail">

                    <span>Train Number</span>

                    <strong>12627</strong>

                </div>


                <div class="detail">

                    <span>Journey Date</span>

                    <strong>15 October 2026</strong>

                </div>


                <div class="detail">

                    <span>From</span>

                    <strong>Chennai Central</strong>

                </div>


                <div class="detail">

                    <span>To</span>

                    <strong>Bengaluru</strong>

                </div>


                <div class="detail">

                    <span>Coach</span>

                    <strong>S4</strong>

                </div>


                <div class="detail">

                    <span>Seat</span>

                    <strong>42</strong>

                </div>

            </div>

        </div>
    `;


    result.scrollIntoView({
        behavior: "smooth"
    });

}


function showHelp() {

    alert(
        "RailPNR Support\n\n" +
        "For help with PNR status, " +
        "please contact customer support."
    );

}