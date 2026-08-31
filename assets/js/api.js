const API_BASE_URL = "https://imisi-paymentgateway.onrender.com/api";

async function apiRequest(endpoint, options = {}) {

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

/**
 * Initialize Donation
 */

async function initializeDonation(donation) {

    return apiRequest("/donations/initialize", {
        method: "POST",
        body: JSON.stringify(donation),
    });

}

/**
 * Verify Donation
 */

async function verifyDonation(reference) {

    return apiRequest(`/donations/verify/${reference}`);

}