const aboutCounters = document.querySelectorAll("[data-count]");

function initAboutCounters() {
  if (!aboutCounters.length) return;

  if (!("IntersectionObserver" in window)) {
    aboutCounters.forEach((counter) => {
      counter.textContent = counter.dataset.count;
    });

    return;
  }

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count);

        if (!target) return;

        let current = target - 28;
        const step = () => {
          current += 2;

          if (current >= target) {
            counter.textContent = target;
            return;
          }

          counter.textContent = current;
          requestAnimationFrame(step);
        };

        step();
        observer.unobserve(counter);
      });
    },
    {
      threshold: 0.4
    }
  );

  aboutCounters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

initAboutCounters();