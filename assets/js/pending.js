const params = new URLSearchParams(window.location.search);

const reference =
    params.get("reference") ||
    params.get("trxref");

if (!reference) {
    window.location.href = "failed.html";
}

const referenceElement =
    document.getElementById("reference");

const statusElement =
    document.getElementById("status");

referenceElement.textContent = reference;

let attempts = 0;

const maxAttempts = 30;

const pollInterval = 2000;

async function verifyPayment() {

    try {

        const { donation } =
            await verifyDonation(reference);

        if (!donation) {

            throw new Error(
                "Donation not found."
            );

        }

        switch (donation.status) {

            case "success":

                window.location.href =
                    `success.html?reference=${reference}`;

                return;

            case "failed":

                window.location.href =
                    `failed.html?reference=${reference}`;

                return;

            case "abandoned":

                window.location.href =
                    `failed.html?reference=${reference}`;

                return;

            case "pending":

                attempts++;

                statusElement.textContent =
                    `Verifying your payment... (${attempts}/${maxAttempts})`;

                if (attempts >= maxAttempts) {

                    statusElement.textContent =
                        "Verification is taking longer than expected. Please keep this page open or refresh it in a few moments.";

                    return;

                }

                setTimeout(
                    verifyPayment,
                    pollInterval
                );

                return;

            default:

                statusElement.textContent =
                    "Unknown payment status.";

                return;

        }

    } catch (error) {

        console.error(error);

        statusElement.textContent =
            "Unable to verify your payment. Retrying...";

        attempts++;

        if (attempts < maxAttempts) {

            setTimeout(
                verifyPayment,
                pollInterval
            );

        } else {

            window.location.href =
                `failed.html?reference=${reference}`;

        }

    }

}

verifyPayment();