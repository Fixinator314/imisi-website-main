/* ==========================================================
   IMISI FOUNDATION
   THE LIVING SYSTEM
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".living-system");

  if (!section) return;

  const nodes = section.querySelectorAll(".living-system__node");
  const detailIndex = section.querySelector(".living-system__detail-index");
  const detailText = section.querySelector(".living-system__detail-text");

  if (!nodes.length) return;

  const details = {
    people:
      "People carry knowledge forward through participation, practice and exchange.",

    practice:
      "Knowledge becomes meaningful when it is practised, tested and shared.",

    place:
      "Places hold memory, material and experience — connecting knowledge to where it lives.",

    knowledge:
      "Knowledge grows when different ways of knowing meet, question and inform one another.",

    future:
      "What is carried forward creates new pathways for the generations that follow.",
  };

  function activateNode(node, index) {
    nodes.forEach((item) => {
      item.classList.remove("is-active");
    });

    node.classList.add("is-active");

    if (detailIndex) {
      detailIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${String(nodes.length).padStart(2, "0")}`;
    }

    if (detailText) {
      gsap.fromTo(
        detailText,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true,
        },
      );

      detailText.textContent = details[node.dataset.system] || "";
    }
  }

  nodes.forEach((node, index) => {
    node.addEventListener("mouseenter", () => {
      activateNode(node, index);
    });

    node.addEventListener("focus", () => {
      activateNode(node, index);
    });

    node.addEventListener("click", () => {
      activateNode(node, index);
    });
  });

  /* ========================================================
     GSAP REVEAL
     ======================================================== */

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const revealItems = section.querySelectorAll(
      ".living-system__header > *, .living-system__diagram, .living-system__detail, .living-system__closing",
    );

    gsap.fromTo(
      revealItems,
      {
        opacity: 0,
        y: 35,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      },
    );

    /* ======================================================
       ORBIT MOTION
       ====================================================== */

    gsap.to(".living-system__orbit--outer", {
      rotation: 360,
      duration: 45,
      repeat: -1,
      ease: "none",
    });

    gsap.to(".living-system__orbit--inner", {
      rotation: -360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });

    /* ======================================================
       CONNECTION PULSE
       ====================================================== */

    gsap.fromTo(
      ".living-system__connection",
      {
        opacity: 0.2,
        scaleX: 0.85,
      },
      {
        opacity: 0.65,
        scaleX: 1,
        duration: 2,
        stagger: 0.25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    );
  }

  activateNode(nodes[0], 0);
});
