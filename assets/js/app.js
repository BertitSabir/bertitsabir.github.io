/**
 * Formspree CORS fix
 * HTMX automatically adds HX-* headers to every request.
 * Formspree's CORS policy rejects these headers in the preflight,
 * so we strip them before any request targeting formspree.io.
 */
document.body.addEventListener('htmx:configRequest', function (evt) {
  if ((evt.detail.path || '').indexOf('formspree.io') === -1) return;
  var h = evt.detail.headers;
  delete h['HX-Current-URL'];
  delete h['HX-Request'];
  delete h['HX-Target'];
  delete h['HX-Trigger'];
  delete h['HX-Trigger-Name'];
  delete h['HX-Boosted'];
});

/**
 * Update the UI when the active language changes.
 * - Sets the <html lang> attribute for accessibility / SEO
 * - Toggles the active state on the EN / FR switcher buttons
 * - Translates nav link text via data-en / data-fr attributes
 */
function setLang(lang) {
  document.documentElement.lang = lang;
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
  document.querySelectorAll('nav a[data-en]').forEach(function (a) {
    a.textContent = a.dataset[lang] || a.dataset.en;
  });
}

/**
 * Handle the Formspree response after an HTMX form submission.
 * hx-swap="none" prevents HTMX from touching the DOM,
 * so we manually show the success or error banner and reset on success.
 */
function handleContactForm(event) {
  var form = event.target;
  var ok   = form.querySelector('.form-ok');
  var err  = form.querySelector('.form-err');
  ok.style.display  = 'none';
  err.style.display = 'none';
  if (event.detail.successful) {
    ok.style.display = 'block';
    form.reset();
  } else {
    err.style.display = 'block';
  }
}
