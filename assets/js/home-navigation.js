// The opening sequence is available until the visitor reaches the main hero.
const hero = document.querySelector(".hero");
const opening = [document.querySelector("#drawSection"), document.querySelector(".intro")];
const button = document.getElementById("scrollToTopBtn");
let completed = false;
let ready = false;

function heroTop() {
  return Math.max(0, window.scrollY + hero.getBoundingClientRect().top);
}

function updateButton() {
  button?.classList.toggle("show", window.scrollY > heroTop() + 500);
}

function completeOpening() {
  if (completed) return;
  completed = true;
  const distanceIntoHero = Math.max(0, window.scrollY - heroTop());

  // Dispose of intro animations before removing their scroll space. Keep the
  // remaining sections in place so their pinning can be measured again.
  window.ScrollTrigger?.getAll().forEach((trigger) => {
    if (opening.some((section) => section &&
      (section === trigger.trigger || section.contains(trigger.trigger)))) {
      trigger.kill();
    }
  });
  opening.forEach((section) => {
    if (section) section.style.display = "none";
  });
  window.ScrollTrigger?.refresh();
  window.scrollTo({ top: heroTop() + distanceIntoHero, behavior: "instant" });
  // Notify the existing navbar and scroll-driven sections of the new position.
  window.dispatchEvent(new Event("scroll"));
}

if (hero) {
  // A fresh page load replays the opening, even after a previous visit.
  // Prevent restored scroll positions from immediately completing it again.
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo({ top: 0, behavior: "instant" });

  function update() {
    if (!ready) return;
    if (!completed && hero.getBoundingClientRect().top <= 0) completeOpening();
    updateButton();
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", updateButton);
  function startVisit(event) {
    if (event?.persisted) {
      update();
      return;
    }
    // Wait until load-time layout and scroll restoration have finished before
    // allowing a scroll event to consume the opening sequence.
    ready = false;
    window.scrollTo({ top: 0, behavior: "instant" });
    window.requestAnimationFrame(() => {
      window.ScrollTrigger?.refresh();
      window.scrollTo({ top: 0, behavior: "instant" });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        ready = true;
        window.dispatchEvent(new Event("scroll"));
      });
    });
  }
  window.addEventListener("pageshow", startVisit);
  button?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: heroTop(),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant" : "smooth",
    });
  });

  if (document.readyState === "complete") startVisit();
}
