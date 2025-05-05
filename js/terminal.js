// Terminal functionality
document.addEventListener("DOMContentLoaded", () => {
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalContainer = document.getElementById('terminal-container');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    // Terminal commands
    const commands = {
        help: () => {
            return `Available commands:
            <br>- <span style="color: #6c63ff">help</span>: Show this help message
            <br>- <span style="color: #6c63ff">about</span>: Learn about Moeed
            <br>- <span style="color: #6c63ff">skills</span>: List my skills
            <br>- <span style="color: #6c63ff">projects</span>: View my projects
            <br>- <span style="color: #6c63ff">contact</span>: Show contact information
            <br>- <span style="color: #6c63ff">clear</span>: Clear the terminal
            <br>- <span style="color: #6c63ff">social</span>: My social media links
            <br>- <span style="color: #6c63ff">navigate [section]</span>: Go to a section (e.g., navigate about)
            <br>- <span style="color: #6c63ff">theme</span>: Change terminal theme color
            <br>- <span style="color: #6c63ff">matrix</span>: Matrix animation
            <br>- <span style="color: #6c63ff">3d --animate</span>: Animate the 3D model`;
        },
        
        about: () => {
            return `<span style="color: #ff6584">Moeed-ul-Hassan</span>
            <br>----------------
            <br>I'm a web developer with a passion for creating engaging, animated web experiences. 
            <br>With 3 years of experience, I specialize in interactive websites with 3D elements 
            <br>and smooth animations using Three.js and GSAP.
            <br>
            <br>Location: Islamabad, Pakistan
            <br>Experience: 3 years
            <br>Availability: Open to new opportunities`;
        },
        
        skills: () => {
            return `<span style="color: #ff6584">Technical Skills</span>
            <br>----------------
            <br>✓ HTML & CSS: 95%
            <br>✓ JavaScript: 90%
            <br>✓ Three.js: 85%
            <br>✓ GSAP Animations: 88%
            <br>✓ React: 82%
            <br>✓ Responsive Design: 95%
            <br>✓ UI/UX Design: 80%
            <br>
            <br><span style="color: #44d7b6">Tools & Software</span>
            <br>----------------
            <br>✓ VS Code
            <br>✓ Figma
            <br>✓ Git
            <br>✓ Blender`;
        },
        
        projects: () => {
            return `<span style="color: #ff6584">Recent Projects</span>
            <br>----------------
            <br>1. <span style="color: #6c63ff">Modern E-commerce Platform</span>
            <br>   - A fully responsive e-commerce website with 3D product previews
            <br>
            <br>2. <span style="color: #6c63ff">3D Interactive Portfolio</span>
            <br>   - An immersive 3D portfolio website with interactive elements
            <br>
            <br>3. <span style="color: #6c63ff">Travel Destination App</span>
            <br>   - A travel application with dynamic content and interactive maps
            <br>
            <br>4. <span style="color: #6c63ff">Admin Dashboard UI</span>
            <br>   - A clean and modern admin dashboard interface
            <br>
            <br>Type <span style="color: #44d7b6">navigate projects</span> to see all projects.`;
        },
        
        contact: () => {
            return `<span style="color: #ff6584">Contact Information</span>
            <br>----------------
            <br>Email: moeed@example.com
            <br>Location: Islamabad, Pakistan
            <br>Working Hours: Mon - Fri, 9am - 5pm
            <br>
            <br>Feel free to reach out for collaboration or questions.`;
        },
        
        social: () => {
            return `<span style="color: #ff6584">Social Media</span>
            <br>----------------
            <br>GitHub: <a href="https://github.com/Moeed-ul-Hassan" target="_blank" style="color: #6c63ff">github.com/Moeed-ul-Hassan</a>
            <br>LinkedIn: <a href="#" target="_blank" style="color: #6c63ff">linkedin.com/in/moeed-ul-hassan</a>
            <br>Twitter: <a href="#" target="_blank" style="color: #6c63ff">twitter.com/moeed_ul_hassan</a>
            <br>Dribbble: <a href="#" target="_blank" style="color: #6c63ff">dribbble.com/moeed</a>`;
        },
        
        clear: () => {
            terminalOutput.innerHTML = '<p class="terminal-welcome">Terminal cleared. Type \'help\' to see available commands.</p>';
            return '';
        },
        
        theme: () => {
            const colors = ['#6c63ff', '#ff6584', '#44d7b6', '#febc2e', '#ff4757'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            document.documentElement.style.setProperty('--color-primary', randomColor);
            
            return `Terminal theme color changed to <span style="color: ${randomColor}">${randomColor}</span>
            <br><i>Note: This is just a visual effect for the terminal, refresh the page to reset.</i>`;
        },
        
        matrix: () => {
            // Start a mini matrix animation in the terminal
            const matrixContainer = document.createElement('div');
            matrixContainer.style.height = '150px';
            matrixContainer.style.overflow = 'hidden';
            matrixContainer.style.position = 'relative';
            matrixContainer.style.backgroundColor = '#000';
            matrixContainer.style.margin = '10px 0';
            
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&+,:;=?@#';
            const columns = Math.floor(matrixContainer.offsetWidth / 20);
            
            for (let i = 0; i < columns; i++) {
                const column = document.createElement('div');
                column.style.position = 'absolute';
                column.style.left = `${i * 20}px`;
                column.style.top = '0';
                column.style.color = '#0f0';
                column.style.fontFamily = 'monospace';
                column.style.fontSize = '14px';
                matrixContainer.appendChild(column);
                
                let y = 0;
                
                function renderMatrix() {
                    const char = characters.charAt(Math.floor(Math.random() * characters.length));
                    column.innerHTML += char + '<br>';
                    y++;
                    
                    if (y > 20) {
                        column.innerHTML = column.innerHTML.slice(Math.max(column.innerHTML.length - 400, 0));
                    }
                    
                    // Fade out effect
                    const children = column.children;
                    for (let j = 0; j < children.length; j++) {
                        children[j].style.opacity = 1 - (j / children.length);
                    }
                }
                
                // Start animation with random delay
                const interval = setInterval(renderMatrix, 100 + Math.random() * 100);
                
                // Stop after 10 seconds to avoid performance issues
                setTimeout(() => {
                    clearInterval(interval);
                }, 10000);
            }
            
            terminalOutput.appendChild(matrixContainer);
            
            return 'Matrix animation started... (will run for 10 seconds)';
        },
        
        navigate: (section) => {
            if (!section) {
                return 'Please specify a section (e.g., navigate about)';
            }
            
            const validSections = ['home', 'about', 'skills', 'services', 'projects', 'testimonials', 'contact'];
            
            if (validSections.includes(section.toLowerCase())) {
                const targetElement = document.getElementById(section.toLowerCase());
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    return `Navigating to ${section} section...`;
                }
            }
            
            return `Section "${section}" not found. Valid sections are: ${validSections.join(', ')}`;
        }
    };
    
    // 3D model animation command handler
    commands['3d'] = (arg) => {
        if (arg === '--animate') {
            // Find the three.js canvas container
            const threeCanvas = document.getElementById('three-canvas');
            
            if (threeCanvas && window.animateThreeModel) {
                window.animateThreeModel();
                return 'Animating 3D model...';
            }
            
            return 'Could not find 3D model to animate.';
        }
        
        return 'Invalid argument. Try "3d --animate"';
    };
    
    // Toggle terminal visibility
    terminalToggle.addEventListener('click', () => {
        terminalContainer.classList.toggle('hidden');
        terminalContainer.classList.toggle('visible');
        
        if (!terminalContainer.classList.contains('hidden')) {
            setTimeout(() => {
                terminalInput.focus();
            }, 100);
        }
    });
    
    // Close terminal
    terminalClose.addEventListener('click', () => {
        terminalContainer.classList.add('hidden');
        terminalContainer.classList.remove('visible');
    });
    
    // Process terminal input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (input) {
                // Add input to output
                terminalOutput.innerHTML += `<p><span style="color: var(--color-primary)">moeed@portfolio:~$</span> ${input}</p>`;
                
                // Process command
                const [command, ...args] = input.split(' ');
                
                if (commands[command]) {
                    const output = commands[command](...args);
                    if (output) {
                        terminalOutput.innerHTML += `<p>${output}</p>`;
                    }
                } else {
                    terminalOutput.innerHTML += `<p>Command not found: ${command}. Type 'help' to see available commands.</p>`;
                }
                
                // Clear input
                terminalInput.value = '';
                
                // Scroll to bottom
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }
    });
});