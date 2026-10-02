/* ==========================================================
   IMISI FOUNDATION — FEATURED STORY
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".featured-story");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Featured Story: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const meta = section.querySelector(".featured-story__meta");

  const visual = section.querySelector(".featured-story__visual");

  const image = section.querySelector(".featured-story__image");

  const content = section.querySelector(".featured-story__content");

  const caption = section.querySelector(".featured-story__caption");

  /* ========================================================
     INITIAL
     ======================================================== */

  gsap.set(meta, {
    opacity: 0,
    y: 30,
  });

  gsap.set(visual, {
    opacity: 0,
    y: 70,
  });

  gsap.set(content, {
    opacity: 0,
    x: -60,
  });

  gsap.set(caption, {
    opacity: 0,
    y: 30,
  });

  /* ========================================================
     META
     ======================================================== */

  gsap.to(meta, {
    opacity: 1,
    y: 0,

    duration: 0.7,

    ease: "power3.out",

    scrollTrigger: {
      trigger: meta,

      start: "top 80%",

      once: true,
    },
  });

  /* ========================================================
     VISUAL
     ======================================================== */

  gsap.to(visual, {
    opacity: 1,
    y: 0,

    duration: 1.1,

    ease: "power4.out",

    scrollTrigger: {
      trigger: visual,

      start: "top 78%",

      once: true,
    },
  });

  /* ========================================================
     CONTENT
     ======================================================== */

  gsap.to(content, {
    opacity: 1,
    x: 0,

    duration: 1,

    delay: 0.2,

    ease: "power4.out",

    scrollTrigger: {
      trigger: visual,

      start: "top 72%",

      once: true,
    },
  });

  /* ========================================================
     IMAGE PARALLAX
     ======================================================== */

  gsap.to(image, {
    yPercent: 7,

    ease: "none",

    scrollTrigger: {
      trigger: visual,

      start: "top bottom",

      end: "bottom top",

      scrub: 1.5,
    },
  });

  /* ========================================================
     CAPTION
     ======================================================== */

  gsap.to(caption, {
    opacity: 1,
    y: 0,

    duration: 0.8,

    ease: "power3.out",

    scrollTrigger: {
      trigger: caption,

      start: "top 85%",

      once: true,
    },
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
