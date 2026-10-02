/* ==========================================================
   IMISI FOUNDATION — STORIES / EXPERIENCES
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".programme-stories");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Programme Stories: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".programme-stories__header");

  const feature = section.querySelector(".programme-story--feature");

  const featureImage = section.querySelector(
    ".programme-story--feature .programme-story__image",
  );

  const featureContent = section.querySelector(
    ".programme-story--feature .programme-story__content",
  );

  const secondary = section.querySelectorAll(".programme-story--small");

  const closing = section.querySelector(".programme-stories__closing");

  /* ========================================================
     INITIAL
     ======================================================== */

  gsap.set(header, {
    opacity: 0,
    y: 40,
  });

  gsap.set(feature, {
    opacity: 0,
    y: 70,
  });

  gsap.set(featureContent, {
    opacity: 0,
    x: 50,
  });

  gsap.set(secondary, {
    opacity: 0,
    y: 70,
  });

  gsap.set(closing, {
    opacity: 0,
    y: 50,
  });

  /* ========================================================
     HEADER
     ======================================================== */

  gsap.to(header, {
    opacity: 1,
    y: 0,

    duration: 0.8,

    ease: "power3.out",

    scrollTrigger: {
      trigger: header,

      start: "top 80%",

      once: true,
    },
  });

  /* ========================================================
     FEATURE
     ======================================================== */

  gsap.to(feature, {
    opacity: 1,
    y: 0,

    duration: 1,

    ease: "power4.out",

    scrollTrigger: {
      trigger: feature,

      start: "top 75%",

      once: true,
    },
  });

  gsap.to(featureContent, {
    opacity: 1,
    x: 0,

    duration: 1,

    delay: 0.2,

    ease: "power4.out",

    scrollTrigger: {
      trigger: feature,

      start: "top 70%",

      once: true,
    },
  });

  /* ========================================================
     IMAGE PARALLAX
     ======================================================== */

  if (featureImage) {
    gsap.to(featureImage, {
      yPercent: 7,

      ease: "none",

      scrollTrigger: {
        trigger: feature,

        start: "top bottom",

        end: "bottom top",

        scrub: 1.5,
      },
    });
  }

  /* ========================================================
     SECONDARY STORIES
     ======================================================== */

  secondary.forEach((story, index) => {
    gsap.to(story, {
      opacity: 1,
      y: 0,

      duration: 0.9,

      delay: index * 0.12,

      ease: "power3.out",

      scrollTrigger: {
        trigger: story,

        start: "top 82%",

        once: true,
      },
    });

    const image = story.querySelector(".programme-story__small-image img");

    if (image) {
      gsap.to(image, {
        yPercent: 5,

        ease: "none",

        scrollTrigger: {
          trigger: story,

          start: "top bottom",

          end: "bottom top",

          scrub: 1.5,
        },
      });
    }
  });

  /* ========================================================
     CLOSING
     ======================================================== */

  gsap.to(closing, {
    opacity: 1,
    y: 0,

    duration: 0.9,

    ease: "power3.out",

    scrollTrigger: {
      trigger: closing,

      start: "top 82%",

      once: true,
    },
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
