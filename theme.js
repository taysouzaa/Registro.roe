// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Verifica se há uma preferência salva
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    root.setAttribute('data-theme', currentTheme);
    document.body.classList.toggle('dark', currentTheme === 'dark');
} else if (prefersDarkScheme.matches) {
    root.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark');
}

// Alterna o tema quando o botão é clicado
themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
});

// Scroll Reveal Effect
const scrollElements = document.querySelectorAll('.scroll-reveal');

const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Inicializa os elementos com classe scroll-reveal
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});
window.addEventListener('load', () => {
    handleScrollAnimation();
});