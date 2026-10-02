/* ==========================================================
   IMISI FOUNDATION — PROGRAMMES INTRO
   Scroll reveal
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".programmes-intro");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Programmes Intro: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const eyebrow = section.querySelector(".programmes-intro__eyebrow");

  const title = section.querySelector(".programmes-intro__title");

  const copy = section.querySelector(".programmes-intro__copy");

  const line = section.querySelector(".programmes-intro__line");

  const hint = section.querySelector(".programmes-intro__hint");

  /* --------------------------------------------------------
     INITIAL STATES
     -------------------------------------------------------- */

  gsap.set([eyebrow, title, copy, hint], {
    opacity: 0,
    y: 35,
  });

  gsap.set(line, {
    scaleX: 0,
  });

  /* --------------------------------------------------------
     ENTRANCE
     -------------------------------------------------------- */

  const introTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      once: true,
    },
  });

  introTimeline
    .to(eyebrow, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    })

    .to(
      title,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.45",
    )

    .to(
      copy,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.55",
    )

    .to(
      line,
      {
        scaleX: 1,
        duration: 1.1,
        ease: "power3.inOut",
      },
      "-=0.4",
    )

    .to(
      hint,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.5",
    );

  /* --------------------------------------------------------
     SUBTLE TITLE MOVEMENT
     -------------------------------------------------------- */

  gsap.to(title, {
    yPercent: -8,

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
