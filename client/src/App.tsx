import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    
    if (cursor) {
      const onMouseMove = (e: MouseEvent) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      };
      
      document.addEventListener('mousemove', onMouseMove);
      
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, [isLoading]);
  
  // Loading screen effect
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!isLoading) {
      // Animate sections on scroll
      const sections = document.querySelectorAll('.section');
      
      sections.forEach(section => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            onEnter: () => {
              gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
              });
            }
          }
        });
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold font-poppins mb-2">
            <span className="gradient-text">Moeed-ul-Hassan</span>
          </h2>
          <p className="text-gray-400">Loading awesome experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-opensans text-gray-200 custom-scrollbar">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      
      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${
          showBackToTop ? "scale-100" : "scale-0"
        }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      
      {/* Custom cursor effect */}
      <div className="custom-cursor hidden md:block"></div>
      
      <Toaster />
    </div>
  );
}

export default App;
