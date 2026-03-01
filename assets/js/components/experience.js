class ExperienceComponent {
  render() {
    const data = i18n.getData('experience');

    if (!data.items) return '';

    return `
      <section id="experience">
        <div class="container">
          <h2 class="section-title">${data.title}</h2>
          <div class="timeline">
            ${data.items.map(exp => `
              <article class="job">
                <div class="job-header">
                  <div>
                    <span class="job-company">${exp.company} <span class="domain-badge">${exp.domain}</span></span>
                  </div>
                  <div class="job-meta">
                    <span class="job-period">${exp.period}</span>
                    <span class="job-location">${exp.location}</span>
                  </div>
                </div>
                <span class="job-title">${exp.role}</span>
                ${exp.context ? `<p class="job-context">${exp.context}</p>` : ''}
                <ul>
                  ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
                <div class="job-stack">
                  ${exp.stack.map(tech => `<span class="stack-tag">${tech}</span>`).join('')}
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}

const experienceComponent = new ExperienceComponent();
