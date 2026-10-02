/* ==========================================================
   IMISI HOUSE — HERITAGE PIPELINE
   01 — THE GAP
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".pipeline-line");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Pipeline Line: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------------------------------------------------
     ELEMENTS
     ---------------------------------------------------------- */

  const eyebrow = section.querySelector(".pipeline-line__eyebrow");

  const title = section.querySelector(".pipeline-line__title");

  const systems = section.querySelectorAll(".knowledge-system");

  const bridge = section.querySelector(".pipeline-line__bridge");

  const progress = section.querySelector(".pipeline-line__progress");

  const closing = section.querySelector(".pipeline-line__closing");

  /* ----------------------------------------------------------
     SECTION ACTIVE
     ---------------------------------------------------------- */

  ScrollTrigger.create({
    trigger: section,

    start: "top 70%",
    end: "bottom 30%",

    onEnter: () => {
      section.classList.add("is-active");
    },

    onEnterBack: () => {
      section.classList.add("is-active");
    },

    onLeave: () => {
      section.classList.remove("is-active");
    },

    onLeaveBack: () => {
      section.classList.remove("is-active");
    },
  });

  /* ----------------------------------------------------------
     EYEBROW
     ---------------------------------------------------------- */

  if (eyebrow) {
    gsap.fromTo(
      eyebrow,

      {
        opacity: 0,
        x: -30,
      },

      {
        opacity: 1,
        x: 0,

        duration: 0.7,

        ease: "power3.out",

        scrollTrigger: {
          trigger: eyebrow,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     TITLE
     ---------------------------------------------------------- */

  if (title) {
    gsap.fromTo(
      title,

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
          trigger: title,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     KNOWLEDGE SYSTEMS
     ---------------------------------------------------------- */

  systems.forEach((system, index) => {
    gsap.fromTo(
      system,

      {
        opacity: 0,
        y: 45,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.8,

        delay: index * 0.12,

        ease: "power3.out",

        scrollTrigger: {
          trigger: system,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );
  });

  /* ----------------------------------------------------------
     BRIDGE
     ---------------------------------------------------------- */

  if (bridge) {
    gsap.fromTo(
      bridge,

      {
        opacity: 0,
        scale: 0.94,
      },

      {
        opacity: 1,
        scale: 1,

        duration: 0.8,

        ease: "power3.out",

        scrollTrigger: {
          trigger: bridge,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     BRIDGE PROGRESS
     ---------------------------------------------------------- */

  if (progress) {
    gsap.to(
      progress,

      {
        width: "100%",

        ease: "none",

        scrollTrigger: {
          trigger: bridge,

          start: "top 75%",

          end: "bottom 55%",

          scrub: true,
        },
      },
    );
  }

  /* ----------------------------------------------------------
     CLOSING
     ---------------------------------------------------------- */

  if (closing) {
    gsap.fromTo(
      closing,

      {
        opacity: 0,
        y: 35,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.8,

        ease: "power3.out",

        scrollTrigger: {
          trigger: closing,

          start: "top 92%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     REFRESH
     ---------------------------------------------------------- */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
