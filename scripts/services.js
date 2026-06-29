const serviceData = {
  pflege: {
    kicker: "Pflege",
    title: "Baumpflege",
    subtitle: "in Seilklettertechnik",
    text:
      "Fachgerechte Pflege, Rückschnitt und Erhalt von Bäumen – auch dort, wo Maschinen nicht hinkommen oder das Grundstück besonders geschont werden muss.",
    items: [
      "Kronenpflege",
      "Totholzentfernung",
      "Lichtraumprofil",
      "Schonende Seilklettertechnik"
    ]
  },

  faellung: {
    kicker: "Fällung",
    title: "Baumfällung",
    subtitle: "und Gefahrenfällung",
    text:
      "Wenn ein Baum nicht erhalten werden kann oder zur Gefahr wird, sorgen wir für eine sichere, kontrollierte und saubere Fällung.",
    items: [
      "Problemfällung",
      "Gefahrenfällung",
      "Stückweises Abtragen",
      "Sichere Übergabe des Einsatzortes"
    ]
  },

  sicherung: {
    kicker: "Sicherung",
    title: "Kronensicherung",
    subtitle: "für belastete Äste",
    text:
      "Auffällige Äste oder belastete Kronenteile müssen nicht immer sofort entfernt werden. Eine fachgerechte Sicherung kann helfen, Risiken zu reduzieren und den Baum zu erhalten.",
    items: [
      "Sicherung belasteter Kronenteile",
      "Erhalt wertvoller Bäume",
      "Reduzierung von Bruchrisiken",
      "Fachliche Einschätzung vor Ort"
    ]
  },

  kontrolle: {
    kicker: "Kontrolle",
    title: "Baumkontrolle",
    subtitle: "und Sicherheit",
    text:
      "Wir beurteilen Zustand, Standort und mögliche Gefahren eines Baumes und erklären verständlich, welche Maßnahmen sinnvoll sind.",
    items: [
      "Baumbeurteilung",
      "Verkehrssicherheit",
      "Beratung zu Pflegemaßnahmen",
      "Einschätzung bei Sturm- oder Bruchschäden"
    ]
  },

  wurzel: {
    kicker: "Wurzel",
    title: "Wurzelfräsung",
    subtitle: "nach der Fällung",
    text:
      "Nach einer Fällung bleiben Wurzelstöcke oft im Weg. Mit der passenden Technik entfernen wir sie sauber und bereiten die Fläche für die weitere Nutzung vor.",
    items: [
      "Wurzelstockfräsung",
      "Vorbereitung von Pflanz- und Rasenflächen",
      "Saubere Flächenübergabe",
      "Arbeiten auch auf kleineren Grundstücken"
    ]
  },

  garten: {
    kicker: "Garten",
    title: "Garten & Gehölz",
    subtitle: "Pflanzung und Pflege",
    text:
      "Neben der Arbeit am Baum kümmern wir uns auch um Gehölze, Pflanzungen und Außenbereiche – passend zum Grundstück und zur Jahreszeit.",
    items: [
      "Gehölzpflanzung",
      "Garten- und Gehölzpflege",
      "Obstbaumschnitt",
      "Gestaltung rund um Baum und Grundstück"
    ]
  }
};

const serviceButtons = document.querySelectorAll("[data-service]");
const detailCard = document.querySelector("[data-service-detail]");
const detailKicker = document.querySelector("[data-detail-kicker]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailText = document.querySelector("[data-detail-text]");
const detailList = document.querySelector("[data-detail-list]");

function renderServiceDetail(serviceKey) {
  const selectedService = serviceData[serviceKey];

  if (!selectedService || !detailCard || !detailKicker || !detailTitle || !detailText || !detailList) return;

  detailCard.classList.add("is-changing");

  window.setTimeout(() => {
    detailKicker.textContent = selectedService.kicker;
    detailTitle.innerHTML = `${selectedService.title}<span>${selectedService.subtitle}</span>`;
    detailText.textContent = selectedService.text;

    detailList.innerHTML = selectedService.items
      .map((item) => `<li>${item}</li>`)
      .join("");

    detailCard.classList.remove("is-changing");
  }, 160);
}

function setActiveService(serviceKey) {
  serviceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.service === serviceKey);
  });

  renderServiceDetail(serviceKey);
}

function initServiceFlyer() {
  if (!serviceButtons.length || !detailCard) return;

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveService(button.dataset.service);
    });
  });
}

initServiceFlyer();