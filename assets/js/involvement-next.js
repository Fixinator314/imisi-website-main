/* ==========================================================
   IMISI FOUNDATION — INVOLVEMENT NEXT
   05 / The Next Step
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".involvement-next");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Involvement Next: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".involvement-next__header");

  const main = section.querySelector(".involvement-next__main");

  const links = section.querySelectorAll(".involvement-next__link");

  const cycle = section.querySelector(".involvement-next__cycle");

  const mark = section.querySelector(".involvement-next__cycle-mark");

  /* --------------------------------------------------------
     HEADER
     -------------------------------------------------------- */

  gsap.fromTo(
    header,
    {
      opacity: 0,
      y: 20,
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
     MAIN
     -------------------------------------------------------- */

  gsap.fromTo(
    main,
    {
      opacity: 0,
      y: 60,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: main,
        start: "top 82%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     LINKS
     -------------------------------------------------------- */

  gsap.fromTo(
    links,
    {
      opacity: 0,
      y: 35,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",

      scrollTrigger: {
        trigger: links[0],
        start: "top 88%",
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
      duration: 0.7,

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
