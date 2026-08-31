gsap.registerPlugin(ScrollTrigger);

const paths = document.querySelectorAll("#imisi-logo path");

paths.forEach((path, index) => {
  const length = path.getTotalLength();

  path.style.stroke = path.getAttribute("fill");
  path.style.strokeWidth = 2.5;

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  gsap.to(path, {
    strokeDashoffset: 0,

    scrollTrigger: {
      trigger: ".logo-section",
      start: "top top",
      end: "70% center",
      scrub: true,
    },

    delay: index * 0.08,
  });

  gsap.to(path, {
    fillOpacity: 1,
    strokeOpacity: 0,

    scrollTrigger: {
      trigger: ".logo-section",
      start: "40% center",
      end: "80% center",
      scrub: true,
    },
  });
});

gsap.to("#imisi-logo", {
  scale: 1.1,

  scrollTrigger: {
    trigger: ".logo-section",
    start: "40% center",
    end: "80% center",
    scrub: true,
  },
});

gsap.to(".intro-text h1", {
  opacity: 1,
  y: -20,

  scrollTrigger: {
    trigger: ".logo-section",
    start: "45% center",
    end: "65% center",
    scrub: true,
  },
});

gsap.to(".intro-text p", {
  opacity: 1,
  y: -15,

  scrollTrigger: {
    trigger: ".logo-section",
    start: "55% center",
    end: "70% center",
    scrub: true,
  },
});

gsap.to(".scroll-indicator", {
  opacity: 1,

  scrollTrigger: {
    trigger: ".logo-section",
    start: "60% center",
    end: "80% center",
    scrub: true,
  },
});

gsap.to(".line", {
  y: 20,
  repeat: -1,
  yoyo: true,
  duration: 1.2,
  ease: "power1.inOut",
});
