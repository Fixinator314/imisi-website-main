/* ==========================================================
   IMISI FOUNDATION — CONTACT SECTION
   03 / Start a Conversation
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".contact-section");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Contact Section: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".contact-section__header");

  const intro = section.querySelector(".contact-section__intro");

  const details = section.querySelector(".contact-section__details");

  const form = section.querySelector(".contact-section__form-wrap");

  const closing = section.querySelector(".contact-section__closing");

  /* --------------------------------------------------------
     HEADER
     -------------------------------------------------------- */

  gsap.fromTo(
    header,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     INTRO
     -------------------------------------------------------- */

  gsap.fromTo(
    intro,
    {
      opacity: 0,
      x: -45,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "power3.out",

      scrollTrigger: {
        trigger: intro,
        start: "top 80%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     DETAILS
     -------------------------------------------------------- */

  gsap.fromTo(
    details,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",

      scrollTrigger: {
        trigger: details,
        start: "top 90%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     FORM
     -------------------------------------------------------- */

  gsap.fromTo(
    form,
    {
      opacity: 0,
      x: 45,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "power3.out",

      scrollTrigger: {
        trigger: form,
        start: "top 80%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     CLOSING
     -------------------------------------------------------- */

  gsap.fromTo(
    closing,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",

      scrollTrigger: {
        trigger: closing,
        start: "top 90%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     FORM PLACEHOLDER HANDLER
     -------------------------------------------------------- */

  const contactForm = section.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      /*
       * Frontend only for now.
       *
       * Connect this to the Foundation's actual
       * email/form endpoint once the contact details
       * and backend are confirmed.
       */

      event.preventDefault();

      const button = contactForm.querySelector(".contact-form__submit");

      if (!button) return;

      const original = button.innerHTML;

      button.innerHTML = `
        Message prepared
        <span>✓</span>
      `;

      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = original;
        button.disabled = false;
      }, 2500);
    });
  }

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
