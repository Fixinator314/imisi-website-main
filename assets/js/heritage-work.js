/* ==========================================================
   IMISI FOUNDATION — THE WORK CONTINUES
   Section controller
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".work-continues");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Work Continues: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ----------------------------------------------------------
     ELEMENTS
     ---------------------------------------------------------- */

  const nav = document.querySelector(".nav");

  const eyebrow = section.querySelector(".work-continues__eyebrow");

  const title = section.querySelector(".work-continues__title");

  const copy = section.querySelector(".work-continues__copy");

  const actions = section.querySelector(".work-continues__actions");

  const meta = section.querySelector(".work-continues__meta");

  const image = section.querySelector(".work-continues__image");

  /* ----------------------------------------------------------
     NAVIGATION
     Teal section = dark navbar text
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
        nav.classList.add("nav--dark");
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
     TITLE
     ---------------------------------------------------------- */

  if (title) {
    gsap.fromTo(
      title,

      {
        opacity: 0,
        y: 70,
      },

      {
        opacity: 1,
        y: 0,

        duration: 1.1,

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
     COPY
     ---------------------------------------------------------- */

  if (copy) {
    gsap.fromTo(
      copy,

      {
        opacity: 0,
        y: 40,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.8,

        delay: 0.15,

        ease: "power3.out",

        scrollTrigger: {
          trigger: copy,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     ACTIONS
     ---------------------------------------------------------- */

  if (actions) {
    gsap.fromTo(
      actions,

      {
        opacity: 0,
        y: 30,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.7,

        ease: "power3.out",

        scrollTrigger: {
          trigger: actions,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     META
     ---------------------------------------------------------- */

  if (meta) {
    gsap.fromTo(
      meta,

      {
        opacity: 0,
      },

      {
        opacity: 0.5,

        duration: 0.8,

        ease: "power2.out",

        scrollTrigger: {
          trigger: meta,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ----------------------------------------------------------
     IMAGE PARALLAX
     ---------------------------------------------------------- */

  if (image) {
    gsap.fromTo(
      image,

      {
        scale: 1.08,
        yPercent: -3,
      },

      {
        scale: 1,
        yPercent: 3,

        ease: "none",

        scrollTrigger: {
          trigger: section,

          start: "top bottom",
          end: "bottom top",

          scrub: true,
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
