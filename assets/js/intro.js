(function () {
  // ---- tuning knobs -----------------------------------------------
  var DRAW_END = 0.7; // whole logo finishes drawing at 70% of progress
  var FILL_END = 0.95; // fills fully in by 95%
  var PLAY_MS = 1700; // fallback (draw-on-appear) duration, ms
  // -----------------------------------------------------------------

  var section = document.getElementById("drawSection");
  var paths = Array.prototype.slice.call(
    document.querySelectorAll("#logoSvg path"),
  );

  // Prep every path: measure it and hide the stroke with a full-length dash.
  var items = paths.map(function (path) {
    var len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    return { path: path, len: len };
  });

  function clamp(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }
  function range(v, a, b) {
    return b === a ? (v >= b ? 1 : 0) : clamp((v - a) / (b - a));
  }

  // Single source of truth: given overall progress 0..1, paint that frame.
  // Every path shares the SAME progress, so the logo draws as one whole.
  function render(progress) {
    var drawn = clamp(progress / DRAW_END); // 0..1 stroke reveal
    var fill = range(progress, DRAW_END, FILL_END); // 0..1 fill fade-in
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      it.path.style.strokeDashoffset = it.len * (1 - drawn);
      it.path.style.fillOpacity = fill;
      it.path.style.strokeOpacity = 1 - fill;
    }
  }

  // Scroll progress: 0 when the section top hits the viewport top,
  // 1 when its bottom hits the viewport bottom. Returns null when there
  // isn't enough scroll room to scrub (e.g. the tall height was dropped).
  function scrollProgress() {
    var rect = section.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;
    if (scrollable < 40) return null;
    return clamp(-rect.top / scrollable);
  }

  // --- Mode A: scrub with the scrollbar (preferred) ---
  function tick() {
    var p = scrollProgress();
    if (p === null) return false; // no room -> caller uses fallback
    render(p);
    return true;
  }

  // --- Mode B: safety net — play the draw once when it scrolls into view ---
  function playOnce() {
    var startT = null;
    function step(t) {
      if (startT === null) startT = t;
      var p = clamp((t - startT) / PLAY_MS);
      render(p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (tick()) {
    // We have scroll room: drive it directly from scroll (no rAF throttle
    // that can wedge — the work is tiny and runs every scroll event).
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
  } else {
    // No scroll room: fall back to draw-on-appear so it ALWAYS animates.
    render(0);
    var io = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          playOnce();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(document.getElementById("logoSvg"));
  }

  // Test hook (harmless): lets you scrub programmatically, e.g.
  // window.__imisiSetProgress(0.5)
  window.__imisiSetProgress = render;
})();

gsap.to(".intro-content h1", {
  opacity: 1,

  y: -20,

  scrollTrigger: {
    trigger: ".intro",

    start: "30% center",

    end: "45% center",

    scrub: 1,
  },
});

gsap.to(".intro-content p", {
  opacity: 1,

  y: -20,

  scrollTrigger: {
    trigger: ".intro",

    start: "40% center",

    end: "55% center",

    scrub: 1,
  },
});

gsap.to(".scroll-down", {
  opacity: 1,

  scrollTrigger: {
    trigger: ".intro",

    start: "55% center",

    end: "70% center",

    scrub: 1,
  },
});

gsap.to(".header", {
  opacity: 1,

  y: 0,

  scrollTrigger: {
    trigger: ".hero",

    start: "top 80%",

    toggleActions: "play none none reverse",
  },
});

gsap.from(".hero-content", {
  y: 100,

  opacity: 0,

  duration: 1.2,

  ease: "power3.out",

  scrollTrigger: {
    trigger: ".hero",

    start: "top 70%",
  },
});

var scrollToTopBtn = document.getElementById("scrollToTopBtn");

if (scrollToTopBtn) {
  function toggleScrollToTopBtn() {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleScrollToTopBtn, { passive: true });

  scrollToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();

    var introSection = document.querySelector(".intro");
    if (introSection) {
      introSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  toggleScrollToTopBtn();
}
