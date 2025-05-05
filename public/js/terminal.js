// Terminal functionality for the portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const terminalContainer = document.getElementById('terminal-container');
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    
    // Command history functionality
    let commandHistory = [];
    let historyIndex = -1;
    
    // Check if elements exist
    if (!terminalContainer || !terminalToggle || !terminalClose || !terminalInput || !terminalOutput) {
        console.error('Terminal elements not found');
        return;
    }
    
    // Toggle terminal visibility
    terminalToggle.addEventListener('click', function() {
        terminalContainer.classList.toggle('hidden');
        terminalContainer.classList.toggle('visible');
        
        if (!terminalContainer.classList.contains('hidden')) {
            terminalInput.focus();
        }
    });
    
    // Close terminal
    terminalClose.addEventListener('click', function() {
        terminalContainer.classList.add('hidden');
        terminalContainer.classList.remove('visible');
    });
    
    // Handle terminal input
    terminalInput.addEventListener('keydown', function(e) {
        // Handle Enter key
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            
            if (command) {
                // Add command to history
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                
                // Display command
                appendToTerminal(`<span class="terminal-prompt">moeed@portfolio:~$</span> <span>${command}</span>`);
                
                // Process command
                processCommand(command);
                
                // Clear input
                terminalInput.value = '';
            }
        }
        
        // Handle Up arrow for command history
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        }
        
        // Handle Down arrow for command history
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });
    
    // Function to append text to terminal
    function appendToTerminal(text) {
        const messageElement = document.createElement('div');
        messageElement.innerHTML = text;
        terminalOutput.appendChild(messageElement);
        
        // Auto scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    // Process terminal commands
    function processCommand(command) {
        const cmdLower = command.toLowerCase();
        
        switch(cmdLower) {
            case 'help':
                showHelp();
                break;
                
            case 'about':
                showAbout();
                break;
                
            case 'skills':
                showSkills();
                break;
                
            case 'projects':
                showProjects();
                break;
                
            case 'contact':
                showContact();
                break;
                
            case 'clear':
                clearTerminal();
                break;
                
            case 'matrix':
                showMatrix();
                break;
                
            case 'exit':
                terminalContainer.classList.add('hidden');
                terminalContainer.classList.remove('visible');
                break;
                
            default:
                appendToTerminal(`<span style="color: #ff6584;">Command not found: ${command}</span>`);
                appendToTerminal(`<span>Type 'help' to see available commands.</span>`);
        }
    }
    
    // Help command
    function showHelp() {
        appendToTerminal(`
            <div class="terminal-help">
                <p><span style="color: #6c63ff;">Available commands:</span></p>
                <p><span style="color: #44d7b6;">help</span> - Show this help message</p>
                <p><span style="color: #44d7b6;">about</span> - Learn about Moeed-ul-Hassan</p>
                <p><span style="color: #44d7b6;">skills</span> - View technical skills</p>
                <p><span style="color: #44d7b6;">projects</span> - List featured projects</p>
                <p><span style="color: #44d7b6;">contact</span> - Get contact information</p>
                <p><span style="color: #44d7b6;">matrix</span> - Show a cool matrix effect</p>
                <p><span style="color: #44d7b6;">clear</span> - Clear the terminal</p>
                <p><span style="color: #44d7b6;">exit</span> - Close the terminal</p>
            </div>
        `);
    }
    
    // About command
    function showAbout() {
        appendToTerminal(`
            <div class="terminal-about">
                <p><span style="color: #6c63ff;">Moeed-ul-Hassan</span></p>
                <p>Web Developer & 3D Designer with 3 years of experience</p>
                <p>Specializing in creating engaging, animated web experiences that combine beautiful design with smooth functionality.</p>
                <p>Based in Pakistan, fluent in English and Urdu.</p>
            </div>
        `);
    }
    
    // Skills command
    function showSkills() {
        appendToTerminal(`
            <div class="terminal-skills">
                <p><span style="color: #6c63ff;">Technical Skills:</span></p>
                <p>HTML & CSS ████████████████████ 95%</p>
                <p>JavaScript ██████████████████ 90%</p>
                <p>Three.js ████████████████ 85%</p>
                <p>GSAP ████████████████ 88%</p>
                <p>React ████████████████ 82%</p>
                <p>UI/UX Design ████████████████ 80%</p>
            </div>
        `);
    }
    
    // Projects command
    function showProjects() {
        appendToTerminal(`
            <div class="terminal-projects">
                <p><span style="color: #6c63ff;">Featured Projects:</span></p>
                <p><span style="color: #44d7b6;">Modern E-commerce Platform</span> - A fully responsive e-commerce website with 3D product previews</p>
                <p><span style="color: #44d7b6;">3D Interactive Portfolio</span> - An immersive 3D portfolio website with interactive elements</p>
                <p><span style="color: #44d7b6;">Travel Destination App</span> - A travel application with dynamic content and interactive maps</p>
                <p><span style="color: #44d7b6;">Admin Dashboard UI</span> - A clean and modern admin dashboard interface with data visualization</p>
                <p>Type 'github' to visit my GitHub repository.</p>
            </div>
        `);
    }
    
    // Contact command
    function showContact() {
        appendToTerminal(`
            <div class="terminal-contact">
                <p><span style="color: #6c63ff;">Contact Information:</span></p>
                <p><span style="color: #44d7b6;">Email:</span> moeed@example.com</p>
                <p><span style="color: #44d7b6;">Location:</span> Islamabad, Pakistan</p>
                <p><span style="color: #44d7b6;">GitHub:</span> github.com/Moeed-ul-Hassan</p>
                <p><span style="color: #44d7b6;">Availability:</span> Open for freelance and full-time opportunities</p>
            </div>
        `);
    }
    
    // Clear terminal
    function clearTerminal() {
        terminalOutput.innerHTML = '';
        appendToTerminal(`<p class="terminal-welcome">Terminal cleared. Type 'help' to see available commands.</p>`);
    }
    
    // Matrix effect
    function showMatrix() {
        // Create canvas for matrix effect
        const matrixElement = document.createElement('div');
        matrixElement.style.width = '100%';
        matrixElement.style.height = '200px';
        matrixElement.style.position = 'relative';
        matrixElement.style.marginBottom = '10px';
        
        const matrixCanvas = document.createElement('canvas');
        matrixCanvas.width = 500;
        matrixCanvas.height = 200;
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        
        matrixElement.appendChild(matrixCanvas);
        terminalOutput.appendChild(matrixElement);
        
        // Auto scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        
        // Matrix animation
        const ctx = matrixCanvas.getContext('2d');
        
        // Characters for the matrix
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        const columns = matrixCanvas.width / 20;
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // Draw the matrix
        function renderMatrix() {
            // Black semi-transparent BG to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            
            ctx.fillStyle = '#0f0'; // Green text
            ctx.font = '15px monospace';
            
            // Loop through drops
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw character
                ctx.fillText(char, i * 20, drops[i] * 20);
                
                // Randomize reset
                if (drops[i] * 20 > matrixCanvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                // Increment y coordinate
                drops[i]++;
            }
        }
        
        // Animation interval
        const matrixInterval = setInterval(renderMatrix, 33);
        
        // Stop animation after 10 seconds to save resources
        setTimeout(() => {
            clearInterval(matrixInterval);
            appendToTerminal(`<span style="color: #44d7b6;">Matrix simulation terminated.</span>`);
        }, 10000);
    }
});