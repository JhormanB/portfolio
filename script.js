// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Update current year in footer
const yearTarget = document.querySelector('#year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

// Initialize AOS (Animate On Scroll)
if (window.AOS) {
  AOS.init({
    duration: 700,
    easing: 'ease-out-quart',
    once: true,
    offset: 80,
  });
}

// i18n functionality
let currentLang = 'en';
let translations = {};

// Load translations
async function loadTranslations(lang) {
  try {
    // Determine the correct path based on current location
    const isInSubdir = window.location.pathname.includes('/es/');
    const basePath = isInSubdir ? '../' : '';
    const response = await fetch(`${basePath}assets/i18n/${lang}.json`);
    translations[lang] = await response.json();
  } catch (error) {
    console.error(`Failed to load ${lang} translations:`, error);
  }
}

// Update page content with translations
function updateContent(lang) {
  if (!translations[lang]) return;
  
  const t = translations[lang];
  
  // Update meta tags
  document.title = t.meta.title;
  document.querySelector('meta[name="description"]').setAttribute('content', t.meta.description);
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        value = key; // fallback to key if translation not found
        break;
      }
    }
    
    if (typeof value === 'string') {
      // Handle HTML content (like spans in headlines)
      if (element.tagName === 'H1' && key === 'hero.headline') {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    }
  });
  
  // Update language switcher
  document.querySelectorAll('.lang-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-lang') === lang) {
      link.classList.add('active');
    }
  });
  
  currentLang = lang;
}

// Initialize i18n
async function initI18n() {
  // Detect language from URL or localStorage
  const urlLang = window.location.pathname.includes('/es/') ? 'es' : 'en';
  const savedLang = localStorage.getItem('preferred-lang');
  const lang = savedLang || urlLang;
  
  // Load both languages
  await Promise.all([
    loadTranslations('en'),
    loadTranslations('es')
  ]);
  
  // Set initial language
  updateContent(lang);
  
  // Add language switcher event listeners
  document.querySelectorAll('.lang-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newLang = link.getAttribute('data-lang');
      localStorage.setItem('preferred-lang', newLang);
      navigateToLanguage(newLang);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
// Helper to determine base path and handle local vs server environments
function getBasePath() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const path = window.location.pathname;
  
  // For local file:// protocol
  if (protocol === 'file:') {
    const currentPath = path.replace(/\\/g, '/');
    if (currentPath.includes('/es/')) {
      // We're in the Spanish subdirectory
      return currentPath.replace('/es/index.html', '/');
    } else {
      // We're in the root directory
      return currentPath.replace('/index.html', '/');
    }
  }
  
  // For GitHub Pages: username.github.io/repository-name/
  if (hostname.includes('github.io')) {
    const pathParts = path.split('/').filter(part => part);
    if (pathParts.length > 0 && pathParts[0] !== 'es') {
      return `/${pathParts[0]}/`;
    }
    return '/portfolio/'; // fallback for your expected URL
  }
  
  // For local server development
  return '/';
}

// Handle navigation for different environments
function navigateToLanguage(lang) {
  const protocol = window.location.protocol;
  const currentPath = window.location.pathname.replace(/\\/g, '/');
  
  if (protocol === 'file:') {
    // For local file:// protocol, construct the full file path
    let targetPath;
    if (lang === 'es') {
      if (currentPath.includes('/es/')) {
        // Already in Spanish, no need to navigate
        return;
      } else {
        // Navigate from root to Spanish
        targetPath = currentPath.replace('/index.html', '/es/index.html');
      }
    } else {
      if (currentPath.includes('/es/')) {
        // Navigate from Spanish to root
        targetPath = currentPath.replace('/es/index.html', '/index.html');
      } else {
        // Already in English, no need to navigate
        return;
      }
    }
    window.location.href = `file://${targetPath}`;
  } else {
    // For server environments (local server or GitHub Pages)
    const basePath = getBasePath();
    if (lang === 'es') {
      window.location.href = `${basePath}es/`;
    } else {
      window.location.href = basePath;
    }
  }
}
