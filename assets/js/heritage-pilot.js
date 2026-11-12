document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".heritage-pilot");
  if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();

  // MatchMedia reverts inline styles and scroll triggers when motion preferences change.
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const reveal = (items, trigger, stagger = 0.1) => gsap.from(items, {
      y: 32, opacity: 0, duration: 0.9, stagger, ease: "power3.out",
      scrollTrigger: { trigger, start: "top 88%", once: true },
    });

    reveal(section.querySelectorAll(".heritage-pilot__header > *"), section.querySelector(".heritage-pilot__header"));
    reveal(section.querySelectorAll(".heritage-pilot__entry > *"), section.querySelector(".heritage-pilot__entry"), 0.18);
    reveal(section.querySelectorAll(".heritage-pilot__turn > *"), section.querySelector(".heritage-pilot__turn"));
    reveal(section.querySelectorAll(".heritage-pilot__closing > *"), section.querySelector(".heritage-pilot__closing"));

    const accent = section.querySelector(".heritage-pilot__accent path");
    const length = accent.getTotalLength();
    gsap.fromTo(accent, { strokeDasharray: length, strokeDashoffset: length }, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: { trigger: section, start: "top 85%", end: "center center", scrub: 1.2 },
    });
    gsap.to(section.querySelector(".heritage-pilot__clay"), {
      rotation: 55, y: -18, ease: "none",
      scrollTrigger: { trigger: section.querySelector(".heritage-pilot__entry"), start: "top bottom", end: "bottom top", scrub: 1.5 },
    });

    const path = section.querySelector(".heritage-pilot__path");
    gsap.fromTo(path, { "--pilot-progress": 0 }, {
      "--pilot-progress": 1, ease: "none",
      scrollTrigger: { trigger: path, start: "top 65%", end: "bottom 65%", scrub: 0.5 },
    });
    path.querySelectorAll("li").forEach((row) => {
      reveal(row.children, row, 0.08);
      ScrollTrigger.create({
        trigger: row, start: "top 65%", end: "bottom 65%",
        toggleClass: { targets: row, className: "is-current" },
      });
    });
  });
});
