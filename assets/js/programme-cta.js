/* ==========================================================
   IMISI FOUNDATION — PROGRAMME CTA
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".programme-cta");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Programme CTA: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const eyebrow = section.querySelector(".programme-cta__eyebrow");

  const title = section.querySelector(".programme-cta__title");

  const intro = section.querySelector(".programme-cta__intro");

  const actions = section.querySelector(".programme-cta__actions");

  const bottom = section.querySelector(".programme-cta__bottom");

  /* --------------------------------------------------------
     INITIAL
     -------------------------------------------------------- */

  gsap.set([eyebrow, title, intro, actions, bottom], {
    opacity: 0,
    y: 45,
  });

  /* --------------------------------------------------------
     REVEAL
     -------------------------------------------------------- */

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,

      start: "top 70%",

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
      intro,
      {
        opacity: 1,
        y: 0,

        duration: 0.7,

        ease: "power3.out",
      },
      "-=.55",
    )

    .to(
      actions,
      {
        opacity: 1,
        y: 0,

        duration: 0.7,

        ease: "power3.out",
      },
      "-=.4",
    )

    .to(
      bottom,
      {
        opacity: 1,
        y: 0,

        duration: 0.6,

        ease: "power3.out",
      },
      "-=.35",
    );

  /* --------------------------------------------------------
     BACKGROUND MOVEMENT
     -------------------------------------------------------- */

  gsap.to(section, {
    backgroundPosition: "0 20px",

    ease: "none",

    scrollTrigger: {
      trigger: section,

      start: "top bottom",

      end: "bottom top",

      scrub: 1.5,
    },
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
