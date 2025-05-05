// ThreeJS Scene for 3D Modeling in the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const canvas = document.getElementById('three-canvas');
    
    // Check if canvas exists
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    // Scene setup with fog effect
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1c2033, 0.05);
    
    // Camera setup with improved perspective
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 0.5;
    
    // Enhanced renderer with higher quality
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true,
        precision: 'highp'
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Rich lighting setup for dramatic effects
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x6c63ff, 1.5, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xff6584, 1.5, 10);
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);
    
    // Mouse interaction setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isMouseOver = false;
    let rotationSpeed = 0.01;
    let targetRotationY = 0;
    let defaultRotationSpeed = 0.01;
    
    // Add stars/particles to the background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create avatar model or fallback
    let model;
    
    try {
        createAvatarModel();
    } catch (error) {
        console.error("Error loading 3D model:", error);
        createFallbackModel();
    }
    
    // Function to create the avatar model with enhanced aesthetics
    function createAvatarModel() {
        // Enhanced geometry for more detail
        const geometry = new THREE.BoxGeometry(2.0, 2.5, 2.0);
        
        // Create a texture from the profile image with enhanced loading
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/assets/profile.jpg', function(texture) {
            // Enhance texture quality
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            texture.minFilter = THREE.LinearFilter;
            
            const materials = [
                new THREE.MeshStandardMaterial({ 
                    color: 0x6c63ff,
                    roughness: 0.5,
                    metalness: 0.8
                }), // Right side
                new THREE.MeshStandardMaterial({ 
                    color: 0x6c63ff,
                    roughness: 0.5,
                    metalness: 0.8
                }), // Left side
                new THREE.MeshStandardMaterial({ 
                    color: 0x6c63ff,
                    roughness: 0.5,
                    metalness: 0.8
                }), // Top side
                new THREE.MeshStandardMaterial({ 
                    color: 0x6c63ff,
                    roughness: 0.5,
                    metalness: 0.8
                }), // Bottom side
                new THREE.MeshStandardMaterial({ 
                    map: texture,
                    roughness: 0.3,
                    metalness: 0.5
                }), // Front side with image
                new THREE.MeshStandardMaterial({ 
                    color: 0x6c63ff,
                    roughness: 0.5,
                    metalness: 0.8
                }) // Back side
            ];
            
            model = new THREE.Mesh(geometry, materials);
            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);
            
            // Add an orbit around the model
            const orbitGeometry = new THREE.RingGeometry(3, 3.1, 64);
            const orbitMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x6c63ff, 
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.rotation.x = Math.PI / 2;
            scene.add(orbit);
            
            // Start animation
            animateModel(model);
        });
    }
    
    // Create fallback model (low-poly geometric shape with floating rings)
    function createFallbackModel() {
        const tetraGeometry = new THREE.TetrahedronGeometry(2, 0);
        const tetraMaterial = new THREE.MeshStandardMaterial({
            color: 0x6c63ff,
            wireframe: false,
            roughness: 0.3,
            metalness: 0.8
        });
        
        model = new THREE.Mesh(tetraGeometry, tetraMaterial);
        scene.add(model);
        
        // Add floating rings around the shape
        const ring1 = new THREE.Mesh(
            new THREE.TorusGeometry(3, 0.1, 16, 50),
            new THREE.MeshStandardMaterial({
                color: 0x44d7b6,
                emissive: 0x44d7b6,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.8
            })
        );
        
        const ring2 = new THREE.Mesh(
            new THREE.TorusGeometry(2.5, 0.05, 16, 50),
            new THREE.MeshStandardMaterial({
                color: 0xff6584,
                emissive: 0xff6584,
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.6
            })
        );
        
        ring1.rotation.x = Math.PI / 2;
        ring2.rotation.x = Math.PI / 3;
        ring2.rotation.y = Math.PI / 4;
        
        scene.add(ring1);
        scene.add(ring2);
        
        // Animate rings independently
        function animateRing() {
            ring1.rotation.z += 0.01;
            ring2.rotation.z -= 0.008;
            ring2.rotation.x += 0.005;
            
            requestAnimationFrame(animateRing);
        }
        
        animateRing();
        animateModel(model);
    }
    
    // Enhanced animation with interactive response to mouse
    function animateModel(modelToAnimate) {
        if (!modelToAnimate) return;
        
        // Add mouse interaction events
        canvas.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX - canvas.getBoundingClientRect().left) / canvas.clientWidth * 2 - 1;
            mouse.y = -((event.clientY - canvas.getBoundingClientRect().top) / canvas.clientHeight) * 2 + 1;
            
            // Use mouse position to influence model rotation
            targetRotationY = mouse.x * 1.5;
        });
        
        canvas.addEventListener('mouseenter', () => {
            isMouseOver = true;
            rotationSpeed = 0.02; // Speed up rotation on hover
        });
        
        canvas.addEventListener('mouseleave', () => {
            isMouseOver = false;
            rotationSpeed = defaultRotationSpeed; // Return to default speed
        });
        
        // Touch events for mobile
        canvas.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                mouse.x = (event.touches[0].clientX - canvas.getBoundingClientRect().left) / canvas.clientWidth * 2 - 1;
                mouse.y = -((event.touches[0].clientY - canvas.getBoundingClientRect().top) / canvas.clientHeight) * 2 + 1;
                
                targetRotationY = mouse.x * 1.5;
            }
        });
    }
    
    // Handle window resize - keep scene responsive
    function onWindowResize() {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Animate particles slowly
        particlesMesh.rotation.y += 0.0005;
        
        // Rotate model based on mouse position if interactive
        if (model) {
            if (isMouseOver) {
                // Smooth interpolation to target rotation
                model.rotation.y += (targetRotationY - model.rotation.y) * 0.05;
            } else {
                // Regular rotation when not interacting
                model.rotation.y += rotationSpeed;
            }
            
            // Add some gentle bobbing motion
            model.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        }
        
        // Point lights animation
        if (pointLight1 && pointLight2) {
            pointLight1.position.x = Math.sin(Date.now() * 0.001) * 3;
            pointLight1.position.z = Math.cos(Date.now() * 0.001) * 3;
            
            pointLight2.position.x = Math.sin(Date.now() * 0.001 + Math.PI) * 3;
            pointLight2.position.z = Math.cos(Date.now() * 0.001 + Math.PI) * 3;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
});
