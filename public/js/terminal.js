// Terminal functionality for the portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const terminalContainer = document.getElementById('terminal-container');
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    
    // Add the cursor element
    const terminalCursor = document.createElement('div');
    terminalCursor.className = 'terminal-cursor';
    document.querySelector('.terminal-input-line').appendChild(terminalCursor);
    
    // Command history functionality
    let commandHistory = [];
    let historyIndex = -1;
    
    // Special effects state
    let isMatrixRunning = false;
    let currentTypingInterval = null;
    
    // Easter eggs and special commands
    const easterEggs = {
        konami: {
            sequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
            current: 0,
            reward: function() {
                showEasterEgg('konami');
            }
        }
    };
    
    // Check if elements exist
    if (!terminalContainer || !terminalToggle || !terminalClose || !terminalInput || !terminalOutput) {
        console.error('Terminal elements not found');
        return;
    }
    
    // Initialize with welcome message
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const timeString = today.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    appendToTerminal(`
        <div class="terminal-banner">
            <pre style="color: #6c63ff; line-height: 1.2;">
  __  __                     _   _       _   _                             
 |  \\/  | ___   ___  ___  __| | | |_   _| | | | __ _ ___ ___  __ _ _ __   
 | |\\/| |/ _ \\ / _ \\/ _ \\/ _\` | | | | | | |_| |/ _\` / __/ __|/ _\` | '_ \\  
 | |  | | (_) |  __/  __/ (_| | | | |_| |  _  | (_| \\__ \\__ \\ (_| | | | | 
 |_|  |_|\\___/ \\___|\\___|\__,_| |_|\\__,_|_| |_|\\__,_|___/___/\\__,_|_| |_| 
            </pre>
            <p>Welcome to Moeed's Interactive Terminal v2.0.1</p>
            <p style="color: #44d7b6;">System: ${navigator.platform} | Browser: ${navigator.userAgent.match(/chrome|firefox|safari|edge|opera/i)[0]} | Date: ${dateString} | Time: ${timeString}</p>
            <p>Type <span style="color: #ff6584;">help</span> to see available commands or try <span style="color: #ff6584;">explore</span> for an interactive experience.</p>
        </div>
    `, 'banner');
    
    // Add special pulse effect to the toggle button on page load
    setTimeout(() => {
        terminalToggle.classList.add('pulse-attention');
        setTimeout(() => {
            terminalToggle.classList.remove('pulse-attention');
        }, 3000);
    }, 5000);
    
    // Toggle terminal visibility with animation
    terminalToggle.addEventListener('click', function() {
        if (terminalContainer.classList.contains('hidden')) {
            terminalContainer.classList.remove('hidden');
            setTimeout(() => {
                terminalContainer.classList.add('visible');
                terminalInput.focus();
                
                // Show typing effect for first-time users
                if (commandHistory.length === 0) {
                    setTimeout(() => {
                        typeWriter("Try typing 'help' or 'explore' to get started!", 50, () => {
                            setTimeout(() => {
                                eraseText(() => {
                                    terminalInput.focus();
                                });
                            }, 1000);
                        });
                    }, 800);
                }
            }, 50);
        } else {
            terminalContainer.classList.remove('visible');
            setTimeout(() => {
                terminalContainer.classList.add('hidden');
            }, 400);
        }
    });
    
    // Close terminal with animation
    terminalClose.addEventListener('click', function() {
        terminalContainer.classList.remove('visible');
        setTimeout(() => {
            terminalContainer.classList.add('hidden');
        }, 400);
    });
    
    // Global keydown handler for easter eggs
    document.addEventListener('keydown', function(e) {
        // Check for konami code
        const konamiEgg = easterEggs.konami;
        if (e.key === konamiEgg.sequence[konamiEgg.current]) {
            konamiEgg.current++;
            if (konamiEgg.current === konamiEgg.sequence.length) {
                konamiEgg.reward();
                konamiEgg.current = 0;
            }
        } else {
            konamiEgg.current = 0;
        }
        
        // Alt+T to toggle terminal
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            terminalToggle.click();
        }
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
                
                // Display command with typing effect
                const promptSpan = `<span class="terminal-prompt">moeed@portfolio:~$</span>`;
                const commandSpan = `<span>${command}</span>`;
                appendToTerminal(`${promptSpan} ${commandSpan}`);
                
                // Process command with slight delay for visual effect
                setTimeout(() => {
                    processCommand(command);
                }, 50);
                
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
                // Move cursor to end of input
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                }, 0);
            }
        }
        
        // Handle Down arrow for command history
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
                // Move cursor to end of input
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                }, 0);
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
        
        // Handle Tab for command completion
        if (e.key === 'Tab') {
            e.preventDefault();
            const input = terminalInput.value.toLowerCase();
            const commands = ['help', 'about', 'skills', 'projects', 'contact', 'clear', 'matrix', 'exit', 
                             'explore', 'github', 'weather', 'theme', 'game', 'ascii', 'date', 'time'];
            
            // Find commands that start with the current input
            const matches = commands.filter(cmd => cmd.startsWith(input));
            
            if (matches.length === 1) {
                // Only one match, complete the command
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                // Multiple matches, show options
                appendToTerminal(`<div class="terminal-completion"><span>Available commands:</span> ${matches.join(', ')}</div>`);
            }
        }
        
        // Handle Ctrl+L for clear
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            clearTerminal();
        }
    });
    
    // Add focus to input when clicking anywhere in the terminal body
    terminalBody.addEventListener('click', function() {
        terminalInput.focus();
    });
    
    // Function for typewriter effect
    function typeWriter(text, speed, callback) {
        let i = 0;
        if (currentTypingInterval) clearInterval(currentTypingInterval);
        
        terminalInput.value = '';
        
        currentTypingInterval = setInterval(function() {
            if (i < text.length) {
                terminalInput.value += text.charAt(i);
                i++;
            } else {
                clearInterval(currentTypingInterval);
                currentTypingInterval = null;
                if (callback) callback();
            }
        }, speed);
    }
    
    // Function to erase text with typewriter effect
    function eraseText(callback) {
        let text = terminalInput.value;
        let i = text.length;
        
        if (currentTypingInterval) clearInterval(currentTypingInterval);
        
        currentTypingInterval = setInterval(function() {
            if (i > 0) {
                terminalInput.value = text.substring(0, i - 1);
                i--;
            } else {
                clearInterval(currentTypingInterval);
                currentTypingInterval = null;
                if (callback) callback();
            }
        }, 30);
    }
    
    // Function to append text to terminal with optional class
    function appendToTerminal(text, className = '') {
        const messageElement = document.createElement('div');
        if (className) messageElement.className = className;
        messageElement.innerHTML = text;
        terminalOutput.appendChild(messageElement);
        
        // Add fade-in effect
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        
        // Trigger animation
        setTimeout(() => {
            messageElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 10);
        
        // Auto scroll to bottom with smooth animation
        terminalBody.scrollTo({
            top: terminalOutput.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    // Process terminal commands
    function processCommand(command) {
        const cmdLower = command.toLowerCase().trim();
        const cmdParts = cmdLower.split(' ');
        const mainCmd = cmdParts[0];
        const args = cmdParts.slice(1);
        
        // Check if command exists and call the appropriate function
        const commands = {
            'help': showHelp,
            'about': showAbout,
            'skills': showSkills,
            'projects': showProjects,
            'contact': showContact,
            'clear': clearTerminal,
            'cls': clearTerminal,
            'matrix': showMatrix,
            'exit': exitTerminal,
            'explore': showExplore,
            'github': openGitHub,
            'weather': showWeather,
            'theme': changeTheme,
            'game': startGame,
            'ascii': showAsciiArt,
            'date': showDate,
            'time': showTime,
            'whoami': showWhoAmI,
            'ls': listDirectory,
            'cd': changeDirectory,
            'echo': echo,
            'hello': sayHello,
            'hi': sayHello,
            'hey': sayHello,
            'guess': function(args) {
                if (typeof window.processGameCommand === 'function') {
                    window.processGameCommand(args);
                } else {
                    appendToTerminal(`<span style="color: #ff6584;">No active game. Type <span style="color: #44d7b6;">game</span> to start a new game.</span>`);
                }
            }
        };
        
        if (commands[mainCmd]) {
            commands[mainCmd](args);
        } else if (cmdLower === '') {
            // Empty command, just show a new line
            appendToTerminal('');
        } else {
            // Command not found
            appendToTerminal(`<div class="terminal-error">
                <p><span style="color: #ff6584;">Command not found: ${command}</span></p>
                <p>Type <span style="color: #44d7b6;">help</span> to see available commands.</p>
            </div>`);
        }
    }
    
    // Exit terminal
    function exitTerminal() {
        appendToTerminal(`<span style="color: #44d7b6;">Closing terminal session...</span>`);
        setTimeout(() => {
            terminalContainer.classList.remove('visible');
            setTimeout(() => {
                terminalContainer.classList.add('hidden');
            }, 400);
        }, 500);
    }
    
    // Help command with categories
    function showHelp() {
        appendToTerminal(`
            <div class="terminal-help">
                <p><span style="color: #6c63ff; font-weight: bold;">Available Commands:</span></p>
                
                <div style="margin-top: 10px;">
                    <p><span style="color: #ff6584; font-weight: bold;">Core Commands:</span></p>
                    <p><span style="color: #44d7b6;">help</span> - Show this help message</p>
                    <p><span style="color: #44d7b6;">about</span> - Learn about Moeed-ul-Hassan</p>
                    <p><span style="color: #44d7b6;">skills</span> - View technical skills</p>
                    <p><span style="color: #44d7b6;">projects</span> - List featured projects</p>
                    <p><span style="color: #44d7b6;">contact</span> - Get contact information</p>
                    <p><span style="color: #44d7b6;">clear</span> or <span style="color: #44d7b6;">cls</span> - Clear the terminal</p>
                    <p><span style="color: #44d7b6;">exit</span> - Close the terminal</p>
                </div>
                
                <div style="margin-top: 10px;">
                    <p><span style="color: #ff6584; font-weight: bold;">Special Features:</span></p>
                    <p><span style="color: #44d7b6;">explore</span> - Start an interactive tour</p>
                    <p><span style="color: #44d7b6;">github</span> - Open GitHub profile</p>
                    <p><span style="color: #44d7b6;">weather</span> - Check current weather</p>
                    <p><span style="color: #44d7b6;">theme</span> - Change terminal theme (light/dark/matrix)</p>
                    <p><span style="color: #44d7b6;">matrix</span> - Show the Matrix animation</p>
                    <p><span style="color: #44d7b6;">game</span> - Play a mini-game</p>
                </div>
                
                <div style="margin-top: 10px;">
                    <p><span style="color: #ff6584; font-weight: bold;">Utility Commands:</span></p>
                    <p><span style="color: #44d7b6;">date</span> - Show current date</p>
                    <p><span style="color: #44d7b6;">time</span> - Show current time</p>
                    <p><span style="color: #44d7b6;">ascii</span> - Show ASCII art</p>
                    <p><span style="color: #44d7b6;">whoami</span> - Show user information</p>
                </div>
                
                <div style="margin-top: 10px; font-style: italic; color: #8b8b8b;">
                    <p>Tip: Use <span style="color: #44d7b6;">Tab</span> for command completion and <span style="color: #44d7b6;">↑/↓</span> arrows for command history.</p>
                    <p>Tip: Try to find hidden easter eggs and shortcuts!</p>
                </div>
            </div>
        `);
    }
    
    // About command with styled output
    function showAbout() {
        appendToTerminal(`
            <div class="terminal-about">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div style="background-color: rgba(108, 99, 255, 0.1); border-radius: 50%; padding: 5px; margin-right: 15px;">
                        <div style="width: 50px; height: 50px; border-radius: 50%; overflow: hidden; border: 2px solid #6c63ff;">
                            <img src="/assets/profile.jpg" alt="Moeed" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                    </div>
                    <div>
                        <p style="font-size: 18px; color: #6c63ff; font-weight: bold; margin-bottom: 5px;">Moeed-ul-Hassan</p>
                        <p style="color: #44d7b6; margin: 0;">Web Developer & 3D Designer</p>
                    </div>
                </div>
                
                <div style="background-color: rgba(108, 99, 255, 0.05); border-left: 3px solid #6c63ff; padding: 10px; margin: 10px 0;">
                    <p>Based in Pakistan, I specialize in creating engaging, animated web experiences that combine beautiful design with smooth functionality.</p>
                </div>
                
                <div style="margin-top: 15px;">
                    <p><span style="color: #ff6584; font-weight: bold;">Education:</span></p>
                    <p>→ BSc (2026-2030) - To be completed</p>
                    <p>→ Intermediate (2024-2025) - Completed</p>
                    <p>→ Matriculation (2022-2024) - Completed</p>
                </div>
                
                <div style="margin-top: 15px;">
                    <p><span style="color: #ff6584; font-weight: bold;">Current Role:</span></p>
                    <p>→ Owner & Web Developer at ZYlox Web Services</p>
                </div>
                
                <div style="margin-top: 15px;">
                    <p><span style="color: #ff6584; font-weight: bold;">Languages:</span></p>
                    <p>→ English (Fluent)</p>
                    <p>→ Urdu (Native)</p>
                </div>
                
                <div style="margin-top: 15px; font-style: italic; color: #8b8b8b;">
                    <p>Type <span style="color: #44d7b6;">contact</span> for ways to reach me or <span style="color: #44d7b6;">projects</span> to see my work.</p>
                </div>
            </div>
        `);
    }
    
    // Skills command with animated bars
    function showSkills() {
        appendToTerminal(`
            <div class="terminal-skills">
                <p style="color: #6c63ff; font-weight: bold; margin-bottom: 15px; font-size: 16px;">Technical Skills:</p>
                
                <div class="terminal-skill-bar">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>HTML & CSS</span>
                        <span>95%</span>
                    </div>
                    <div style="height: 8px; background-color: rgba(108, 99, 255, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="terminal-skill-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #6c63ff, #44d7b6); border-radius: 4px;" data-width="95"></div>
                    </div>
                </div>
                
                <div class="terminal-skill-bar">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>JavaScript</span>
                        <span>90%</span>
                    </div>
                    <div style="height: 8px; background-color: rgba(108, 99, 255, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="terminal-skill-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #6c63ff, #44d7b6); border-radius: 4px;" data-width="90"></div>
                    </div>
                </div>
                
                <div class="terminal-skill-bar">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>Three.js</span>
                        <span>85%</span>
                    </div>
                    <div style="height: 8px; background-color: rgba(108, 99, 255, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="terminal-skill-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #6c63ff, #44d7b6); border-radius: 4px;" data-width="85"></div>
                    </div>
                </div>
                
                <div class="terminal-skill-bar">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>GSAP Animations</span>
                        <span>88%</span>
                    </div>
                    <div style="height: 8px; background-color: rgba(108, 99, 255, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="terminal-skill-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #6c63ff, #44d7b6); border-radius: 4px;" data-width="88"></div>
                    </div>
                </div>
                
                <div class="terminal-skill-bar">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>React</span>
                        <span>82%</span>
                    </div>
                    <div style="height: 8px; background-color: rgba(108, 99, 255, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="terminal-skill-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #6c63ff, #44d7b6); border-radius: 4px;" data-width="82"></div>
                    </div>
                </div>
                
                <div class="terminal-skill-bar">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <span>UI/UX Design</span>
                        <span>80%</span>
                    </div>
                    <div style="height: 8px; background-color: rgba(108, 99, 255, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="terminal-skill-progress" style="width: 0%; height: 100%; background: linear-gradient(to right, #6c63ff, #44d7b6); border-radius: 4px;" data-width="80"></div>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <p style="color: #6c63ff; font-weight: bold; margin-bottom: 10px; font-size: 16px;">Tools & Technologies:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 5px 10px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(108, 99, 255, 0.3);">VS Code</span>
                        <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 5px 10px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(108, 99, 255, 0.3);">Git</span>
                        <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 5px 10px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(108, 99, 255, 0.3);">Figma</span>
                        <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 5px 10px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(108, 99, 255, 0.3);">Blender</span>
                        <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 5px 10px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(108, 99, 255, 0.3);">Node.js</span>
                        <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 5px 10px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(108, 99, 255, 0.3);">Responsive Design</span>
                    </div>
                </div>
            </div>
        `);
        
        // Animate skill bars
        setTimeout(() => {
            document.querySelectorAll('.terminal-skill-progress').forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                    bar.style.transition = 'width 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
                }, 100);
            });
        }, 100);
    }
    
    // Projects command with interactive cards
    function showProjects() {
        appendToTerminal(`
            <div class="terminal-projects">
                <p style="color: #6c63ff; font-weight: bold; margin-bottom: 15px; font-size: 16px;">Featured Projects:</p>
                
                <div style="display: grid; grid-gap: 15px;">
                    <div class="project-card" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); transition: all 0.3s ease; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: 0; right: 0; padding: 5px 10px; background: linear-gradient(to right, #6c63ff, #44d7b6); font-size: 12px; color: white; border-bottom-left-radius: 8px;">Featured</div>
                        <h4 style="color: #6c63ff; margin-bottom: 8px;">Modern E-commerce Platform</h4>
                        <p style="margin-bottom: 10px; font-size: 14px;">A fully responsive e-commerce website with 3D product previews and seamless animations.</p>
                        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">HTML</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">CSS</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">JavaScript</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">Three.js</span>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" style="color: #44d7b6; font-size: 12px; display: flex; align-items: center; gap: 5px; text-decoration: none;">
                                <i class="fas fa-link"></i> Live Demo
                            </a>
                            <a href="https://github.com/Moeed-ul-Hassan" target="_blank" style="color: #ff6584; font-size: 12px; display: flex; align-items: center; gap: 5px; text-decoration: none;">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    </div>
                    
                    <div class="project-card" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); transition: all 0.3s ease;">
                        <h4 style="color: #6c63ff; margin-bottom: 8px;">3D Interactive Portfolio</h4>
                        <p style="margin-bottom: 10px; font-size: 14px;">An immersive 3D portfolio website with interactive elements and creative animations.</p>
                        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">Three.js</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">GSAP</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">WebGL</span>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" style="color: #44d7b6; font-size: 12px; display: flex; align-items: center; gap: 5px; text-decoration: none;">
                                <i class="fas fa-link"></i> Live Demo
                            </a>
                            <a href="https://github.com/Moeed-ul-Hassan" target="_blank" style="color: #ff6584; font-size: 12px; display: flex; align-items: center; gap: 5px; text-decoration: none;">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    </div>
                    
                    <div class="project-card" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); transition: all 0.3s ease;">
                        <h4 style="color: #6c63ff; margin-bottom: 8px;">Advanced Portfolio with Terminal</h4>
                        <p style="margin-bottom: 10px; font-size: 14px;">Interactive developer portfolio with custom terminal interface and 3D elements.</p>
                        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">HTML</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">CSS</span>
                            <span style="background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; padding: 3px 8px; border-radius: 15px; font-size: 11px;">JavaScript</span>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <a href="#" style="color: #44d7b6; font-size: 12px; display: flex; align-items: center; gap: 5px; text-decoration: none;">
                                <i class="fas fa-link"></i> Live Demo
                            </a>
                            <a href="https://github.com/Moeed-ul-Hassan" target="_blank" style="color: #ff6584; font-size: 12px; display: flex; align-items: center; gap: 5px; text-decoration: none;">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    </div>
                </div>
                
                <p style="margin-top: 15px; font-style: italic; color: #8b8b8b;">Type <span style="color: #44d7b6;">github</span> to visit my GitHub repository for more projects.</p>
            </div>
        `);
        
        // Add hover effect to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 5px 15px rgba(108, 99, 255, 0.15)';
                this.style.borderColor = 'rgba(108, 99, 255, 0.4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.borderColor = 'rgba(108, 99, 255, 0.2)';
            });
        });
    }
    
    // Contact command with interactive elements
    function showContact() {
        appendToTerminal(`
            <div class="terminal-contact">
                <p style="color: #6c63ff; font-weight: bold; margin-bottom: 15px; font-size: 16px;">Contact Information:</p>
                
                <div style="display: grid; grid-gap: 10px; margin-bottom: 15px;">
                    <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; border-left: 3px solid #6c63ff;">
                        <i class="fas fa-envelope" style="color: #6c63ff; font-size: 16px;"></i>
                        <div>
                            <p style="font-size: 14px; margin: 0; color: #8b8b8b;">Email</p>
                            <p style="margin: 0;"><a href="mailto:moeed@example.com" style="color: #44d7b6; text-decoration: none;">moeed@example.com</a></p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; border-left: 3px solid #ff6584;">
                        <i class="fas fa-map-marker-alt" style="color: #ff6584; font-size: 16px;"></i>
                        <div>
                            <p style="font-size: 14px; margin: 0; color: #8b8b8b;">Location</p>
                            <p style="margin: 0;">Islamabad, Pakistan</p>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; border-left: 3px solid #44d7b6;">
                        <i class="fab fa-github" style="color: #44d7b6; font-size: 16px;"></i>
                        <div>
                            <p style="font-size: 14px; margin: 0; color: #8b8b8b;">GitHub</p>
                            <p style="margin: 0;"><a href="https://github.com/Moeed-ul-Hassan" target="_blank" style="color: #44d7b6; text-decoration: none;">github.com/Moeed-ul-Hassan</a></p>
                        </div>
                    </div>
                </div>
                
                <div style="background-color: rgba(108, 99, 255, 0.1); border-radius: 8px; padding: 15px; margin-bottom: 15px; border: 1px dashed rgba(108, 99, 255, 0.3);">
                    <p style="margin: 0; font-weight: bold; color: #6c63ff;">Availability Status:</p>
                    <p style="margin: 5px 0 0 0; display: flex; align-items: center; gap: 5px;">
                        <span style="display: inline-block; width: 10px; height: 10px; background-color: #44d7b6; border-radius: 50%;"></span>
                        Available for freelance and full-time opportunities
                    </p>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <a href="#" class="social-link" style="display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; border-radius: 50%; background-color: rgba(108, 99, 255, 0.1); color: #6c63ff; text-decoration: none; transition: all 0.3s ease;">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="https://github.com/Moeed-ul-Hassan" target="_blank" class="social-link" style="display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; border-radius: 50%; background-color: rgba(68, 215, 182, 0.1); color: #44d7b6; text-decoration: none; transition: all 0.3s ease;">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="#" class="social-link" style="display: flex; align-items: center; justify-content: center; width: 35px; height: 35px; border-radius: 50%; background-color: rgba(255, 101, 132, 0.1); color: #ff6584; text-decoration: none; transition: all 0.3s ease;">
                        <i class="fab fa-twitter"></i>
                    </a>
                </div>
                
                <p style="margin-top: 15px; font-style: italic; color: #8b8b8b;">Feel free to reach out for collaboration or inquiries!</p>
            </div>
        `);
        
        // Add hover effect to social links
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Clear terminal with animation
    function clearTerminal() {
        const elements = Array.from(terminalOutput.children);
        
        // Apply fade-out animation to each element
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
                element.style.opacity = '0';
                element.style.transform = 'translateY(-10px)';
            }, index * 10);
        });
        
        // Clear terminal after animations
        setTimeout(() => {
            terminalOutput.innerHTML = '';
            appendToTerminal(`<p class="terminal-welcome">Terminal cleared. Type <span style="color: #ff6584;">help</span> to see available commands.</p>`);
        }, elements.length * 10 + 100);
    }
    
    // Matrix effect with enhanced visuals
    function showMatrix() {
        // Don't allow multiple instances
        if (isMatrixRunning) {
            appendToTerminal(`<span style="color: #ff6584;">Matrix is already running. Please wait for it to complete.</span>`);
            return;
        }
        
        isMatrixRunning = true;
        
        // Create container with loading message
        appendToTerminal(`<span style="color: #44d7b6;">Initializing Matrix simulation...</span>`);
        
        // Create canvas for matrix effect
        const matrixElement = document.createElement('div');
        matrixElement.style.width = '100%';
        matrixElement.style.height = '250px';
        matrixElement.style.position = 'relative';
        matrixElement.style.marginTop = '10px';
        matrixElement.style.marginBottom = '10px';
        matrixElement.style.borderRadius = '8px';
        matrixElement.style.overflow = 'hidden';
        matrixElement.style.border = '1px solid rgba(108, 99, 255, 0.3)';
        
        const matrixCanvas = document.createElement('canvas');
        matrixCanvas.width = matrixElement.clientWidth || 600;
        matrixCanvas.height = 250;
        matrixCanvas.style.width = '100%';
        matrixCanvas.style.height = '100%';
        
        matrixElement.appendChild(matrixCanvas);
        terminalOutput.appendChild(matrixElement);
        
        // Auto scroll to bottom
        terminalBody.scrollTo({
            top: terminalOutput.scrollHeight,
            behavior: 'smooth'
        });
        
        // Matrix animation with better visuals
        const ctx = matrixCanvas.getContext('2d');
        
        // Characters for the matrix
        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        const fontSize = 14;
        const columns = Math.floor(matrixCanvas.width / fontSize);
        
        // Array to store current position of each column
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
        
        // Colors for a more vibrant effect
        const colors = [
            'rgba(0, 255, 70, 1)',     // Bright green
            'rgba(68, 215, 182, 1)',   // Teal
            'rgba(108, 99, 255, 1)',   // Purple
            'rgba(255, 255, 255, 0.8)' // White (for highlights)
        ];
        
        let frameCount = 0;
        
        // Draw the matrix
        function renderMatrix() {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            
            frameCount++;
            
            // Set text properties
            ctx.font = `${fontSize}px monospace`;
            
            // Loop through drops
            for (let i = 0; i < drops.length; i++) {
                // Pick a random character
                const char = chars[Math.floor(Math.random() * chars.length)];
                
                // Pick color based on position
                let colorIndex = 0; // Default to green
                
                if (frameCount % 50 === 0 && Math.random() > 0.95) {
                    colorIndex = 3; // Occasionally use white for highlight
                } else if (drops[i] < 20) {
                    colorIndex = 3; // Use white for characters at the beginning of a stream
                } else if (Math.random() > 0.98) {
                    colorIndex = Math.floor(Math.random() * 3); // Randomly use other colors
                }
                
                ctx.fillStyle = colors[colorIndex];
                
                // Draw the character
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                
                // Reset when reaching the bottom or randomly for varied lengths
                if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
                
                // Increment y coordinate
                drops[i] += Math.random() * 0.5 + 0.5;
            }
        }
        
        // Animation interval with increasing density over time
        const matrixInterval = setInterval(renderMatrix, 33);
        
        // Dynamic effect with increasing density
        setTimeout(() => {
            // Add more drops for increased density
            for (let i = 0; i < columns; i += 2) {
                if (Math.random() > 0.5) {
                    drops.push(0);
                    drops.push(Math.random() * -50);
                }
            }
        }, 3000);
        
        // Stop animation after 12 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            isMatrixRunning = false;
            
            // Add completion message
            appendToTerminal(`<span style="color: #44d7b6;">Matrix simulation completed. Wake up, Neo...</span>`);
        }, 12000);
    }
    
    // Open GitHub profile
    function openGitHub() {
        appendToTerminal(`<span style="color: #44d7b6;">Opening GitHub profile in a new tab...</span>`);
        
        setTimeout(() => {
            window.open('https://github.com/Moeed-ul-Hassan', '_blank');
        }, 500);
    }
    
    // Show mock weather information
    function showWeather() {
        appendToTerminal(`
            <div class="terminal-weather">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <p style="margin: 0; font-size: 18px; font-weight: bold;">Islamabad, Pakistan</p>
                        <p style="margin: 0; font-size: 14px; color: #8b8b8b;">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; font-size: 24px; font-weight: bold;">28°C</p>
                        <p style="margin: 0; font-size: 14px; color: #44d7b6;">Sunny with clouds</p>
                    </div>
                </div>
                
                <div style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; margin-bottom: 15px; display: flex; justify-content: space-between;">
                    <div style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Humidity</p>
                        <p style="margin: 0; font-weight: bold;">65%</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Wind</p>
                        <p style="margin: 0; font-weight: bold;">8 km/h</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Precipitation</p>
                        <p style="margin: 0; font-weight: bold;">10%</p>
                    </div>
                    <div style="text-align: center;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">UV Index</p>
                        <p style="margin: 0; font-weight: bold;">5</p>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <div style="text-align: center; flex: 1;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Today</p>
                        <p style="margin: 0;">28°C</p>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Tomorrow</p>
                        <p style="margin: 0;">30°C</p>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Wed</p>
                        <p style="margin: 0;">27°C</p>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Thu</p>
                        <p style="margin: 0;">29°C</p>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <p style="margin: 0; font-size: 12px; color: #8b8b8b;">Fri</p>
                        <p style="margin: 0;">26°C</p>
                    </div>
                </div>
                
                <p style="margin-top: 15px; font-style: italic; color: #8b8b8b;">Weather data is simulated for demonstration purposes.</p>
            </div>
        `);
    }
    
    // Theme switcher
    function changeTheme(args) {
        const theme = args[0] || '';
        
        switch(theme.toLowerCase()) {
            case 'dark':
                terminalContainer.style.backgroundColor = 'rgba(12, 15, 25, 0.92)';
                terminalContainer.style.color = '#f9fafb';
                appendToTerminal(`<span style="color: #44d7b6;">Theme switched to dark mode.</span>`);
                break;
                
            case 'light':
                terminalContainer.style.backgroundColor = 'rgba(240, 240, 245, 0.92)';
                terminalContainer.style.color = '#1c2033';
                appendToTerminal(`<span style="color: #6c63ff;">Theme switched to light mode.</span>`);
                break;
                
            case 'matrix':
                terminalContainer.style.backgroundColor = 'rgba(0, 10, 0, 0.92)';
                terminalContainer.style.color = '#00ff00';
                appendToTerminal(`<span style="color: #00ff00;">Theme switched to matrix mode. Wake up, Neo...</span>`);
                break;
                
            case 'reset':
                terminalContainer.style.backgroundColor = 'rgba(12, 15, 25, 0.92)';
                terminalContainer.style.color = '#f9fafb';
                appendToTerminal(`<span style="color: #44d7b6;">Theme reset to default.</span>`);
                break;
                
            default:
                appendToTerminal(`
                    <div class="terminal-theme-help">
                        <p><span style="color: #6c63ff;">Available themes:</span></p>
                        <p><span style="color: #44d7b6;">theme dark</span> - Dark theme (default)</p>
                        <p><span style="color: #44d7b6;">theme light</span> - Light theme</p>
                        <p><span style="color: #44d7b6;">theme matrix</span> - Matrix theme</p>
                        <p><span style="color: #44d7b6;">theme reset</span> - Reset to default theme</p>
                    </div>
                `);
        }
    }
    
    // Simple game
    function startGame() {
        appendToTerminal(`
            <div class="terminal-game">
                <p style="color: #6c63ff; font-weight: bold; margin-bottom: 10px;">Number Guessing Game</p>
                <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
                <p>Type <span style="color: #44d7b6;">guess [number]</span> to make a guess (e.g., guess 50)</p>
            </div>
        `);
        
        // Store the random number and track guesses
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        const gameState = {
            target: randomNumber,
            attempts: 0,
            isActive: true
        };
        
        // Store game state in window object
        window.terminalGame = gameState;
        
        // Add guess command
        window.processGameCommand = function(args) {
            if (!window.terminalGame || !window.terminalGame.isActive) {
                appendToTerminal(`<span style="color: #ff6584;">No active game. Type <span style="color: #44d7b6;">game</span> to start a new game.</span>`);
                return;
            }
            
            const guess = parseInt(args[0]);
            
            if (isNaN(guess) || guess < 1 || guess > 100) {
                appendToTerminal(`<span style="color: #ff6584;">Please enter a valid number between 1 and 100.</span>`);
                return;
            }
            
            window.terminalGame.attempts++;
            
            if (guess === window.terminalGame.target) {
                appendToTerminal(`
                    <div style="background-color: rgba(68, 215, 182, 0.1); border-radius: 8px; padding: 15px; border: 1px solid rgba(68, 215, 182, 0.3);">
                        <p style="color: #44d7b6; font-weight: bold; margin: 0;">🎉 Congratulations! 🎉</p>
                        <p style="margin: 10px 0 0 0;">You guessed the number ${window.terminalGame.target} correctly in ${window.terminalGame.attempts} attempts!</p>
                    </div>
                `);
                window.terminalGame.isActive = false;
            } else if (guess < window.terminalGame.target) {
                appendToTerminal(`<span style="color: #6c63ff;">Try higher! Your guess (${guess}) is too low.</span>`);
            } else {
                appendToTerminal(`<span style="color: #ff6584;">Try lower! Your guess (${guess}) is too high.</span>`);
            }
        };
    }
    
    // ASCII art
    function showAsciiArt() {
        appendToTerminal(`
            <div style="font-family: monospace; white-space: pre; line-height: 1.2; color: #6c63ff; margin: 10px 0; overflow-x: auto;">
   __  __                       _       
  |  \\/  | ___   ___  ___  __| |      
  | |\\/| |/ _ \\ / _ \\/ _ \\/ _\` |      
  | |  | | (_) |  __/  __/ (_| |      
  |_|  |_|\\___/ \\___|\\___|\\__,_|      
                                      
  _   _                                
 | | | | __ _ ___ ___  __ _ _ __      
 | |_| |/ _\` / __/ __|/ _\` | '_ \\     
 |  _  | (_| \\__ \\__ \\ (_| | | | |    
 |_| |_|\\__,_|___/___/\\__,_|_| |_|    
            </div>
        `);
    }
    
    // Date command
    function showDate() {
        const now = new Date();
        const dateOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Karachi'
        };
        
        appendToTerminal(`<div style="color: #44d7b6; font-weight: bold;">${now.toLocaleDateString('en-US', dateOptions)}</div>`);
    }
    
    // Time command
    function showTime() {
        const now = new Date();
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Karachi'
        };
        
        appendToTerminal(`<div style="color: #44d7b6; font-weight: bold;">${now.toLocaleTimeString('en-US', timeOptions)} (Pakistan Standard Time)</div>`);
    }
    
    // WhoAmI command
    function showWhoAmI() {
        appendToTerminal(`
            <div style="margin-bottom: 10px;">
                <span style="color: #6c63ff; font-weight: bold;">User:</span> Guest
            </div>
            <div style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 10px; margin-bottom: 10px;">
                <p style="margin: 0;"><span style="color: #6c63ff;">Browser:</span> ${navigator.userAgent.match(/chrome|firefox|safari|edge|opera/i)[0]}</p>
                <p style="margin: 0;"><span style="color: #6c63ff;">Platform:</span> ${navigator.platform}</p>
                <p style="margin: 0;"><span style="color: #6c63ff;">Language:</span> ${navigator.language}</p>
            </div>
        `);
    }
    
    // List directory command
    function listDirectory() {
        appendToTerminal(`
            <div style="font-family: monospace;">
                <div style="margin-bottom: 10px; color: #6c63ff;">Directory: /home/moeed/portfolio</div>
                
                <div style="display: grid; grid-template-columns: auto 1fr auto; gap: 15px;">
                    <div style="color: #44d7b6;">drwxr-xr-x</div>
                    <div>projects/</div>
                    <div>4.0K</div>
                    
                    <div style="color: #44d7b6;">drwxr-xr-x</div>
                    <div>assets/</div>
                    <div>4.0K</div>
                    
                    <div style="color: #44d7b6;">drwxr-xr-x</div>
                    <div>src/</div>
                    <div>4.0K</div>
                    
                    <div style="color: #ff6584;">-rw-r--r--</div>
                    <div>README.md</div>
                    <div>2.3K</div>
                    
                    <div style="color: #ff6584;">-rw-r--r--</div>
                    <div>index.html</div>
                    <div>24.5K</div>
                    
                    <div style="color: #ff6584;">-rw-r--r--</div>
                    <div>package.json</div>
                    <div>1.2K</div>
                </div>
            </div>
        `);
    }
    
    // Change directory command
    function changeDirectory() {
        appendToTerminal(`<span style="color: #ff6584;">Permission denied: This is a simulated environment. Directory navigation is restricted.</span>`);
    }
    
    // Echo command
    function echo(args) {
        if (args.length === 0) {
            appendToTerminal('');
            return;
        }
        
        // Detect special variables
        const text = args.join(' ')
            .replace('$USER', 'moeed')
            .replace('$DATE', new Date().toDateString())
            .replace('$TIME', new Date().toLocaleTimeString());
            
        appendToTerminal(`<span>${text}</span>`);
    }
    
    // Say hello with variations
    function sayHello() {
        const greetings = [
            "Hello there! How can I assist you today?",
            "Hi! Type 'help' to see what I can do.",
            "Hey! Welcome to my interactive terminal.",
            "Greetings! Ready to explore my portfolio?"
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        appendToTerminal(`<span style="color: #44d7b6;">${randomGreeting}</span>`);
    }
    
    // Interactive explore command
    function showExplore() {
        appendToTerminal(`
            <div class="terminal-explore">
                <p style="color: #6c63ff; font-weight: bold; margin-bottom: 10px;">Interactive Portfolio Explorer</p>
                <p>Welcome to the interactive explorer! What would you like to learn about?</p>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px;">
                    <div class="explore-option" data-option="about" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); cursor: pointer; transition: all 0.3s ease;">
                        <p style="margin: 0; font-weight: bold; color: #6c63ff;">About Me</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #8b8b8b;">Learn about my background and experience</p>
                    </div>
                    
                    <div class="explore-option" data-option="skills" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); cursor: pointer; transition: all 0.3s ease;">
                        <p style="margin: 0; font-weight: bold; color: #6c63ff;">Skills</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #8b8b8b;">Explore my technical expertise</p>
                    </div>
                    
                    <div class="explore-option" data-option="projects" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); cursor: pointer; transition: all 0.3s ease;">
                        <p style="margin: 0; font-weight: bold; color: #6c63ff;">Projects</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #8b8b8b;">View my featured work</p>
                    </div>
                    
                    <div class="explore-option" data-option="contact" style="background-color: rgba(108, 99, 255, 0.05); border-radius: 8px; padding: 15px; border: 1px solid rgba(108, 99, 255, 0.2); cursor: pointer; transition: all 0.3s ease;">
                        <p style="margin: 0; font-weight: bold; color: #6c63ff;">Contact</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #8b8b8b;">Get in touch with me</p>
                    </div>
                </div>
                
                <p style="margin-top: 15px; font-style: italic; color: #8b8b8b;">Click on any option to explore further.</p>
            </div>
        `);
        
        // Add click handlers for explore options
        setTimeout(() => {
            document.querySelectorAll('.explore-option').forEach(option => {
                option.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                    this.style.boxShadow = '0 5px 15px rgba(108, 99, 255, 0.15)';
                    this.style.borderColor = 'rgba(108, 99, 255, 0.4)';
                });
                
                option.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                    this.style.borderColor = 'rgba(108, 99, 255, 0.2)';
                });
                
                option.addEventListener('click', function() {
                    const optionType = this.getAttribute('data-option');
                    
                    // Show feedback for the click
                    appendToTerminal(`<span style="color: #44d7b6;">Loading ${optionType} information...</span>`);
                    
                    // Execute the corresponding command after a short delay
                    setTimeout(() => {
                        // Update input to show what was executed
                        terminalInput.value = optionType;
                        
                        // Process the command
                        processCommand(optionType);
                        
                        // Clear the input
                        setTimeout(() => {
                            terminalInput.value = '';
                        }, 500);
                    }, 400);
                });
            });
        }, 100);
    }
    
    // Easter egg handler
    function showEasterEgg(eggName) {
        switch(eggName) {
            case 'konami':
                appendToTerminal(`
                    <div style="text-align: center; margin: 15px 0;">
                        <p style="color: #ff6584; font-weight: bold; margin-bottom: 10px;">🎮 KONAMI CODE ACTIVATED! 🎮</p>
                        <p>You've discovered a secret! Here's a special badge for you:</p>
                        <div style="background-color: rgba(108, 99, 255, 0.1); border-radius: 8px; padding: 15px; margin: 10px auto; max-width: 300px; border: 2px solid #6c63ff;">
                            <p style="margin: 0; font-weight: bold; color: #6c63ff;">🏆 EASTER EGG HUNTER 🏆</p>
                            <p style="margin: 5px 0 0 0; font-size: 12px;">Awarded to those who know the secret codes!</p>
                        </div>
                    </div>
                `);
                break;
        }
    }
});