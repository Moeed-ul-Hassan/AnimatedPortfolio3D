import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const ServiceCard = ({ icon, title, description, color }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
  
  return (
    <div 
      ref={cardRef}
      className={`bg-dark-light p-6 rounded-xl border border-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-lg opacity-0 translate-y-8`}
      style={{ transform: "translateY(50px)", opacity: 0 }}
    >
      <div className={`w-16 h-16 rounded-lg mb-5 flex items-center justify-center ${color}`}>
        <i className={`${icon} text-2xl text-white`}></i>
      </div>
      <h3 className="text-xl font-bold font-poppins mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="section py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">My <span className="gradient-text">Services</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">I offer a range of services to help brands and individuals establish a strong online presence with engaging and interactive experiences.</p>
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
          <a href="#contact" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center">
            <span>Get In Touch</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;