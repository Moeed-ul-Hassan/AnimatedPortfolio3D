// Three.js scene setup
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('three-canvas');
    
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 5);
    
    // Renderer setup - optimized for performance
    const renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: false,
        alpha: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = false;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add a point light for extra highlights
    const pointLight = new THREE.PointLight(0x6C63FF, 1, 10);
    pointLight.position.set(-1, 2, 2);
    scene.add(pointLight);
    
    // Add another point light with a different color
    const pointLight2 = new THREE.PointLight(0xFF6584, 1, 10);
    pointLight2.position.set(2, 1, -1);
    scene.add(pointLight2);
    
    // Create geometry for the model
    let model;
    
    // Function to create our 3D avatar using the provided image
    function createAvatarModel() {
        // Create a group to hold the model parts
        const group = new THREE.Group();
        
        // Create materials using image texture
        const textureLoader = new THREE.TextureLoader();
        const texturePath = 'assets/profile.jpg';
        
        // Load the texture
        textureLoader.load(
            texturePath,
            (texture) => {
                // Create a cube for the head with the image as the texture
                const headGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
                const headMaterial = new THREE.MeshStandardMaterial({ 
                    map: texture,
                    roughness: 0.7,
                    metalness: 0.3
                });
                const head = new THREE.Mesh(headGeometry, headMaterial);
                head.position.y = 0.5;
                group.add(head);
                
                // Add decorative elements - floating cubes around the head
                const cubeColors = [0x6C63FF, 0xFF6584, 0x44D7B6];
                
                for (let i = 0; i < 8; i++) {
                    const size = 0.2 + Math.random() * 0.2;
                    const cubeGeometry = new THREE.BoxGeometry(size, size, size);
                    const cubeMaterial = new THREE.MeshStandardMaterial({ 
                        color: cubeColors[Math.floor(Math.random() * cubeColors.length)],
                        roughness: 0.5,
                        metalness: 0.2,
                        transparent: true,
                        opacity: 0.8
                    });
                    
                    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                    
                    // Position the cubes around the head
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 1.5 + Math.random() * 0.5;
                    cube.position.x = Math.cos(angle) * radius;
                    cube.position.z = Math.sin(angle) * radius;
                    cube.position.y = Math.random() * 2 - 1;
                    
                    // Random rotation
                    cube.rotation.x = Math.random() * Math.PI;
                    cube.rotation.y = Math.random() * Math.PI;
                    cube.rotation.z = Math.random() * Math.PI;
                    
                    group.add(cube);
                    
                    // Animate the cubes with GSAP
                    gsap.to(cube.position, {
                        y: cube.position.y + 0.5,
                        duration: 1 + Math.random() * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                    
                    gsap.to(cube.rotation, {
                        x: cube.rotation.x + Math.PI * 2,
                        y: cube.rotation.y + Math.PI * 2,
                        duration: 5 + Math.random() * 5,
                        repeat: -1,
                        ease: "none"
                    });
                }
                
                // Add a platform underneath
                const platformGeometry = new THREE.CylinderGeometry(1.2, 1.4, 0.2, 16);
                const platformMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x222222,
                    roughness: 0.8,
                    metalness: 0.2
                });
                const platform = new THREE.Mesh(platformGeometry, platformMaterial);
                platform.position.y = -1;
                group.add(platform);
                
                // Add rings around the platform
                const ringGeometry = new THREE.TorusGeometry(1.3, 0.05, 16, 32);
                const ringMaterial = new THREE.MeshStandardMaterial({ 
                    color: 0x6C63FF,
                    roughness: 0.5,
                    metalness: 0.8,
                    transparent: true,
                    opacity: 0.6
                });
                
                const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
                ring1.position.y = -0.9;
                ring1.rotation.x = Math.PI / 2;
                group.add(ring1);
                
                const ring2 = new THREE.Mesh(ringGeometry, ringMaterial.clone());
                ring2.material.color.set(0xFF6584);
                ring2.position.y = -0.8;
                ring2.rotation.x = Math.PI / 2;
                ring2.scale.set(1.1, 1.1, 1.1);
                group.add(ring2);
                
                // Animate the rings
                gsap.to(ring1.rotation, {
                    z: Math.PI * 2,
                    duration: 10,
                    repeat: -1,
                    ease: "none"
                });
                
                gsap.to(ring2.rotation, {
                    z: -Math.PI * 2,
                    duration: 15,
                    repeat: -1,
                    ease: "none"
                });
                
                // Animate the entire model
                animateModel(group);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
                // Fallback to a simple model if texture fails to load
                const fallbackModel = createFallbackModel();
                scene.add(fallbackModel);
                model = fallbackModel;
                animateModel(fallbackModel);
            }
        );
        
        return group;
    }
    
    // Fallback model in case the texture doesn't load
    function createFallbackModel() {
        // Create a group for the model
        const group = new THREE.Group();
        
        // Create a cube
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const materials = [
            new THREE.MeshBasicMaterial({ color: 0x6C63FF }),
            new THREE.MeshBasicMaterial({ color: 0xFF6584 }),
            new THREE.MeshBasicMaterial({ color: 0x44D7B6 }),
            new THREE.MeshBasicMaterial({ color: 0xFFA6C3 }),
            new THREE.MeshBasicMaterial({ color: 0x6C63FF }),
            new THREE.MeshBasicMaterial({ color: 0xFF6584 })
        ];
        const cube = new THREE.Mesh(geometry, materials);
        group.add(cube);
        
        // Add a simple sphere on top
        const sphereGeometry = new THREE.SphereGeometry(0.5, 8, 8);
        const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x44D7B6 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.y = 1.2;
        group.add(sphere);
        
        return group;
    }
    
    // Function to animate a model
    function animateModel(modelToAnimate) {
        // Float animation
        gsap.to(modelToAnimate.position, {
            y: "+=0.2",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Rotation animation
        gsap.to(modelToAnimate.rotation, {
            y: "+=6.28",
            duration: 20,
            repeat: -1,
            ease: "none"
        });
    }
    
    // Make the animateModel function available globally for terminal commands
    window.animateThreeModel = () => {
        if (model) {
            // Add a special animation triggered from the terminal
            gsap.to(model.rotation, {
                x: Math.PI * 2,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    // Reset rotation after animation
                    model.rotation.x = 0;
                }
            });
            
            // Scale animation
            gsap.to(model.scale, {
                x: 1.2,
                y: 1.2,
                z: 1.2,
                duration: 1,
                yoyo: true,
                repeat: 1,
                ease: "back.out(1.5)"
            });
        }
    };
    
    // Create and add the model
    model = createAvatarModel();
    scene.add(model);
    
    // Handle window resize
    function onWindowResize() {
        if (!canvas) return;
        
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    animate();
});