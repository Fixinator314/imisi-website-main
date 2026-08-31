const form = document.getElementById("donation-form");

const amountButtons = document.querySelectorAll(".amount-btn");

const amountInput = document.getElementById("amount");

amountButtons.forEach(button => {

    button.addEventListener("click", () => {

        amountButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        amountInput.value = button.dataset.amount;

    });

});

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const donation = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        amount: Number(amountInput.value),

    };

    try {

        const response = await initializeDonation(donation);

        window.location.href = response.authorization_url;

    } catch (error) {

        alert(error.message);

    }

});