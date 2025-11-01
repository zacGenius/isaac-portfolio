// Typing Animation
const texts = [
    'Data Scientist',
    'Machine Learning Engineer',
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const erasingSpeed = 50;
const newTextDelay = 2000;

function typeText() {
    const currentText = texts[textIndex];
    const typedTextElement = document.getElementById('typed-text');
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    } else {
        const delay = isDeleting ? erasingSpeed : typingSpeed;
        setTimeout(typeText, delay);
    }
}

// Wave Animation
class WaveAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.waves = [];
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        // Create multiple wave layers
        for (let i = 0; i < 5; i++) {
            this.waves.push({
                y: this.canvas.height / 2,
                length: 0.01 * (i + 1),
                amplitude: 50 - (i * 10),
                frequency: 0.015 * (i + 1),
                phase: Math.random() * Math.PI * 2,
                speed: 0.02 * (i + 1),
                opacity: 0.1 - (i * 0.015)
            });
        }
    }
    
    handleMouseMove(e) {
        const mouseY = e.clientY;
        const centerY = this.canvas.height / 2;
        const deltaY = (mouseY - centerY) * 0.0001;
        
        this.waves.forEach((wave, index) => {
            wave.y = this.canvas.height / 2 + deltaY * (index + 1) * 100;
        });
    }
    
    drawWave(wave, time) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height);
        
        for (let x = 0; x <= this.canvas.width; x += 5) {
            const y = wave.y + 
                Math.sin(x * wave.length + wave.phase + time * wave.frequency) * wave.amplitude +
                Math.sin(x * wave.length * 2 + wave.phase + time * wave.frequency * 0.5) * wave.amplitude * 0.3;
            
            this.ctx.lineTo(x, y);
        }
        
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.closePath();
        
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        this.waves.forEach(wave => {
            wave.phase += wave.speed;
            this.drawWave(wave, time);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Intersection Observer for Fade In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Smooth Scroll for Navigation Links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Initialize wave animation
    const canvas = document.getElementById('wave-canvas');
    if (canvas) {
        const waveAnimation = new WaveAnimation(canvas);
        waveAnimation.animate();
    }
    
    // Observe fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.remove();
    }, 1000);
});