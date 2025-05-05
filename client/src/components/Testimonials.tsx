import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TestimonialProps {
  quote: string;
  name: string;
  position: string;
  company: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Moeed created an exceptional website for our company, incorporating 3D elements that truly brought our brand to life. The animations and interactivity are beyond what we imagined possible for a website.",
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechVision Inc.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Working with Moeed was a fantastic experience. His attention to detail and creative approach to web design resulted in a website that not only looks amazing but also performs exceptionally well.",
    name: "David Chen",
    position: "Product Manager",
    company: "Innovate Solutions",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Our e-commerce site needed a complete overhaul, and Moeed delivered beyond our expectations. The interactive elements he added have significantly improved user engagement and conversion rates.",
    name: "Emma Rodriguez",
    position: "E-commerce Lead",
    company: "StyleTrend",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Moeed's expertise in both design and development is rare to find. He created a 3D interactive product showcase for our website that has completely transformed how customers interact with our products.",
    name: "Michael Thompson",
    position: "CEO",
    company: "Digital Craft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

const TestimonialCard = ({ quote, name, position, company, image }: TestimonialProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%"
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      });
    }
  }, []);
  
  useEffect(() => {
    if (quoteRef.current && isHovered) {
      // Animate the quote text when hovered
      const words = quoteRef.current.innerText.split(' ');
      quoteRef.current.innerHTML = ''; // Clear the content
      
      words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word + ' ';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(10px)';
        quoteRef.current!.appendChild(wordSpan);
        
        gsap.to(wordSpan, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          delay: index * 0.02,
          ease: "power3.out"
        });
      });
    }
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="bg-dark-light rounded-xl p-8 border border-gray-800 hover:border-primary/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 opacity-0 relative overflow-hidden group"
      style={{ transform: "translateY(30px)", opacity: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary opacity-5 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary opacity-5 rounded-full blur-xl transition-transform duration-500 group-hover:scale-150"></div>
      
      <div className="flex space-x-4 mb-6 relative z-10">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 transition-transform duration-300 group-hover:scale-110 shadow-lg">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{name}</h4>
          <p className="text-gray-400 text-sm">{position}</p>
          <p className="text-primary text-xs">{company}</p>
        </div>
      </div>
      <div className="relative">
        <i className="fas fa-quote-left text-4xl text-primary opacity-20 absolute -top-2 -left-1 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[-10deg]"></i>
        <p 
          ref={quoteRef} 
          className="text-gray-300 italic relative pl-3 z-10"
        >
          {quote}
        </p>
        <div className="h-1 w-0 bg-gradient-to-r from-primary to-secondary mt-4 transition-all duration-700 group-hover:w-1/2"></div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 2;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      // Animate section title
      gsap.fromTo(
        "#testimonials-title",
        { y: 30, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: "#testimonials-title",
            start: "top 80%"
          },
          ease: "power3.out"
        }
      );
      
      // Animate the title underline with a drawing effect
      gsap.fromTo(
        "#testimonials-underline",
        { width: 0 },
        {
          width: "6rem", // w-24 = 6rem
          duration: 1,
          scrollTrigger: {
            trigger: "#testimonials-title",
            start: "top 80%"
          },
          ease: "power3.inOut",
          delay: 0.3
        }
      );
      
      // Animate description
      gsap.fromTo(
        "#testimonials-description",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: "#testimonials-description",
            start: "top 85%"
          },
          ease: "power3.out",
          delay: 0.5
        }
      );
    }
  }, []);

  // Animation for page change
  useEffect(() => {
    if (cardsContainerRef.current) {
      // Animate out current cards and animate in new cards
      gsap.fromTo(
        cardsContainerRef.current,
        { opacity: 0.5, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? pageCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === pageCount - 1 ? 0 : prev + 1));
  };

  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  return (
    <section ref={sectionRef} id="testimonials" className="section py-20 bg-gradient-to-b from-dark-light to-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-20 h-20 bg-primary opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-0 w-40 h-40 bg-secondary opacity-10 rounded-full blur-xl transform translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 id="testimonials-title" className="text-3xl md:text-4xl font-bold font-poppins mb-3">Client <span className="gradient-text">Testimonials</span></h2>
          <div id="testimonials-underline" className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p id="testimonials-description" className="text-gray-300 mt-6 max-w-2xl mx-auto">See what clients have to say about working with me and the results they've achieved with my services.</p>
        </div>

        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-12 space-x-6">
          <button 
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center bg-dark-light/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 shadow-lg group"
            aria-label="Previous testimonials"
          >
            <i className="fas fa-arrow-left group-hover:text-primary"></i>
          </button>
          
          <div className="flex space-x-3">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index 
                    ? "bg-primary w-6" 
                    : "bg-gray-600 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center bg-dark-light/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 shadow-lg group"
            aria-label="Next testimonials"
          >
            <i className="fas fa-arrow-right group-hover:text-primary"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;