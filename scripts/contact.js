// scripts/contact.js

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");

function getFormValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function buildMailBody(formData) {
  const name = getFormValue(formData, "name");
  const phone = getFormValue(formData, "phone");
  const email = getFormValue(formData, "email");
  const address = getFormValue(formData, "address");
  const service = getFormValue(formData, "service");
  const urgency = getFormValue(formData, "urgency");
  const message = getFormValue(formData, "message");
  const photos = formData.getAll("photos").filter((file) => {
    return file && typeof file === "object" && file.name;
  });
  const photoNote = photos.length
    ? `${photos.length} Foto(s) ausgewählt: ${photos.map((file) => file.name).join(", ")}. Bitte im E-Mail-Programm als Anhang hinzufügen.`
    : "Keine Fotos ausgewählt.";

  return [
    "Neue Anfrage über die Website:",
    "",
    `Name: ${name}`,
    `Telefon: ${phone || "Nicht angegeben"}`,
    `E-Mail: ${email}`,
    `Adresse / Ort des Baumes: ${address || "Nicht angegeben"}`,
    `Leistung: ${service}`,
    `Dringlichkeit: ${urgency}`,
    `Fotos: ${photoNote}`,
    "",
    "Nachricht:",
    message,
    "",
    "Hinweis: Aus Sicherheitsgründen können Website-Mailto-Formulare Fotos nicht automatisch anhängen."
  ].join("\n");
}

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = getFormValue(formData, "name");
    const email = getFormValue(formData, "email");
    const message = getFormValue(formData, "message");

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = "Bitte füllen Sie Name, E-Mail und Nachricht aus.";
      }

      return;
    }

    const subject = encodeURIComponent(`Website-Anfrage von ${name}`);
    const body = encodeURIComponent(buildMailBody(formData));
    const mailto = `mailto:uli.p.pfaff@t-online.de?subject=${subject}&body=${body}`;

    if (formStatus) {
      formStatus.textContent = "Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die vorbereitete Anfrage dort ab.";
    }

    window.location.href = mailto;

    window.setTimeout(() => {
      window.location.href = "thanks.html";
    }, 1200);
  });
}

initContactForm();
