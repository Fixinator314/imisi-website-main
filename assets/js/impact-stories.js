document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".impact-stories");
  if (!section) return;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animated = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  const photo = section.querySelector("#museum-photo");
  const photos = [
    ["harp-museum-engagement.png", "A presenter and learners gathered around the earlier HARP travelling museum displays", "A shared encounter with portable museum displays."],
    ["harp-museum-exploration.png", "Participants examining a drawer of materials at the earlier HARP travelling museum", "Looking closely at the materials in a portable display."],
    ["harp-material-collection.jpeg", "A HARP teaching display containing examples of worked materials and tools", "A collection of materials offers a starting point for questions."]
  ];
  let selected = 0;
  let request = 0;
  const buttons = [...section.querySelectorAll("[data-photo]")];
  photos.forEach(([file]) => { const preload = new Image(); preload.src = `./assets/images/impact/${file}`; });
  buttons.forEach((button, index) => button.addEventListener("click", async () => {
    if (index === selected) return;
    selected = index;
    const token = ++request;
    buttons.forEach((item, i) => item.setAttribute("aria-pressed", String(i === index)));
    const [file, alt, caption] = photos[index];
    const next = new Image(); next.src = `./assets/images/impact/${file}`;
    try { await next.decode(); } catch { return; }
    if (token !== request) return;
    const update = () => {
      if (token !== request) return;
      photo.src = next.src; photo.alt = alt;
      section.querySelector(".museum-caption").textContent = caption;
      section.querySelector("#museum-photo-index").textContent = `0${index + 1} / 03`;
      if (animated && !motion.matches) gsap.to(photo, { opacity: 1, duration: .35, overwrite: "auto" });
    };
    if (animated && !motion.matches) gsap.to(photo, { opacity: 0, duration: .18, overwrite: "auto", onComplete: update });
    else update();
  }));
  // Native details remain keyboard accessible and usable without animation libraries.
  section.querySelectorAll("details").forEach((detail) => detail.addEventListener("toggle", () => {
    if (animated && detail.open && !motion.matches) gsap.fromTo(detail.querySelector(".museum-detail-body"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .35, overwrite: true });
    if (animated) ScrollTrigger.refresh();
  }));
  if (!animated) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    const reveal = (items, trigger) => gsap.from(items, {
      opacity: 0, y: 36, duration: .9, stagger: .1, ease: "power3.out",
      scrollTrigger: { trigger, start: "top 87%", once: true }
    });
    [".impact-stories__header", ".impact-stories__intro", ".impact-stories__story", ".museum-details__intro", ".museum-next", ".impact-stories__closing"].forEach((selector) => {
      const el = section.querySelector(selector); reveal(el.children, el);
    });
    section.querySelectorAll("details").forEach((el) => reveal(el, el));
    const frame = section.querySelector(".impact-stories__image-wrap");
    gsap.from(frame, { clipPath: "inset(10% 0 10% 0)", opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: frame, start: "top 85%", once: true } });
    gsap.fromTo(photo, { yPercent: -3, scale: 1.12 }, { yPercent: 3, scale: 1.12, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 1 } });
    const line = section.querySelector(".museum-thread path"); const length = line.getTotalLength();
    gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: section, start: "top 80%", end: "center center", scrub: 1.2 } });
    gsap.from(section.querySelector(".impact-stories__line"), { scaleX: 0, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: ".impact-stories__closing", start: "top 90%", end: "top 55%", scrub: 1 } });
  });
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});
