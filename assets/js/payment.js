/* =========================================================
   IMISI FOUNDATION — PAYMENT
   Donation Form
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("donation-form");

  const amountButtons = document.querySelectorAll(".amount-btn");

  const amountInput = document.getElementById("amount");

  const frequencyInputs = document.querySelectorAll('input[name="frequency"]');

  const supportInputs = document.querySelectorAll('input[name="supportArea"]');

  /* =========================================================
     SAFETY CHECK
  ========================================================= */

  if (!form || !amountInput) {
    return;
  }

  /* =========================================================
     SUGGESTED AMOUNT BUTTONS
  ========================================================= */

  amountButtons.forEach((button) => {
    button.addEventListener("click", () => {
      /* Remove active state from all buttons */

      amountButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      /* Activate selected button */

      button.classList.add("active");

      /* Put selected amount into input */

      amountInput.value = button.dataset.amount;
    });
  });

  /* =========================================================
     CUSTOM AMOUNT INPUT
     
     If the user manually changes the amount,
     remove the selected preset button.
  ========================================================= */

  amountInput.addEventListener("input", () => {
    const currentAmount = amountInput.value;

    amountButtons.forEach((button) => {
      if (button.dataset.amount === currentAmount) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  });

  /* =========================================================
     FORM SUBMISSION
  ========================================================= */

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    /* ---------------------------------------------------------
       GET DONOR INFORMATION
    --------------------------------------------------------- */

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const amount = Number(amountInput.value);

    /* ---------------------------------------------------------
       GET DONATION FREQUENCY
    --------------------------------------------------------- */

    const selectedFrequency = document.querySelector(
      'input[name="frequency"]:checked',
    );

    const frequency = selectedFrequency ? selectedFrequency.value : "once";

    /* ---------------------------------------------------------
       GET SUPPORT AREA
    --------------------------------------------------------- */

    const selectedSupport = document.querySelector(
      'input[name="supportArea"]:checked',
    );

    const supportArea = selectedSupport ? selectedSupport.value : "operations";

    /* =========================================================
       BASIC VALIDATION
    ========================================================= */

    if (!name) {
      alert("Please enter your full name.");
      return;
    }

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!amount || amount < 1) {
      alert("Please enter a valid donation amount.");
      amountInput.focus();
      return;
    }

    /* =========================================================
       DONATION OBJECT
    ========================================================= */

    const donation = {
      name,

      email,

      amount,

      frequency,

      supportArea,
    };

    /* =========================================================
       DISABLE BUTTON WHILE PROCESSING
    ========================================================= */

    const submitButton = form.querySelector(".donate-btn");

    const originalButtonText = submitButton
      ? submitButton.textContent
      : "Donate Securely";

    if (submitButton) {
      submitButton.disabled = true;

      submitButton.textContent = "Processing...";
    }

    /* =========================================================
       INITIALIZE PAYMENT
    ========================================================= */

    try {
      const response = await initializeDonation(donation);

      /* -------------------------------------------------------
         Make sure Paystack returned a payment URL
      ------------------------------------------------------- */

      if (!response || !response.authorization_url) {
        throw new Error("Unable to initialize the payment. Please try again.");
      }

      /* -------------------------------------------------------
         Redirect to Paystack
      ------------------------------------------------------- */

      window.location.href = response.authorization_url;
    } catch (error) {
      /* =========================================================
       ERROR HANDLING
    ========================================================= */

      console.error("Donation error:", error);

      alert(
        error?.message ||
          "Something went wrong while processing your donation. Please try again.",
      );

      /* Restore button */

      if (submitButton) {
        submitButton.disabled = false;

        submitButton.textContent = originalButtonText;
      }
    }
  });
});
