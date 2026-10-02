/* ==========================================================
   IMISI FOUNDATION — IMPACT JOURNEY
   03 / Impact Journey
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-journey");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Impact Journey: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const stages = section.querySelectorAll(".impact-journey__stage");

  const navItems = section.querySelectorAll(".impact-stage-nav");

  const current = section.querySelector(".impact-journey__current");

  const progress = section.querySelector(".impact-journey__rail-progress");

  if (!stages.length) return;

  let activeIndex = 0;

  /* ========================================================
     SET ACTIVE
     ======================================================== */

  function setActiveStage(index) {
    index = Math.max(0, Math.min(index, stages.length - 1));

    if (
      index === activeIndex &&
      stages[index].classList.contains("is-active")
    ) {
      return;
    }

    activeIndex = index;

    /* ------------------------------------------------------
       STAGES
       ------------------------------------------------------ */

    stages.forEach((stage, stageIndex) => {
      stage.classList.toggle("is-active", stageIndex === index);
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

        duration: 0.55,

        ease: "power2.out",

        overwrite: true,
      });
    }

    /* ------------------------------------------------------
       CONTENT ANIMATION
       ------------------------------------------------------ */

    const activeStage = stages[index];

    if (!activeStage) return;

    const number = activeStage.querySelector(".impact-journey__number");

    const category = activeStage.querySelector(".impact-journey__category");

    const title = activeStage.querySelector("h2");

    const description = activeStage.querySelector(":scope > p");

    const outcome = activeStage.querySelector(".impact-journey__outcome");

    const elements = [number, category, title, description, outcome].filter(
      Boolean,
    );

    if (!elements.length) return;

    gsap.fromTo(
      elements,

      {
        opacity: 0,
        y: 30,
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

  if (progress) {
    gsap.set(progress, {
      height: "0%",
    });
  }

  /* ========================================================
     SCROLLTRIGGER
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
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      const sectionHeight = section.offsetHeight;

      const progress = index / stages.length;

      const target = sectionTop + sectionHeight * progress;

      window.scrollTo({
        top: target,
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

    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
});
