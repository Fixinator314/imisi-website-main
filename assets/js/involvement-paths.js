/* ==========================================================
   IMISI FOUNDATION — INVOLVEMENT PATHS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".involvement-paths");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Involvement Paths: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".involvement-paths__header");

  const intro = section.querySelector(".involvement-paths__intro");

  const cards = section.querySelectorAll(".involvement-path");

  const closing = section.querySelector(".involvement-paths__closing");

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
      y: 55,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: intro,
        start: "top 82%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     CARDS
     -------------------------------------------------------- */

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 55,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.14,
      ease: "power3.out",

      scrollTrigger: {
        trigger: cards[0],
        start: "top 82%",
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
      duration: 0.8,
      ease: "power3.out",

      scrollTrigger: {
        trigger: closing,
        start: "top 90%",
        once: true,
      },
    },
  );

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
