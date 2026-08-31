/* ==========================================================
   IMISI FOUNDATION — ALCHEMY VIDEO
   Section-aware video player
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".alchemy");
  const video = document.querySelector(".alchemy__video");

  const playButton = document.querySelector(".alchemy__play");
  const progress = document.querySelector(".alchemy__progress");

  const currentTime = document.querySelector(".alchemy__current");
  const duration = document.querySelector(".alchemy__duration");

  /* ========================================================
     SAFETY
  ======================================================== */

  if (!section || !video) return;

  /* ========================================================
     TIME FORMAT
     ======================================================== */

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "00:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  /* ========================================================
     PLAY / PAUSE UI
     ======================================================== */

  function updatePlayState() {
    if (!playButton) return;

    playButton.classList.toggle("is-playing", !video.paused);

    playButton.setAttribute(
      "aria-label",
      video.paused ? "Play video" : "Pause video",
    );
  }

  /* ========================================================
     PLAY / PAUSE
     ======================================================== */

  if (playButton) {
    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }

  /* ========================================================
     VIDEO STATE
     ======================================================== */

  video.addEventListener("play", updatePlayState);

  video.addEventListener("pause", updatePlayState);

  /* ========================================================
   DURATION
   ======================================================== */

  function updateDuration() {
    if (!duration) return;

    if (Number.isFinite(video.duration) && video.duration > 0) {
      duration.textContent = formatTime(video.duration);
    }
  }

  video.addEventListener("loadedmetadata", updateDuration);
  video.addEventListener("durationchange", updateDuration);

  /*
  Metadata may already be available by the time this
  script runs, so check immediately as well.
*/

  updateDuration();

  /* ========================================================
     PROGRESS
     ======================================================== */

  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;

    const percentage = (video.currentTime / video.duration) * 100;

    if (progress) {
      progress.value = percentage;
    }

    if (currentTime) {
      currentTime.textContent = formatTime(video.currentTime);
    }
  });

  /* ========================================================
     SCRUB
     ======================================================== */

  if (progress) {
    progress.addEventListener("input", () => {
      if (!video.duration) return;

      const percentage = Number(progress.value);

      video.currentTime = (percentage / 100) * video.duration;
    });
  }

  /* ========================================================
     CLICK VIDEO TO PLAY / PAUSE
     ======================================================== */

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  /* ========================================================
     SECTION VISIBILITY
     
     Video automatically plays when the section becomes
     visible and pauses when the user leaves it.
     ======================================================== */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /*
             Section is visible.
             Start playback.
          */

          video.play().catch(() => {});
        } else {
          /*
             Section is no longer visible.
             Stop playback.
          */

          video.pause();
        }
      });
    },
    {
      threshold: 0.35,
    },
  );

  observer.observe(section);

  /* ========================================================
     INITIAL STATE
     ======================================================== */

  updatePlayState();
  updateDuration();
});
