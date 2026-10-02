/* ==========================================================
   IMISI FOUNDATION — IMPACT CONTINUE
   05 / Continue
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-continue");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Impact Continue: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".impact-continue__header");

  const main = section.querySelector(".impact-continue__main");

  const nodes = section.querySelectorAll(".impact-continue__node");

  const line = section.querySelector(".impact-continue__path-line");

  const actions = section.querySelector(".impact-continue__actions");

  const cycle = section.querySelector(".impact-continue__cycle");

  const cycleMark = section.querySelector(".impact-continue__cycle-mark");

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
        start: "top 85%",
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
     PATH
     -------------------------------------------------------- */

  if (line) {
    gsap.to(line, {
      scaleX: 1,
      duration: 1.3,
      ease: "power3.inOut",

      scrollTrigger: {
        trigger: line,
        start: "top 85%",
        once: true,
      },
    });
  }

  if (nodes.length) {
    gsap.fromTo(
      nodes,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",

        scrollTrigger: {
          trigger: nodes[0],
          start: "top 85%",
          once: true,
        },
      },
    );
  }

  /* --------------------------------------------------------
     ACTIONS
     -------------------------------------------------------- */

  gsap.fromTo(
    actions,
    {
      opacity: 0,
      y: 20,
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
      ease: "power2.out",

      scrollTrigger: {
        trigger: cycle,
        start: "top 92%",
        once: true,
      },
    },
  );

  if (cycleMark) {
    gsap.to(cycleMark, {
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
