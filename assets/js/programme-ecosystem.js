/* ==========================================================
   IMISI FOUNDATION — PROGRAMME ECOSYSTEM
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".programme-ecosystem");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Programme Ecosystem: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".programme-ecosystem__header");

  const cards = section.querySelectorAll(".programme-card");

  const closing = section.querySelector(".programme-ecosystem__closing");

  /* --------------------------------------------------------
     INITIAL STATES
     -------------------------------------------------------- */

  gsap.set(header, {
    opacity: 0,
    y: 60,
  });

  gsap.set(cards, {
    opacity: 0,
    y: 70,
  });

  gsap.set(closing, {
    opacity: 0,
    y: 40,
  });

  /* --------------------------------------------------------
     HEADER REVEAL
     -------------------------------------------------------- */

  gsap.to(header, {
    opacity: 1,
    y: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {
      trigger: section,

      start: "top 72%",

      once: true,
    },
  });

  /* --------------------------------------------------------
     CARD REVEAL
     -------------------------------------------------------- */

  cards.forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,

      duration: 0.9,

      delay: index * 0.08,

      ease: "power3.out",

      scrollTrigger: {
        trigger: card,

        start: "top 82%",

        once: true,
      },
    });

    /* Subtle card movement */

    gsap.to(card, {
      yPercent: -3,

      ease: "none",

      scrollTrigger: {
        trigger: card,

        start: "top bottom",

        end: "bottom top",

        scrub: 1.5,
      },
    });
  });

  /* --------------------------------------------------------
     CLOSING
     -------------------------------------------------------- */

  gsap.to(closing, {
    opacity: 1,
    y: 0,

    duration: 0.9,

    ease: "power3.out",

    scrollTrigger: {
      trigger: closing,

      start: "top 82%",

      once: true,
    },
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
