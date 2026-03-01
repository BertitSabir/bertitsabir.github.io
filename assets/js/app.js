class App {
  async init() {
    await i18n.init();
    this.render();
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
