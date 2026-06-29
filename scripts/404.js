const notFoundPage = document.querySelector(".not-found");
const forestLayer = document.querySelector(".not-found__forest");
const branchLayer = document.querySelector(".not-found__branch");
const leavesLayer = document.querySelector(".not-found__leaves");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function initSoftParallax() {
  if (!notFoundPage || !forestLayer || prefersReducedMotion || isTouchDevice) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let animationFrame = null;

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    forestLayer.style.transform = `scale(1.06) translate3d(${currentX}px, ${currentY}px, 0)`;

    if (branchLayer) {
      branchLayer.style.transform = `translateX(-50%) translate3d(${currentX * -0.35}px, ${currentY * -0.25}px, 0)`;
    }

    animationFrame = requestAnimationFrame(animate);
  }

  notFoundPage.addEventListener("pointermove", (event) => {
    const rect = notFoundPage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    targetX = clamp(x * -18, -18, 18);
    targetY = clamp(y * -12, -12, 12);

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animate);
    }
  });

  notFoundPage.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
  });
}

function createClickLeaf(x, y) {
  if (!leavesLayer || prefersReducedMotion) return;

  const leaf = document.createElement("i");
  leaf.className = "not-found__click-leaf";
  leaf.style.left = `${x}px`;
  leaf.style.top = `${y}px`;
  leaf.style.setProperty("--leaf-x", `${Math.random() * 80 - 40}px`);
  leaf.style.setProperty("--leaf-rotate", `${Math.random() * 220 + 120}deg`);

  leavesLayer.appendChild(leaf);

  window.setTimeout(() => {
    leaf.remove();
  }, 1800);
}

function initClickLeaves() {
  if (!notFoundPage || !leavesLayer || prefersReducedMotion || isTouchDevice) return;

  notFoundPage.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest("a") || target.closest("button")) return;

    createClickLeaf(event.clientX, event.clientY);
  });
}

initSoftParallax();
initClickLeaves();