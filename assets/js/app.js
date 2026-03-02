class App {
  async init() {
    await i18n.init();

    if (i18n.currentLang !== 'en') {
      // EN content is already inline in index.html for SEO.
      // Re-render only when the saved language is not English.
      this.render();
    } else {
      // EN is already in the DOM — just set up handlers and translated text.
      navComponent.render();
      footerComponent.render();
      contactComponent.attachFormHandler();
    }
  }

  render() {
    const content = document.getElementById('content');

    content.innerHTML = `
      ${heroComponent.render()}
      ${contactBarComponent.render()}
      ${skillsComponent.render()}
      ${experienceComponent.render()}
      ${educationComponent.render()}
      ${aboutComponent.render()}
      ${contactComponent.render()}
    `;

    navComponent.render();
    footerComponent.render();

    // Attach form handler after rendering
    contactComponent.attachFormHandler();
  }
}

const app = new App();

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// 👀 Hey, you found the devtools. Respect.
console.log('%c👀 Hey, you found the devtools!', 'color:#40916c;font-size:15px;font-weight:bold');
console.log('%c"Why do Python devs wear glasses? Because they can\'t C." 🐍', 'color:#2d6a4f;font-size:13px;font-style:italic');
console.log('%cLike what you see? → sabir-bertit@hotmail.fr', 'color:#888;font-size:12px');
