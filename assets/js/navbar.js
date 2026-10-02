/* ==========================================================
   IMISI FOUNDATION — NAVBAR
   Navigation + responsive interactions
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
     ELEMENTS
     ======================================================== */

  const nav = document.getElementById("nav");
  const navWrap = document.querySelector(".nav-wrap");

  const mega = document.getElementById("mega");
  const megaTrigger = document.querySelector("[data-mega]");

  const burger = document.getElementById("burger");
  const mobile = document.getElementById("mobile");
  const mobileClose = document.getElementById("mobileClose");
  const mobileNav = document.getElementById("mobileNav");

  const hero = document.querySelector(".hero");

  /* Desktop Partner dropdown */
  const partnerDropdown = document.querySelector(".nav__dropdown");
  const partnerButton = document.querySelector(".nav__dropdown-btn");

  /* Mobile Partner dropdown */
  const mobilePartnerToggle = document.getElementById("mobilePartnerToggle");

  const mobilePartnerMenu = document.getElementById("mobilePartnerMenu");

  /* ========================================================
     SAFETY
     ======================================================== */

  if (!nav) return;

  /* ========================================================
     NAVBAR SCROLL STATE
     ======================================================== */

  function updateNav() {
    if (!hero) {
      nav.dataset.state = "top";
      return;
    }

    const heroTop = hero.getBoundingClientRect().top;

    /* Before hero */
    if (heroTop > 0) {
      nav.dataset.state = "before-hero";
      return;
    }

    /* Hero */
    if (heroTop <= 0 && heroTop > -48) {
      nav.dataset.state = "top";
      return;
    }

    /* Scrolled */
    nav.dataset.state = "scrolled";
  }

  updateNav();

  window.addEventListener("scroll", updateNav, {
    passive: true,
  });

  /* ========================================================
     HERITAGE PIPELINE — DESKTOP MEGA MENU
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

    /* Reset mobile partner dropdown */
    closeMobilePartner();
  }

  function closeMobileMenu() {
    if (!mobile) return;

    mobile.classList.remove("open");

    mobile.setAttribute("aria-hidden", "true");

    document.documentElement.style.overflow = "";

    /* Close partner dropdown */
    closeMobilePartner();
  }

  if (burger) {
    burger.addEventListener("click", openMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener("click", closeMobileMenu);
  }

  /* ========================================================
     MOBILE PARTNER DROPDOWN
     ======================================================== */

  function openMobilePartner() {
    if (!mobilePartnerToggle || !mobilePartnerMenu) return;

    mobilePartnerMenu.classList.add("is-open");

    mobilePartnerToggle.classList.add("is-open");

    mobilePartnerToggle.setAttribute("aria-expanded", "true");
  }

  function closeMobilePartner() {
    if (!mobilePartnerToggle || !mobilePartnerMenu) return;

    mobilePartnerMenu.classList.remove("is-open");

    mobilePartnerToggle.classList.remove("is-open");

    mobilePartnerToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMobilePartner(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!mobilePartnerMenu || !mobilePartnerToggle) return;

    const isOpen = mobilePartnerMenu.classList.contains("is-open");

    if (isOpen) {
      closeMobilePartner();
    } else {
      openMobilePartner();
    }
  }

  if (mobilePartnerToggle) {
    mobilePartnerToggle.addEventListener("click", toggleMobilePartner);
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
     DESKTOP PARTNER WITH US DROPDOWN
     ======================================================== */

  function openDesktopPartner() {
    if (!partnerDropdown) return;

    partnerDropdown.classList.add("is-open");
  }

  function closeDesktopPartner() {
    if (!partnerDropdown) return;

    partnerDropdown.classList.remove("is-open");
  }

  function toggleDesktopPartner(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!partnerDropdown) return;

    partnerDropdown.classList.toggle("is-open");
  }

  if (partnerButton) {
    partnerButton.addEventListener("click", toggleDesktopPartner);
  }

  /* ========================================================
     CLICK OUTSIDE
     ======================================================== */

  document.addEventListener("click", (event) => {
    /* Desktop Partner */
    if (partnerDropdown && !partnerDropdown.contains(event.target)) {
      closeDesktopPartner();
    }

    /* Mobile Partner */
    if (
      mobilePartnerMenu &&
      mobilePartnerToggle &&
      !mobilePartnerMenu.contains(event.target) &&
      !mobilePartnerToggle.contains(event.target)
    ) {
      closeMobilePartner();
    }
  });

  /* ========================================================
     ESCAPE KEY
     ======================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    /* Close mobile */
    closeMobileMenu();

    /* Close desktop partner */
    closeDesktopPartner();

    /* Close mega menu */
    if (mega) {
      mega.classList.remove("open");
      mega.setAttribute("aria-hidden", "true");
    }
  });

  /* ========================================================
     RESIZE SAFETY
     ======================================================== */

  window.addEventListener("resize", () => {
    /* Desktop */
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }

    /* Mobile */
    if (window.innerWidth <= 1024) {
      closeDesktopPartner();

      if (mega) {
        mega.classList.remove("open");
        mega.setAttribute("aria-hidden", "true");
      }
    }

    updateNav();
  });
});
