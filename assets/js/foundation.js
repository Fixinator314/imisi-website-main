/* ==========================================================
   ÌMÍSÍ FOUNDATION
   Foundation Sections
   GSAP + ScrollTrigger
   ========================================================== */

(() => {
  "use strict";

  /* ==========================================================
     SAFETY CHECKS
     ========================================================== */

  if (typeof gsap === "undefined") {
    console.error("GSAP is not loaded.");
    return;
  }

  if (typeof ScrollTrigger === "undefined") {
    console.error("GSAP ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ==========================================================
     HELPERS
     ========================================================== */

  const $ = (selector, parent = document) => parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  /* ==========================================================
     STANDARD REVEAL
     ========================================================== */

  function reveal(element, options = {}) {
    if (!element) return;

    gsap.to(element, {
      opacity: 1,
      y: options.y ?? -20,
      ease: options.ease ?? "none",

      scrollTrigger: {
        trigger: options.trigger ?? element,

        start: options.start ?? "top 82%",

        end: options.end ?? "top 55%",

        scrub: options.scrub ?? 1,

        once: options.once ?? false,
      },
    });
  }

  /* ==========================================================
     STAGGERED REVEAL
     ========================================================== */

  function revealGroup(elements, options = {}) {
    if (!elements || !elements.length) return;

    gsap.to(elements, {
      opacity: 1,

      y: options.y ?? -20,

      stagger: options.stagger ?? 0.12,

      ease: options.ease ?? "none",

      scrollTrigger: {
        trigger: options.trigger ?? elements[0],

        start: options.start ?? "top 85%",

        end: options.end ?? "top 55%",

        scrub: options.scrub ?? 1,

        once: options.once ?? false,
      },
    });
  }

  /* ==========================================================
     HERITAGE PIPELINE DATA
     ========================================================== */

  const PIPELINE = [
    {
      slug: "discover",
      num: "01",
      title: "Discover",
      tagline: "Every pathway begins with discovery.",
      desc: "Learners encounter museums, artisans, scientists and heritage spaces — the first spark of curiosity that sets a journey in motion.",
      color: "#0A6970",
      on: "#F6F3EA",
      accent: "#BED639",
      placeholder: false,
    },

    {
      slug: "connect",
      num: "02",
      title: "Connect",
      tagline: "Curiosity finds its people.",
      desc: "Interest is matched to knowledge holders, institutions and peers — turning a spark into a relationship.",
      color: "#0C9268",
      on: "#F6F3EA",
      accent: "#BED639",
      placeholder: true,
    },

    {
      slug: "learn",
      num: "03",
      title: "Learn",
      tagline: "Knowledge becomes structure.",
      desc: "Living and formal knowledge are taught together through a structured, research-informed curriculum.",
      color: "#B4643C",
      on: "#FBF9F2",
      accent: "#BED639",
      placeholder: true,
    },

    {
      slug: "experience",
      num: "04",
      title: "Experience",
      tagline: "Skill meets the material world.",
      desc: "Learners practise inside real settings — workshops, sites, museums and communities — where knowledge is tested by doing.",
      color: "#8A5A2B",
      on: "#FBF9F2",
      accent: "#BED639",
      placeholder: true,
    },

    {
      slug: "create",
      num: "05",
      title: "Create",
      tagline: "Knowledge becomes something new.",
      desc: "Learners produce original work — objects, documentation and ideas — that carry heritage forward in their own hands.",
      color: "#9E4A2E",
      on: "#FBF9F2",
      accent: "#BED639",
      placeholder: true,
    },

    {
      slug: "transition",
      num: "06",
      title: "Transition",
      tagline: "A pathway into a future.",
      desc: "Real routes open into further study, apprenticeship, employment and enterprise — heritage becomes livelihood.",
      color: "#0A6970",
      on: "#F6F3EA",
      accent: "#BED639",
      placeholder: true,
    },

    {
      slug: "return",
      num: "07",
      title: "Return",
      tagline: "Knowledge comes home.",
      desc: "Skills, income and standing return to communities — and the next generation of knowledge holders begins the journey again.",
      color: "#074E54",
      on: "#F6F3EA",
      accent: "#BED639",
      placeholder: true,
    },
  ];

  /* ==========================================================
     ICONS
     ========================================================== */

  const ICON = {
    arrowUR: `
      <svg
        class="ico"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8"/>
      </svg>
    `,
  };

  /* ==========================================================
     STATUS TAG
     ========================================================== */

  const STATUS_LABEL = {
    placeholder: "Placeholder for review",
  };

  function tag(status) {
    return `
      <span class="tag tag--${status}">
        ${STATUS_LABEL[status] || status}
      </span>
    `;
  }

  /* ==========================================================
     BUILD HERITAGE PIPELINE
     ========================================================== */

  function buildPipeline() {
    const track = $("#pipeTrack");
    const outro = $(".panel--outro");
    const mobile = $("#pipeMobile");

    if (!track || !outro) {
      console.warn("Heritage Pipeline elements were not found.");
      return;
    }

    /* --------------------------------------------------------
       Clear existing desktop panels
       -------------------------------------------------------- */

    $$(".panel--stage", track).forEach((panel) => {
      panel.remove();
    });

    /* --------------------------------------------------------
       Desktop panels
       -------------------------------------------------------- */

    PIPELINE.forEach((stage) => {
      const panel = document.createElement("a");

      panel.className = "panel panel--stage";

      panel.href = "#pipeline";

      panel.dataset.color = stage.color;

      panel.dataset.on = stage.on;

      panel.dataset.current = `${stage.num} · ${stage.title}`;

      panel.dataset.cursor = stage.num;

      panel.innerHTML = `
        <div
          class="num-xl"
          style="color:${stage.accent}"
        >
          ${stage.num}
        </div>

        <div class="body">

          ${stage.placeholder ? tag("placeholder") : ""}

          <h3>${stage.title}</h3>

          <p class="tagline">
            ${stage.tagline}
          </p>

          <p>
            ${stage.desc}
          </p>

          <span class="enter">
            Enter ${stage.title}
            ${ICON.arrowUR}
          </span>

        </div>
      `;

      track.insertBefore(panel, outro);
    });

    /* --------------------------------------------------------
       Mobile pipeline
       -------------------------------------------------------- */

    if (!mobile) return;

    mobile.innerHTML = `
      <div class="pipe-mobile__intro">

        <div class="eyebrow">
          <span class="num">01</span>

          <span class="rule"></span>

          The Heritage Pipeline
        </div>

        <h2>
          Seven stages.
          One continuous journey.
        </h2>

      </div>

      ${PIPELINE.map(
        (stage) => `
        <a
          class="stage"
          href="#pipeline"

          style="
            background:${stage.color};
            color:${stage.on};
          "
        >

          <span
            class="n"
            style="color:${stage.accent}"
          >
            ${stage.num}
          </span>

          ${stage.placeholder ? tag("placeholder") : ""}

          <h3>${stage.title}</h3>

          <p class="tagline">
            ${stage.tagline}
          </p>

          <p>
            ${stage.desc}
          </p>

          <span class="enter">
            Enter ${stage.title}
            ${ICON.arrowUR}
          </span>

        </a>
      `,
      ).join("")}
    `;
  }

  /* ==========================================================
     HORIZONTAL HERITAGE PIPELINE
     ========================================================== */

  function pipelineHorizontal() {
    const pipeline = $("#pipeline");
    const track = $("#pipeTrack");
    const fill = $("#pipeFill");
    const pin = $("#pipePin");
    const current = $("#pipeCurrent");

    if (!pipeline || !track || !fill || !pin || !current) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const total = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -total(),

        ease: "none",

        scrollTrigger: {
          trigger: pipeline,

          start: "top top",

          end: () => `+=${total()}`,

          scrub: 0.8,

          pin: pin,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            fill.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      $$(".panel--stage", track).forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,

          containerAnimation: tween,

          start: "left center",

          end: "right center",

          onToggle: (self) => {
            if (!self.isActive) return;

            pin.style.background = panel.dataset.color;

            pin.style.color = panel.dataset.on;

            current.textContent = panel.dataset.current;
          },
        });
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    });
  }

  /* ==========================================================
     SECTION 02 — WHY THIS MATTERS
     ========================================================== */

  function whySection() {
    const section = $(".why");

    if (!section) return;

    const title = $(".why__title", section);

    const lead = $(".why__lead", section);

    const copy = $(".why__copy", section);

    const stats = $$(".why__stat", section);

    reveal(title, {
      trigger: section,
      start: "15% center",
      end: "30% center",
    });

    reveal(lead, {
      trigger: section,
      start: "28% center",
      end: "43% center",
    });

    reveal(copy, {
      trigger: section,
      start: "35% center",
      end: "50% center",
    });

    revealGroup(stats, {
      trigger: $(".why__stats", section),
      start: "top 80%",
      end: "top 55%",
      stagger: 0.1,
    });

    const counters = $$("[data-count]", section);

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);

      const value = {
        current: 0,
      };

      gsap.to(value, {
        current: target,

        duration: 1.5,

        ease: "power2.out",

        scrollTrigger: {
          trigger: counter,

          start: "top 85%",

          once: true,
        },

        onUpdate: () => {
          counter.textContent = Math.round(value.current);
        },
      });
    });
  }

  /* ==========================================================
     SECTION 03 — TWO KNOWLEDGE SYSTEMS
     ========================================================== */

  function knowledgeSection() {
    const section = $(".knowledge");

    if (!section) return;

    const title = $(".knowledge__title", section);

    const intro = $(".knowledge__intro", section);

    const systems = $$(".knowledge__system", section);

    const bridge = $(".knowledge__bridge", section);

    reveal(title, {
      trigger: section,
      start: "20% center",
      end: "38% center",
    });

    reveal(intro, {
      trigger: section,
      start: "30% center",
      end: "45% center",
    });

    revealGroup(systems, {
      trigger: $(".knowledge__systems", section),
      start: "15% center",
      end: "45% center",
      stagger: 0.12,
    });

    reveal(bridge, {
      trigger: bridge,
      start: "70% center",
      end: "90% center",
    });
  }

  /* ==========================================================
     SECTION 04 — ECOSYSTEM
     ========================================================== */

  function ecosystemSection() {
    const section = $(".ecosystem");

    if (!section) return;

    const title = $(".ecosystem__title", section);

    const intro = $(".ecosystem__intro", section);

    const cards = $$(".ecosystem__card", section);

    const statement = $(".ecosystem__statement", section);

    reveal(title);

    reveal(intro);

    revealGroup(cards, {
      trigger: cards[0],
      stagger: 0.12,
    });

    reveal(statement);
  }

  /* ==========================================================
     SECTION 05 — CURRENT WORK
     ========================================================== */

  function workSection() {
    const section = $(".work");

    if (!section) return;

    const title = $(".work__title", section);

    const intro = $(".work__intro", section);

    const featured = $(".work__featured", section);

    const cards = $$(".work__card", section);

    reveal(title);

    reveal(intro);

    reveal(featured);

    cards.forEach((card) => {
      reveal(card, {
        start: "top 85%",
        end: "top 60%",
      });
    });
  }

  /* ==========================================================
     SECTION 06 — TRUE LIFE ALCHEMY
     ========================================================== */

  function alchemySection() {
    const section = $(".alchemy");

    if (!section) return;

    const title = $(".alchemy__title", section);

    const intro = $(".alchemy__intro", section);

    const visual = $(".alchemy__visual", section);

    const bottom = $(".alchemy__bottom", section);

    reveal(title);

    reveal(intro);

    reveal(visual);

    reveal(bottom, {
      end: "top 60%",
    });
  }

  /* ==========================================================
     SECTION 07 — GET INVOLVED
     ========================================================== */

  function involvedSection() {
    const section = $(".involved");

    if (!section) return;

    const title = $(".involved__title", section);

    const description = $(".involved__description", section);

    const options = $$(".involved__option", section);

    const closing = $(".involved__closing", section);

    reveal(title, {
      start: "top 80%",
      end: "top 45%",
    });

    reveal(description, {
      start: "top 82%",
      end: "top 55%",
    });

    revealGroup(options, {
      trigger: $(".involved__options", section),

      start: "top 85%",

      end: "top 55%",

      stagger: 0.12,
    });

    reveal(closing, {
      start: "top 85%",
      end: "top 60%",
    });
  }

  /* ==========================================================
     SECTION 08 — NEXT CHAPTER
     ========================================================== */

  function chapterSection() {
    const section = $(".chapter");

    if (!section) return;

    const eyebrow = $(".chapter__eyebrow", section);

    const line = $(".chapter__line", section);

    const kicker = $(".chapter__kicker", section);

    const title = $(".chapter__title", section);

    const titleLines = $$(".chapter__line-text", section);

    const description = $(".chapter__description", section);

    const link = $(".chapter__link", section);

    const footer = $(".chapter__footer", section);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,

        start: "top 85%",

        end: "top 35%",

        scrub: 1,
      },
    });

    if (eyebrow) {
      tl.to(eyebrow, {
        opacity: 1,

        y: 0,

        duration: 0.8,

        ease: "power3.out",
      });
    }

    if (line) {
      tl.to(
        line,
        {
          scaleX: 1,

          duration: 0.6,

          ease: "power3.out",
        },
        "-=0.5",
      );
    }

    if (kicker) {
      tl.to(
        kicker,
        {
          opacity: 1,

          y: 0,

          duration: 0.7,

          ease: "power3.out",
        },
        "-=0.2",
      );
    }

    if (titleLines.length) {
      tl.to(
        titleLines,
        {
          opacity: 1,

          y: 0,

          stagger: 0.12,

          duration: 0.8,

          ease: "power3.out",
        },
        "-=0.35",
      );
    } else if (title) {
      tl.to(
        title,
        {
          opacity: 1,

          y: 0,

          duration: 0.8,

          ease: "power3.out",
        },
        "-=0.35",
      );
    }

    if (description) {
      tl.to(
        description,
        {
          opacity: 1,

          y: 0,

          duration: 0.8,

          ease: "power3.out",
        },
        "-=0.25",
      );
    }

    if (link) {
      tl.to(
        link,
        {
          opacity: 1,

          y: 0,

          duration: 0.7,

          ease: "power3.out",
        },
        "-=0.25",
      );
    }

    if (footer) {
      tl.to(
        footer,
        {
          opacity: 1,

          y: 0,

          duration: 0.7,

          ease: "power3.out",
        },
        "-=0.15",
      );
    }
  }

  /* ==========================================================
   SECTION 09 — WHAT MOVES FORWARD
   ========================================================== */

  function movementSection() {
    const section = document.querySelector(".forward");

    if (!section) {
      return;
    }

    const words = gsap.utils.toArray(".forward__words span");

    const description = section.querySelector(".forward__statement p");

    const statement = section.querySelector(".forward__statement h2");

    /* ========================================================
     WORD REVEAL
     ======================================================== */

    gsap.fromTo(
      words,

      {
        opacity: 0,
        y: 70,
      },

      {
        opacity: 1,
        y: 0,

        duration: 1.2,

        stagger: 0.16,

        ease: "power3.out",

        scrollTrigger: {
          trigger: section,

          start: "top 70%",

          toggleActions: "play none none reverse",
        },
      },
    );

    /* ========================================================
     DESCRIPTION
     ======================================================== */

    if (description) {
      gsap.to(description, {
        opacity: 1,

        y: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: section,

          start: "top 45%",

          toggleActions: "play none none reverse",
        },
      });
    }

    /* ========================================================
     FINAL STATEMENT
     ======================================================== */

    if (statement) {
      gsap.to(statement, {
        opacity: 1,

        y: 0,

        duration: 1.2,

        ease: "power3.out",

        scrollTrigger: {
          trigger: section,

          start: "top 35%",

          toggleActions: "play none none reverse",
        },
      });
    }
  }
  /* ==========================================================
     INITIALISE FOUNDATION
     ========================================================== */

  function initFoundation() {
    buildPipeline();

    pipelineHorizontal();

    whySection();

    knowledgeSection();

    ecosystemSection();

    workSection();

    alchemySection();

    involvedSection();

    chapterSection();

    movementSection();

    /* --------------------------------------------------------
       Refresh after everything has loaded.
       -------------------------------------------------------- */

    window.addEventListener("load", () => {
      ScrollTrigger.refresh();
    });
  }

  /* ==========================================================
     START
     ========================================================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFoundation, {
      once: true,
    });
  } else {
    initFoundation();
  }
})();
