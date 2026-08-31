/* ==========================================================
   IMISI FOUNDATION — NAVBAR
   Navigation + responsive interactions
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const navWrap = document.querySelector(".nav-wrap");

  const mega = document.getElementById("mega");
  const megaTrigger = document.querySelector("[data-mega]");

  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobile");
  const mobileClose = document.getElementById("mobileClose");
  const mobileNav = document.getElementById("mobileNav");

  const hero = document.querySelector(".hero");

  /* ========================================================
     SAFETY
     ======================================================== */

  if (!nav) return;

  /* ========================================================
     NAVBAR SCROLL STATE
     
     The navbar begins its behaviour when the HERO reaches
     the top of the viewport.

     Before the hero:
       data-state="before-hero"

     At the beginning of the hero:
       data-state="top"

     After scrolling through the hero:
       data-state="scrolled"
     ======================================================== */

  function updateNav() {
    if (!hero) {
      nav.dataset.state = "top";
      return;
    }

    const heroTop = hero.getBoundingClientRect().top;

    /*
      Hero has reached the top of the viewport.
    */

    if (heroTop <= 0) {
      nav.dataset.state = "top";
    } else {
      nav.dataset.state = "before-hero";
    }

    /*
      Once the user has moved beyond the initial
      48px of the hero, activate the scrolled state.
    */

    if (heroTop <= -48) {
      nav.dataset.state = "scrolled";
    }
  }

  updateNav();

  window.addEventListener("scroll", updateNav, {
    passive: true,
  });

  /* ========================================================
     HERITAGE PIPELINE — MEGA MENU
     ======================================================== */

  if (mega && megaTrigger) {
    let closeTimer;

    function openMega() {
      clearTimeout(closeTimer);

      mega.classList.add("open");
      mega.setAttribute("aria-hidden", "false");
    }

    function closeMega() {
      closeTimer = setTimeout(() => {
        mega.classList.remove("open");
        mega.setAttribute("aria-hidden", "true");
      }, 140);
    }

    megaTrigger.addEventListener("mouseenter", openMega);
    megaTrigger.addEventListener("mouseleave", closeMega);

    mega.addEventListener("mouseenter", openMega);
    mega.addEventListener("mouseleave", closeMega);

    megaTrigger.addEventListener("click", (event) => {
      if (window.innerWidth > 1024) {
        event.preventDefault();

        if (mega.classList.contains("open")) {
          closeMega();
        } else {
          openMega();
        }
      }
    });
  }

  /* ========================================================
     MOBILE MENU
     ======================================================== */

  function openMobileMenu() {
    if (!mobile) return;

    mobile.classList.add("open");
    mobile.setAttribute("aria-hidden", "false");

    document.documentElement.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    if (!mobile) return;

    mobile.classList.remove("open");
    mobile.setAttribute("aria-hidden", "true");

    document.documentElement.style.overflow = "";
  }

  if (burger) {
    burger.addEventListener("click", openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileMenu);
  }

  /* ========================================================
     CLOSE MOBILE MENU AFTER LINK CLICK
     ======================================================== */

  if (mobileNav) {
    mobileNav.addEventListener("click", (event) => {
      const link = event.target.closest("a");

      if (!link) return;

      closeMobileMenu();
    });
  }

  /* ========================================================
     ESCAPE KEY
     ======================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeMobileMenu();

    if (mega) {
      mega.classList.remove("open");
      mega.setAttribute("aria-hidden", "true");
    }
  });

  /* ========================================================
     RESIZE SAFETY
     ======================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }

    updateNav();
  });
});
