class ContactComponent {
  render() {
    const data = i18n.getData('contact');
    const formData = data.form;

    return `
      <section id="contact">
        <div class="container">
          <h2 class="section-title">${data.title}</h2>
          <div class="contact-layout">
            <div class="contact-intro">
              <p>${data.intro}</p>
              <ul class="contact-direct">
                <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
                <li><strong>Location:</strong> ${data.location}</li>
              </ul>
            </div>
            <form class="contact-form" action="https://formspree.io/f/${formData.formspree_id}" method="POST">
              <div class="form-group">
                <label for="name">${formData.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="${formData.namePlaceholder}"
                  required
                >
              </div>

              <div class="form-group">
                <label for="email">${formData.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="${formData.emailPlaceholder}"
                  required
                >
              </div>

              <div class="form-group">
                <label for="message">${formData.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="${formData.messagePlaceholder}"
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn-submit">${formData.submit}</button>

              <div class="form-msg success" style="display: none;">
                ${formData.success}
              </div>
              <div class="form-msg error" style="display: none;">
                ${formData.error}
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  attachFormHandler() {
    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactForm(form);
      });
    }
  }

  handleContactForm(form) {
    const submitBtn = form.querySelector('.btn-submit');
    const formData = new FormData(form);

    // Disable button immediately to prevent double submission
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.cursor = 'wait';

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        const okMsg = form.querySelector('.form-msg.success');
        const errMsg = form.querySelector('.form-msg.error');
        okMsg.style.display = 'block';
        errMsg.style.display = 'none';
        form.reset();
        // Keep button disabled after success
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      const errMsg = form.querySelector('.form-msg.error');
      const okMsg = form.querySelector('.form-msg.success');
      errMsg.style.display = 'block';
      okMsg.style.display = 'none';
      console.error('Form error:', error);

      // Re-enable button on error so user can try again
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.style.pointerEvents = 'auto';
      submitBtn.style.cursor = 'pointer';
    });
  }
}

const contactComponent = new ContactComponent();
