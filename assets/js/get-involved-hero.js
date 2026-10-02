/* ==========================================================
   IMISI FOUNDATION — GET INVOLVED HERO
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".get-involved-hero");

  if (!hero) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Get Involved Hero: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const image = hero.querySelector(".get-involved-hero__image");

  const eyebrow = hero.querySelector(".get-involved-hero__eyebrow");

  const eyebrowLine = hero.querySelector(".get-involved-hero__eyebrow-line");

  const titleLines = hero.querySelectorAll(".get-involved-hero__title-line");

  const intro = hero.querySelector(".get-involved-hero__intro");

  const meta = hero.querySelector(".get-involved-hero__meta");

  const scroll = hero.querySelector(".get-involved-hero__scroll");

  const scrollDot = hero.querySelector(".get-involved-hero__scroll-dot");

  /* ========================================================
     INITIAL STATE
     ======================================================== */

  gsap.set(titleLines, {
    yPercent: 110,
  });

  gsap.set([eyebrow, intro, meta, scroll], {
    opacity: 0,
  });

  gsap.set(eyebrowLine, {
    scaleX: 0,
  });

  /* ========================================================
     HERO IMAGE
     ======================================================== */

  gsap.to(image, {
    scale: 1,
    duration: 2,
    ease: "power3.out",
  });

  /* ========================================================
     INTRO TIMELINE
     ======================================================== */

  const tl = gsap.timeline({
    delay: 0.25,
  });

  tl.to(eyebrow, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  })

    .to(
      eyebrowLine,
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.35",
    )

    .to(
      titleLines,
      {
        yPercent: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: "power4.out",
      },
      "-=0.15",
    )

    .to(
      intro,
      {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.5",
    )

    .to(
      meta,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.45",
    )

    .to(
      scroll,
      {
        opacity: 1,
        duration: 0.6,
      },
      "-=0.2",
    );

  /* ========================================================
     SCROLL DOT
     ======================================================== */

  if (scrollDot) {
    gsap.to(scrollDot, {
      x: 68,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }

  /* ========================================================
     HERO PARALLAX
     ======================================================== */

  gsap.to(image, {
    yPercent: 8,
    ease: "none",

    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  /* ========================================================
     REFRESH
     ======================================================== */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
