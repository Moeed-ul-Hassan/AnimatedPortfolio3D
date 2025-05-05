// ThreeJS Scene for 3D Modeling in the portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element
    const canvas = document.getElementById('three-canvas');
    
    // Check if canvas exists
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Create avatar model or fallback
    let model;
    
    try {
        createAvatarModel();
    } catch (error) {
        console.error("Error loading 3D model:", error);
        createFallbackModel();
    }
    
    // Function to create the avatar model
    function createAvatarModel() {
        // Placeholder model - a more complex avatar should be loaded here
        const geometry = new THREE.BoxGeometry(1.5, 2, 1.5);
        
        // Create a texture from the profile image
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('/assets/profile.jpg', function(texture) {
            const materials = [
                new THREE.MeshStandardMaterial({ color: 0x6c63ff }), // Right side
                new THREE.MeshStandardMaterial({ color: 0x6c63ff }), // Left side
                new THREE.MeshStandardMaterial({ color: 0x6c63ff }), // Top side
                new THREE.MeshStandardMaterial({ color: 0x6c63ff }), // Bottom side
                new THREE.MeshStandardMaterial({ map: texture }), // Front side with image
                new THREE.MeshStandardMaterial({ color: 0x6c63ff }) // Back side
            ];
            
            model = new THREE.Mesh(geometry, materials);
            scene.add(model);
            
            // Animate the model
            animateModel(model);
        });
    }
    
    // Function to create a fallback model if the avatar fails to load
    function createFallbackModel() {
        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0x6c63ff,
            emissive: 0x272727,
            specular: 0xffffff,
            shininess: 30
        });
        
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
        
        // Add some decorative elements
        const ringGeometry = new THREE.TorusGeometry(2, 0.1, 16, 50);
        const ringMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xff6584,
            transparent: true,
            opacity: 0.7
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);
        
        // Animate the model
        animateModel(model);
        
        // Also animate the ring
        function animateRing() {
            requestAnimationFrame(animateRing);
            ring.rotation.z += 0.01;
        }
        
        animateRing();
    }
    
    // Function to animate the model
    function animateModel(modelToAnimate) {
        // Add floating animation using GSAP
        gsap.to(modelToAnimate.position, {
            y: 0.3,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
        
        gsap.to(modelToAnimate.rotation, {
            y: Math.PI * 2,
            duration: 15,
            ease: "none",
            repeat: -1
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    function onWindowResize() {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    
    animate();
});