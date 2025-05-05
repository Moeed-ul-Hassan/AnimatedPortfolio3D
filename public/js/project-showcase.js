// Interactive 3D Project Showcase
document.addEventListener('DOMContentLoaded', function() {
    // Find the projects section
    const projectsSection = document.getElementById('projects');
    
    if (projectsSection) {
        // Create the 3D showcase container
        createProjectShowcase();
    }
    
    function createProjectShowcase() {
        // Create the showcase container div
        const showcaseContainer = document.createElement('div');
        showcaseContainer.id = 'projects-showcase';
        showcaseContainer.className = 'projects-3d-showcase';
        
        // Add the HTML content
        showcaseContainer.innerHTML = `
            <h3 class="gradient-text">Interactive Project Showcase</h3>
            <p class="showcase-description">Explore my featured projects in an interactive 3D environment</p>
            
            <div class="showcase-container">
                <div class="showcase-canvas-container">
                    <canvas id="showcase-canvas"></canvas>
                    <div class="showcase-loading">
                        <div class="showcase-loader"></div>
                        <p>Loading 3D Environment...</p>
                    </div>
                </div>
                
                <div class="showcase-controls">
                    <button class="btn btn-glass showcase-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="showcase-info">
                        <h4 id="showcase-title">Modern E-commerce Platform</h4>
                        <p id="showcase-description">Interactive e-commerce platform with 3D product previews and animations.</p>
                        <div class="showcase-tech">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JavaScript</span>
                            <span>Three.js</span>
                        </div>
                        <div class="showcase-links">
                            <a href="#" class="btn btn-accent btn-sm">
                                <i class="fas fa-external-link-alt"></i> View Live
                            </a>
                            <a href="#" class="btn btn-outline btn-sm">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    </div>
                    <button class="btn btn-glass showcase-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Insert the showcase after the projects filter
        const projectsFilter = projectsSection.querySelector('.projects-filter');
        
        if (projectsFilter) {
            projectsFilter.parentNode.insertBefore(showcaseContainer, projectsFilter.nextSibling);
            
            // Add styles
            addShowcaseStyles();
            
            // Initialize the 3D showcase
            setTimeout(() => {
                initProjectShowcase();
            }, 500);
        }
    }
    
    function addShowcaseStyles() {
        // Create a style element
        const style = document.createElement('style');
        
        style.innerHTML = `
            .projects-3d-showcase {
                margin: 4rem 0;
                text-align: center;
            }
            
            .showcase-description {
                color: var(--color-text-secondary);
                max-width: 600px;
                margin: 0 auto 2rem;
            }
            
            .showcase-container {
                position: relative;
                max-width: 800px;
                margin: 0 auto;
                background-color: rgba(28, 32, 51, 0.5);
                border-radius: var(--border-radius-lg);
                padding: 2rem;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                border: 1px solid rgba(108, 99, 255, 0.2);
                overflow: hidden;
            }
            
            .showcase-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(45deg, 
                    rgba(108, 99, 255, 0.05) 0%, 
                    transparent 40%, 
                    transparent 60%, 
                    rgba(68, 215, 182, 0.05) 100%);
                pointer-events: none;
            }
            
            .showcase-canvas-container {
                position: relative;
                width: 100%;
                height: 400px;
                margin-bottom: 2rem;
                overflow: hidden;
                border-radius: var(--border-radius-md);
                background-color: rgba(19, 23, 34, 0.8);
                box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
            }
            
            #showcase-canvas {
                width: 100%;
                height: 100%;
                display: block;
            }
            
            .showcase-loading {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: rgba(19, 23, 34, 0.9);
                color: var(--color-white);
                z-index: 2;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .showcase-loading.hidden {
                opacity: 0;
                visibility: hidden;
            }
            
            .showcase-loader {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(255, 255, 255, 0.2);
                border-top-color: var(--color-primary);
                border-radius: 50%;
                animation: spin 1s infinite linear;
                margin-bottom: 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .showcase-controls {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .showcase-prev,
            .showcase-next {
                flex-shrink: 0;
                width: 40px;
                height: 40px;
                padding: 0;
            }
            
            .showcase-info {
                flex: 1;
                text-align: left;
            }
            
            #showcase-title {
                margin-bottom: 0.5rem;
                color: var(--color-primary);
            }
            
            #showcase-description {
                margin-bottom: 1rem;
                color: var(--color-text-secondary);
            }
            
            .showcase-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .showcase-tech span {
                background-color: rgba(108, 99, 255, 0.1);
                border: 1px solid rgba(108, 99, 255, 0.2);
                padding: 0.25rem 0.75rem;
                border-radius: var(--border-radius-full);
                font-size: 0.8rem;
                color: var(--color-primary);
            }
            
            .showcase-links {
                display: flex;
                gap: 1rem;
            }
            
            .btn-sm {
                padding: 0.5rem 1rem;
                font-size: 0.8rem;
            }
            
            @media (max-width: 768px) {
                .showcase-container {
                    padding: 1rem;
                }
                
                .showcase-canvas-container {
                    height: 250px;
                }
                
                .showcase-controls {
                    flex-direction: column;
                }
                
                .showcase-info {
                    text-align: center;
                    order: -1;
                    margin-bottom: 1rem;
                }
                
                .showcase-links {
                    justify-content: center;
                }
                
                .showcase-tech {
                    justify-content: center;
                }
            }
        `;
        
        // Append to head
        document.head.appendChild(style);
    }
    
    function initProjectShowcase() {
        // Check if Three.js is available
        if (typeof THREE === 'undefined') {
            console.error('Three.js is not loaded');
            return;
        }
        
        // Get the canvas
        const canvas = document.getElementById('showcase-canvas');
        const loading = document.querySelector('.showcase-loading');
        
        if (!canvas) return;
        
        // Project data
        const projects = [
            {
                title: 'Modern E-commerce Platform',
                description: 'Interactive e-commerce platform with 3D product previews and animations.',
                technologies: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
                liveLink: '#',
                codeLink: 'https://github.com/Moeed-ul-Hassan',
                color: '#6c63ff',
                modelType: 'laptop'
            },
            {
                title: '3D Interactive Portfolio',
                description: 'Immersive 3D portfolio with interactive elements and creative animations.',
                technologies: ['Three.js', 'GSAP', 'WebGL'],
                liveLink: '#',
                codeLink: 'https://github.com/Moeed-ul-Hassan',
                color: '#44d7b6',
                modelType: 'sphere'
            },
            {
                title: 'Advanced Portfolio with Terminal',
                description: 'Portfolio website featuring an interactive terminal and 3D elements.',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                liveLink: '#',
                codeLink: 'https://github.com/Moeed-ul-Hassan',
                color: '#ff6584',
                modelType: 'cube'
            }
        ];
        
        let currentProjectIndex = 0;
        
        // Set up Three.js scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x131722);
        
        // Camera
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        
        // Renderer
        const renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Add point lights
        const pointLight1 = new THREE.PointLight(0x6c63ff, 1, 10);
        pointLight1.position.set(2, 2, 2);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x44d7b6, 1, 10);
        pointLight2.position.set(-2, -2, 2);
        scene.add(pointLight2);
        
        // Models container
        const models = [];
        
        // Create models for each project
        function createModels() {
            // Laptop model (simplified)
            const laptop = new THREE.Group();
            
            // Laptop base
            const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
            const baseMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x333333,
                metalness: 0.8,
                roughness: 0.2
            });
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            laptop.add(base);
            
            // Laptop screen
            const screenGeometry = new THREE.BoxGeometry(2.8, 0.1, 1.8);
            const screenMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x222222,
                metalness: 0.8,
                roughness: 0.2
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.position.y = 0.15;
            laptop.add(screen);
            
            // Screen display
            const displayGeometry = new THREE.PlaneGeometry(2.5, 1.5);
            const displayMaterial = new THREE.MeshBasicMaterial({ 
                color: projects[0].color,
                side: THREE.DoubleSide
            });
            const display = new THREE.Mesh(displayGeometry, displayMaterial);
            display.position.y = 0.2;
            display.position.z = 0.2;
            display.rotation.x = -0.2;
            laptop.add(display);
            
            // Add laptop to models
            models.push(laptop);
            scene.add(laptop);
            laptop.visible = currentProjectIndex === 0;
            
            // Sphere model
            const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
            const sphereMaterial = new THREE.MeshStandardMaterial({
                color: projects[1].color,
                metalness: 0.5,
                roughness: 0.3
            });
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            
            // Add wireframe overlay
            const wireframeGeometry = new THREE.SphereGeometry(1.55, 16, 16);
            const wireframeMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.1
            });
            const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
            sphere.add(wireframe);
            
            // Add orbiting particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 100;
            const posArray = new Float32Array(particlesCount * 3);
            
            for (let i = 0; i < particlesCount; i++) {
                // Create points in a spherical pattern
                const angle1 = Math.random() * Math.PI * 2;
                const angle2 = Math.random() * Math.PI * 2;
                const radius = 1.8 + Math.random() * 0.3;
                
                const x = Math.cos(angle1) * Math.sin(angle2) * radius;
                const y = Math.sin(angle1) * Math.sin(angle2) * radius;
                const z = Math.cos(angle2) * radius;
                
                posArray[i * 3] = x;
                posArray[i * 3 + 1] = y;
                posArray[i * 3 + 2] = z;
            }
            
            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
            
            const particlesMaterial = new THREE.PointsMaterial({
                size: 0.05,
                color: 0xffffff,
                transparent: true,
                opacity: 0.8
            });
            
            const particles = new THREE.Points(particlesGeometry, particlesMaterial);
            sphere.add(particles);
            
            // Add sphere to models
            models.push(sphere);
            scene.add(sphere);
            sphere.visible = currentProjectIndex === 1;
            
            // Cube model
            const cubeGroup = new THREE.Group();
            
            const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
            const cubeMaterial = new THREE.MeshStandardMaterial({
                color: projects[2].color,
                metalness: 0.7,
                roughness: 0.2
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cubeGroup.add(cube);
            
            // Add floating text elements
            const textGeometry1 = new THREE.PlaneGeometry(0.5, 0.2);
            const textMaterial1 = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
                side: THREE.DoubleSide
            });
            const text1 = new THREE.Mesh(textGeometry1, textMaterial1);
            text1.position.set(1.2, 0.6, 0.6);
            cubeGroup.add(text1);
            
            const textGeometry2 = new THREE.PlaneGeometry(0.4, 0.2);
            const textMaterial2 = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });
            const text2 = new THREE.Mesh(textGeometry2, textMaterial2);
            text2.position.set(-1.2, -0.5, 0.7);
            cubeGroup.add(text2);
            
            // Add cube to models
            models.push(cubeGroup);
            scene.add(cubeGroup);
            cubeGroup.visible = currentProjectIndex === 2;
        }
        
        // Create initial models
        createModels();
        
        // Update project info
        function updateProjectInfo() {
            const project = projects[currentProjectIndex];
            
            // Update title and description
            document.getElementById('showcase-title').textContent = project.title;
            document.getElementById('showcase-description').textContent = project.description;
            
            // Update technologies
            const techContainer = document.querySelector('.showcase-tech');
            techContainer.innerHTML = '';
            
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techContainer.appendChild(span);
            });
            
            // Update links
            const liveLink = document.querySelector('.showcase-links a:first-child');
            const codeLink = document.querySelector('.showcase-links a:last-child');
            
            liveLink.href = project.liveLink;
            codeLink.href = project.codeLink;
            
            // Update model visibility
            models.forEach((model, index) => {
                if (index === currentProjectIndex) {
                    model.visible = true;
                    
                    // Reset model position
                    gsap.to(model.position, {
                        x: 0,
                        y: 0,
                        z: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    });
                    
                    // Add entrance animation
                    model.scale.set(0.5, 0.5, 0.5);
                    model.rotation.set(0, 0, 0);
                    
                    gsap.to(model.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    
                    gsap.to(model.rotation, {
                        y: Math.PI * 2,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                } else {
                    // Exit animation
                    const direction = index < currentProjectIndex ? -1 : 1;
                    
                    gsap.to(model.position, {
                        x: direction * 5,
                        duration: 0.5,
                        ease: 'power2.in',
                        onComplete: () => {
                            model.visible = false;
                        }
                    });
                    
                    gsap.to(model.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5,
                        duration: 0.5,
                        ease: 'power2.in'
                    });
                }
            });
        }
        
        // Navigation buttons
        const prevBtn = document.querySelector('.showcase-prev');
        const nextBtn = document.querySelector('.showcase-next');
        
        prevBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
            updateProjectInfo();
        });
        
        nextBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % projects.length;
            updateProjectInfo();
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        });
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // Animate models
            models.forEach((model, index) => {
                if (model.visible) {
                    // Different rotation based on model type
                    if (index === 0) { // Laptop
                        model.rotation.y = Math.sin(time * 0.5) * 0.2;
                        model.rotation.x = Math.sin(time * 0.3) * 0.1;
                        model.position.y = Math.sin(time) * 0.1;
                    } else if (index === 1) { // Sphere
                        model.rotation.y = time * 0.2;
                        model.rotation.x = Math.sin(time * 0.5) * 0.2;
                        
                        // Rotate particles opposite direction
                        if (model.children.length > 1) {
                            model.children[1].rotation.y = -time * 0.1;
                            model.children[1].rotation.x = -time * 0.05;
                        }
                    } else if (index === 2) { // Cube
                        model.rotation.y = time * 0.3;
                        model.rotation.x = time * 0.2;
                        
                        // Animate floating text elements
                        if (model.children.length > 1) {
                            model.children[1].position.y = 0.6 + Math.sin(time * 2) * 0.1;
                            model.children[2].position.y = -0.5 + Math.cos(time * 2) * 0.1;
                        }
                    }
                }
            });
            
            // Animate point lights
            pointLight1.position.x = Math.sin(time) * 3;
            pointLight1.position.z = Math.cos(time) * 3;
            
            pointLight2.position.x = Math.sin(time + Math.PI) * 3;
            pointLight2.position.z = Math.cos(time + Math.PI) * 3;
            
            renderer.render(scene, camera);
        }
        
        // Hide loading indicator and start animation
        setTimeout(() => {
            if (loading) {
                loading.classList.add('hidden');
            }
            
            // Initialize with the first project
            updateProjectInfo();
            
            // Start animation loop
            animate();
        }, 1000);
    }
});