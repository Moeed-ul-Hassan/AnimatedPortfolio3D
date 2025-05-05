// Services section animations and enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Select all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesSection = document.getElementById('services');
    
    if (!serviceCards.length || !servicesSection) return;
    
    // Add special hover effect for service cards
    serviceCards.forEach(card => {
        // Create shine effect element
        const shineEffect = document.createElement('div');
        shineEffect.classList.add('service-shine-effect');
        card.appendChild(shineEffect);
        
        // Handle mouseenter event
        card.addEventListener('mouseenter', (e) => {
            // Create particles for enhanced effect
            createServiceParticles(card);
            
            // Animate the shine effect
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            shineEffect.style.opacity = '1';
            shineEffect.style.top = `${mouseY}px`;
            shineEffect.style.left = `${mouseX}px`;
        });
        
        // Handle mousemove event for dynamic shine
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            shineEffect.style.top = `${mouseY}px`;
            shineEffect.style.left = `${mouseX}px`;
        });
        
        // Handle mouseleave event
        card.addEventListener('mouseleave', () => {
            shineEffect.style.opacity = '0';
        });
    });
    
    // Create particles effect for service cards
    function createServiceParticles(card) {
        // Create a canvas for the particles
        const canvas = document.createElement('canvas');
        canvas.width = card.offsetWidth;
        canvas.height = card.offsetHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        card.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        // Particle color based on card color
        let particleColor;
        const cardColor = card.getAttribute('data-color');
        
        switch(cardColor) {
            case 'primary':
                particleColor = '#6c63ff';
                break;
            case 'secondary':
                particleColor = '#ff6584';
                break;
            case 'accent':
                particleColor = '#44d7b6';
                break;
            default:
                particleColor = '#6c63ff';
        }
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 10,
                radius: Math.random() * 3 + 1,
                color: particleColor,
                speed: Math.random() * 3 + 1,
                opacity: 1
            });
        }
        
        // Animation function
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let particlesLeft = false;
            
            particles.forEach(particle => {
                if (particle.opacity <= 0) return;
                
                particlesLeft = true;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`;
                ctx.fill();
                
                particle.y -= particle.speed;
                particle.opacity -= 0.01;
            });
            
            if (particlesLeft) {
                requestAnimationFrame(animate);
            } else {
                // Remove canvas when animation is complete
                card.removeChild(canvas);
            }
        }
        
        // Start animation
        animate();
        
        // Helper function to convert hex to rgb
        function hexToRgb(hex) {
            // Remove '#' if present
            hex = hex.replace('#', '');
            
            // Parse the hex value
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            
            return `${r}, ${g}, ${b}`;
        }
    }
    
    // Add 3D tilt effect to service cards
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.width / 2;
            const cardCenterY = rect.height / 2;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position relative to card center
            const rotateY = ((mouseX - cardCenterX) / cardCenterX) * 5; // Max 5 degrees
            const rotateX = -((mouseY - cardCenterY) / cardCenterY) * 5; // Max 5 degrees
            
            // Apply the rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset rotation when mouse leaves
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // Create floating dots background effect
    const servicesBackground = document.createElement('div');
    servicesBackground.classList.add('services-background');
    servicesSection.appendChild(servicesBackground);
    
    // Add animated dots
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.classList.add('service-background-dot');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        dot.style.left = `${posX}%`;
        dot.style.top = `${posY}%`;
        
        // Random size
        const size = Math.random() * 6 + 2;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        
        // Random opacity
        dot.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random color
        const colors = ['#6c63ff', '#ff6584', '#44d7b6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.backgroundColor = randomColor;
        
        // Add animation with random duration
        const animDuration = Math.random() * 10 + 10;
        dot.style.animation = `floatingDot ${animDuration}s infinite ease-in-out`;
        dot.style.animationDelay = `${Math.random() * 5}s`;
        
        servicesBackground.appendChild(dot);
    }
    
    // Add ScrollTrigger animations for services section
    if (typeof gsap !== 'undefined' && gsap.ScrollTrigger) {
        gsap.from('#services-title', {
            scrollTrigger: {
                trigger: '#services-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('#services-underline', {
            scrollTrigger: {
                trigger: '#services-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            width: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('#services-description', {
            scrollTrigger: {
                trigger: '#services-title',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            delay: 0.7,
            ease: 'power3.out'
        });
    }
});
