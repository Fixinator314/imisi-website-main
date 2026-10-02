/* ==========================================================
   IMISI FOUNDATION — FROM HERITAGE TO POSSIBILITY
   Section controller
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".heritage-possibility");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Heritage Possibility: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------------------------------------------------
     ELEMENTS
     ---------------------------------------------------------- */

  const nav = document.querySelector(".nav");

  const eyebrow = section.querySelector(".heritage-possibility__eyebrow");

  const title = section.querySelector(".heritage-possibility__title");

  const nodes = section.querySelectorAll(".possibility-node");

  const connectors = section.querySelectorAll(".possibility-node__connector");

  const closing = section.querySelector(".heritage-possibility__closing");

  /* ----------------------------------------------------------
     NAVIGATION
     Light section = dark navbar
     ---------------------------------------------------------- */

  if (nav) {
    ScrollTrigger.create({
      trigger: section,

      start: "top 15%",
      end: "bottom 15%",

      onEnter: () => {
        nav.classList.add("nav--dark");
      },

      onEnterBack: () => {
        nav.classList.add("nav--dark");
      },

      onLeave: () => {
        nav.classList.remove("nav--dark");
      },

      onLeaveBack: () => {
        nav.classList.remove("nav--dark");
      },
    });
  }

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
     MAIN TITLE
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
     CONNECTORS
     ---------------------------------------------------------- */

  connectors.forEach((connector) => {
    gsap.fromTo(
      connector,
      {
        scaleX: 0,
        transformOrigin: "left center",
      },
      {
        scaleX: 1,
        duration: 0.7,
        ease: "power3.out",

        scrollTrigger: {
          trigger: connector,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  /* ----------------------------------------------------------
     NODES
     ---------------------------------------------------------- */

  nodes.forEach((node, index) => {
    gsap.fromTo(
      node,
      {
        opacity: 0,
        y: 45,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        delay: index * 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: node,
          start: "top 88%",
          toggleActions: "play none none reverse",

          onEnter: () => {
            node.classList.add("is-active");
          },

          onEnterBack: () => {
            node.classList.add("is-active");
          },

          onLeaveBack: () => {
            node.classList.remove("is-active");
          },
        },
      },
    );
  });

  /* ----------------------------------------------------------
     CLOSING STATEMENT
     ---------------------------------------------------------- */

  if (closing) {
    gsap.fromTo(
      closing,
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
          trigger: closing,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     REFRESH AFTER IMAGES / LAYOUT
     ---------------------------------------------------------- */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
