class FooterComponent {
  constructor() {
    this.footerElement = document.querySelector('footer');
  }

  render() {
    const data = i18n.getData('footer');

    this.footerElement.innerHTML = `
      <p>Sabir BERTIT · ${data.location} · <a href="mailto:${data.email}">${data.email}</a></p>
      <p>${data.credit}</p>
    `;
  }
}

const footerComponent = new FooterComponent();
