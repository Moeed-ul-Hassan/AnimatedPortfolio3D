import { useEffect, useRef } from "react";
import { smoothScrollTo } from "@/lib/utils";
import ThreeScene from "@/components/ThreeScene";
import useTypewriter from "@/hooks/useTypewriter";
import gsap from "gsap";

const Hero = () => {
  const typewriterText = useTypewriter([
    "Web Developer",
    "Interactive Designer",
    "3D Enthusiast"
  ], 100, 1000);

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      // Initial animation for hero section elements
      gsap.fromTo(
        "#hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.fromTo(
        "#hero-subtitle",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
      
      gsap.fromTo(
        "#hero-buttons",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.6 }
      );
      
      gsap.fromTo(
        "#hero-social",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      );
    }
  }, []);

  return (
    <section id="home" ref={heroRef} className="section min-h-screen flex flex-col justify-center items-center pt-16 md:pt-0">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <p className="text-accent font-medium mb-2">Hello, I'm</p>
          <h1 id="hero-title" className="text-4xl md:text-6xl font-bold font-poppins mb-4">
            <span className="gradient-text">Moeed-ul-Hassan</span>
          </h1>
          <div className="h-12 mb-4">
            <p className="text-2xl font-semibold mb-3">
              {typewriterText}
              <span className="cursor"></span>
            </p>
          </div>
          <p id="hero-subtitle" className="text-gray-400 mb-6 max-w-md mx-auto md:mx-0">
            Web developer with a passion for creating interactive, animated experiences that engage users and tell compelling stories.
          </p>
          <div id="hero-buttons" className="flex flex-wrap justify-center md:justify-start gap-4">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("projects");
              }}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center"
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
              className="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
          <div id="hero-social" className="flex mt-8 space-x-4 justify-center md:justify-start">
            <a href="https://github.com/Moeed-ul-Hassan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
        <div className="md:w-1/2 canvas-container">
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
          className="text-gray-400 hover:text-primary transition-colors duration-300"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
