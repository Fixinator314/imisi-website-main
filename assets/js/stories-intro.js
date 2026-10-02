/* ==========================================================
   IMISI FOUNDATION — STORIES INTRO
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".stories-intro");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Stories Intro: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const eyebrow = section.querySelector(".stories-intro__eyebrow");

  const index = section.querySelector(".stories-intro__index");

  const title = section.querySelector(".stories-intro__title");

  const copy = section.querySelector(".stories-intro__copy");

  const line = section.querySelector(".stories-intro__line");

  const scroll = section.querySelector(".stories-intro__scroll");

  /* --------------------------------------------------------
     INITIAL STATE
     -------------------------------------------------------- */

  gsap.set([eyebrow, index, title, copy, scroll], {
    opacity: 0,
    y: 35,
  });

  gsap.set(line, {
    scaleX: 0,
  });

  /* --------------------------------------------------------
     ENTRANCE
     -------------------------------------------------------- */

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,

      start: "top 75%",

      once: true,
    },
  });

  timeline

    .to(eyebrow, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })

    .to(
      index,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=.4",
    )

    .to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=.35",
    )

    .to(
      copy,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=.55",
    )

    .to(
      line,
      {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
      },
      "-=.35",
    )

    .to(
      scroll,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=.5",
    );

  /* --------------------------------------------------------
     SUBTLE TITLE PARALLAX
     -------------------------------------------------------- */

  gsap.to(title, {
    yPercent: -7,

    ease: "none",

    scrollTrigger: {
      trigger: section,

      start: "top bottom",

      end: "bottom top",

      scrub: 1.2,
    },
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
