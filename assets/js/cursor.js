/* ==========================================================
   IMISI FOUNDATION — CUSTOM CURSOR
   Desktop cursor interactions
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("cursor");

  if (!cursor) return;

  const label = cursor.querySelector(".cursor__label");

  /* ========================================================
     DEVICE CHECK
     ======================================================== */

  const isDesktop = window.matchMedia("(pointer: fine)").matches;

  if (!isDesktop) return;

  /* ========================================================
     SHOW CUSTOM CURSOR
     ======================================================== */

  document.body.classList.add("cursor-on");

  /* ========================================================
     POSITION
     ======================================================== */

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;

  const speed = 0.18;

  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  /* ========================================================
     MOUSE MOVE
     ======================================================== */

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  /* ========================================================
     ACTIVE ELEMENTS
     ======================================================== */

  const interactiveSelector = `
    a,
    button,
    input,
    textarea,
    select,
    [role="button"],
    [data-cursor]
  `;

  /* ========================================================
     ENTER INTERACTIVE ELEMENT
     ======================================================== */

  document.addEventListener("mouseover", (event) => {
    const target = event.target.closest(interactiveSelector);

    if (!target) return;

    cursor.classList.add("is-active");

    /* ------------------------------------------------------
       DATA CURSOR LABEL
    ------------------------------------------------------ */

    const cursorText = target.dataset.cursor;

    if (cursorText && label) {
      label.textContent = cursorText;

      cursor.classList.add("has-label");
    }
  });

  /* ========================================================
     LEAVE INTERACTIVE ELEMENT
     ======================================================== */

  document.addEventListener("mouseout", (event) => {
    const target = event.target.closest(interactiveSelector);

    if (!target) return;

    /*
      Ignore movement between children of the same element.
    */

    if (target.contains(event.relatedTarget)) return;

    cursor.classList.remove("is-active");
    cursor.classList.remove("has-label");

    if (label) {
      label.textContent = "";
    }
  });

  /* ========================================================
     HIDE WHEN LEAVING WINDOW
     ======================================================== */

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
  });

  /* ========================================================
     CLEANUP WHEN WINDOW RESIZES
     ======================================================== */

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      document.body.classList.remove("cursor-on");
      cursor.style.display = "none";
    }
  });
});
