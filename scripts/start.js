const revealItems = document.querySelectorAll(".reveal");

function initScrollReveal() {
  if (!revealItems.length) return;

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.13
    }
  );

  revealItems.forEach((element) => {
    revealObserver.observe(element);
  });
}

initScrollReveal();