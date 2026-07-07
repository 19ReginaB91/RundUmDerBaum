const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");

const lightbox = document.querySelector("#project-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxKicker = lightbox?.querySelector("figcaption p");
const lightboxTitle = lightbox?.querySelector("figcaption h3");
const lightboxText = lightbox?.querySelector("figcaption span");
const lightboxClose = lightbox?.querySelector(".project-lightbox-close");
const lightboxButtons = document.querySelectorAll("[data-lightbox]");

function initProjectFilters() {
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

initProjectFilters();
initProjectLightbox();