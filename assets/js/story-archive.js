/* ==========================================================
   IMISI FOUNDATION — STORY ARCHIVE
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".story-archive");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Story Archive: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = section.querySelector(".story-archive__header");

  const filters = section.querySelectorAll(".story-filter");

  const cards = section.querySelectorAll(".story-card");

  const footer = section.querySelector(".story-archive__footer");

  /* ========================================================
     HEADER REVEAL
     ======================================================== */

  gsap.fromTo(
    header,

    {
      opacity: 0,
      y: 60,
    },

    {
      opacity: 1,
      y: 0,

      duration: 1,

      ease: "power4.out",

      scrollTrigger: {
        trigger: header,

        start: "top 78%",

        once: true,
      },
    },
  );

  /* ========================================================
     CARD REVEALS
     ======================================================== */

  cards.forEach((card, index) => {
    gsap.fromTo(
      card,

      {
        opacity: 0,
        y: 70,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.9,

        delay: (index % 2) * 0.1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: card,

          start: "top 82%",

          once: true,
        },
      },
    );

    /* ------------------------------------------------------
       Image parallax
       ------------------------------------------------------ */

    const image = card.querySelector(".story-card__image");

    if (image) {
      gsap.to(image, {
        yPercent: 5,

        ease: "none",

        scrollTrigger: {
          trigger: card,

          start: "top bottom",

          end: "bottom top",

          scrub: 1.4,
        },
      });
    }
  });

  /* ========================================================
     FILTERING
     ======================================================== */

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;

      filters.forEach((item) => {
        item.classList.toggle("is-active", item === filter);
      });

      cards.forEach((card) => {
        const matches =
          category === "all" || card.dataset.category === category;

        if (matches) {
          card.classList.remove("is-hidden");

          gsap.fromTo(
            card,

            {
              opacity: 0,
              y: 30,
            },

            {
              opacity: 1,
              y: 0,

              duration: 0.45,

              ease: "power3.out",
            },
          );
        } else {
          card.classList.add("is-hidden");
        }
      });

      ScrollTrigger.refresh();
    });
  });

  /* ========================================================
     FOOTER
     ======================================================== */

  gsap.fromTo(
    footer,

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
        trigger: footer,

        start: "top 85%",

        once: true,
      },
    },
  );

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
