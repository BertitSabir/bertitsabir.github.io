class HeroComponent {
  render() {
    const meta = {
      en: {
        badge: "Senior Python Backend Engineer",
        subtitle: "Backend Engineer · 9+ years of experience"
      },
      fr: {
        badge: "Ingénieur Backend Python Senior",
        subtitle: "Ingénieur Backend · 9+ ans d'expérience"
      }
    };

    const lang = i18n.currentLang;
    const m = meta[lang];

    return `
      <header class="hero">
        <div class="hero-badge">${m.badge}</div>
        <h1>Sabir BERTIT</h1>
        <h2>${m.subtitle}</h2>
        <p>
          ${i18n.get('about.content')}
        </p>
        <div class="hero-actions">
          <a href="#experience" class="btn btn-primary">${i18n.currentLang === 'en' ? 'View Experience' : 'Voir Expérience'}</a>
          <a href="/BERTIT-SABIR-CV.pdf" target="_blank" class="btn btn-outline">${i18n.currentLang === 'en' ? 'Download CV (PDF)' : 'Télécharger le CV (PDF)'}</a>
        </div>
      </header>
    `;
  }
}

const heroComponent = new HeroComponent();
