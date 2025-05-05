// Lead Generation System for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // Create elements
    setupLeadGenerationElements();
    
    // Initialize event listeners
    initLeadGenerationEvents();
    
    // Function to set up lead generation elements
    function setupLeadGenerationElements() {
        // 1. Add floating action button for lead generation
        createFloatingActionButton();
        
        // 2. Create lead modal
        createLeadCaptureModal();
        
        // 3. Create success modal
        createSuccessModal();
        
        // 4. Add styles
        addLeadGenerationStyles();
        
        // 5. Add lead trigger points throughout the site
        addLeadTriggerPoints();
    }
    
    // Function to create floating action button
    function createFloatingActionButton() {
        const fab = document.createElement('button');
        fab.id = 'lead-fab';
        fab.classList.add('lead-fab');
        fab.setAttribute('aria-label', 'Contact me now');
        fab.innerHTML = `
            <span class="lead-fab-icon">
                <i class="fas fa-handshake"></i>
            </span>
            <span class="lead-fab-text">Work with me</span>
        `;
        
        document.body.appendChild(fab);
    }
    
    // Function to create lead capture modal
    function createLeadCaptureModal() {
        const modal = document.createElement('div');
        modal.id = 'lead-modal';
        modal.classList.add('lead-modal');
        
        modal.innerHTML = `
            <div class="lead-modal-content">
                <div class="lead-modal-header">
                    <h3>Let's Work Together!</h3>
                    <button class="lead-modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="lead-modal-body">
                    <div class="lead-intro">
                        <p>I'm currently available for freelance projects. Fill out the form below to discuss your project needs.</p>
                    </div>
                    
                    <form id="lead-form" class="lead-form">
                        <div class="lead-form-group">
                            <label for="lead-name">Your Name</label>
                            <div class="lead-input-wrapper">
                                <i class="fas fa-user"></i>
                                <input type="text" id="lead-name" name="name" placeholder="Enter your name" required>
                            </div>
                        </div>
                        
                        <div class="lead-form-group">
                            <label for="lead-email">Email Address</label>
                            <div class="lead-input-wrapper">
                                <i class="fas fa-envelope"></i>
                                <input type="email" id="lead-email" name="email" placeholder="Enter your email address" required>
                            </div>
                        </div>
                        
                        <div class="lead-form-group">
                            <label for="lead-phone">Phone Number (Optional)</label>
                            <div class="lead-input-wrapper">
                                <i class="fas fa-phone"></i>
                                <input type="tel" id="lead-phone" name="phone" placeholder="Enter your phone number">
                            </div>
                        </div>
                        
                        <div class="lead-form-group">
                            <label for="lead-project-type">Project Type</label>
                            <div class="lead-input-wrapper">
                                <i class="fas fa-laptop-code"></i>
                                <select id="lead-project-type" name="projectType" required>
                                    <option value="" disabled selected>Select project type</option>
                                    <option value="website">Website Development</option>
                                    <option value="3d-experience">3D Web Experience</option>
                                    <option value="ui-design">UI/UX Design</option>
                                    <option value="animation">Animation & Effects</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="lead-form-group">
                            <label for="lead-budget">Budget Range</label>
                            <div class="lead-input-wrapper">
                                <i class="fas fa-dollar-sign"></i>
                                <select id="lead-budget" name="budget" required>
                                    <option value="" disabled selected>Select budget range</option>
                                    <option value="small">$500 - $1,000</option>
                                    <option value="medium">$1,000 - $3,000</option>
                                    <option value="large">$3,000 - $5,000</option>
                                    <option value="enterprise">$5,000+</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="lead-form-group">
                            <label for="lead-timeline">Project Timeline</label>
                            <div class="lead-input-wrapper">
                                <i class="fas fa-calendar"></i>
                                <select id="lead-timeline" name="timeline" required>
                                    <option value="" disabled selected>Select timeline</option>
                                    <option value="urgent">Urgent (< 2 weeks)</option>
                                    <option value="standard">Standard (2-4 weeks)</option>
                                    <option value="flexible">Flexible (1-2 months)</option>
                                    <option value="longterm">Long-term (3+ months)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="lead-form-group">
                            <label for="lead-message">Project Details</label>
                            <div class="lead-input-wrapper textarea">
                                <i class="fas fa-comment-alt"></i>
                                <textarea id="lead-message" name="message" rows="4" placeholder="Describe your project requirements" required></textarea>
                            </div>
                        </div>
                        
                        <div class="lead-form-group checkbox">
                            <div class="lead-checkbox-wrapper">
                                <input type="checkbox" id="lead-newsletter" name="newsletter" checked>
                                <label for="lead-newsletter">Subscribe to my newsletter for web development tips and updates</label>
                            </div>
                        </div>
                        
                        <div class="lead-form-actions">
                            <button type="submit" class="btn btn-primary lead-submit-btn">
                                <span>Send Message</span>
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
                <div class="lead-modal-footer">
                    <p>Your information is secure and will never be shared with third parties.</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Function to create success modal
    function createSuccessModal() {
        const modal = document.createElement('div');
        modal.id = 'lead-success-modal';
        modal.classList.add('lead-modal', 'lead-success-modal');
        
        modal.innerHTML = `
            <div class="lead-modal-content">
                <div class="lead-success-header">
                    <div class="lead-success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Message Sent Successfully!</h3>
                </div>
                
                <div class="lead-modal-body">
                    <p>Thank you for reaching out! I've received your project details and will get back to you within 24-48 hours.</p>
                    
                    <div class="lead-next-steps">
                        <h4>What happens next?</h4>
                        <ol>
                            <li>I'll review your project requirements</li>
                            <li>Schedule a consultation call to discuss details</li>
                            <li>Provide a proposal with timeline and pricing</li>
                            <li>Begin working on your amazing project!</li>
                        </ol>
                    </div>
                    
                    <div class="lead-calendar-invite">
                        <h4>Want to schedule a call right away?</h4>
                        <a href="#" class="btn btn-accent lead-calendar-btn">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Schedule a Call</span>
                        </a>
                    </div>
                </div>
                
                <div class="lead-modal-footer">
                    <button class="btn btn-outline lead-close-success-btn">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    // Function to add lead trigger points
    function addLeadTriggerPoints() {
        // 1. Add CTA button to services section
        const servicesSection = document.getElementById('services');
        
        if (servicesSection) {
            const servicesContainer = servicesSection.querySelector('.container');
            
            if (servicesContainer) {
                const servicesCTA = document.createElement('div');
                servicesCTA.classList.add('services-cta');
                servicesCTA.innerHTML = `
                    <h3>Ready to bring your ideas to life?</h3>
                    <p>Let's discuss your project requirements and create something amazing together!</p>
                    <button class="btn btn-primary lead-trigger">
                        <i class="fas fa-rocket"></i>
                        <span>Start a Project</span>
                    </button>
                `;
                
                // Add after the services grid
                const servicesGrid = servicesContainer.querySelector('.services-grid');
                if (servicesGrid) {
                    servicesGrid.parentNode.insertBefore(servicesCTA, servicesGrid.nextSibling);
                } else {
                    servicesContainer.appendChild(servicesCTA);
                }
            }
        }
        
        // 2. Add CTA button to projects section
        const projectsSection = document.getElementById('projects');
        
        if (projectsSection) {
            const projectsContainer = projectsSection.querySelector('.container');
            
            if (projectsContainer) {
                const projectsCTA = document.createElement('div');
                projectsCTA.classList.add('projects-cta');
                projectsCTA.innerHTML = `
                    <h3>Need a similar project?</h3>
                    <p>I can help you build a custom solution tailored to your specific needs.</p>
                    <button class="btn btn-accent lead-trigger">
                        <i class="fas fa-lightbulb"></i>
                        <span>Discuss Your Project</span>
                    </button>
                `;
                
                // Add after the projects grid
                const projectsGrid = projectsContainer.querySelector('.projects-grid');
                if (projectsGrid) {
                    projectsGrid.parentNode.insertBefore(projectsCTA, projectsGrid.nextSibling);
                } else {
                    projectsContainer.appendChild(projectsCTA);
                }
            }
        }
        
        // 3. Add CTA to the resume section
        setTimeout(() => {
            const resumeSection = document.getElementById('resume-section');
            
            if (resumeSection) {
                const resumeActions = resumeSection.querySelector('.resume-actions');
                
                if (resumeActions) {
                    const resumeCTA = document.createElement('a');
                    resumeCTA.href = '#';
                    resumeCTA.classList.add('btn', 'btn-accent', 'lead-trigger');
                    resumeCTA.innerHTML = `
                        <i class="fas fa-briefcase"></i>
                        <span>Hire Me</span>
                    `;
                    
                    resumeActions.appendChild(resumeCTA);
                }
            }
        }, 1000); // Delay to ensure the resume section is created
    }
    
    // Function to add styles
    function addLeadGenerationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Floating Action Button */
            .lead-fab {
                position: fixed;
                bottom: 30px;
                right: 30px;
                min-width: 60px;
                height: 60px;
                border-radius: 30px;
                background: linear-gradient(135deg, #ff6584, #ff8c94);
                color: white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(255, 101, 132, 0.4);
                z-index: 990;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                overflow: hidden;
                padding: 0 25px 0 20px;
            }
            
            .lead-fab-icon {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                transition: all 0.3s ease;
            }
            
            .lead-fab-text {
                margin-left: 10px;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.9rem;
                letter-spacing: 0.5px;
                white-space: nowrap;
                opacity: 0;
                max-width: 0;
                transition: all 0.3s ease;
            }
            
            .lead-fab:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(255, 101, 132, 0.6);
                padding-right: 25px;
            }
            
            .lead-fab:hover .lead-fab-text {
                opacity: 1;
                max-width: 150px;
                margin-left: 10px;
            }
            
            /* Modal Styles */
            .lead-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(19, 23, 34, 0.85);
                backdrop-filter: blur(5px);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .lead-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .lead-modal-content {
                background-color: var(--color-dark-light);
                border-radius: 15px;
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(108, 99, 255, 0.2);
                position: relative;
                transform: translateY(30px) scale(0.95);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            
            .lead-modal.active .lead-modal-content {
                transform: translateY(0) scale(1);
            }
            
            .lead-modal-header {
                padding: 20px 25px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                position: relative;
            }
            
            .lead-modal-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
                border-radius: 15px 15px 0 0;
            }
            
            .lead-modal-header h3 {
                margin: 0;
                color: var(--color-primary);
                font-size: 1.5rem;
            }
            
            .lead-modal-close {
                background: none;
                border: none;
                color: var(--color-text-secondary);
                font-size: 1.2rem;
                cursor: pointer;
                transition: all 0.2s ease;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .lead-modal-close:hover {
                color: var(--color-white);
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .lead-modal-body {
                padding: 25px;
            }
            
            .lead-intro {
                margin-bottom: 20px;
            }
            
            .lead-form-group {
                margin-bottom: 20px;
            }
            
            .lead-form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: var(--color-text);
            }
            
            .lead-input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                background-color: var(--color-dark);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                overflow: hidden;
                transition: all 0.3s ease;
            }
            
            .lead-input-wrapper i {
                font-size: 1rem;
                color: var(--color-text-secondary);
                min-width: 40px;
                text-align: center;
                transition: all 0.3s ease;
            }
            
            .lead-input-wrapper input,
            .lead-input-wrapper select,
            .lead-input-wrapper textarea {
                flex: 1;
                background: none;
                border: none;
                padding: 12px 15px;
                color: var(--color-white);
                font-size: 1rem;
                outline: none;
                width: 100%;
            }
            
            .lead-input-wrapper:focus-within {
                border-color: var(--color-primary);
                box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.1);
            }
            
            .lead-input-wrapper:focus-within i {
                color: var(--color-primary);
            }
            
            .lead-input-wrapper select {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236c63ff' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: calc(100% - 15px) center;
                padding-right: 40px;
            }
            
            .lead-input-wrapper.textarea {
                align-items: flex-start;
            }
            
            .lead-input-wrapper.textarea i {
                padding-top: 12px;
            }
            
            .lead-checkbox-wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .lead-checkbox-wrapper input[type="checkbox"] {
                position: relative;
                width: 20px;
                height: 20px;
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background-color: var(--color-dark);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                outline: none;
                transition: all 0.3s ease;
            }
            
            .lead-checkbox-wrapper input[type="checkbox"]:checked {
                background-color: var(--color-primary);
                border-color: var(--color-primary);
            }
            
            .lead-checkbox-wrapper input[type="checkbox"]::before {
                content: '\\f00c';
                font-family: 'Font Awesome 5 Free';
                font-weight: 900;
                font-size: 12px;
                color: white;
                display: none;
            }
            
            .lead-checkbox-wrapper input[type="checkbox"]:checked::before {
                display: block;
            }
            
            .lead-checkbox-wrapper label {
                font-size: 0.9rem;
                margin-bottom: 0;
                cursor: pointer;
                color: var(--color-text-secondary);
            }
            
            .lead-form-actions {
                display: flex;
                justify-content: flex-end;
                margin-top: 30px;
            }
            
            .lead-submit-btn {
                padding-right: 50px;
            }
            
            .lead-submit-btn i {
                position: absolute;
                right: 20px;
                transition: all 0.3s ease;
            }
            
            .lead-submit-btn:hover i {
                transform: translateX(5px);
            }
            
            .lead-modal-footer {
                padding: 15px 25px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                text-align: center;
            }
            
            .lead-modal-footer p {
                margin: 0;
                font-size: 0.85rem;
                color: var(--color-text-secondary);
            }
            
            /* Success Modal */
            .lead-success-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 30px 25px;
                text-align: center;
            }
            
            .lead-success-icon {
                font-size: 4rem;
                color: #44d7b6;
                margin-bottom: 15px;
                animation: success-pulse 2s infinite;
            }
            
            @keyframes success-pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            .lead-next-steps {
                background-color: rgba(108, 99, 255, 0.1);
                border-radius: 10px;
                padding: 20px;
                margin-top: 20px;
            }
            
            .lead-next-steps h4 {
                color: var(--color-primary);
                margin-top: 0;
                margin-bottom: 15px;
            }
            
            .lead-next-steps ol {
                margin: 0;
                padding-left: 20px;
            }
            
            .lead-next-steps li {
                margin-bottom: 8px;
                color: var(--color-text);
            }
            
            .lead-calendar-invite {
                text-align: center;
                margin-top: 30px;
            }
            
            .lead-calendar-invite h4 {
                margin-bottom: 15px;
            }
            
            .lead-close-success-btn {
                margin-top: 10px;
            }
            
            /* Services CTA Styles */
            .services-cta {
                margin-top: 3rem;
                text-align: center;
                background-color: rgba(108, 99, 255, 0.05);
                border-radius: 15px;
                padding: 40px;
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(108, 99, 255, 0.1);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            .services-cta::before {
                content: '';
                position: absolute;
                top: -100px;
                right: -100px;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%);
                border-radius: 50%;
            }
            
            .services-cta::after {
                content: '';
                position: absolute;
                bottom: -100px;
                left: -100px;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(68, 215, 182, 0.1) 0%, transparent 70%);
                border-radius: 50%;
            }
            
            .services-cta h3 {
                color: var(--color-primary);
                margin-bottom: 15px;
                font-size: 1.8rem;
            }
            
            .services-cta p {
                color: var(--color-text-secondary);
                max-width: 600px;
                margin: 0 auto 25px;
            }
            
            /* Projects CTA Styles */
            .projects-cta {
                margin-top: 3rem;
                text-align: center;
                background-color: rgba(68, 215, 182, 0.05);
                border-radius: 15px;
                padding: 40px;
                position: relative;
                overflow: hidden;
                border: 1px solid rgba(68, 215, 182, 0.1);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            .projects-cta::before {
                content: '';
                position: absolute;
                top: -100px;
                left: -100px;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(68, 215, 182, 0.1) 0%, transparent 70%);
                border-radius: 50%;
            }
            
            .projects-cta::after {
                content: '';
                position: absolute;
                bottom: -100px;
                right: -100px;
                width: 200px;
                height: 200px;
                background: radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%);
                border-radius: 50%;
            }
            
            .projects-cta h3 {
                color: var(--color-accent);
                margin-bottom: 15px;
                font-size: 1.8rem;
            }
            
            .projects-cta p {
                color: var(--color-text-secondary);
                max-width: 600px;
                margin: 0 auto 25px;
            }
            
            /* Responsive styles */
            @media (max-width: 768px) {
                .lead-modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .lead-fab {
                    bottom: 20px;
                    right: 20px;
                }
                
                .services-cta,
                .projects-cta {
                    padding: 30px 20px;
                }
                
                .lead-modal-header h3 {
                    font-size: 1.3rem;
                }
                
                .lead-success-icon {
                    font-size: 3rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Function to initialize event listeners
    function initLeadGenerationEvents() {
        // Open modal triggers
        const fabButton = document.getElementById('lead-fab');
        const leadTriggers = document.querySelectorAll('.lead-trigger');
        const leadModal = document.getElementById('lead-modal');
        const leadSuccessModal = document.getElementById('lead-success-modal');
        
        if (fabButton && leadModal) {
            fabButton.addEventListener('click', function() {
                openLeadModal();
            });
        }
        
        if (leadTriggers.length > 0 && leadModal) {
            leadTriggers.forEach(trigger => {
                trigger.addEventListener('click', function() {
                    openLeadModal();
                });
            });
        }
        
        // Close modal triggers
        const closeButton = document.querySelector('.lead-modal-close');
        
        if (closeButton && leadModal) {
            closeButton.addEventListener('click', function() {
                closeLeadModal();
            });
        }
        
        // Close on outside click
        if (leadModal) {
            leadModal.addEventListener('click', function(e) {
                if (e.target === leadModal) {
                    closeLeadModal();
                }
            });
        }
        
        // Close success modal
        const closeSuccessButton = document.querySelector('.lead-close-success-btn');
        
        if (closeSuccessButton && leadSuccessModal) {
            closeSuccessButton.addEventListener('click', function() {
                closeSuccessModal();
            });
        }
        
        // Form submission
        const leadForm = document.getElementById('lead-form');
        
        if (leadForm) {
            leadForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmission(this);
            });
        }
        
        // Escape key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (leadModal && leadModal.classList.contains('active')) {
                    closeLeadModal();
                }
                
                if (leadSuccessModal && leadSuccessModal.classList.contains('active')) {
                    closeSuccessModal();
                }
            }
        });
        
        // Delayed appearance of FAB button
        setTimeout(() => {
            if (fabButton) {
                fabButton.style.transform = 'translateY(0) scale(1)';
                fabButton.style.opacity = '1';
            }
        }, 3000);
        
        // Calendar button in success modal
        const calendarButton = document.querySelector('.lead-calendar-btn');
        
        if (calendarButton) {
            calendarButton.addEventListener('click', function(e) {
                e.preventDefault();
                // Here you would typically redirect to your calendar scheduling service
                alert('This would redirect to a calendar scheduling service like Calendly, Acuity, or similar.');
            });
        }
        
        // Add pulse animation to trigger buttons after delay
        setTimeout(() => {
            if (leadTriggers.length > 0) {
                leadTriggers.forEach(trigger => {
                    trigger.classList.add('pulse-attention');
                    
                    setTimeout(() => {
                        trigger.classList.remove('pulse-attention');
                    }, 2000);
                });
            }
        }, 5000);
    }
    
    // Function to open lead modal
    function openLeadModal() {
        const leadModal = document.getElementById('lead-modal');
        
        if (leadModal) {
            leadModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus on first form field after animation
            setTimeout(() => {
                const firstInput = document.getElementById('lead-name');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 400);
        }
    }
    
    // Function to close lead modal
    function closeLeadModal() {
        const leadModal = document.getElementById('lead-modal');
        
        if (leadModal) {
            leadModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Function to open success modal
    function openSuccessModal() {
        const leadSuccessModal = document.getElementById('lead-success-modal');
        
        if (leadSuccessModal) {
            leadSuccessModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close success modal
    function closeSuccessModal() {
        const leadSuccessModal = document.getElementById('lead-success-modal');
        
        if (leadSuccessModal) {
            leadSuccessModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Function to handle form submission
    function handleFormSubmission(form) {
        const formData = new FormData(form);
        const leadData = {};
        
        // Convert FormData to object
        for (const [key, value] of formData.entries()) {
            leadData[key] = value;
        }
        
        // Log the data for now (in a real app, you'd send this to your server or an API)
        console.log('Lead captured:', leadData);
        
        // Store leads in localStorage for demo purposes
        saveLeadToLocalStorage(leadData);
        
        // Show the success modal and close the lead modal
        closeLeadModal();
        
        // Simulate a delay as if sending data to server
        showFormSubmissionState('sending');
        
        setTimeout(() => {
            showFormSubmissionState('success');
            openSuccessModal();
            
            // Reset form
            form.reset();
        }, 1500);
    }
    
    // Function to show form submission state
    function showFormSubmissionState(state) {
        const submitBtn = document.querySelector('.lead-submit-btn');
        
        if (!submitBtn) return;
        
        if (state === 'sending') {
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
        } else if (state === 'success') {
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    }
    
    // Function to save lead to localStorage
    function saveLeadToLocalStorage(leadData) {
        // Get existing leads or initialize empty array
        const existingLeads = JSON.parse(localStorage.getItem('portfolioLeads') || '[]');
        
        // Add timestamp
        leadData.timestamp = new Date().toISOString();
        
        // Add new lead
        existingLeads.push(leadData);
        
        // Save back to localStorage
        localStorage.setItem('portfolioLeads', JSON.stringify(existingLeads));
    }
});