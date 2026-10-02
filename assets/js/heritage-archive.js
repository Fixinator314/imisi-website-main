/* ==========================================================
   IMISI HOUSE — THE LIVING ARCHIVE
   Component JS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".living-archive");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Living Archive: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ==========================================================
     NAVBAR — DARK SECTION = WHITE NAV
     ========================================================== */

  const nav = document.querySelector(".nav");

  if (nav) {
    ScrollTrigger.create({
      trigger: section,

      start: "top 15%",
      end: "bottom 15%",

      onEnter: () => {
        nav.classList.remove("nav--dark");
      },

      onEnterBack: () => {
        nav.classList.remove("nav--dark");
      },

      onLeave: () => {
        nav.classList.remove("nav--dark");
      },

      onLeaveBack: () => {
        nav.classList.remove("nav--dark");
      },
    });
  }

  /* ==========================================================
     HEADER
     ========================================================== */

  const header = section.querySelector(".living-archive__header");

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

        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger: header,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ==========================================================
     GALLERY ITEMS
     ========================================================== */

  const items = section.querySelectorAll(".living-archive__item");

  items.forEach((item, index) => {
    const image = item.querySelector(".living-archive__image");

    gsap.fromTo(
      item,

      {
        opacity: 0,
        y: 80,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger: item,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );

    /* Image movement */

    if (image) {
      gsap.fromTo(
        image,

        {
          scale: 1.12,
          yPercent: -4,
        },

        {
          scale: 1,
          yPercent: 4,

          ease: "none",

          scrollTrigger: {
            trigger: item,

            start: "top bottom",
            end: "bottom top",

            scrub: true,
          },
        },
      );
    }
  });

  /* ==========================================================
     CLOSING STATEMENT
     ========================================================== */

  const closing = section.querySelector(".living-archive__closing");

  if (closing) {
    gsap.fromTo(
      closing,

      {
        opacity: 0,
        y: 50,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.9,
        ease: "power3.out",

        scrollTrigger: {
          trigger: closing,

          start: "top 90%",

          toggleActions: "play none none reverse",
        },
      },
    );
  }

  /* ==========================================================
     REFRESH
     ========================================================== */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
