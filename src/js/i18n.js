import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Translation files
import enTranslation from '../locales/en/translation.json';
import esTranslation from '../locales/es/translation.json';
import glTranslation from '../locales/gl/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  gl: {
    translation: glTranslation
  }
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('selectedLanguage') || 'en',
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'selectedLanguage'
    },

    interpolation: {
      escapeValue: false
    }
  });

// Function to translate text
export function t(key, options = {}) {
  return i18next.t(key, options);
}

// Function to change language
export function changeLanguage(lng) {
  return new Promise((resolve) => {
    i18next.changeLanguage(lng, (err, t) => {
      if (!err) {
        localStorage.setItem('selectedLanguage', lng);
        updatePageContent();
        updateHtmlLang(lng);
      }
      resolve(t);
    });
  });
}

// Function to get current language
export function getCurrentLanguage() {
  return i18next.language;
}

// Function to update HTML lang attribute
function updateHtmlLang(lng) {
  document.documentElement.setAttribute('lang', lng);
}

// Function to update all translatable content on the page
function updatePageContent() {
  // Update meta tags
  document.title = t('meta.title');
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', t('meta.description'));
  }

  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
      element.value = translation;
    } else if (element.hasAttribute('placeholder')) {
      element.placeholder = translation;
    } else if (element.hasAttribute('title')) {
      element.title = translation;
    } else if (element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', translation);
    } else {
      element.innerHTML = translation;
    }
  });

  // Update CV download links to use language-specific CV
  const currentLang = getCurrentLanguage();
  const cvLinks = document.querySelectorAll('a[href*="CV_FIZREYARMESTO"]');
  cvLinks.forEach(link => {
    let cvFile = 'assets/CV_FIZREYARMESTO_ENG.pdf';
    if (currentLang === 'es') {
      cvFile = 'assets/CV_FIZREYARMESTO_ES.pdf';
    } else if (currentLang === 'gl') {
      cvFile = 'assets/CV_FIZREYARMESTO_GL.pdf';
    }
    link.href = cvFile;
  });
}

// Initialize content on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePageContent();
  updateHtmlLang(getCurrentLanguage());
});

// Listen for language changes
i18next.on('languageChanged', (lng) => {
  updatePageContent();
  updateHtmlLang(lng);
});

export default i18next;
