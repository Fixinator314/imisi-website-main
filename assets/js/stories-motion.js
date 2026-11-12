document.addEventListener("DOMContentLoaded", () => {
 const section = document.querySelector(".stories-motion");
 if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
 const track = section.querySelector(".stories-motion__track");
 const viewport = section.querySelector(".stories-motion__viewport");
 if (!track || !viewport) return;
 gsap.registerPlugin(ScrollTrigger);
 const stories = [...section.querySelectorAll(".motion-story")];
 const fill = section.querySelector(".stories-motion__progress-fill");
 const label = section.querySelector(".stories-motion__progress-label");
 const media = gsap.matchMedia();
 media.add("(min-width: 1001px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)", () => {
   section.classList.add("is-horizontal");
   const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
   gsap.to(track, {
     x: () => -distance(), ease: "none",
     scrollTrigger: {
       trigger: section, start: "top top", end: "bottom bottom", scrub: 1,
       invalidateOnRefresh: true,
       onUpdate: self => {
         if (fill) fill.style.width = `${self.progress * 100}%`;
         if (label) {
           const index = Math.max(0, Math.min(stories.length - 1, Math.round(self.progress * (stories.length - 1))));
           label.textContent = `${String(index + 1).padStart(2, "0")} — ${String(stories.length).padStart(2, "0")}`;
         }
       }
     }
   });
   return () => {
     section.classList.remove("is-horizontal");
     if (fill) fill.style.width = "0%";
   };
 });
 media.add("(max-width: 1000px) and (prefers-reduced-motion: no-preference), (max-height: 849px) and (prefers-reduced-motion: no-preference)", () => {
   stories.forEach(story => gsap.from(story, {
     opacity: 0, y: 30, duration: .8, ease: "power3.out",
     scrollTrigger: { trigger: story, start: "top 90%", once: true }
   }));
 });
 // Refresh measurements without recreating tweens or leaking old animations.
 section.querySelectorAll("img").forEach(image => {
   if (!image.complete) {
     image.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
     image.addEventListener("error", () => ScrollTrigger.refresh(), { once: true });
   }
 });
 if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
 window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
});
