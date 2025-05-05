// Main JavaScript file for the portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Custom cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Animate hero section after loading
        animateHeroSection();
    }, 2000);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    const texts = ["Web Developer", "3D Designer", "UI/UX Designer", "Freelancer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typewriterDelay = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Removing characters
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typewriterDelay = 50; // Faster deletion
        } else {
            // Adding characters
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typewriterDelay = 100; // Normal typing speed
        }
        
        // Check if word is completed
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at the end of the word
            isDeleting = true;
            typewriterDelay = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            // Word has been deleted
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Move to next word
            typewriterDelay = 500; // Pause before typing next word
        }
        
        // Continue the loop
        setTimeout(typeWriter, typewriterDelay);
    }
    
    // Start the typewriter effect if element exists
    if (typewriterElement) {
        setTimeout(typeWriter, 1000); // Start after initial delay
    }
    
    // Animate hero section
    function animateHeroSection() {
        // GSAP animations for hero section elements
        gsap.from('#hero-title', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out"
        });
        
        gsap.from('.typewriter-container', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.3,
            ease: "power3.out"
        });
        
        gsap.from('#hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.6,
            ease: "power3.out"
        });
        
        gsap.from('#hero-buttons', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.9,
            ease: "power3.out"
        });
        
        gsap.from('#hero-social', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.2,
            ease: "power3.out"
        });
        
        // Create particles in hero section
        createParticles();
    }
    
    // Floating particles in hero section
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        
        if (!particlesContainer) return;
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size
            const size = Math.random() * 10 + 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random color
            const colors = ['#6c63ff', '#ff6584', '#44d7b6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = randomColor;
            
            // Append to container
            particlesContainer.appendChild(particle);
            
            // Animate with GSAP
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                opacity: Math.random() * 0.5 + 0.1,
                duration: Math.random() * 10 + 10,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }
    }
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            // Get the width percentage from the data attribute
            const width = bar.getAttribute('data-width');
            
            // Check if the bar is visible
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 50) {
                bar.style.width = `${width}%`;
            }
        });
    }
    
    // Skills section animation
    if (skillBars.length > 0) {
        // Initial check
        animateSkillBars();
        
        // Check on scroll
        window.addEventListener('scroll', animateSkillBars);
    }
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createServiceParticles(card);
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
    
    // Animate counters in About section
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // ms
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        const counterIncrement = target / totalFrames;
        
        let currentCount = 0;
        let frame = 0;
        
        const countInterval = setInterval(() => {
            frame++;
            currentCount += counterIncrement;
            
            counter.textContent = Math.floor(currentCount);
            
            if (frame === totalFrames) {
                clearInterval(countInterval);
                counter.textContent = target;
            }
        }, frameRate);
    }
    
    function checkCounters() {
        statNumbers.forEach(counter => {
            const counterTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (counterTop < windowHeight - 100) {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            }
        });
    }
    
    // Initialize counters
    if (statNumbers.length > 0) {
        // Check on scroll
        window.addEventListener('scroll', checkCounters);
        // Initial check
        setTimeout(checkCounters, 2000);
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filter = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    
                    // Add animation
                    gsap.fromTo(card, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
                    );
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonials slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonials-prev');
    const nextButton = document.querySelector('.testimonials-next');
    
    let currentSlide = 0;
    let isSmallScreen = window.innerWidth < 1024;
    
    function updateTestimonialSlider() {
        // Check screen size
        isSmallScreen = window.innerWidth < 1024;
        
        if (!testimonialSlider) return;
        
        // Calculate the slide width (different for small and large screens)
        const slideWidth = isSmallScreen 
            ? testimonialSlider.clientWidth
            : testimonialSlider.clientWidth / 2;
        
        // Update slider position
        testimonialSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update dots
        testimonialDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Disable/enable buttons based on current slide
        if (prevButton && nextButton) {
            prevButton.disabled = currentSlide === 0;
            
            if (isSmallScreen) {
                nextButton.disabled = currentSlide === testimonialCards.length - 1;
            } else {
                nextButton.disabled = currentSlide >= testimonialCards.length - 2;
            }
        }
    }
    
    // Initialize testimonial slider
    if (testimonialSlider && testimonialCards.length > 0) {
        // Initial update
        updateTestimonialSlider();
        
        // Update on window resize
        window.addEventListener('resize', updateTestimonialSlider);
        
        // Next button event
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (isSmallScreen) {
                    if (currentSlide < testimonialCards.length - 1) {
                        currentSlide++;
                        updateTestimonialSlider();
                    }
                } else {
                    if (currentSlide < testimonialCards.length - 2) {
                        currentSlide++;
                        updateTestimonialSlider();
                    }
                }
            });
        }
        
        // Previous button event
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateTestimonialSlider();
                }
            });
        }
        
        // Dot navigation
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateTestimonialSlider();
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const subject = this.querySelector('#subject').value;
            const message = this.querySelector('#message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API request
            setTimeout(() => {
                alert('Message sent successfully!');
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Scroll animations with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        // About section animations
        gsap.from('#about-title', {
            scrollTrigger: {
                trigger: '#about-title',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('#about-underline', {
            scrollTrigger: {
                trigger: '#about-title',
                start: 'top 80%'
            },
            width: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        // Skills section animations
        gsap.from('#skills-pills span', {
            scrollTrigger: {
                trigger: '#skills-pills',
                start: 'top 80%'
            },
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out'
        });
        
        // Services section animations
        gsap.from('#services-title', {
            scrollTrigger: {
                trigger: '#services-title',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('#services-underline', {
            scrollTrigger: {
                trigger: '#services-title',
                start: 'top 80%'
            },
            width: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('#services-description', {
            scrollTrigger: {
                trigger: '#services-title',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
        
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('#services-button', {
            scrollTrigger: {
                trigger: '.services-cta',
                start: 'top 90%'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Testimonials section animations
        gsap.from('#testimonials-title', {
            scrollTrigger: {
                trigger: '#testimonials-title',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('#testimonials-underline', {
            scrollTrigger: {
                trigger: '#testimonials-title',
                start: 'top 80%'
            },
            width: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('#testimonials-description', {
            scrollTrigger: {
                trigger: '#testimonials-title',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out'
        });
    }
});