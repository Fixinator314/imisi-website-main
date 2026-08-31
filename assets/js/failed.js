document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const reference =
        params.get("reference") ||
        params.get("trxref");

    const referenceElement =
        document.getElementById("reference");

    if (referenceElement) {
        referenceElement.textContent =
            reference || "Unavailable";
    }

    if (reference) {
        console.log("Failed Payment Reference:", reference);
    }

    const retryButton =
        document.querySelector(".retry-btn");

    if (retryButton) {
        retryButton.addEventListener("click", (event) => {
            event.preventDefault();

            window.location.href = "payment.html";
        });
    }

    const homeButton =
        document.querySelector(".home-btn");

    if (homeButton) {
        homeButton.addEventListener("click", (event) => {
            event.preventDefault();

            window.location.href = "index.html";
        });
    }

});