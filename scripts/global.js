// scripts/global.js

document.documentElement.classList.add("js");

const siteHeader = document.querySelector(".site-header");
const mainNav = document.querySelector("#main-nav");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenuToggle = document.querySelector(".mobile-menu-trigger");
const mobileContactToggle = document.querySelector(".mobile-contact-trigger");
const mobileContactActions = document.querySelector("#mobile-contact-actions");
const revealItems = document.querySelectorAll(".reveal");
const legalModal = document.querySelector("#legal-modal");
const cookieBanner = document.querySelector("#cookie-banner");
const cookieButton = document.querySelector("#cookie-ok");
const yearElement = document.querySelector("#year");

const legalTexts = {
  impressum: `
    <h2>Impressum</h2>

    <h3>Angaben gemäß § 5 DDG</h3>
    <p>
      Rund um den Baum · Fa. Pfaff<br>
      Inhaber: Joshua Pfaff<br>
      Möllekensfeld 10<br>
      46569 Hünxe
    </p>

    <h3>Kontakt</h3>
    <p>
      Telefon: 02858 836993<br>
      Mobil: 0176 311 76 940<br>
      E-Mail: uli.p.pfaff@t-online.de
    </p>

    <h3>Hinweis zum Entwurf</h3>
    <p>
      Vor Veröffentlichung müssen Rechtsform, zuständige Aufsichtsbehörde,
      Kammer-/Registerdaten und gegebenenfalls Steuerdaten durch den Betreiber
      geprüft und ergänzt werden.
    </p>

    <h3>Haftung für Inhalte und Links</h3>
    <p>
      Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für externe Links
      sind ausschließlich deren Betreiber verantwortlich.
    </p>
  `,

  datenschutz: `
    <h2>Datenschutzerklärung</h2>

    <p>
      Diese Fassung ist ein sorgfältiger Entwurf und muss vor Veröffentlichung
      an Hosting, Formularversand und tatsächlich eingesetzte Dienste angepasst
      werden.
    </p>

    <h3>1. Verantwortlicher</h3>
    <p>
      Rund um den Baum · Fa. Pfaff<br>
      Joshua Pfaff<br>
      Möllekensfeld 10<br>
      46569 Hünxe<br>
      E-Mail: uli.p.pfaff@t-online.de
    </p>

    <h3>2. Server-Protokolldaten</h3>
    <p>
      Beim Aufruf dieser Website können technisch erforderliche Daten wie
      IP-Adresse, Zeitpunkt, Browser und aufgerufene Seite verarbeitet werden.
      Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h3>3. Kontaktaufnahme</h3>
    <p>
      Angaben aus Telefon, E-Mail oder Kontaktformular werden nur zur Bearbeitung
      Ihrer Anfrage verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b oder
      lit. f DSGVO.
    </p>

    <h3>4. Speicherdauer und Rechte</h3>
    <p>
      Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen
      Aufbewahrungspflichten bestehen. Sie haben insbesondere Rechte auf
      Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Beschwerde
      bei einer Datenschutzaufsichtsbehörde.
    </p>

    <h3>5. Externe Dienste</h3>
    <p>
      Dieser Entwurf bindet keine Analyse-, Karten-, Video- oder Marketingdienste
      ein. Werden solche Dienste ergänzt, ist diese Erklärung zu aktualisieren
      und gegebenenfalls eine Einwilligungslösung einzurichten.
    </p>
  `,

  cookies: `
    <h2>Cookie-Hinweise</h2>

    <p>
      Der aktuelle Entwurf setzt keine Analyse- oder Marketing-Cookies.
      Ihre Bestätigung dieses Hinweises wird ausschließlich lokal in Ihrem
      Browser gespeichert.
    </p>

    <h3>Technisch notwendige Speicherung</h3>
    <p>
      Der Schlüssel <code>pfaff_cookie_notice</code> verhindert, dass der Hinweis
      bei jedem Besuch erneut erscheint. Er wird nicht an uns oder Dritte
      übertragen.
    </p>

    <h3>Spätere Erweiterungen</h3>
    <p>
      Sobald Statistik, eingebettete Karten, Videos oder andere Drittanbieter-
      Dienste verwendet werden, muss vor deren Aktivierung eine informierte
      Einwilligung eingeholt werden.
    </p>
  `
};

