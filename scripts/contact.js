// scripts/contact.js

function initPhotoUploadLabels() {
  const uploadInputs = document.querySelectorAll('input[type="file"][name="photos"]');

  uploadInputs.forEach((input) => {
    const form = input.closest("form");
    const status = form ? form.querySelector(".form-status") : null;

    input.addEventListener("change", () => {
      if (!status) return;

      const files = Array.from(input.files || []);

      status.textContent = files.length
        ? `${files.length} Foto(s) ausgewählt.`
        : "";
    });
  });
}

function initNetlifyForms() {
  const forms = document.querySelectorAll('form[name="kontakt"]');

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      const status = form.querySelector(".form-status");
      const formData = new FormData(form);

      if (submitButton) submitButton.disabled = true;
      if (status) status.textContent = "Anfrage wird gesendet...";

      try {
        const response = await fetch("/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        window.location.href = "/thanks/";
      } catch (error) {
        if (status) {
          status.textContent = "Leider konnte die Anfrage nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.";
        }

        if (submitButton) submitButton.disabled = false;
      }
    });
  });
}

initPhotoUploadLabels();
initNetlifyForms();
