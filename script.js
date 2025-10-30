// Função para revelar elementos com animação
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Observador de interseção para animações
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: true
    });

    // Adiciona elementos de design tecnológico
    const body = document.body;
    const techCircuit = document.createElement('div');
    techCircuit.className = 'tech-circuit';
    const techGrid = document.createElement('div');
    techGrid.className = 'tech-grid';
    body.prepend(techCircuit, techGrid);

    // Inicializa as animações
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Observa elementos para animação
    document.querySelectorAll('.diagram-node, .card').forEach(el => {
        observer.observe(el);
    });

    // Configuração do Menu Mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    mobileMenuButton.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('-translate-y-full');
            mobileMenuButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
        } else {
            mobileMenu.classList.add('-translate-y-full');
            mobileMenuButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        }
    });

    // Fecha o menu mobile ao clicar em um link
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-y-full');
            isMenuOpen = false;
            mobileMenuButton.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        });
    });
    
    const navLinks = document.querySelectorAll('nav a.nav-link');
    const sections = document.querySelectorAll('main section');

    const activateLink = (targetId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                activateLink(targetId);
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = document.querySelector('header').offsetHeight + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        if (current) {
            activateLink(current);
        }
    });

    const btnFluxo1 = document.getElementById('btn-fluxo-1');
    const btnFluxo2 = document.getElementById('btn-fluxo-2');
    const diagrama1 = document.getElementById('diagrama-1');
    const diagrama2 = document.getElementById('diagrama-2');

    const animateFlowDiagram = (diagram) => {
        const nodes = diagram.querySelectorAll('.diagram-node');
        const arrows = diagram.querySelectorAll('.diagram-arrow');
        
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
            }, index * 200);
        });

        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.style.opacity = '1';
            }, (index + 1) * 200);
        });
    };

    const resetFlowDiagram = (diagram) => {
        const nodes = diagram.querySelectorAll('.diagram-node');
        const arrows = diagram.querySelectorAll('.diagram-arrow');
        
        nodes.forEach(node => {
            node.style.opacity = '0';
            node.style.transform = 'translateY(20px)';
        });

        arrows.forEach(arrow => {
            arrow.style.opacity = '0';
        });
    };

    // Adiciona estilos iniciais aos diagramas
    [diagrama1, diagrama2].forEach(diagram => {
        const nodes = diagram.querySelectorAll('.diagram-node');
        const arrows = diagram.querySelectorAll('.diagram-arrow');
        
        nodes.forEach(node => {
            node.style.transition = 'all 0.5s ease-out';
            node.style.opacity = '0';
            node.style.transform = 'translateY(20px)';
        });

        arrows.forEach(arrow => {
            arrow.style.transition = 'opacity 0.5s ease-out';
            arrow.style.opacity = '0';
        });
    });

    // Anima o primeiro diagrama ao carregar
    setTimeout(() => {
        animateFlowDiagram(diagrama1);
    }, 500);

    btnFluxo1.addEventListener('click', () => {
        diagrama2.style.display = 'none';
        diagrama1.style.display = 'block';
        btnFluxo1.classList.add('tab-btn-active');
        btnFluxo1.classList.remove('tab-btn-inactive');
        btnFluxo2.classList.add('tab-btn-inactive');
        btnFluxo2.classList.remove('tab-btn-active');
        resetFlowDiagram(diagrama1);
        setTimeout(() => animateFlowDiagram(diagrama1), 50);
    });

    btnFluxo2.addEventListener('click', () => {
        diagrama1.style.display = 'none';
        diagrama2.style.display = 'block';
        btnFluxo2.classList.add('tab-btn-active');
        btnFluxo2.classList.remove('tab-btn-inactive');
        btnFluxo1.classList.add('tab-btn-inactive');
        btnFluxo1.classList.remove('tab-btn-active');
        resetFlowDiagram(diagrama2);
        setTimeout(() => animateFlowDiagram(diagrama2), 50);
    });

    // Configuração do Gráfico
    const ctx = document.getElementById('impactChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Ocorrências Disciplinares',
                    data: [65, 45, 35, 20],
                    backgroundColor: '#B91C1C',
                    borderRadius: 8
                },
                {
                    label: 'Ocorrências Pedagógicas',
                    data: [40, 35, 25, 15],
                    backgroundColor: '#1E40AF',
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            onHover: (event, activeElements) => {
                const chartElement = event.native.target;
                chartElement.style.cursor = activeElements.length ? 'pointer' : 'default';
            }
        }
    });
});