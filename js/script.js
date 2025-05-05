// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Loader
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = "0";
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = "none";
            animateHeroSection();
        }, 500);
    }, 1500);
    
    // Navbar
    const navbar = document.getElementById('navbar');
    const toggleMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Scroll event for navbar
    window.addEventListener('scroll', () => {
        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        const backToTopBtn = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Toggle mobile menu
    toggleMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when a link is clicked
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // 80px for navbar height
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Custom cursor
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(customCursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2
            });
        });
    }
    
    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const typewriterText = ["Web Developer", "Interactive Designer", "3D Enthusiast", "Animation Expert"];
    let typewriterIndex = 0;
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < typewriterText[typewriterIndex].length) {
            typewriterElement.textContent += typewriterText[typewriterIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(eraseText, 1000);
        }
    }
    
    function eraseText() {
        if (charIndex > 0) {
            typewriterElement.textContent = typewriterText[typewriterIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            typewriterIndex = (typewriterIndex + 1) % typewriterText.length;
            setTimeout(typeWriter, 500);
        }
    }
    
    // Start typewriter effect
    setTimeout(typeWriter, 1000);
    
    // Hero section animations
    function animateHeroSection() {
        const tl = gsap.timeline();
        
        tl.fromTo(
            "#hero-title",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.2
        )
        .fromTo(
            ".typewriter-container",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.4
        )
        .fromTo(
            "#hero-subtitle",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.6
        )
        .fromTo(
            "#hero-buttons",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            0.8
        )
        .fromTo(
            "#hero-social",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            1.0
        );
        
        // Create floating particles
        createParticles();
    }
    
    // Create floating particles in hero section
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        
        if (particlesContainer) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                
                // Random size between 3px and 8px
                const size = Math.random() * 5 + 3;
                
                particle.style.position = 'absolute';
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.borderRadius = '50%';
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Random color
                const colors = ['#6C63FF', '#FF6584', '#44D7B6'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = randomColor;
                particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
                
                // Add to container
                particlesContainer.appendChild(particle);
                
                // Animate with GSAP
                gsap.to(particle, {
                    x: `${(Math.random() - 0.5) * 100}`,
                    y: `${(Math.random() - 0.5) * 100}`,
                    duration: 5 + Math.random() * 10,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 5
                });
            }
        }
    }
    
    // Section animations on scroll
    const sectionTitles = document.querySelectorAll('.section-header h2');
    sectionTitles.forEach(title => {
        gsap.fromTo(
            title,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%"
                },
                ease: "power3.out"
            }
        );
    });
    
    const sectionUnderlines = document.querySelectorAll('.section-underline');
    sectionUnderlines.forEach(underline => {
        gsap.fromTo(
            underline,
            { width: 0 },
            {
                width: "6rem",
                duration: 1,
                scrollTrigger: {
                    trigger: underline,
                    start: "top 80%"
                },
                ease: "power3.inOut"
            }
        );
    });
    
    const sectionDescriptions = document.querySelectorAll('.section-description');
    sectionDescriptions.forEach(description => {
        gsap.fromTo(
            description,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: description,
                    start: "top 80%"
                },
                ease: "power3.out",
                delay: 0.3
            }
        );
    });
    
    // Skills progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, {
            width: `${width}%`,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            }
        });
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: stat,
                start: "top 90%"
            },
            onUpdate: function() {
                stat.textContent = Math.floor(this.targets()[0].textContent);
            }
        });
    });
    
    // Service cards animation on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                ease: "power3.out",
                delay: index * 0.1
            }
        );
    });
    
    // Service cards hover effect with particles
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createServiceParticles(card);
        });
    });
    
    function createServiceParticles(card) {
        const iconContainer = card.querySelector('.service-icon-container');
        if (!iconContainer) return;
        
        const color = card.getAttribute('data-color');
        let particleColor;
        
        switch (color) {
            case 'primary':
                particleColor = '#6C63FF';
                break;
            case 'secondary':
                particleColor = '#FF6584';
                break;
            case 'accent':
                particleColor = '#44D7B6';
                break;
            default:
                particleColor = '#6C63FF';
        }
        
        // Create 8 particles around the icon
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            
            particle.style.position = 'absolute';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = particleColor;
            particle.style.opacity = '0.7';
            particle.style.zIndex = '10';
            particle.style.pointerEvents = 'none';
            
            // Position particles at the icon's center
            const iconRect = iconContainer.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            
            const centerX = iconRect.left - cardRect.left + iconRect.width / 2;
            const centerY = iconRect.top - cardRect.top + iconRect.height / 2;
            
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            card.appendChild(particle);
            
            // Animate particles flying outward
            gsap.to(particle, {
                x: Math.cos(i * Math.PI / 4) * 50,
                y: Math.sin(i * Math.PI / 4) * 50,
                opacity: 0,
                duration: 1 + Math.random() * 0.5,
                onComplete: () => {
                    if (card.contains(particle)) {
                        card.removeChild(particle);
                    }
                }
            });
        }
    }
    
    // Project Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power3.out",
                        clearProps: "visibility"
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: "power3.out",
                        onComplete: () => {
                            gsap.set(card, { visibility: "hidden" });
                        }
                    });
                }
            });
        });
    });
    
    // Testimonials slider
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialPrev = document.querySelector('.testimonials-prev');
    const testimonialNext = document.querySelector('.testimonials-next');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    
    function updateTestimonialSlider() {
        // Check window width to determine if we're showing 1 or 2 testimonials
        const isMobile = window.innerWidth < 1024;
        const slideWidth = isMobile ? 100 : 50; // 100% for mobile, 50% for desktop
        
        testimonialSlider.style.transform = `translateX(-${currentTestimonial * slideWidth}%)`;
        
        // Update dots
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonialSlider();
        });
    });
    
    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonialDots.length) % testimonialDots.length;
        updateTestimonialSlider();
    });
    
    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
        updateTestimonialSlider();
    });
    
    // Update testimonial slider on resize
    window.addEventListener('resize', updateTestimonialSlider);
    
    // Initialize testimonial slider
    updateTestimonialSlider();
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real website, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});