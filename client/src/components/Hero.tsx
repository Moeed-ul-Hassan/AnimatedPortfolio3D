import { useEffect, useRef } from "react";
import { smoothScrollTo } from "@/lib/utils";
import ThreeScene from "@/components/ThreeScene";
import useTypewriter from "@/hooks/useTypewriter";
import gsap from "gsap";

const Hero = () => {
  const typewriterText = useTypewriter([
    "Web Developer",
    "Interactive Designer",
    "3D Enthusiast",
    "Animation Expert"
  ], 80, 1000);

  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Create floating particles
  useEffect(() => {
    if (particlesRef.current) {
      const particlesContainer = particlesRef.current;
      
      // Create particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        
        // Random size between 3px and 8px
        const size = Math.random() * 5 + 3;
        
        particle.className = 'absolute rounded-full';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random color
        const colors = ['#6C63FF', '#FF6584', '#44D7B6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = randomColor;
        particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Animate with GSAP
        gsap.to(particle, {
          x: `${(Math.random() - 0.5) * 100}px`,
          y: `${(Math.random() - 0.5) * 100}px`,
          duration: 5 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5
        });
      }
    }
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      // Create a timeline for better sequence control
      const tl = gsap.timeline();
      
      // Initial animation for hero section elements
      tl.fromTo(
        "#hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.2
      )
      .fromTo(
        "#hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.4
      )
      .fromTo(
        "#hero-buttons",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.6
      )
      .fromTo(
        "#hero-social",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.8
      );
      
      // Add continuous subtle floating animation to elements
      gsap.to("#hero-title", {
        y: "-=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to("#hero-subtitle", {
        y: "-=8",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3
      });
      
      // Add a shine effect to the gradient text
      const shine = document.createElement('div');
      shine.className = 'absolute inset-0 overflow-hidden';
      shine.innerHTML = '<div class="shine-effect"></div>';
      const title = document.querySelector('#hero-title');
      if (title) {
        title.appendChild(shine);
      }
      
      // Animate the shine effect
      gsap.to(".shine-effect", {
        x: "200%",
        duration: 3,
        repeat: -1,
        ease: "power2.inOut",
        delay: 1,
        repeatDelay: 5
      });
      
      // Add hover effects to buttons
      const buttons = document.querySelectorAll('#hero-buttons a');
      buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.5)"
          });
        });
        
        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.5)"
          });
        });
      });
      
      // Add hover effects to social icons
      const socialIcons = document.querySelectorAll('#hero-social a');
      socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          gsap.to(icon, {
            y: -5,
            duration: 0.3,
            ease: "back.out(1.5)"
          });
        });
        
        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            y: 0,
            duration: 0.3,
            ease: "back.out(1.5)"
          });
        });
      });
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="section min-h-screen flex flex-col justify-center items-center pt-16 md:pt-0 overflow-hidden relative">
      {/* Floating particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-light/30 to-dark opacity-50"></div>
      
      <div className="container relative z-10 mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0 relative">
          {/* Decorative elements */}
          <div className="hidden md:block absolute -left-10 -top-20 w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
          <div className="hidden md:block absolute -right-10 bottom-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl"></div>
          
          <p className="text-accent font-medium mb-2 animate-pulse">Hello, I'm</p>
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold font-poppins mb-4 relative">
            <span className="gradient-text">Moeed-ul-Hassan</span>
          </h1>
          <div className="h-12 mb-4">
            <p className="text-2xl font-semibold mb-3">
              {typewriterText}
              <span className="cursor"></span>
            </p>
          </div>
          <p id="hero-subtitle" className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
            Web developer with a passion for creating interactive, animated experiences that engage users and tell compelling stories.
          </p>
          <div id="hero-buttons" className="flex flex-wrap justify-center md:justify-start gap-4">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("projects");
              }}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center shadow-lg shadow-primary/20"
            >
              View My Work
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("contact");
              }}
              className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-primary/10"
            >
              Contact Me
            </a>
          </div>
          <div id="hero-social" className="flex mt-8 space-x-6 justify-center md:justify-start">
            <a href="https://github.com/Moeed-ul-Hassan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-all duration-300 transform hover:scale-110">
              <i className="fab fa-dribbble text-2xl"></i>
            </a>
          </div>
        </div>
        <div className="md:w-1/2 canvas-container relative">
          {/* Decorative glow behind 3D scene */}
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
          <ThreeScene />
        </div>
      </div>
      
      <div className="mt-16 animate-bounce">
        <a 
          href="#about" 
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("about");
          }}
          className="text-gray-400 hover:text-primary transition-colors duration-300 bg-dark-light/50 p-3 rounded-full hover:bg-dark-light"
        >
          <i className="fas fa-chevron-down text-xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
