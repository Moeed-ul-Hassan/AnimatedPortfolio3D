import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const ServiceCard = ({ icon, title, description, color }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  }, []);
  
  useEffect(() => {
    if (cardRef.current && isHovered) {
      // Create a particles effect on hover
      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      
      // Create 10 particles
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full z-10 pointer-events-none';
        
        // Random size between 5-10px
        const size = Math.random() * 5 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position at random places near the icon
        const iconEl = card.querySelector('.icon-container');
        if (iconEl) {
          const iconRect = iconEl.getBoundingClientRect();
          
          // Calculate position relative to card
          const relativeX = iconRect.left - cardRect.left + iconRect.width / 2;
          const relativeY = iconRect.top - cardRect.top + iconRect.height / 2;
          
          particle.style.left = `${relativeX}px`;
          particle.style.top = `${relativeY}px`;
          
          // Extract color from the color class
          let particleColor;
          if (color.includes('primary')) {
            particleColor = '#6C63FF';
          } else if (color.includes('secondary')) {
            particleColor = '#FF6584';
          } else if (color.includes('accent')) {
            particleColor = '#44D7B6';
          } else {
            particleColor = '#6C63FF';
          }
          
          particle.style.backgroundColor = particleColor;
          particle.style.opacity = '0.7';
          
          card.appendChild(particle);
          
          // Animate particles flying outward
          gsap.to(particle, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 1 + Math.random(),
            onComplete: () => {
              if (card.contains(particle)) {
                card.removeChild(particle);
              }
            }
          });
        }
      }
    }
  }, [isHovered, color]);
  
  return (
    <div 
      ref={cardRef}
      className={`animated-border bg-dark-light p-8 rounded-xl relative transform transition-all duration-300 hover:scale-105 hover:shadow-xl opacity-0 translate-y-8 overflow-hidden`}
      style={{ transform: "translateY(50px)", opacity: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute top-0 left-0 w-full h-full ${color.replace('bg-', 'bg-')} opacity-5 blur-xl rounded-full scale-150 transition-all duration-300 ${isHovered ? 'scale-200' : 'scale-150'}`}></div>
      
      <div className={`icon-container relative z-10 w-16 h-16 rounded-lg mb-5 flex items-center justify-center ${color} transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
        <i className={`${icon} text-2xl text-white`}></i>
      </div>
      <h3 className="text-xl font-bold font-poppins mb-3 relative z-10">{title}</h3>
      <p className="text-gray-400 relative z-10">{description}</p>
      
      {/* Hover border line */}
      <div className={`absolute bottom-0 left-0 h-1 ${color} transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      // Animate the title on scroll
      gsap.fromTo(
        "#services-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#services-title",
            start: "top 80%"
          },
          ease: "power3.out"
        }
      );
      
      // Animate the title underline with a drawing effect
      gsap.fromTo(
        "#services-underline",
        { width: 0 },
        {
          width: "6rem", // w-24 = 6rem
          duration: 1,
          scrollTrigger: {
            trigger: "#services-title",
            start: "top 80%"
          },
          ease: "power3.inOut",
          delay: 0.3
        }
      );
      
      // Animate the description paragraph
      gsap.fromTo(
        "#services-description",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#services-description",
            start: "top 85%"
          },
          ease: "power3.out",
          delay: 0.5
        }
      );
      
      // Animate the button
      gsap.fromTo(
        "#services-button",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#services-button",
            start: "top 90%"
          },
          ease: "back.out(1.7)",
          delay: 0.2
        }
      );
    }
  }, []);
  
  return (
    <section id="services" ref={sectionRef} className="section py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 id="services-title" className="text-3xl md:text-4xl font-bold font-poppins mb-3">My <span className="gradient-text">Services</span></h2>
          <div id="services-underline" className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p id="services-description" className="text-gray-300 mt-6 max-w-2xl mx-auto">
            I offer a range of services to help brands and individuals establish a strong online presence with engaging and interactive experiences that leave a lasting impression.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon="fas fa-laptop-code"
            title="Web Development"
            description="Custom website development with clean code, responsive design, and optimal performance across all devices."
            color="bg-primary"
          />
          
          <ServiceCard
            icon="fas fa-cubes"
            title="3D Web Experiences"
            description="Interactive 3D elements and experiences that engage users and make your site stand out from the crowd."
            color="bg-accent"
          />
          
          <ServiceCard
            icon="fas fa-paint-brush"
            title="UI/UX Design"
            description="User-centered design solutions with intuitive interfaces and seamless user experiences that drive engagement."
            color="bg-secondary"
          />
          
          <ServiceCard
            icon="fas fa-magic"
            title="Animation & Effects"
            description="Stunning animations and visual effects that bring your website to life and create memorable user experiences."
            color="bg-primary/80"
          />
          
          <ServiceCard
            icon="fas fa-mobile-alt"
            title="Responsive Design"
            description="Fully responsive websites that provide an optimal viewing experience across all devices and screen sizes."
            color="bg-accent/80"
          />
          
          <ServiceCard
            icon="fas fa-bolt"
            title="Performance Optimization"
            description="Website speed and performance optimization to ensure fast loading times and smooth user experience."
            color="bg-secondary/80"
          />
        </div>
        
        <div className="mt-16 text-center">
          <a 
            id="services-button"
            href="#contact" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
          >
            <span>Get In Touch</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;