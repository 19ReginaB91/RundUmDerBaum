const filterButtons = document.querySelectorAll("[data-filter]");
const projectGrid = document.querySelector("[data-project-grid]");

const lightbox = document.querySelector("#project-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxKicker = lightbox?.querySelector("figcaption p");
const lightboxTitle = lightbox?.querySelector("figcaption h3");
const lightboxText = lightbox?.querySelector("figcaption span");
const lightboxClose = lightbox?.querySelector(".project-lightbox-close");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initProjectFilters() {
  const projectCards = projectGrid?.querySelectorAll(".project-card") || [];

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });

      projectCards.forEach((card) => {
        const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;

        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function openProjectLightbox(button) {
  if (!lightbox || !lightboxImage || !lightboxKicker || !lightboxTitle || !lightboxText) return;

  const image = button.dataset.image;
  const title = button.dataset.title;
  const text = button.dataset.text;

  lightboxImage.src = image;
  lightboxImage.alt = title || "Arbeit von Rund um den Baum";
  lightboxKicker.textContent = "Arbeiten";
  lightboxTitle.textContent = title || "";
  lightboxText.textContent = text || "";

  lightbox.hidden = false;
  document.body.classList.add("modal-open");
}

function closeProjectLightbox() {
  if (!lightbox) return;

  lightbox.hidden = true;
  document.body.classList.remove("modal-open");
}

function initProjectLightbox() {
  const lightboxButtons = projectGrid?.querySelectorAll("[data-lightbox]") || [];

  if (!lightbox || !lightboxButtons.length) return;

  lightboxButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openProjectLightbox(button);
    });
  });

  lightboxClose?.addEventListener("click", closeProjectLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeProjectLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeProjectLightbox();
    }
  });
}

function revealProjectCards() {
  const cards = projectGrid?.querySelectorAll(".reveal") || [];

  if (!cards.length) return;

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.13 }
  );

  cards.forEach((card) => observer.observe(card));
}

function renderProjects(works) {
  if (!projectGrid) return;

  projectGrid.innerHTML = works.map((work) => {
    const layoutClass = work.layout ? ` ${escapeHtml(work.layout)}` : "";

    return `
      <article class="project-card reveal${layoutClass}" data-category="${escapeHtml(work.category)}">
        <button
          type="button"
          data-lightbox
          data-image="${escapeHtml(work.image)}"
          data-title="${escapeHtml(work.label)}"
          data-text="${escapeHtml(work.text)}"
        >
          <img src="${escapeHtml(work.image)}" alt="${escapeHtml(work.alt)}">
          <span>${escapeHtml(work.label)}</span>
        </button>

        <div>
          <p>${escapeHtml(work.kicker)}</p>
          <h3>${escapeHtml(work.title)}</h3>
        </div>
      </article>
    `;
  }).join("");
}

async function initProjects() {
  if (!projectGrid) return;

  try {
    const response = await fetch("assets/data/arbeiten.json");

    if (!response.ok) return;

    const works = await response.json();

    renderProjects(works);
    revealProjectCards();
    initProjectFilters();
    initProjectLightbox();
  } catch (error) {
    projectGrid.innerHTML = "";
  }
}

initProjects();
