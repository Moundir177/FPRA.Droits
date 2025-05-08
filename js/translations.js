// Translation system for all pages
function initTranslation() {
  console.log("Translation system initialized");
  
  // Load the appropriate JSON file based on language
  async function loadTranslations(lang) {
    console.log(`Attempting to load translations for: ${lang}`);
    try {
      const response = await fetch(`translations/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Successfully loaded translations for ${lang}`, data);
      return data;
    } catch (e) {
      console.error(`Failed to load ${lang} translations`, e);
      // Try with relative path as fallback
      try {
        console.log("Trying alternative path...");
        const responseFallback = await fetch(`../translations/${lang}.json`);
        if (!responseFallback.ok) {
          throw new Error(`HTTP error! status: ${responseFallback.status}`);
        }
        const dataFallback = await responseFallback.json();
        console.log(`Successfully loaded translations with alternative path for ${lang}`);
        return dataFallback;
      } catch (fallbackErr) {
        console.error(`Fallback also failed: ${fallbackErr}`);
        return null;
      }
    }
  }

  // Apply translations to the page
  async function applyTranslation(lang) {
    console.log(`Applying translation for: ${lang}`);
    const translations = await loadTranslations(lang);
    if (!translations) {
      console.error("No translations loaded, cannot proceed");
      return;
    }
    
    // Apply to all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Found ${elements.length} elements with data-i18n attributes`);
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      console.log(`Translating element with key: ${key}`);
      
      if (translations[key]) {
        // Save original content if not already saved
        if (!el.getAttribute('data-original')) {
          el.setAttribute('data-original', el.innerHTML);
        }
        console.log(`Changing text from "${el.innerHTML}" to "${translations[key]}"`);
        el.innerHTML = translations[key];
      } else {
        console.warn(`No translation found for key: ${key}`);
      }
    });
    
    // Change document direction for RTL languages
    document.documentElement.lang = lang;
    document.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    console.log(`Document direction changed to: ${document.dir}`);
    
    // Add RTL classes for styling if needed
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      console.log("Added RTL class to body");
    } else {
      document.body.classList.remove('rtl');
    }
    
    // Update active state in language switcher
    document.querySelectorAll('.language-switch a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('data-lang') === lang) {
        a.classList.add('active');
      }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    console.log(`Language preference saved: ${lang}`);
  }
  
  // Reset to original language
  function resetToOriginal() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const original = el.getAttribute('data-original');
      if (original) {
        el.innerHTML = original;
      }
    });
    document.documentElement.lang = 'fr';
    document.dir = 'ltr';
    document.body.classList.remove('rtl');
    
    // Update language switcher
    document.querySelectorAll('.language-switch a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('data-lang') === 'fr') {
        a.classList.add('active');
      }
    });
    
    localStorage.setItem('preferredLanguage', 'fr');
  }
  
  // Public function to switch language - exported to global scope
  window.switchLanguage = function(lang) {
    console.log(`switchLanguage called with: ${lang}`);
    if (lang === 'fr') {
      resetToOriginal();
    } else {
      applyTranslation(lang);
    }
  };
  
  // Add event listeners to language switcher
  document.querySelectorAll('.language-switch a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = a.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Check for saved language preference
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && savedLang !== 'fr') {
    applyTranslation(savedLang);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initTranslation); 