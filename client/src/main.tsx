import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import required libraries
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Make libraries available globally
window.THREE = THREE;
window.OrbitControls = OrbitControls;
window.GLTFLoader = GLTFLoader;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

createRoot(document.getElementById("root")!).render(<App />);
