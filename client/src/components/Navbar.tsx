import { useState, useEffect } from "react";
import { smoothScrollTo } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (id: string) => {
    smoothScrollTo(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar fixed w-full top-0 z-50 ${scrolled ? 'bg-dark-light bg-opacity-80' : 'bg-transparent'} border-b border-gray-800 transition-all duration-300`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="#" onClick={() => handleNavClick("home")} className="text-2xl font-bold font-poppins gradient-text">
            Moeed<span className="text-gray-200">.</span>
          </a>
          
          <div className="hidden md:flex space-x-8">
            <a href="#home" onClick={() => handleNavClick("home")} className="hover:text-primary transition-colors duration-300">Home</a>
            <a href="#about" onClick={() => handleNavClick("about")} className="hover:text-primary transition-colors duration-300">About</a>
            <a href="#projects" onClick={() => handleNavClick("projects")} className="hover:text-primary transition-colors duration-300">Projects</a>
            <a href="#contact" onClick={() => handleNavClick("contact")} className="hover:text-primary transition-colors duration-300">Contact</a>
          </div>
          
          <button className="md:hidden text-xl" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden w-full bg-dark-light bg-opacity-95 border-b border-gray-800 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <a href="#home" onClick={() => handleNavClick("home")} className="hover:text-primary transition-colors duration-300">Home</a>
            <a href="#about" onClick={() => handleNavClick("about")} className="hover:text-primary transition-colors duration-300">About</a>
            <a href="#projects" onClick={() => handleNavClick("projects")} className="hover:text-primary transition-colors duration-300">Projects</a>
            <a href="#contact" onClick={() => handleNavClick("contact")} className="hover:text-primary transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
