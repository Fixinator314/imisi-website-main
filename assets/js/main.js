/* ==========================================================
   MAIN.JS
   Global site functionality
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Ìmísí Foundation initialized");

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
