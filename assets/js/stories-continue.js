/* ==========================================================
   IMISI FOUNDATION — STORIES CONTINUE
   06 / Continue the Journey
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".stories-continue");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Stories Continue: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const header = section.querySelector(".stories-continue__header");

  const title = section.querySelector(".stories-continue__title");

  const copy = section.querySelector(".stories-continue__copy");

  const nodes = section.querySelectorAll(".continue-node");

  const lines = section.querySelectorAll(".continue-line");

  const cta = section.querySelector(".stories-continue__cta");

  const cycle = section.querySelector(".stories-continue__cycle");

  /* ========================================================
     HEADER
     ======================================================== */

  if (header) {
    gsap.fromTo(
      header,

      {
        opacity: 0,
        y: 30,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.8,

        ease: "power3.out",

        scrollTrigger: {
          trigger: header,

          start: "top 85%",

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

        duration: 1.1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: title,

          start: "top 80%",

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
        x: 40,
      },

      {
        opacity: 1,
        x: 0,

        duration: 0.9,

        ease: "power3.out",

        scrollTrigger: {
          trigger: copy,

          start: "top 82%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     JOURNEY NODES
     ======================================================== */

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

        duration: 0.6,

        stagger: 0.12,

        ease: "power2.out",

        scrollTrigger: {
          trigger: ".stories-continue__path",

          start: "top 82%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     CONNECTING LINES
     ======================================================== */

  lines.forEach((line) => {
    const fill = line.querySelector("::after");

    /*
     * CSS pseudo-elements cannot be directly selected
     * with querySelector, so animate the line itself
     * using a custom CSS variable.
     */
  });

  if (lines.length) {
    gsap.fromTo(
      lines,

      {
        "--line-progress": "0%",
      },

      {
        "--line-progress": "100%",

        duration: 1.2,

        stagger: 0.15,

        ease: "power2.inOut",

        scrollTrigger: {
          trigger: ".stories-continue__path",

          start: "top 78%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     CTA
     ======================================================== */

  if (cta) {
    gsap.fromTo(
      cta,

      {
        opacity: 0,
        y: 40,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.8,

        ease: "power3.out",

        scrollTrigger: {
          trigger: cta,

          start: "top 85%",

          once: true,
        },
      },
    );
  }

  /* ========================================================
     CYCLE
     ======================================================== */

  if (cycle) {
    const cycleMark = cycle.querySelector(".stories-continue__cycle-mark");

    gsap.fromTo(
      cycle,

      {
        opacity: 0,
        y: 25,
      },

      {
        opacity: 0.45,
        y: 0,

        duration: 0.8,

        ease: "power2.out",

        scrollTrigger: {
          trigger: cycle,

          start: "top 90%",

          once: true,
        },
      },
    );

    if (cycleMark) {
      gsap.to(
        cycleMark,

        {
          rotation: 360,

          duration: 12,

          ease: "none",

          repeat: -1,
        },
      );
    }
  }

  /* ========================================================
     REFRESH
     ======================================================== */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
