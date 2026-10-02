/* ==========================================================
   IMISI FOUNDATION — PROGRAMME JOURNEY
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".programme-journey");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Programme Journey: GSAP or ScrollTrigger is not loaded.");

    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const stages = section.querySelectorAll(".programme-journey__stage");

  const navItems = section.querySelectorAll(".programme-journey__nav-item");

  const current = section.querySelector(".programme-journey__current");

  const progress = section.querySelector(".programme-journey__rail-progress");

  if (!stages.length) return;

  let activeIndex = 0;

  /* ========================================================
     STAGE
     ======================================================== */

  function setActiveStage(index) {
    if (
      index === activeIndex &&
      stages[index]?.classList.contains("is-active")
    ) {
      return;
    }

    activeIndex = index;

    stages.forEach((stage, stageIndex) => {
      stage.classList.toggle("is-active", stageIndex === index);
    });

    navItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
    });

    if (current) {
      current.textContent = String(index + 1).padStart(2, "0");
    }

    if (progress) {
      const percentage = (index / (stages.length - 1)) * 100;

      gsap.to(progress, {
        height: `${percentage}%`,

        duration: 0.5,

        ease: "power2.out",

        overwrite: true,
      });
    }

    /* ------------------------------------------------------
       Stage entrance
       ------------------------------------------------------ */

    const stage = stages[index];

    const elements = stage?.querySelectorAll(
      ".programme-journey__stage-number, " +
        ".programme-journey__stage-label, " +
        "h2, p",
    );

    if (!elements?.length) return;

    gsap.fromTo(
      elements,

      {
        opacity: 0,
        y: 40,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.7,

        stagger: 0.07,

        ease: "power3.out",

        overwrite: true,
      },
    );
  }

  /* ========================================================
     INITIAL
     ======================================================== */

  stages.forEach((stage, index) => {
    stage.classList.toggle("is-active", index === 0);
  });

  navItems.forEach((item, index) => {
    item.classList.toggle("is-active", index === 0);
  });

  if (current) {
    current.textContent = "01";
  }

  /* ========================================================
     SCROLL CONTROLLER
     ======================================================== */

  ScrollTrigger.create({
    trigger: section,

    start: "top top",

    end: "bottom bottom",

    onUpdate: (self) => {
      let index = Math.floor(self.progress * stages.length);

      index = Math.max(0, Math.min(index, stages.length - 1));

      setActiveStage(index);
    },
  });

  /* ========================================================
     NAVIGATION
     ======================================================== */

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const sectionTop = section.offsetTop;

      const sectionHeight = section.offsetHeight;

      const stageProgress = index / stages.length;

      const targetY = sectionTop + sectionHeight * stageProgress;

      window.scrollTo({
        top: targetY,

        behavior: "smooth",
      });
    });
  });

  /* ========================================================
     REFRESH
     ======================================================== */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
});
