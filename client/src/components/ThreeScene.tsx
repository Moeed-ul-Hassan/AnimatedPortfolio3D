import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

const ThreeScene = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'absolute inset-0 flex items-center justify-center';
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading 3D Model...</p>
      </div>
    `;
    canvasRef.current.appendChild(loadingIndicator);

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 5);
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.mapSize.set(1024, 1024);
    scene.add(directionalLight);
    
    // Add a point light for extra highlights
    const pointLight = new THREE.PointLight(0x6C63FF, 1, 10);
    pointLight.position.set(-1, 2, 2);
    scene.add(pointLight);
    
    // Add another point light with a different color
    const pointLight2 = new THREE.PointLight(0xFF6584, 1, 10);
    pointLight2.position.set(2, 1, -1);
    scene.add(pointLight2);
    
    // Create a low-poly shape as a placeholder for the 3D model
    // This will be displayed until the custom model is loaded or if loading fails
    const placeholder = createPlaceholderModel();
    scene.add(placeholder);
    modelRef.current = placeholder;
    
    // Setup orbit controls for interactive rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controlsRef.current = controls;
    
    // GSAP animation for the placeholder model
    animateModel(placeholder);
    
    // Try to load a custom 3D model
    const loader = new GLTFLoader();
    try {
      loader.load(
        // Replace with the path to your 3D model
        '/assets/cartoon_character.glb',
        (gltf) => {
          // Remove placeholder
          scene.remove(placeholder);
          
          // Add the loaded model
          const model = gltf.scene;
          model.scale.set(1.5, 1.5, 1.5);
          model.position.y = -1;
          
          // Enable shadows for all meshes in the model
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          scene.add(model);
          modelRef.current = model;
          
          // Animate the loaded model
          animateModel(model);
          
          // Hide loading indicator
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
        },
        (xhr) => {
          // Loading progress
          const percent = Math.floor((xhr.loaded / xhr.total) * 100);
          if (loadingIndicator && loadingIndicator.querySelector('p')) {
            loadingIndicator.querySelector('p')!.textContent = `Loading 3D Model... ${percent}%`;
          }
        },
        (error) => {
          // Error loading the model, fallback to placeholder
          console.error('Error loading 3D model:', error);
          if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
          }
        }
      );
    } catch (error) {
      console.error('Failed to initiate 3D model loading:', error);
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Function to create a low-poly placeholder model
    function createPlaceholderModel() {
      // Create a group to hold our geometries
      const group = new THREE.Group();
      
      // Create colorful cube
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const materials = [
        new THREE.MeshStandardMaterial({ color: 0x6C63FF }),
        new THREE.MeshStandardMaterial({ color: 0xFF6584 }),
        new THREE.MeshStandardMaterial({ color: 0x44D7B6 }),
        new THREE.MeshStandardMaterial({ color: 0xFFA6C3 }),
        new THREE.MeshStandardMaterial({ color: 0x6C63FF }),
        new THREE.MeshStandardMaterial({ color: 0xFF6584 })
      ];
      const cube = new THREE.Mesh(geometry, materials);
      cube.castShadow = true;
      cube.receiveShadow = true;
      
      // Add decorative elements (sphere on top)
      const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x44D7B6,
        metalness: 0.7,
        roughness: 0.2 
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.y = 1.5;
      sphere.castShadow = true;
      
      // Create a base/stand
      const baseGeometry = new THREE.CylinderGeometry(1, 1.2, 0.2, 8);
      const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -1;
      base.receiveShadow = true;
      
      // Add all parts to the group
      group.add(cube);
      group.add(sphere);
      group.add(base);
      
      return group;
    }
    
    // Function to animate a model with GSAP
    function animateModel(model: THREE.Object3D) {
      // Float animation
      gsap.to(model.position, {
        y: "+=0.2",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Subtle rotation animation
      gsap.to(model.rotation, {
        y: "+=0.5",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div id="model-canvas" ref={canvasRef} className="rounded-xl overflow-hidden w-full h-full relative">
      {/* Three.js canvas will be appended here */}
    </div>
  );
};

export default ThreeScene;
