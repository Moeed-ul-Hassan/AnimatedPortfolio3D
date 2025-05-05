import { useEffect, useRef } from "react";

const About = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsRef.current) {
      // Skills pills animation
      const skillsPills = document.querySelectorAll('.skills-pill');
      
      gsap.from(skillsPills, {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%"
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    }
  }, []);

  return (
    <section id="about" className="section min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">About <span className="gradient-text">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="w-full md:w-72 h-72 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl transform rotate-3 opacity-30 absolute top-5 left-5"></div>
              <div className="w-full md:w-72 h-72 mx-auto bg-dark-light border-2 border-gray-700 rounded-2xl relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Developer" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5">
            <h3 className="text-2xl font-bold font-poppins mb-4">Web Developer & Interactive Designer</h3>
            <p className="text-gray-400 mb-6">
              With 3 years of experience in web development, I specialize in creating engaging, animated web experiences 
              that combine beautiful design with smooth functionality. My passion lies in the intersection of 
              creative visuals and technical excellence.
            </p>
            <p className="text-gray-400 mb-8">
              I love working with modern frameworks and technologies to create websites that stand out 
              from the crowd with unique animations and interactive elements.
            </p>
            
            <div className="mb-8" ref={skillsRef}>
              <h4 className="text-xl font-semibold mb-4">My Skills</h4>
              <div className="flex flex-wrap gap-3">
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">JavaScript</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">HTML5</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">CSS3</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">Three.js</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">GSAP</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">Tailwind CSS</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">Responsive Design</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">Vite</span>
              </div>
            </div>
            
            <a href="https://github.com/Moeed-ul-Hassan" target="_blank" rel="noopener noreferrer" className="bg-dark-light hover:bg-dark border border-gray-700 px-6 py-3 rounded-full inline-flex items-center transition-colors duration-300">
              <i className="fab fa-github mr-2"></i> View My GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
