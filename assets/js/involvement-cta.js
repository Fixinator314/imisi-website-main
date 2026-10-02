/* ==========================================================
   IMISI FOUNDATION — INVOLVEMENT CTA
   04 / Keep It Moving
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".involvement-cta");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Involvement CTA: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".involvement-cta__header");

  const statement = section.querySelector(".involvement-cta__statement");

  const copy = section.querySelector(".involvement-cta__copy");

  const actions = section.querySelector(".involvement-cta__actions");

  const cycle = section.querySelector(".involvement-cta__cycle");

  const mark = section.querySelector(".involvement-cta__cycle-mark");

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
        start: "top 80%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     STATEMENT
     -------------------------------------------------------- */

  gsap.fromTo(
    statement,
    {
      opacity: 0,
      y: 65,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: statement,
        start: "top 80%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     COPY
     -------------------------------------------------------- */

  gsap.fromTo(
    copy,
    {
      opacity: 0,
      x: 35,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: "power3.out",

      scrollTrigger: {
        trigger: copy,
        start: "top 85%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     ACTIONS
     -------------------------------------------------------- */

  gsap.fromTo(
    actions,
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
        trigger: actions,
        start: "top 90%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     CYCLE
     -------------------------------------------------------- */

  gsap.fromTo(
    cycle,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.8,

      scrollTrigger: {
        trigger: cycle,
        start: "top 92%",
        once: true,
      },
    },
  );

  if (mark) {
    gsap.to(mark, {
      rotation: 360,
      duration: 12,
      repeat: -1,
      ease: "none",
    });
  }

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
