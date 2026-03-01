class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translations = {};
  }

  async init() {
    try {
      const response = await fetch('/assets/data/translations.json');
      this.translations = await response.json();
      this.updateHtmlLang();
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this.updateHtmlLang();
  }

  updateHtmlLang() {
    document.documentElement.lang = this.currentLang;
  }

  get(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  getData(section) {
    return this.translations[this.currentLang]?.[section] || {};
  }
}

// Create global instance
const i18n = new I18n();
