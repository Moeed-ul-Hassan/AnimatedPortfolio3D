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

  return (
    <div 
      ref={cardRef}
      className="bg-dark-light rounded-xl p-6 border border-gray-800 opacity-0"
      style={{ transform: "translateY(30px)", opacity: 0 }}
    >
      <div className="flex space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-400 text-sm">{position}</p>
          <p className="text-primary text-xs">{company}</p>
        </div>
      </div>
      <div className="relative">
        <i className="fas fa-quote-left text-4xl text-primary opacity-20 absolute -top-2 -left-1"></i>
        <p className="text-gray-300 italic relative pl-3">{quote}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 2;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);

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
    <section id="testimonials" className="section py-20 bg-gradient-to-b from-dark-light to-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">Client <span className="gradient-text">Testimonials</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">See what clients have to say about working with me and the results they've achieved.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <div className="flex justify-center items-center mt-10 space-x-4">
          <button 
            onClick={handlePrevious}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-dark-light transition-colors duration-300"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full ${
                  currentPage === index ? "bg-primary" : "bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-dark-light transition-colors duration-300"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;