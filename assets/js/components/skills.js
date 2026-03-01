class SkillsComponent {
  render() {
    const data = i18n.getData('skills');

    if (!data.categories) return '';

    return `
      <section id="skills">
        <div class="container">
          <h2 class="section-title">${data.title}</h2>
          <div class="skills-grid">
            ${data.categories.map(category => `
              <div class="skill-card">
                <h3>${category.name}</h3>
                <div class="tags">
                  ${category.items.map(item => `<span class="tag">${item}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}

const skillsComponent = new SkillsComponent();
