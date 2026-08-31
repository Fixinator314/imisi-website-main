const params = new URLSearchParams(window.location.search);

const reference = params.get("reference");

if (!reference) {
    window.location.href = "failed.html";
}

const referenceElement = document.getElementById("reference");
const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const amountElement = document.getElementById("amount");
const statusElement = document.getElementById("status");
const paidAtElement = document.getElementById("paidAt");

const successIcon = document.getElementById("successIcon");
const heading = document.getElementById("heading");
const description = document.getElementById("description");
const receiptMessage = document.getElementById("receiptMessage");

let attempts = 0;

const maxAttempts = 15;
const pollInterval = 2000;

async function loadDonation() {

    try {

        const { donation } = await verifyDonation(reference);

        if (!donation) {
            throw new Error("Donation not found.");
        }

        if (
            donation.status === "failed" ||
            donation.status === "abandoned"
        ) {

            window.location.href =
                `failed.html?reference=${reference}`;

            return;

        }

        referenceElement.textContent =
            donation.reference;

        nameElement.textContent =
            donation.name || "Anonymous";

        emailElement.textContent =
            donation.email || "-";

        amountElement.textContent =
            `R${Number(donation.amount).toLocaleString("en-ZA", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;

        paidAtElement.textContent =
            donation.paidAt
                ? new Date(donation.paidAt).toLocaleString()
                : "Waiting for confirmation...";

        if (donation.status === "success") {

            successIcon.textContent = "✓";
            successIcon.className = "success-icon success";

            heading.textContent =
                "Thank You!";

            description.textContent =
                "Your donation has been received successfully. We truly appreciate your generosity and support.";

            statusElement.textContent =
                "Payment Confirmed";

            receiptMessage.textContent =
                "📧 A donation receipt has been sent to your email address.";

            return;

        }

        statusElement.textContent =
            "Verifying your payment...";

        if (
            donation.status === "pending" &&
            attempts < maxAttempts
        ) {

            attempts++;

            description.textContent =
                `Verifying payment (${attempts}/${maxAttempts})...`;

            setTimeout(
                loadDonation,
                pollInterval
            );

            return;

        }

        description.textContent =
            "We're still verifying your payment. Please refresh this page shortly if the status hasn't updated.";

    } catch (error) {

        console.error(error);

        window.location.href =
            `failed.html?reference=${reference}`;

    }

}

loadDonation();