function initHeaderTheme() {
  if (!siteHeader) return;

  let animationFrame = null;

  function getActiveHeaderTheme() {
    const headerBox = siteHeader.getBoundingClientRect();
    const probeY = Math.min(window.innerHeight - 1, Math.round(headerBox.bottom + 2));

    const probePoints = [
      Math.round(window.innerWidth * 0.18),
      Math.round(window.innerWidth * 0.5),
      Math.round(window.innerWidth * 0.82)
    ];

    const themes = probePoints.map((probeX) => {
      const elements = document.elementsFromPoint(probeX, probeY);

      const themedElement = elements.find((element) => {
        return element.closest?.("[data-header-theme]");
      });

      return themedElement?.closest("[data-header-theme]")?.dataset.headerTheme;
    });

    const darkVotes = themes.filter((theme) => theme === "dark").length;
    const lightVotes = themes.filter((theme) => theme === "light").length;

    return darkVotes > lightVotes ? "dark" : "light";
  }

  function updateHeaderTheme() {
    const theme = getActiveHeaderTheme();

    siteHeader.classList.toggle("is-on-dark", theme === "dark");
    siteHeader.classList.toggle("is-on-light", theme !== "dark");
  }

  function requestHeaderThemeUpdate() {
    if (animationFrame) return;

    animationFrame = requestAnimationFrame(() => {
      animationFrame = null;
      updateHeaderTheme();
    });
  }

  updateHeaderTheme();

  window.addEventListener("scroll", requestHeaderThemeUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestHeaderThemeUpdate);
}

function setMenuState(isOpen) {
  if (!mainNav) return;

  mainNav.classList.toggle("open", isOpen);

  [menuToggle, mobileMenuToggle].filter(Boolean).forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function initMobileMenu() {
  if (!mainNav) return;

  [menuToggle, mobileMenuToggle].filter(Boolean).forEach((button) => {
    button.addEventListener("click", () => {
      const isOpen = mainNav.classList.contains("open");
      setMenuState(!isOpen);
    });
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });
}

function setMobileContactState(isOpen) {
  if (!mobileContactToggle || !mobileContactActions) return;

  mobileContactToggle.setAttribute("aria-expanded", String(isOpen));
  mobileContactActions.hidden = !isOpen;
}

function initMobileContactActions() {
  if (!mobileContactToggle || !mobileContactActions) return;

  mobileContactToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = mobileContactToggle.getAttribute("aria-expanded") === "true";
    setMobileContactState(!isOpen);
  });

  mobileContactActions.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMobileContactState(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".mobile-bottom-nav")) return;

    setMobileContactState(false);
  });

  window.addEventListener("resize", () => {
    setMobileContactState(false);
  });
}

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

function initLegalModal() {
  if (!legalModal) return;

  const modalContent = legalModal.querySelector(".modal-content");
  const modalClose = legalModal.querySelector(".modal-close");

  if (!modalContent) return;

  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modalName = button.dataset.modal;
      const modalText = legalTexts[modalName];

      if (!modalText) return;

      modalContent.innerHTML = modalText;
      legalModal.showModal();
    });
  });

  modalClose?.addEventListener("click", () => {
    legalModal.close();
  });

  legalModal.addEventListener("click", (event) => {
    if (event.target === legalModal) {
      legalModal.close();
    }
  });
}

function initCookieBanner() {
  if (!cookieBanner || !cookieButton) return;

  const cookieKey = "pfaff_cookie_notice";
  const cookieAccepted = localStorage.getItem(cookieKey);

  if (!cookieAccepted) {
    cookieBanner.hidden = false;
  }

  cookieButton.addEventListener("click", () => {
    localStorage.setItem(cookieKey, "accepted");
    cookieBanner.hidden = true;
  });
}

function initCurrentYear() {
  if (!yearElement) return;

  yearElement.textContent = new Date().getFullYear();
}

initHeaderTheme();
initMobileMenu();
initMobileContactActions();
initScrollReveal();
initLegalModal();
initCookieBanner();
initCurrentYear();