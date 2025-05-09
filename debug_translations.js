// debug_translations.js - Add this file to any HTML page to debug translation issues

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Translation Debugger Script Started');
    
    // Add a button to trigger translation diagnostics
    const debugBtn = document.createElement('button');
    debugBtn.innerText = 'Debug Translations';
    debugBtn.style.position = 'fixed';
    debugBtn.style.bottom = '20px';
    debugBtn.style.right = '20px';
    debugBtn.style.zIndex = '9999';
    debugBtn.style.padding = '10px 15px';
    debugBtn.style.backgroundColor = '#f44336';
    debugBtn.style.color = 'white';
    debugBtn.style.border = 'none';
    debugBtn.style.borderRadius = '4px';
    debugBtn.style.cursor = 'pointer';
    
    document.body.appendChild(debugBtn);
    
    // When the debug button is clicked
    debugBtn.addEventListener('click', function() {
        console.clear();
        console.log('%c=== TRANSLATION DEBUG INFO ===', 'font-size:16px; font-weight:bold; color:#f44336;');
        
        // 1. Check document language and direction
        console.log(
            '%cDocument settings:',
            'font-weight:bold;',
            '\n- HTML lang:', document.documentElement.lang,
            '\n- Direction:', document.documentElement.dir,
            '\n- RTL class on body:', document.body.classList.contains('rtl')
        );
        
        // 2. Check all elements with data-i18n attributes
        const i18nElements = document.querySelectorAll('[data-i18n]');
        console.log(`%cFound ${i18nElements.length} elements with data-i18n attributes`, 'font-weight:bold;');
        
        // Group by key for better overview
        const keyGroups = {};
        
        i18nElements.forEach((el, index) => {
            const key = el.getAttribute('data-i18n');
            const content = el.textContent.trim();
            const element = el.tagName;
            const classes = Array.from(el.classList).join(' ');
            
            if (!keyGroups[key]) {
                keyGroups[key] = [];
            }
            
            keyGroups[key].push({
                index,
                element,
                content,
                classes,
                visible: isVisible(el)
            });
        });
        
        // Log the key groups
        console.log('%cTranslation keys in use:', 'font-weight:bold;');
        Object.keys(keyGroups).forEach(key => {
            const instances = keyGroups[key];
            console.log(
                `%c${key}%c (${instances.length} instances)`,
                'color:#3f51b5; font-weight:bold;',
                'color:black; font-weight:normal;'
            );
            
            instances.forEach(instance => {
                const visibilityStatus = instance.visible ? '✅ visible' : '❌ hidden';
                console.log(
                    `  ${instance.index}: <${instance.element}> "${instance.content}" (${visibilityStatus})`
                );
                
                // Highlight the element in the page
                const el = i18nElements[instance.index];
                const originalBg = el.style.backgroundColor;
                const originalOutline = el.style.outline;
                
                el.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                el.style.outline = '2px solid red';
                
                setTimeout(() => {
                    el.style.backgroundColor = originalBg;
                    el.style.outline = originalOutline;
                }, 3000);
            });
        });
        
        // 3. Check language switcher
        const langSwitchers = document.querySelectorAll('.dynamic-lang-switch a, .language-switcher a');
        console.log(`%cFound ${langSwitchers.length} language switcher links`, 'font-weight:bold;');
        
        langSwitchers.forEach(link => {
            const lang = link.getAttribute('data-lang');
            const isActive = link.classList.contains('active');
            console.log(
                `  Language: ${lang}, Active: ${isActive ? '✅ Yes' : '❌ No'}, Text: "${link.textContent.trim()}"`
            );
        });
        
        // 4. Check localStorage
        console.log('%cLocalStorage settings:', 'font-weight:bold;');
        const savedLang = localStorage.getItem('preferredLanguage');
        console.log(`  preferredLanguage: ${savedLang || '(not set)'}`);
        
        // 5. Check if translations are loaded
        console.log('%cTranslations system check:', 'font-weight:bold;');
        if (typeof switchLanguage === 'function') {
            console.log('  ✅ switchLanguage function is available');
        } else {
            console.log('  ❌ switchLanguage function is NOT available');
        }
        
        // Check for known issues
        console.log('%cCommon issues check:', 'font-weight:bold;');
        
        // Issue: Page title not translated
        const title = document.querySelector('h1[data-i18n]');
        if (title) {
            console.log(`  Page title found: "${title.textContent}" with key "${title.getAttribute('data-i18n')}"`);
        } else {
            console.log('  ❌ No H1 title with data-i18n attribute found');
        }
        
        // Summary
        console.log('%c=== END DEBUG INFO ===', 'font-size:16px; font-weight:bold; color:#f44336;');
    });
    
    // Helper function to check if an element is visible
    function isVisible(el) {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }
}); 