/* ==========================================================
   IMISI FOUNDATION
   RETURN
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".heritage-return");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     MAIN REVEAL
     ======================================================== */

  const revealItems = section.querySelectorAll(
    ".heritage-return__eyebrow, " +
      ".heritage-return__number, " +
      ".heritage-return__label, " +
      ".heritage-return__title, " +
      ".heritage-return__lead, " +
      ".heritage-return__text, " +
      ".heritage-return__path, " +
      ".heritage-return__statement",
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

      stagger: 0.08,

      ease: "power3.out",

      scrollTrigger: {
        trigger: section,

        start: "top 78%",

        once: true,
      },
    },
  );

  /* ========================================================
     RETURN PATH
     ======================================================== */

  const progress = section.querySelector(".heritage-return__path-progress");

  if (progress) {
    gsap.to(progress, {
      width: "100%",

      duration: 1.6,

      ease: "power2.inOut",

      scrollTrigger: {
        trigger: section,

        start: "top 60%",

        once: true,
      },
    });
  }

  /* ========================================================
     TITLE MOVEMENT
     ======================================================== */

  const title = section.querySelector(".heritage-return__title");

  if (title) {
    gsap.fromTo(
      title,
      {
        x: -25,
      },
      {
        x: 0,

        duration: 1.1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: section,

          start: "top 70%",

          once: true,
        },
      },
    );
  }
});
