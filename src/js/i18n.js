import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('selectedLanguage') || 'en',
    debug: true,
    
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
  if (!i18next.isInitialized) {
    return key;
  }
  return i18next.t(key, options);
}

// Function to change language
export function changeLanguage(lng) {
  console.log('changeLanguage called with:', lng);
  return new Promise((resolve) => {
    i18next.changeLanguage(lng, (err, t) => {
      console.log('i18next.changeLanguage callback - err:', err, 'language:', lng);
      if (!err) {
        localStorage.setItem('selectedLanguage', lng);
        updatePageContent();
        updateHtmlLang(lng);
        console.log('Language change completed successfully');
      } else {
        console.error('Error changing language:', err);
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
  console.log('updatePageContent called');
  // Update meta tags
  document.title = t('meta.title');
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', t('meta.description'));
  }

  // Update all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('Found elements to translate:', elements.length);
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    console.log('Translating', key, 'to:', translation);
    
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
  console.log('i18n DOMContentLoaded event fired');
  // Wait for i18next to be ready
  i18next.on('initialized', () => {
    console.log('i18next initialized event fired');
    updatePageContent();
    updateHtmlLang(getCurrentLanguage());
  });
  
  // If already initialized, update immediately
  if (i18next.isInitialized) {
    console.log('i18next already initialized');
    updatePageContent();
    updateHtmlLang(getCurrentLanguage());
  }
});

console.log('i18n.js module loaded');

// Listen for language changes
i18next.on('languageChanged', (lng) => {
  updatePageContent();
  updateHtmlLang(lng);
});

export default i18next;
