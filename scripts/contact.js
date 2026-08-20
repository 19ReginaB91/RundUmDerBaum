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

initPhotoUploadLabels();
