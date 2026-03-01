class NavComponent {
  constructor() {
    this.navElement = document.querySelector('nav ul');
  }

  setupLanguageButtons() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === i18n.currentLang);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        i18n.setLanguage(lang);
        this.updateLanguageButtons();
        app.render();
      });
    });
  }

  updateLanguageButtons() {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === i18n.currentLang);
    });
  }

  render() {
    const navData = i18n.getData('nav');
    const navLinks = this.navElement.querySelectorAll('a:not(.nav-cv)');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const key = `nav.${href.substring(1)}`; // Remove # from href
      link.textContent = i18n.get(key);
    });

    document.querySelector('.nav-cv').textContent = navData.cv || '↓ CV';
    this.setupLanguageButtons();
  }
}

const navComponent = new NavComponent();
