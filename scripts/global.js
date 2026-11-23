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
      Einzelunternehmen<br>
      Möllekensfeld 10<br>
      46569 Hünxe
    </p>

    <h3>Kontakt</h3>
    <p>
      Telefon: 02858 836993<br>
      Mobil: 0176 311 76 940<br>
      E-Mail: uli.p.pfaff@t-online.de
    </p>

    <h3>Steuer und Kammer</h3>
    <p>
      Steuernummer: 101 / 5116 / 4326, Finanzamt Dinslaken<br>
      Umsatzsteuer-Identifikationsnummer: DE458960489<br>
      Niederrheinische Industrie- und Handelskammer, Mitgliedsnummer 103270
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
      Was anfällt, wenn Sie diese Seite öffnen oder uns einen Baum zeigen.
      Ohne Tracking, ohne Newsletter, ohne Werbung.
    </p>

    <h3>Verantwortlich</h3>
    <p>
      Joshua Pfaff, Rund um den Baum · Fa. Pfaff, Möllekensfeld 10, 46569 Hünxe.
      E-Mail: uli.p.pfaff@t-online.de
    </p>

    <h3>Hosting</h3>
    <p>
      Die Website liegt bei Netlify, Inc. in den USA. Beim Aufruf werden technisch nötige Angaben verarbeitet, etwa IP-Adresse, Zeitpunkt, aufgerufene Seite und Browser. Die Verbindung ist per HTTPS verschlüsselt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h3>Anfrage</h3>
    <p>
      Name, Telefon, E-Mail, Ort des Baumes, Art der Arbeit, Dringlichkeit, Nachricht und freiwillige Fotos nutzen wir nur, um Ihre Anfrage zu beantworten. Netlify leitet das Formular an uli.p.pfaff@t-online.de weiter. Mit dem Häkchen willigen Sie ein, Art. 6 Abs. 1 lit. a DSGVO. Bei einem möglichen Auftrag kommt Art. 6 Abs. 1 lit. b DSGVO hinzu.
    </p>

    <h3>WhatsApp und Google</h3>
    <p>
      Beides sind nur Links. Daten gehen dorthin erst, wenn Sie den Link öffnen. Eine Karte ist nicht eingebettet, und es gibt keine Besuchsstatistik.
    </p>

    <h3>Speicherung und Rechte</h3>
    <p>
      Anfragen löschen wir, sobald sie erledigt sind. Wird daraus ein Auftrag, bleiben Rechnungen in der Regel zehn Jahre. Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Übertragung und Widerspruch. Beschwerde ist bei der LDI NRW möglich.
    </p>

    <p>
      Die ausführliche Fassung steht auf der Seite <a href="datenschutz.html">Datenschutz</a>.
    </p>
  `,

  cookies: `
    <h2>Cookie-Hinweise</h2>

    <p>
      Die aktuelle Website setzt keine Analyse- oder Marketing-Cookies.
      Ihre Bestätigung dieses Hinweises wird ausschließlich lokal in Ihrem
      Browser gespeichert.
    </p>

    <h3>Technisch notwendige Speicherung</h3>
    <p>
      Der Schlüssel <code>pfaff_cookie_notice</code> verhindert, dass der Hinweis
      bei jedem Besuch erneut erscheint. Er wird nicht an uns oder Dritte
      übertragen.
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