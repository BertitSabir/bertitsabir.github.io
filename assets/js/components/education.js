class EducationComponent {
  render() {
    const data = i18n.getData('education');

    if (!data.items) return '';

    return `
      <section id="education">
        <div class="container">
          <h2 class="section-title">${data.title}</h2>
          <div class="edu-grid">
            ${data.items.map(edu => `
              <article class="edu-card">
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-school">${edu.school}</div>
                <div class="edu-meta">${edu.location}${edu.years ? ` · ${edu.years}` : ''}</div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}

const educationComponent = new EducationComponent();
