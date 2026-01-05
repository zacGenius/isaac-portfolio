class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: #0a0a0a;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    margin-top: 4rem;
                }
                
                footer {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 3rem 2rem 2rem;
                    text-align: center;
                }
                
                .footer-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }
                
                .social-links {
                    display: flex;
                    gap: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .social-links a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 3rem;
                    height: 3rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 50%;
                    color: #a3a3a3;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }
                
                .social-links a:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    transform: translateY(-2px);
                }
                
                .copyright {
                    color: #737373;
                    font-size: 0.875rem;
                    margin-top: 1rem;
                }
                
                .copyright a {
                    color: #a3a3a3;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .copyright a:hover {
                    color: white;
                }
                
                @media (max-width: 768px) {
                    footer {
                        padding: 2rem 1rem 1.5rem;
                    }
                    
                    .social-links {
                        gap: 1rem;
                    }
                    
                    .social-links a {
                        width: 2.5rem;
                        height: 2.5rem;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-content">
                    <div class="social-links">
                        <a href="https://github.com/zacgenius" target="_blank" aria-label="GitHub">
                            <i data-feather="github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/isaaccami" target="_blank" aria-label="LinkedIn">
                            <i data-feather="linkedin"></i>
                        </a>
                        <a href="mailto:isaac.cami4242@gmail.com" aria-label="Email">
                            <i data-feather="mail"></i>
                        </a>
                    </div>
                    
                    <div class="copyright">
                        <p>&copy; 2025 Isaac Camilo. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        `;
        
        // Replace feather icons
        feather.replace();
    }
}

customElements.define('footer-component', FooterComponent);