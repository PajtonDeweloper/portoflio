// Language Switcher Functionality
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'pl';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLanguageFromStorage();
    }

    bindEvents() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;

        this.currentLanguage = lang;
        this.updateActiveButton(lang);
        this.translateContent(lang);
        this.saveLanguageToStorage(lang);
    }

    updateActiveButton(lang) {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    translateContent(lang) {
        const elements = document.querySelectorAll('[data-pl][data-en]');
        elements.forEach(element => {
            const translation = element.dataset[lang];
            if (translation) {
                element.textContent = translation;
            }
        });

        // Update form placeholders
        const placeholderElements = document.querySelectorAll('[data-pl-placeholder][data-en-placeholder]');
        placeholderElements.forEach(element => {
            const placeholder = element.dataset[lang + 'Placeholder'];
            if (placeholder) {
                element.setAttribute('placeholder', placeholder);
            }
        });

        // Update page title
        const titleTranslations = {
            pl: 'Marsel Cylkowski - Twórca Stron Internetowych',
            en: 'Marsel Cylkowski - Web Developer'
        };
        document.title = titleTranslations[lang];

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const descriptions = {
                pl: 'Profesjonalne tworzenie nowoczesnych one-page stron internetowych z wykorzystaniem AI. Marsel Cylkowski - ekspert w dziedzinie web developmentu.',
                en: 'Professional creation of modern one-page websites using AI. Marsel Cylkowski - expert in web development.'
            };
            metaDescription.setAttribute('content', descriptions[lang]);
        }
    }

    saveLanguageToStorage(lang) {
        localStorage.setItem('preferred-language', lang);
    }

    loadLanguageFromStorage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && savedLang !== this.currentLanguage) {
            this.switchLanguage(savedLang);
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});

// Translation data for sections that need more complex handling
const translations = {
    pl: {
        // About section
        aboutTitle: 'O mnie',
        aboutSubtitle: 'Poznaj mnie lepiej',
        aboutDescription: 'Jestem pasjonatem technologii z wieloletnim doświadczeniem w tworzeniu stron internetowych. Specjalizuję się w nowoczesnych rozwiązaniach one-page z wykorzystaniem najnowszych technologii AI.',
        
        // Skills section
        skillsTitle: 'Umiejętności',
        skillsSubtitle: 'Technologie, które wykorzystuję',
        
        // Portfolio section
        portfolioTitle: 'Portfolio',
        portfolioSubtitle: 'Moje najlepsze projekty',
        
        // Process section
        processTitle: 'Jak pracuję',
        processSubtitle: '6-etapowy proces współpracy przy tworzeniu strony internetowej',
        
        // Recommendations section
        recommendationsTitle: 'Rekomendacje',
        recommendationsSubtitle: 'Co mówią o mnie moi klienci',
        
        // Contact section
        contactTitle: 'Kontakt',
        contactSubtitle: 'Skontaktuj się ze mną',
        
        // Footer
        footerText: '© 2025 Marsel Cylkowski. Wszystkie prawa zastrzeżone.',
        footerSubtext: 'Tworzę nowoczesne one-page strony z wykorzystaniem AI'
    },
    en: {
        // About section
        aboutTitle: 'About Me',
        aboutSubtitle: 'Get to know me better',
        aboutDescription: 'I am a technology enthusiast with years of experience in creating websites. I specialize in modern one-page solutions using the latest AI technologies.',
        
        // Skills section
        skillsTitle: 'Skills',
        skillsSubtitle: 'Technologies I use',
        
        // Portfolio section
        portfolioTitle: 'Portfolio',
        portfolioSubtitle: 'My best projects',
        
        // Process section
        processTitle: 'How I Work',
        processSubtitle: '6-step collaboration process for website creation',
        
        // Recommendations section
        recommendationsTitle: 'Recommendations',
        recommendationsSubtitle: 'What my clients say about me',
        
        // Contact section
        contactTitle: 'Contact',
        contactSubtitle: 'Get in touch with me',
        
        // Footer
        footerText: '© 2025 Marsel Cylkowski. All rights reserved.',
        footerSubtext: 'Creating modern one-page websites using AI'
    }
};
