/* ==========================================================
   IMISI FOUNDATION
   SCROLL ACCENTS
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const zones = document.querySelectorAll(".heritage-accent-zone");

  if (!zones.length) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  zones.forEach((zone) => {
    const path = zone.querySelector(".scroll-accent__path");

    const nodes = zone.querySelectorAll(".scroll-accent__node");

    if (!path) return;

    /* ======================================================
       PATH LENGTH
       ====================================================== */

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    /* ======================================================
       SCROLL DRAW
       ====================================================== */

    gsap.to(path, {
      strokeDashoffset: 0,

      ease: "none",

      scrollTrigger: {
        trigger: zone,

        start: "top bottom",

        end: "bottom top",

        scrub: 1.2,
      },
    });

    /* ======================================================
       NODES
       ====================================================== */

    nodes.forEach((node, index) => {
      const triggerPoint =
        ["top 65%", "center center", "bottom 35%"][index] || "center center";

      gsap.to(node, {
        opacity: 1,

        duration: 0.5,

        scrollTrigger: {
          trigger: zone,

          start: triggerPoint,

          toggleActions: "play none none reverse",
        },
      });
    });

    /* ======================================================
       SUBTLE NODE PULSE
       ====================================================== */

    nodes.forEach((node) => {
      gsap.to(node, {
        scale: 1.35,

        duration: 1.4,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        delay: index * 0.25,
      });
    });
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
