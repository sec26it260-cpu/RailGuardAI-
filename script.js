
const API_URL = "YOUR_RENDER_URL";

function updateClock() {
    const now = new Date();

    document.getElementById("clock").textContent =
        now.toLocaleString();
}

setInterval(updateClock, 1000);
updateClock();

async function loadDashboard() {
    try {
        const response = await fetch(API_URL + "/api/coaches");

        if (!response.ok) {
            throw new Error("API connection failed");
        }

        const data = await response.json();

        document.getElementById("backend").textContent = "Online";

        document.getElementById("c1").textContent =
            data.C1.estimated_count;

        document.getElementById("c2").textContent =
            data.C2.estimated_count;

        document.getElementById("c3").textContent =
            data.C3.estimated_count;

        loadVerification();

    } catch (error) {
        document.getElementById("backend").textContent = "Offline";
        document.getElementById("verification").textContent =
            "Backend connection unavailable. Please check the server.";
    }
}

async function loadVerification() {
    try {
        const response = await fetch(
            API_URL + "/api/verification"
        );

        const results = await response.json();

        let alerts = 0;
        let html = "";

        results.forEach(item => {
            if (item.review_required) alerts++;

            html += `
                <div class="verify-row">
                    <span>${item.coach}</span>
                    <span>Booked: ${item.booked}</span>
                    <span>Estimated: ${item.estimated_count}</span>
                    <span class="${item.review_required ? 'review' : 'normal'}">
                        ${item.review_required ? 'Review' : 'Match'}
                    </span>
                </div>
            `;
        });

        document.getElementById("verification").innerHTML = html;
        document.getElementById("alerts").textContent = alerts;

    } catch (error) {
        console.log("Verification data unavailable");
    }
}

function showCoach(coach) {
    alert(
        coach +
        " selected. Occupancy shown is approximate demo data."
    );
}

loadDashboard();
