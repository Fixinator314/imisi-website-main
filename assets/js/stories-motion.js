/* ==========================================================
   IMISI FOUNDATION — STORIES IN MOTION
   05 / Stories in Motion

   Desktop:
   Vertical scroll drives horizontal story movement.

   Mobile:
   Normal vertical story layout with image parallax.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".stories-motion");

  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("Stories Motion: GSAP or ScrollTrigger not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ========================================================
     ELEMENTS
     ======================================================== */

  const sticky = section.querySelector(".stories-motion__sticky");

  const viewport = section.querySelector(".stories-motion__viewport");

  const track = section.querySelector(".stories-motion__track");

  const progress = section.querySelector(".stories-motion__progress-fill");

  const progressLabel = section.querySelector(
    ".stories-motion__progress-label",
  );

  const stories = section.querySelectorAll(".motion-story");

  const images = section.querySelectorAll(".motion-story__image img");

  /* ========================================================
     SAFETY CHECK
     ======================================================== */

  if (!viewport || !track) {
    console.warn("Stories Motion: viewport or track not found.");
    return;
  }

  /* ========================================================
     DESKTOP / MOBILE CHECK
     ======================================================== */

  const mobileQuery = window.matchMedia("(max-width: 700px)");

  /* ========================================================
     DESKTOP SETUP
     ======================================================== */

  let horizontalTrigger = null;
  let imageTriggers = [];

  function getDistance() {
    /*
     * Calculate how far the horizontal track actually
     * needs to travel.
     */

    const trackWidth = track.scrollWidth;
    const viewportWidth = viewport.clientWidth;

    return Math.max(0, trackWidth - viewportWidth);
  }

  function setupDesktop() {
    if (horizontalTrigger) {
      horizontalTrigger.kill();
      horizontalTrigger = null;
    }

    imageTriggers.forEach((trigger) => {
      if (trigger) trigger.kill();
    });

    imageTriggers = [];

    /* ------------------------------------------------------
       RESET TRACK
       ------------------------------------------------------ */

    gsap.set(track, {
      x: 0,
    });

    /* ------------------------------------------------------
       HORIZONTAL MOVEMENT
       ------------------------------------------------------ */

    const horizontalTween = gsap.to(track, {
      x: () => -getDistance(),

      ease: "none",

      paused: true,
    });

    horizontalTrigger = ScrollTrigger.create({
      trigger: section,

      start: "top top",

      end: "bottom bottom",

      scrub: 1,

      invalidateOnRefresh: true,

      onUpdate: (self) => {
        /*
         * Drive the horizontal animation manually.
         * This avoids problems caused by the track's
         * width changing after images load.
         */

        horizontalTween.progress(self.progress);

        /* --------------------------------------------------
           PROGRESS BAR
           -------------------------------------------------- */

        if (progress) {
          gsap.set(progress, {
            width: `${self.progress * 100}%`,
          });
        }

        /* --------------------------------------------------
           STORY COUNTER
           -------------------------------------------------- */

        if (progressLabel && stories.length) {
          const total = stories.length;

          let current = Math.ceil(self.progress * total);

          current = Math.max(1, Math.min(current, total));

          progressLabel.textContent = `${String(current).padStart(2, "0")} — ${String(total).padStart(2, "0")}`;
        }
      },
    });

    /* ------------------------------------------------------
       IMAGE PARALLAX
       ------------------------------------------------------ */

    images.forEach((image) => {
      const tween = gsap.fromTo(
        image,

        {
          xPercent: -5,
        },

        {
          xPercent: 5,

          ease: "none",

          scrollTrigger: {
            trigger: section,

            start: "top top",

            end: "bottom bottom",

            scrub: true,

            invalidateOnRefresh: true,
          },
        },
      );

      imageTriggers.push(tween.scrollTrigger);
    });
  }

  /* ========================================================
     MOBILE SETUP
     ======================================================== */

  function setupMobile() {
    if (horizontalTrigger) {
      horizontalTrigger.kill();
      horizontalTrigger = null;
    }

    imageTriggers.forEach((trigger) => {
      if (trigger) trigger.kill();
    });

    imageTriggers = [];

    /* ------------------------------------------------------
       RESET TRACK
       ------------------------------------------------------ */

    gsap.set(track, {
      clearProps: "transform",
    });

    /* ------------------------------------------------------
       MOBILE IMAGE PARALLAX
       ------------------------------------------------------ */

    images.forEach((image) => {
      gsap.set(image, {
        xPercent: 0,
      });

      const tween = gsap.fromTo(
        image,

        {
          scale: 1.08,
        },

        {
          scale: 1,

          ease: "none",

          scrollTrigger: {
            trigger: image,

            start: "top bottom",

            end: "bottom top",

            scrub: true,

            invalidateOnRefresh: true,
          },
        },
      );

      imageTriggers.push(tween.scrollTrigger);
    });

    /* ------------------------------------------------------
       MOBILE PROGRESS
       ------------------------------------------------------ */

    if (progress) {
      gsap.set(progress, {
        width: "0%",
      });
    }
  }

  /* ========================================================
     INITIALISE
     ======================================================== */

  function initialise() {
    /*
     * Kill any existing triggers created by this section.
     */

    if (horizontalTrigger) {
      horizontalTrigger.kill();
      horizontalTrigger = null;
    }

    imageTriggers.forEach((trigger) => {
      if (trigger) trigger.kill();
    });

    imageTriggers = [];

    if (mobileQuery.matches) {
      setupMobile();
    } else {
      setupDesktop();
    }

    /*
     * Give the browser a moment to finish layout before
     * refreshing ScrollTrigger measurements.
     */

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  /* ========================================================
     RESIZE / BREAKPOINT CHANGE
     ======================================================== */

  let resizeTimer;

  function handleResize() {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      initialise();
    }, 250);
  }

  window.addEventListener("resize", handleResize);

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", initialise);
  }

  /* ========================================================
     WAIT FOR IMAGES
     ======================================================== */

  let imagesLoaded = 0;

  if (!images.length) {
    initialise();
  } else {
    images.forEach((image) => {
      if (image.complete) {
        imagesLoaded++;
      } else {
        image.addEventListener(
          "load",
          () => {
            imagesLoaded++;

            if (imagesLoaded === images.length) {
              initialise();
            }
          },
          { once: true },
        );

        image.addEventListener(
          "error",
          () => {
            imagesLoaded++;

            if (imagesLoaded === images.length) {
              initialise();
            }
          },
          { once: true },
        );
      }
    });

    /*
     * If every image was already cached.
     */

    if (imagesLoaded === images.length) {
      initialise();
    }
  }

  /* ========================================================
     FINAL PAGE LOAD
     ======================================================== */

  window.addEventListener("load", () => {
    setTimeout(() => {
      initialise();
    }, 100);
  });
});
