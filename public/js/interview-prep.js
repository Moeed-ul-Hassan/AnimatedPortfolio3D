// JavaScript functions for the interview preparation section

// Initialize interview preparation section
function initInterviewPrepSection() {
    // Get all progress bars in the interview section
    const progressBars = document.querySelectorAll('.interview-progress');
    
    // Animate progress bars when they come into view
    function animateInterviewProgressBars() {
        progressBars.forEach(bar => {
            // Check if the bar is visible in the viewport
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (barTop < windowHeight - 50) {
                // If visible, set the width based on the style width
                const targetWidth = bar.style.width || '0%';
                
                // Initially set width to 0
                bar.style.width = '0%';
                
                // Animate to target width with GSAP
                gsap.to(bar, {
                    width: targetWidth,
                    duration: 1.5,
                    ease: "power2.out",
                    onComplete: () => {
                        // Add a glow effect after animation completes
                        bar.classList.add('progress-glow');
                    }
                });
            }
        });
    }
    
    // Initialize the resource icons hover effects
    function initResourceIcons() {
        const resourceItems = document.querySelectorAll('.interview-resources li');
        
        resourceItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const icon = item.querySelector('i');
                
                // Add pop animation
                gsap.to(icon, {
                    scale: 1.3,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            item.addEventListener('mouseleave', () => {
                const icon = item.querySelector('i');
                
                // Return to normal size
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
    
    // Add hover effects to the company cards
    function initCompanyCardEffects() {
        const companyCards = document.querySelectorAll('.interview-company-card');
        
        companyCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Lift card slightly and add shadow
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    ease: "power2.out"
                });
                
                // Add glow effect to company logo
                const logo = card.querySelector('.interview-company-logo');
                if (logo) {
                    gsap.to(logo, {
                        boxShadow: card.classList.contains('ms-interview') ? 
                            '0 0 15px rgba(0, 120, 212, 0.6)' : 
                            '0 0 15px rgba(66, 133, 244, 0.6)',
                        duration: 0.3
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                // Return to normal position and shadow
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    ease: "power2.out"
                });
                
                // Remove glow from logo
                const logo = card.querySelector('.interview-company-logo');
                if (logo) {
                    gsap.to(logo, {
                        boxShadow: 'none',
                        duration: 0.3
                    });
                }
            });
        });
    }
    
    // Run animations when section scrolls into view
    function checkInterviewSection() {
        const section = document.getElementById('interview-prep');
        if (!section) return;
        
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            // Run animations once when section is visible
            animateInterviewProgressBars();
            
            // Remove the scroll listener once animations have run
            window.removeEventListener('scroll', checkInterviewSection);
        }
    }
    
    // Check if the section is visible initially and on scroll
    checkInterviewSection();
    window.addEventListener('scroll', checkInterviewSection);
    
    // Initialize resource icons hover effects
    initResourceIcons();
    
    // Initialize company card hover effects
    initCompanyCardEffects();
}

// Call the init function when document is loaded
document.addEventListener('DOMContentLoaded', initInterviewPrepSection);