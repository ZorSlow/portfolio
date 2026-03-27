// ==================== MODE SOMBRE ====================
(function setupThemeToggle() {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  const THEME_KEY = "bbah-theme";

  const applyTheme = (theme) => {
    if (theme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  };

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored) {
    applyTheme(stored);
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      window.localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    });
  }
})();

// ==================== FILTRE PROJETS ====================
(function setupProjectFilters() {
  const buttons = document.querySelectorAll(".project-filter-btn");
  const cards = document.querySelectorAll(".project-card");

  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();
// ==================== FORMULAIRE DE CONTACT ====================
(function setupContactForm() {
  const EMAILJS_PUBLIC_KEY  = "sS5ieVqBebsQA1Mqb";
  const EMAILJS_SERVICE_ID  = "service_4yzafbx";
  const EMAILJS_TEMPLATE_ID = "template_1uddp7j";

  // Charge le SDK et attend qu'il soit prêt avant tout
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  script.onload = function () {
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = form.querySelector("button[type='submit']");
      const originalHTML = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
      formMessage.textContent = "";

    const templateParams = {
      name:    document.getElementById("name").value,
      email:   document.getElementById("email").value,
      message: document.getElementById("message").value,
};
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          formMessage.textContent = "Message envoyé avec succès !";
          formMessage.style.color = "green";
          form.reset();
        })
        .catch((error) => {
          formMessage.textContent = "Erreur lors de l'envoi. Réessaie.";
          formMessage.style.color = "red";
          console.error("EmailJS error:", error);
        })
        .finally(() => {
          btn.disabled = false;
          btn.innerHTML = originalHTML;
        });
    });
  };

  document.head.appendChild(script);
})();

// ==================== NAVIGATION CARDS STATISTIQUES ====================
(function setupStatCardNavigation() {
  const mapCheck = (label) => {
    if (!label) return null;
    const l = label.toLowerCase();
    if (l.includes('projet')) return '#projects';
    if (l.includes('technolog')) return '#skills';
    if (l.includes("ans") || l.includes('expérience')) return '#about';
    if (l.includes('contact')) return '#contact';
    return null;
  };

  document.querySelectorAll('.stat-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const labelEl = card.querySelector('.stat-label');
      const label = labelEl ? labelEl.textContent.trim() : '';
      const target = mapCheck(label);
      if (!target) return;
      const dest = document.querySelector(target);
      if (dest) dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.location.hash = target;
    });
  });
})();