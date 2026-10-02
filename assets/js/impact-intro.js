/* ==========================================================
   IMISI FOUNDATION — IMPACT INTRO
   01 / Impact
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-intro");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Impact Intro: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const header = section.querySelector(".impact-intro__header");

  const number = section.querySelector(".impact-intro__number");

  const title = section.querySelector(".impact-intro__title");

  const copy = section.querySelector(".impact-intro__copy");

  const bottom = section.querySelector(".impact-intro__bottom");

  /* ========================================================
     HEADER
     ======================================================== */

  if (header) {
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
  }

  /* ========================================================
     NUMBER
     ======================================================== */

  if (number) {
    gsap.fromTo(
      number,

      {
        opacity: 0,
        y: 20,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.6,

        ease: "power2.out",

        scrollTrigger: {
          trigger: section,

          start: "top 75%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     TITLE
     ======================================================== */

  if (title) {
    gsap.fromTo(
      title,

      {
        opacity: 0,
        y: 80,
      },

      {
        opacity: 1,
        y: 0,

        duration: 1.15,

        ease: "power3.out",

        scrollTrigger: {
          trigger: section,

          start: "top 70%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     COPY
     ======================================================== */

  if (copy) {
    gsap.fromTo(
      copy,

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
          trigger: section,

          start: "top 65%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     BOTTOM
     ======================================================== */

  if (bottom) {
    gsap.fromTo(
      bottom,

      {
        opacity: 0,
      },

      {
        opacity: 1,

        duration: 0.8,

        ease: "power2.out",

        scrollTrigger: {
          trigger: section,

          start: "bottom 85%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     REFRESH
     ======================================================== */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
