/* ==========================================================
   IMISI HOUSE — HERITAGE PIPELINE
   03 — THE SEVEN-STAGE JOURNEY
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".pipeline-journey");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Pipeline Journey: GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const stages = section.querySelectorAll(".pipeline-stage");

  const navItems = section.querySelectorAll(".pipeline-stage-nav__item");

  const current = section.querySelector(".pipeline-journey__current");

  const progress = section.querySelector(".pipeline-journey__rail-progress");

  if (!stages.length) return;

  /* ========================================================
     STATE
     ======================================================== */

  let activeIndex = 0;

  /* ========================================================
     ACTIVATE STAGE
     ======================================================== */

  function setActiveStage(index) {
    if (
      index === activeIndex &&
      stages[index]?.classList.contains("is-active")
    ) {
      return;
    }

    activeIndex = index;

    /* ------------------------------------------------------
       STAGES
       ------------------------------------------------------ */

    stages.forEach((stage, stageIndex) => {
      const isActive = stageIndex === index;

      stage.classList.toggle("is-active", isActive);
    });

    /* ------------------------------------------------------
       NAV
       ------------------------------------------------------ */

    navItems.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === index);
    });

    /* ------------------------------------------------------
       COUNTER
       ------------------------------------------------------ */

    if (current) {
      current.textContent = String(index + 1).padStart(2, "0");
    }

    /* ------------------------------------------------------
       RAIL PROGRESS
       ------------------------------------------------------ */

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
       ACTIVE CONTENT ANIMATION
       ------------------------------------------------------ */

    const activeStage = stages[index];

    if (!activeStage) return;

    const content = activeStage.querySelector(".pipeline-stage__content");

    if (!content) return;

    gsap.fromTo(
      content,

      {
        opacity: 0,
        y: 45,
      },

      {
        opacity: 1,
        y: 0,

        duration: 0.75,

        ease: "power3.out",

        overwrite: true,
      },
    );
  }

  /* ========================================================
     INITIAL STATE
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
     MAIN JOURNEY SCROLL
     ======================================================== */

  ScrollTrigger.create({
    trigger: section,

    start: "top top",

    end: "bottom bottom",

    onUpdate: (self) => {
      const progressValue = self.progress;

      /*
       * Divide the entire 700vh journey into
       * seven equal stages.
       */

      let index = Math.floor(progressValue * stages.length);

      index = Math.max(0, Math.min(index, stages.length - 1));

      /*
       * Make sure we never go beyond stage 07.
       */

      index = Math.min(stages.length - 1, index);

      setActiveStage(index);
    },
  });

  /* ========================================================
     NAVIGATION BUTTONS
     ======================================================== */

  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      /*
       * Calculate where this stage lives inside
       * the 700vh journey.
       */

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

  /* ========================================================
     RESIZE
     ======================================================== */

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
});
