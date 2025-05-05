// Interactive Resume Timeline with PDF Download functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the resume timeline section if it doesn't exist
    setupResumeSection();
    
    // Initialize animation effects
    initResumeAnimations();
    
    // Initialize downloadable resume
    setupResumeDownload();
    
    // Function to set up the resume section
    function setupResumeSection() {
        const aboutSection = document.getElementById('about');
        
        if (!aboutSection) return;
        
        // Check if the resume section already exists
        if (document.getElementById('resume-section')) return;
        
        // Create the resume section
        const resumeSection = document.createElement('section');
        resumeSection.id = 'resume-section';
        resumeSection.className = 'section bg-gradient';
        
        // Add the HTML content
        resumeSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Interactive <span class="gradient-text">Resume</span></h2>
                    <div class="section-underline"></div>
                    <p class="section-description">Explore my professional journey through this interactive timeline and download my complete resume.</p>
                </div>
                
                <div class="resume-container">
                    <div class="resume-timeline">
                        <div class="resume-timeline-item" data-year="2023">
                            <div class="resume-timeline-content">
                                <h3>Web Developer & Owner</h3>
                                <h4>ZYlox Web Services</h4>
                                <p>Founded and managed a web development company specializing in interactive and animated websites.</p>
                                <ul class="resume-details">
                                    <li>Created immersive 3D web experiences using Three.js</li>
                                    <li>Developed responsive, user-friendly interfaces</li>
                                    <li>Managed client relationships and project timelines</li>
                                </ul>
                                <div class="resume-technologies">
                                    <span>HTML5</span>
                                    <span>CSS3</span>
                                    <span>JavaScript</span>
                                    <span>Three.js</span>
                                    <span>GSAP</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="resume-timeline-item" data-year="2021">
                            <div class="resume-timeline-content">
                                <h3>Self-taught Web Developer</h3>
                                <h4>Online Learning</h4>
                                <p>Immersed myself in web development through self-directed learning and personal projects.</p>
                                <ul class="resume-details">
                                    <li>Completed comprehensive courses on modern web technologies</li>
                                    <li>Developed personal projects to practice new skills</li>
                                    <li>Participated in coding challenges and online communities</li>
                                </ul>
                                <div class="resume-technologies">
                                    <span>HTML5</span>
                                    <span>CSS3</span>
                                    <span>JavaScript</span>
                                    <span>Responsive Design</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="resume-actions">
                        <a href="#" class="btn btn-primary resume-download-btn" id="resume-download">
                            <i class="fas fa-download"></i> Download Full Resume
                        </a>
                        <a href="#contact" class="btn btn-outline">
                            <i class="fas fa-envelope"></i> Contact Me
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the about section
        aboutSection.parentNode.insertBefore(resumeSection, aboutSection.nextSibling);
        
        // Add styles for the resume section
        addResumeStyles();
    }
    
    // Function to add CSS for the resume section
    function addResumeStyles() {
        // Create a style element
        const style = document.createElement('style');
        
        style.innerHTML = `
            /* Resume Section Styles */
            .resume-container {
                margin-top: 3rem;
            }
            
            .resume-timeline {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
                padding: 2rem 0;
            }
            
            .resume-timeline::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                width: 2px;
                height: 100%;
                background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
                transform: translateX(-50%);
            }
            
            .resume-timeline-item {
                position: relative;
                margin-bottom: 4rem;
                width: 100%;
            }
            
            .resume-timeline-item:nth-child(odd) .resume-timeline-content {
                margin-left: auto;
                text-align: left;
                padding-left: 3rem;
                transform: translateX(50px);
                opacity: 0;
                transition: all 0.6s ease;
            }
            
            .resume-timeline-item:nth-child(even) .resume-timeline-content {
                margin-right: auto;
                text-align: right;
                padding-right: 3rem;
                transform: translateX(-50px);
                opacity: 0;
                transition: all 0.6s ease;
            }
            
            .resume-timeline-item.animate .resume-timeline-content {
                transform: translateX(0);
                opacity: 1;
            }
            
            .resume-timeline-content {
                background-color: var(--color-dark-light);
                padding: 2rem;
                border-radius: var(--border-radius-lg);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(108, 99, 255, 0.2);
                position: relative;
                width: 50%;
                z-index: 2;
            }
            
            .resume-timeline-content h3 {
                color: var(--color-primary);
                margin-bottom: 0.5rem;
            }
            
            .resume-timeline-content h4 {
                color: var(--color-accent);
                margin-bottom: 1rem;
                font-weight: 500;
            }
            
            .resume-timeline-content p {
                margin-bottom: 1rem;
            }
            
            .resume-timeline-item::after {
                content: attr(data-year);
                position: absolute;
                top: 2rem;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                height: 40px;
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                color: var(--color-white);
                border-radius: var(--border-radius-full);
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
                z-index: 3;
            }
            
            .resume-details {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            
            .resume-details li {
                margin-bottom: 0.5rem;
                position: relative;
            }
            
            .resume-details li::before {
                content: '';
                position: absolute;
                left: -1.5rem;
                top: 0.5rem;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: var(--color-accent);
            }
            
            .resume-technologies {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-top: 1.5rem;
            }
            
            .resume-technologies span {
                background-color: rgba(108, 99, 255, 0.1);
                color: var(--color-primary);
                padding: 0.25rem 0.75rem;
                border-radius: var(--border-radius-full);
                font-size: 0.8rem;
                transition: all 0.3s ease;
                border: 1px solid rgba(108, 99, 255, 0.2);
            }
            
            .resume-technologies span:hover {
                background-color: var(--color-primary);
                color: var(--color-white);
                transform: translateY(-2px);
            }
            
            .resume-actions {
                display: flex;
                justify-content: center;
                gap: 1.5rem;
                margin-top: 3rem;
                flex-wrap: wrap;
            }
            
            .resume-download-btn {
                position: relative;
                overflow: hidden;
            }
            
            .resume-download-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                transition: all 0.8s ease;
            }
            
            .resume-download-btn:hover::before {
                left: 100%;
            }
            
            @media (max-width: 768px) {
                .resume-timeline-item:nth-child(odd) .resume-timeline-content,
                .resume-timeline-item:nth-child(even) .resume-timeline-content {
                    width: 100%;
                    margin: 0;
                    text-align: left;
                    padding: 0;
                    margin-top: 3rem;
                }
                
                .resume-timeline::before {
                    left: 20px;
                }
                
                .resume-timeline-item::after {
                    left: 20px;
                    transform: none;
                }
            }
        `;
        
        // Append to head
        document.head.appendChild(style);
    }
    
    // Function to initialize animations
    function initResumeAnimations() {
        // Trigger animations on scroll
        window.addEventListener('scroll', function() {
            const timelineItems = document.querySelectorAll('.resume-timeline-item');
            
            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100;
                
                if (isVisible) {
                    item.classList.add('animate');
                }
            });
        });
        
        // Trigger initial check
        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 500);
    }
    
    // Function to set up resume download button
    function setupResumeDownload() {
        const downloadBtn = document.getElementById('resume-download');
        
        if (!downloadBtn) return;
        
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a notification that the resume is downloading
            const notification = document.createElement('div');
            notification.className = 'resume-notification';
            notification.innerHTML = `
                <div class="resume-notification-content">
                    <i class="fas fa-file-download"></i>
                    <p>Your resume is being prepared for download...</p>
                </div>
            `;
            
            // Add styles for the notification
            notification.style.position = 'fixed';
            notification.style.top = '2rem';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.background = 'rgba(108, 99, 255, 0.9)';
            notification.style.color = 'white';
            notification.style.padding = '1rem 2rem';
            notification.style.borderRadius = '50px';
            notification.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '9999';
            notification.style.display = 'flex';
            notification.style.alignItems = 'center';
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            
            // Add styles for notification content
            notification.querySelector('.resume-notification-content').style.display = 'flex';
            notification.querySelector('.resume-notification-content').style.alignItems = 'center';
            notification.querySelector('.resume-notification-content').style.gap = '1rem';
            notification.querySelector('.resume-notification-content i').style.fontSize = '1.5rem';
            
            // Add to body
            document.body.appendChild(notification);
            
            // Fade in
            setTimeout(() => {
                notification.style.opacity = '1';
            }, 10);
            
            // Simulate download delay
            setTimeout(() => {
                // Create a dummy PDF download
                const link = document.createElement('a');
                link.href = '/resume.pdf'; // You'll need to add a resume.pdf file to your public folder
                link.download = 'Moeed-ul-Hassan-Resume.pdf';
                link.click();
                
                // Update notification
                notification.querySelector('.resume-notification-content').innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Download complete!</p>
                `;
                notification.style.background = 'rgba(68, 215, 182, 0.9)';
                
                // Remove notification after a delay
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 2000);
            }, 1500);
        });
    }
});