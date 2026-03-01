class AboutComponent {
  render() {
    const data = i18n.getData('about');

    return `
      <section id="about">
        <div class="container">
          <h2 class="section-title">${data.title}</h2>
          <p style="margin-bottom: 2rem; font-size: 1rem; line-height: 1.8;">${data.content}</p>
          <div class="two-col">
            <div>
              <p class="sub-title">${data.languages.label}</p>
              <ul class="pill-list green">
                ${data.languages.items.map(lang => `<li>${lang}</li>`).join('')}
              </ul>
            </div>
            <div>
              <p class="sub-title">${data.interests.label}</p>
              <ul class="pill-list gray">
                ${data.interests.items.map(interest => `<li>${interest}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

const aboutComponent = new AboutComponent();
