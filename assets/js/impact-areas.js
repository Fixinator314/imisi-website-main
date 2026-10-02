/* ==========================================================
   IMISI FOUNDATION — IMPACT AREAS
   02 / Impact Areas
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-areas");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Impact Areas: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const areas = section.querySelectorAll(".impact-area");

  const progress = section.querySelector(".impact-areas__progress-fill");

  const counter = section.querySelector(".impact-areas__counter");

  if (!areas.length) return;

  let activeIndex = 0;

  /* ========================================================
     SET ACTIVE AREA
     ======================================================== */

  function setActive(index) {
    index = Math.max(0, Math.min(index, areas.length - 1));

    if (index === activeIndex && areas[index].classList.contains("is-active")) {
      return;
    }

    activeIndex = index;

    areas.forEach((area, areaIndex) => {
      area.classList.toggle("is-active", areaIndex === index);
    });

    /* ------------------------------------------------------
       COUNTER
       ------------------------------------------------------ */

    if (counter) {
      counter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(areas.length).padStart(2, "0")}`;
    }

    /* ------------------------------------------------------
       PROGRESS
       ------------------------------------------------------ */

    if (progress) {
      const percentage = (index / (areas.length - 1)) * 100;

      gsap.to(progress, {
        width: `${percentage}%`,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });
    }

    /* ------------------------------------------------------
       CONTENT REVEAL
       ------------------------------------------------------ */

    const content = areas[index].querySelector(".impact-area__content");

    const number = areas[index].querySelector(".impact-area__number");

    const mark = areas[index].querySelector(".impact-area__mark");

    if (content) {
      gsap.fromTo(
        content,

        {
          opacity: 0,
          x: 45,
        },

        {
          opacity: 1,
          x: 0,

          duration: 0.75,

          ease: "power3.out",

          overwrite: true,
        },
      );
    }

    if (number) {
      gsap.fromTo(
        number,

        {
          opacity: 0,
          y: 20,
        },

        {
          opacity: 1,
          y: 0,

          duration: 0.6,

          ease: "power2.out",

          overwrite: true,
        },
      );
    }

    if (mark) {
      gsap.fromTo(
        mark,

        {
          opacity: 0,
          scale: 0.9,
        },

        {
          opacity: 1,
          scale: 1,

          duration: 1,

          ease: "power3.out",

          overwrite: true,
        },
      );
    }
  }

  /* ========================================================
     INITIAL STATE
     ======================================================== */

  areas.forEach((area, index) => {
    area.classList.toggle("is-active", index === 0);
  });

  activeIndex = 0;

  if (counter) {
    counter.textContent = "01 / 04";
  }

  if (progress) {
    gsap.set(progress, {
      width: "0%",
    });
  }

  /* ========================================================
     SCROLL CONTROL
     ======================================================== */

  ScrollTrigger.create({
    trigger: section,

    start: "top top",

    end: "bottom bottom",

    onUpdate: (self) => {
      const rawIndex = Math.floor(self.progress * areas.length);

      const index = Math.max(0, Math.min(rawIndex, areas.length - 1));

      setActive(index);
    },
  });

  /* ========================================================
     INITIAL REVEAL
     ======================================================== */

  gsap.fromTo(
    section.querySelector(".impact-areas__intro"),

    {
      opacity: 0,
      y: 30,
    },

    {
      opacity: 1,
      y: 0,

      duration: 0.8,

      ease: "power3.out",

      scrollTrigger: {
        trigger: section,

        start: "top 75%",

        once: true,
      },
    },
  );

  /* ========================================================
     REFRESH
     ======================================================== */

  window.addEventListener("load", () => ScrollTrigger.refresh());

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
});
