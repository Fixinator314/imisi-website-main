/* ==========================================================
   IMISI FOUNDATION — IMPACT STORIES
   04 / Impact Stories
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-stories");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Impact Stories: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const image = section.querySelector(".impact-stories__image img");

  const header = section.querySelector(".impact-stories__header");

  const intro = section.querySelector(".impact-stories__intro");

  const feature = section.querySelector(".impact-stories__feature");

  const story = section.querySelector(".impact-stories__story");

  const closing = section.querySelector(".impact-stories__closing");

  /* --------------------------------------------------------
     HEADER
     -------------------------------------------------------- */

  gsap.fromTo(
    header,
    {
      opacity: 0,
      y: 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     INTRO
     -------------------------------------------------------- */

  gsap.fromTo(
    intro,
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
        trigger: intro,
        start: "top 80%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     FEATURE
     -------------------------------------------------------- */

  gsap.fromTo(
    feature,
    {
      opacity: 0,
      y: 70,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: feature,
        start: "top 82%",
        once: true,
      },
    },
  );

  /* --------------------------------------------------------
     IMAGE PARALLAX
     -------------------------------------------------------- */

  if (image) {
    gsap.to(image, {
      yPercent: -8,
      scale: 1.02,
      ease: "none",

      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  /* --------------------------------------------------------
     STORY
     -------------------------------------------------------- */

  if (story) {
    const storyElements = story.children;

    gsap.fromTo(
      storyElements,
      {
        opacity: 0,
        y: 25,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: story,
          start: "top 78%",
          once: true,
        },
      },
    );
  }

  /* --------------------------------------------------------
     CLOSING
     -------------------------------------------------------- */

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
          start: "top 85%",
          once: true,
        },
      },
    );
  }

  /* --------------------------------------------------------
     REFRESH
     -------------------------------------------------------- */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
