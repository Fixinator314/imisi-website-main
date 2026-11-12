document.addEventListener("DOMContentLoaded", () => {
 const section = document.querySelector(".cohort");
 if (!section) return;
 const animated = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
 const reduced = matchMedia("(prefers-reduced-motion: reduce)");
 const links = [...section.querySelectorAll(".cohort__nav a")];
 const sessions = [...section.querySelectorAll(".cohort-session")];
 const meter = section.querySelector(".cohort__meter span");
 const activate = i => {
   links.forEach((link, index) => { if (index === i) link.setAttribute("aria-current", "step"); else link.removeAttribute("aria-current"); });
   meter.style.transform = `scaleX(${(i + 1) / sessions.length})`;
 };
 activate(0);
 links.forEach((link, i) => link.addEventListener("click", () => activate(i)));
 section.querySelectorAll("details").forEach(detail => detail.addEventListener("toggle", () => {
   if (!animated) return;
   if (detail.open && !reduced.matches) gsap.fromTo(detail.querySelector("dl"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .35, overwrite: true });
   ScrollTrigger.refresh();
 }));
 const observer = new IntersectionObserver(entries => {
   entries.forEach(entry => { if (entry.isIntersecting) activate(sessions.indexOf(entry.target)); });
 }, { rootMargin: "-20% 0px -50% 0px" });
 sessions.forEach(session => observer.observe(session));
 if (!animated) return;
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
   const overview = section.querySelector(".cohort__overview");
   gsap.from(overview.children, { opacity: 0, y: 30, stagger: .09, duration: .8, scrollTrigger: { trigger: section, start: "top 80%", once: true } });
   sessions.forEach(session => gsap.from(session.children, { opacity: 0, y: 30, stagger: .08, duration: .8, ease: "power3.out", scrollTrigger: { trigger: session, start: "top 88%", once: true } }));
 });
 window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});
