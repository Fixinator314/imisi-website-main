/* ==========================================================
   IMISI FOUNDATION — STORY VOICES
   04 / Voices & Perspectives
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".story-voices");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Story Voices: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* --------------------------------------------------------
     INTRO
     -------------------------------------------------------- */

  const intro = section.querySelector(".story-voices__intro");

  if (intro) {
    gsap.fromTo(
      intro,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",

        scrollTrigger: {
          trigger: intro,
          start: "top 80%",
          once: true,
        },
      },
    );
  }

  /* --------------------------------------------------------
     VOICES
     -------------------------------------------------------- */

  const voices = section.querySelectorAll(".story-voice");

  voices.forEach((voice) => {
    const number = voice.querySelector(".story-voice__number");
    const quote = voice.querySelector(".story-voice__quote");
    const person = voice.querySelector(".story-voice__person");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: voice,
        start: "top 78%",
        once: true,
      },
    });

    tl.fromTo(
      number,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
    );

    tl.fromTo(
      quote,
      {
        opacity: 0,
        y: 55,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.2",
    );

    tl.fromTo(
      person,
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.45",
    );
  });

  /* --------------------------------------------------------
     CLOSING
     -------------------------------------------------------- */

  const closing = section.querySelector(".story-voices__closing");

  if (closing) {
    gsap.fromTo(
      closing,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,

        scrollTrigger: {
          trigger: closing,
          start: "top 85%",
          once: true,
        },
      },
    );
  }

  /* --------------------------------------------------------
     REFRESH
     -------------------------------------------------------- */

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});
