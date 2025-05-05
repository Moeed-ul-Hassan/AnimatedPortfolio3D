import { useEffect, useRef } from "react";
import gsap from "gsap";

const About = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
    
    // Stats animation
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll('.stat-number');
      
      statElements.forEach(stat => {
        const targetNumber = parseInt(stat.textContent || '0', 10);
        gsap.fromTo(stat, 
          { textContent: '0' },
          {
            textContent: targetNumber.toString(),
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
            },
            onUpdate: function() {
              stat.textContent = Math.ceil(parseFloat(stat.textContent || '0')).toString();
            }
          }
        );
      });
    }
    
    // Timeline animation
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      
      gsap.from(timelineItems, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.4,
        ease: "power3.out"
      });
    }
  }, []);

  return (
    <section id="about" className="section py-20 bg-dot-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">About <span className="gradient-text">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Get to know more about me, my background, and what drives my passion for creating amazing web experiences.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/5">
            <div className="relative">
              <div className="w-full md:w-72 h-72 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl transform rotate-3 opacity-30 absolute top-5 left-5"></div>
              <div className="w-full md:w-72 h-72 mx-auto bg-dark-light border-2 border-gray-700 rounded-2xl relative overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1617042375876-a13e36732a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Developer" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5">
            <h3 className="text-2xl font-bold font-poppins mb-4 gradient-text">Web Developer & Interactive Designer</h3>
            <p className="text-gray-300 mb-6">
              With 3 years of experience in web development, I specialize in creating engaging, animated web experiences 
              that combine beautiful design with smooth functionality. My passion lies in the intersection of 
              creative visuals and technical excellence.
            </p>
            <p className="text-gray-400 mb-8">
              I love working with modern frameworks and technologies to create websites that stand out 
              from the crowd with unique animations and interactive elements that leave a lasting impression.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="mb-2"><span className="font-semibold text-gray-200 mr-2">Name:</span>Moeed-ul-Hassan</p>
                <p className="mb-2"><span className="font-semibold text-gray-200 mr-2">Experience:</span>3 Years</p>
                <p className="mb-2"><span className="font-semibold text-gray-200 mr-2">Freelance:</span>Available</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-semibold text-gray-200 mr-2">Email:</span>moeed@example.com</p>
                <p className="mb-2"><span className="font-semibold text-gray-200 mr-2">From:</span>Pakistan</p>
                <p className="mb-2"><span className="font-semibold text-gray-200 mr-2">Languages:</span>English, Urdu</p>
              </div>
            </div>
            
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
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">3D Modeling</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">WebGL</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">React</span>
                <span className="skills-pill px-4 py-2 bg-dark-light border border-primary text-primary rounded-full">Vite</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 inline-flex items-center">
                <i className="fas fa-envelope mr-2"></i> Contact Me
              </a>
              <a href="https://github.com/Moeed-ul-Hassan" target="_blank" rel="noopener noreferrer" className="bg-dark-light hover:bg-dark border border-gray-700 px-6 py-3 rounded-full inline-flex items-center transition-colors duration-300">
                <i className="fab fa-github mr-2"></i> View My GitHub
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="bg-dark-light p-6 rounded-lg border border-gray-800 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="stat-number text-4xl font-bold text-primary mb-2">15</h3>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          
          <div className="bg-dark-light p-6 rounded-lg border border-gray-800 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="stat-number text-4xl font-bold text-primary mb-2">12</h3>
            <p className="text-gray-400">Happy Clients</p>
          </div>
          
          <div className="bg-dark-light p-6 rounded-lg border border-gray-800 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="stat-number text-4xl font-bold text-primary mb-2">3</h3>
            <p className="text-gray-400">Years Experience</p>
          </div>
          
          <div className="bg-dark-light p-6 rounded-lg border border-gray-800 text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="stat-number text-4xl font-bold text-primary mb-2">5</h3>
            <p className="text-gray-400">Awards Received</p>
          </div>
        </div>
        
        {/* Education & Experience Timeline */}
        <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-6 gradient-text">Education</h3>
            
            <div className="relative pl-8 pb-8 border-l border-gray-800 timeline-item">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
              <div className="bg-dark-light p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition-colors duration-300">
                <p className="text-primary text-sm mb-1">2018 - 2022</p>
                <h4 className="text-lg font-bold mb-2">Bachelor of Computer Science</h4>
                <p className="text-gray-400">National University of Computer and Emerging Sciences, Pakistan</p>
              </div>
            </div>
            
            <div className="relative pl-8 border-l border-gray-800 timeline-item">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
              <div className="bg-dark-light p-6 rounded-lg border border-gray-800 hover:border-primary/50 transition-colors duration-300">
                <p className="text-primary text-sm mb-1">2017 - 2018</p>
                <h4 className="text-lg font-bold mb-2">Web Development Bootcamp</h4>
                <p className="text-gray-400">Tech Academy, Online</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold font-poppins mb-6 gradient-text">Experience</h3>
            
            <div className="relative pl-8 pb-8 border-l border-gray-800 timeline-item">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
              <div className="bg-dark-light p-6 rounded-lg border border-gray-800 hover:border-secondary/50 transition-colors duration-300">
                <p className="text-secondary text-sm mb-1">2022 - Present</p>
                <h4 className="text-lg font-bold mb-2">Senior Web Developer</h4>
                <p className="text-gray-400">Creative Solutions, Remote</p>
              </div>
            </div>
            
            <div className="relative pl-8 border-l border-gray-800 timeline-item">
              <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
              <div className="bg-dark-light p-6 rounded-lg border border-gray-800 hover:border-secondary/50 transition-colors duration-300">
                <p className="text-secondary text-sm mb-1">2020 - 2022</p>
                <h4 className="text-lg font-bold mb-2">Frontend Developer</h4>
                <p className="text-gray-400">Digital Innovations, Islamabad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
