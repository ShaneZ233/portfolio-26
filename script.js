const caseSection = document.querySelector(".case-section");
const desktopMotion = window.matchMedia("(min-width: 1121px)");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateCaseMotion() {
  if (!caseSection) return;

  if (!desktopMotion.matches) {
    caseSection.classList.remove("is-motion-ready");
    caseSection.style.setProperty("--case-progress", "1");
    return;
  }

  caseSection.classList.add("is-motion-ready");

  const progress = clamp(window.scrollY / 560, 0, 1);
  const eased = 1 - Math.pow(1 - progress, 3);
  caseSection.style.setProperty("--case-progress", eased.toFixed(4));
}

let ticking = false;

function requestMotionUpdate() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateCaseMotion();
    ticking = false;
  });
}

updateCaseMotion();
window.addEventListener("scroll", requestMotionUpdate, { passive: true });
window.addEventListener("resize", requestMotionUpdate);
desktopMotion.addEventListener("change", updateCaseMotion);
