/* ==========================================================
   IMISI HOUSE — KNOWLEDGE BRIDGE
   02 — CONNECT
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".knowledge-motion");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Knowledge Bridge: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------------------------------------------------
     ELEMENTS
     ---------------------------------------------------------- */

  const header = section.querySelector(".knowledge-motion__header");

  const eyebrow = section.querySelector(".knowledge-motion__eyebrow");

  const title = section.querySelector(".knowledge-motion__title");

  const intro = section.querySelector(".knowledge-motion__intro");

  const material = section.querySelector(".knowledge-motion__material");

  const orbit = section.querySelector(".material-orbit");

  const disciplines = section.querySelectorAll(".bridge-discipline");

  const closing = section.querySelector(".knowledge-motion__closing");

  /* ----------------------------------------------------------
     HEADER REVEAL
     ---------------------------------------------------------- */

  if (header) {
    gsap.fromTo(
      header,

      {
        opacity: 0,
        y: 50,
      },

      {
        opacity: 1,
        y: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: header,

          start: "top 88%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     EYEBROW
     ---------------------------------------------------------- */

  if (eyebrow) {
    gsap.fromTo(
      eyebrow,

      {
        opacity: 0,
        x: -25,
      },

      {
        opacity: 1,
        x: 0,

        duration: 0.65,

        ease: "power3.out",

        scrollTrigger: {
          trigger: eyebrow,

          start: "top 92%",

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
        y: 55,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.9,

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
     INTRO
     ---------------------------------------------------------- */

  if (intro) {
    gsap.fromTo(
      intro,

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
          trigger: intro,

          start: "top 92%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     MATERIAL
     ---------------------------------------------------------- */

  if (material) {
    gsap.fromTo(
      material,

      {
        opacity: 0,
        scale: 0.8,
      },

      {
        opacity: 1,
        scale: 1,

        duration: 1.1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: material,

          start: "top 85%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     ORBIT
     ---------------------------------------------------------- */

  if (orbit) {
    gsap.to(
      orbit,

      {
        rotation: 360,

        duration: 28,

        ease: "none",

        repeat: -1,
      },
    );
  }

  /* ----------------------------------------------------------
     DISCIPLINES
     ---------------------------------------------------------- */

  disciplines.forEach((discipline, index) => {
    gsap.fromTo(
      discipline,

      {
        opacity: 0,
        x: index < 4 ? -35 : 35,
      },

      {
        opacity: 0.45,
        x: 0,

        duration: 0.6,

        delay: index * 0.08,

        ease: "power3.out",

        scrollTrigger: {
          trigger: discipline,

          start: "top 92%",

          toggleActions: "play none none reverse",

          onEnter: () => {
            discipline.classList.add("is-active");
          },

          onEnterBack: () => {
            discipline.classList.add("is-active");
          },

          onLeave: () => {
            discipline.classList.remove("is-active");
          },

          onLeaveBack: () => {
            discipline.classList.remove("is-active");
          },
        },
      },
    );
  });

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
