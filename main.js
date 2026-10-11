/* ==========================================================================
   Portfolio behaviour
   --------------------------------------------------------------------------
   1. Scroll reveal  - elements fade in as they enter the screen
   2. Theme toggle   - switch between light and dark
   3. Language       - switch between English and Arabic (RTL)
   Translations live in js/translations.js
   ========================================================================== */


/* 1. SCROLL REVEAL
   -------------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});


/* 2. THEME TOGGLE
   -------------------------------------------------------------------------- */
const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');

themeButton.addEventListener('click', () => {
  const deviceIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = root.getAttribute('data-theme') || (deviceIsDark ? 'dark' : 'light');
  root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});


/* 3. LANGUAGE SWITCH (English <-> Arabic)
   -------------------------------------------------------------------------- */
const languageButton = document.getElementById('language-toggle');
const translatable = document.querySelectorAll('[data-i18n]');
const englishTitle = document.title;

// Remember the original English markup of every translatable element
translatable.forEach((element) => {
  element.dataset.english = element.innerHTML;
});

function setLanguage(language) {
  const isArabic = language === 'ar';

  // Page direction and language
  root.lang = language;
  root.dir = isArabic ? 'rtl' : 'ltr';

  // Swap the text of every translatable element
  translatable.forEach((element) => {
    const key = element.dataset.i18n;
    element.innerHTML = isArabic
      ? (TRANSLATIONS_AR[key] || element.dataset.english)
      : element.dataset.english;
  });

  // Button label shows the language you can switch TO
  languageButton.textContent = isArabic ? 'English' : 'العربية';

  // Browser tab title
  document.title = isArabic ? TRANSLATIONS_AR['meta.title'] : englishTitle;

  // Remember the choice for the next visit
  try {
    localStorage.setItem('language', language);
  } catch (error) {
    /* storage can be blocked; the site still works */
  }
}

languageButton.addEventListener('click', () => {
  setLanguage(root.lang === 'ar' ? 'en' : 'ar');
});

// On load: restore the visitor's last language
let savedLanguage = null;
try {
  savedLanguage = localStorage.getItem('language');
} catch (error) {
  /* ignore */
}
if (savedLanguage === 'ar') {
  setLanguage('ar');
}
