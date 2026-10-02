/* ==========================================================
   IMISI FOUNDATION — PROGRAMME IMPACT
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".programme-impact");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Programme Impact: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".programme-impact__header");

  const statement = section.querySelector(".programme-impact__statement");

  const items = section.querySelectorAll(".impact-item");

  const closing = section.querySelector(".programme-impact__closing");

  const closingLine = section.querySelector(".programme-impact__closing-line");

  /* --------------------------------------------------------
     INITIAL STATES
     -------------------------------------------------------- */

  gsap.set(header, {
    opacity: 0,
    y: 60,
  });

  gsap.set(statement, {
    opacity: 0,
    y: 50,
  });

  gsap.set(items, {
    opacity: 0,
    y: 60,
  });

  gsap.set(closing, {
    opacity: 0,
    y: 40,
  });

  gsap.set(closingLine, {
    scaleX: 0,
  });

  /* --------------------------------------------------------
     HEADER
     -------------------------------------------------------- */

  gsap.to(header, {
    opacity: 1,
    y: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {
      trigger: header,

      start: "top 78%",

      once: true,
    },
  });

  /* --------------------------------------------------------
     STATEMENT
     -------------------------------------------------------- */

  gsap.to(statement, {
    opacity: 1,
    y: 0,

    duration: 0.9,

    ease: "power3.out",

    scrollTrigger: {
      trigger: statement,

      start: "top 78%",

      once: true,
    },
  });

  /* --------------------------------------------------------
     IMPACT ITEMS
     -------------------------------------------------------- */

  items.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,

      duration: 0.8,

      delay: index * 0.08,

      ease: "power3.out",

      scrollTrigger: {
        trigger: item,

        start: "top 82%",

        once: true,
      },
    });
  });

  /* --------------------------------------------------------
     CLOSING
     -------------------------------------------------------- */

  gsap.to(closingLine, {
    scaleX: 1,

    duration: 1,

    ease: "power3.inOut",

    scrollTrigger: {
      trigger: closing,

      start: "top 82%",

      once: true,
    },
  });

  gsap.to(closing, {
    opacity: 1,
    y: 0,

    duration: 0.8,

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
