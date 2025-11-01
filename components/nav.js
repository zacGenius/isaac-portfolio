class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.isMenuOpen = false;
    }
    
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                nav {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .logo {
                    font-size: 1.5rem;
                    font-weight: 300;
                    color: white;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }
                
                .logo:hover {
                    opacity: 0.8;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                
                .nav-links a {
                    color: #a3a3a3;
                    text-decoration: none;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }
                
                .nav-links a:hover {
                    color: white;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: white;
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        position: fixed;
                        top: 4rem;
                        left: 0;
                        right: 0;
                        background: rgba(0, 0, 0, 0.95);
                        backdrop-filter: blur(10px);
                        flex-direction: column;
                        padding: 2rem;
                        transform: translateY(-100%);
                        opacity: 0;
                        transition: all 0.3s ease;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    
                    .nav-links.open {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    
                    .mobile-menu-toggle {
                        display: block;
                    }
                }
            </style>
            
            <nav>
                <a href="#home" class="logo">Isaac Camilo</a>
                
                <ul class="nav-links">
                    <li><a href="#home">Início</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#projetos">Projetos</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
                
                <button class="mobile-menu-toggle" id="menu-toggle">
                    <i data-feather="menu"></i>
                </button>
            </nav>
        `;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const menuToggle = this.shadowRoot.getElementById('menu-toggle');
        const navLinks = this.shadowRoot.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            this.isMenuOpen = !this.isMenuOpen;
            navLinks.classList.toggle('open');
            
            if (this.isMenuOpen) {
                menuToggle.innerHTML = '<i data-feather="x"></i>';
            } else {
                menuToggle.innerHTML = '<i data-feather="menu"></i>';
            }
            feather.replace();
        });
        
        // Close menu when clicking on links
        this.shadowRoot.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                this.isMenuOpen = false;
                navLinks.classList.remove('open');
                menuToggle.innerHTML = '<i data-feather="menu"></i>';
                feather.replace();
            });
        });
        
        // Smooth scroll for navigation links
        this.shadowRoot.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

customElements.define('nav-component', NavComponent);