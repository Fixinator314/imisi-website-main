/* ==========================================================
   IMISI FOUNDATION
   CONTINUE
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".heritage-continue");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     REVEAL
     ======================================================== */

  const revealItems = section.querySelectorAll(
    ".heritage-continue__eyebrow, " +
      ".heritage-continue__number, " +
      ".heritage-continue__label, " +
      ".heritage-continue__title, " +
      ".heritage-continue__intro, " +
      ".heritage-continue__path, " +
      ".heritage-continue__action, " +
      ".heritage-continue__closing",
  );

  gsap.fromTo(
    revealItems,
    {
      opacity: 0,
      y: 35,
    },
    {
      opacity: 1,
      y: 0,

      duration: 0.9,

      stagger: 0.07,

      ease: "power3.out",

      scrollTrigger: {
        trigger: section,

        start: "top 78%",

        once: true,
      },
    },
  );

  /* ========================================================
     PATH PROGRESS
     ======================================================== */

  const progress = section.querySelector(".heritage-continue__path-line span");

  if (progress) {
    gsap.to(progress, {
      width: "100%",

      duration: 1.8,

      ease: "power2.inOut",

      scrollTrigger: {
        trigger: section,

        start: "top 60%",

        once: true,
      },
    });
  }

  /* ========================================================
     FINAL ROTATION
     ======================================================== */

  const mark = section.querySelector(".heritage-continue__closing-mark");

  if (mark) {
    gsap.to(mark, {
      rotation: 360,

      duration: 2,

      ease: "power2.inOut",

      scrollTrigger: {
        trigger: section,

        start: "top 55%",

        once: true,
      },
    });
  }
});
