document.addEventListener("DOMContentLoaded", () => {
 const section = document.querySelector(".programme-pilots");
 if (!section) return;
 const animated = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
 const reduced = matchMedia("(prefers-reduced-motion: reduce)");
 const rows = [...section.querySelectorAll("details")];
 const links = [...section.querySelectorAll(".programme-pilots__nav a")];
 const activate = (index) => links.forEach((link, i) => {
   link.classList.toggle("is-current", i === index);
   if (i === index) link.setAttribute("aria-current", "step");
   else link.removeAttribute("aria-current");
 });
 links.forEach((link, i) => link.addEventListener("click", () => { rows[i].open = true; activate(i); }));
 rows.forEach((row, i) => row.addEventListener("toggle", () => {
   if (row.open) {
     activate(i);
     if (animated && !reduced.matches) gsap.fromTo(row.querySelector(".pilot-programme__body"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, overwrite: true });
   }
   if (animated) ScrollTrigger.refresh();
 }));
 // Open direct links from other pages before measuring the scroll layout.
 const target = rows.find(row => `#${row.id}` === location.hash);
 if (target) target.open = true;
 activate(target ? rows.indexOf(target) : 0);
 if (!animated) return;
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
   const reveal = (items, trigger) => gsap.from(items, { opacity: 0, y: 30, stagger: .1, duration: .8, ease: "power3.out", scrollTrigger: { trigger, start: "top 88%", once: true } });
   const header = section.querySelector("header"); reveal(header.children, header);
   reveal(links, section.querySelector("nav"));
   rows.forEach((row, i) => {
     reveal(row.querySelector("summary").children, row);
     ScrollTrigger.create({ trigger: row, start: "top 55%", end: "bottom 55%", onEnter: () => activate(i), onEnterBack: () => activate(i) });
   });
   const list = section.querySelector(".programme-pilots__list");
   gsap.fromTo(list, { "--pilot-progress": 0 }, { "--pilot-progress": 1, ease: "none", scrollTrigger: { trigger: list, start: "top 65%", end: "bottom 65%", scrub: .7 } });
   const note = section.querySelector("aside"); reveal(note.children, note);
   reveal(section.querySelector(".programme-pilots__actions").children, section.querySelector(".programme-pilots__actions"));
 });
 window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});
