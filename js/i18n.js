/**
 * Internationalization (i18n) script
 * Handles multilingual functionality for the website
 */

// Default language
let currentLanguage = 'fr';

// Available languages
const availableLanguages = ['fr', 'en', 'ar'];

// Translation data cache
const translations = {
    fr: {},
    en: {},
    ar: {}
};

// Function to load translations for a specific language
async function loadTranslations(lang) {
    if (Object.keys(translations[lang]).length > 0) {
        // Already loaded
        return translations[lang];
    }
    
    try {
        const response = await fetch(`translations/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load translations for ${lang}`);
        }
        
        const data = await response.json();
        translations[lang] = data;
        return data;
    } catch (error) {
        console.error('Error loading translations:', error);
        return {};
    }
}

// Apply translations to the page
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Handle placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        
        if (translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
        }
    });
    
    // Handle button values
    const valueElements = document.querySelectorAll('[data-i18n-value]');
    
    valueElements.forEach(element => {
        const key = element.getAttribute('data-i18n-value');
        
        if (translations[lang][key]) {
            element.value = translations[lang][key];
        }
    });
    
    // Update language switcher UI
    document.querySelectorAll('.language-switch a').forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Set dir attribute for RTL languages (Arabic)
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
    }
    
    // Set lang attribute for accessibility
    document.documentElement.setAttribute('lang', lang);
    
    // Update current language
    currentLanguage = lang;
}

// Initialize translations
async function initTranslation() {
    // Load default language
    await loadTranslations(currentLanguage);
    applyTranslations(currentLanguage);
}

// Switch language
async function switchLanguage(lang) {
    if (!availableLanguages.includes(lang)) {
        console.error(`Language ${lang} is not supported`);
        return;
    }
    
    // Load translations if not already loaded
    await loadTranslations(lang);
    
    // Apply translations
    applyTranslations(lang);
    
    console.log(`Switched to ${lang} language`);
}

// Make functions available globally
window.initTranslation = initTranslation;
window.switchLanguage = switchLanguage; 