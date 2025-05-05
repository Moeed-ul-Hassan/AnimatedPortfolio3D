import { useState, useEffect, useRef } from "react";
import { fetchGitHubProjects } from "@/lib/utils";
import gsap from "gsap";

type Project = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
};

// Fallback projects in case GitHub API fails
const fallbackProjects = [
  {
    id: 1,
    name: "E-commerce Dashboard",
    description: "A responsive dashboard for e-commerce analytics with interactive charts and real-time data visualization.",
    html_url: "https://github.com/Moeed-ul-Hassan",
    homepage: null,
    language: "JavaScript",
    stars: 5,
    forks: 2
  },
  {
    id: 2,
    name: "3D Product Visualizer",
    description: "An interactive 3D product visualization tool using Three.js with customizable colors and viewing angles.",
    html_url: "https://github.com/Moeed-ul-Hassan",
    homepage: null,
    language: "JavaScript",
    stars: 4,
    forks: 1
  },
  {
    id: 3,
    name: "Weather App",
    description: "A beautifully animated weather application with location detection and 5-day forecast visualization.",
    html_url: "https://github.com/Moeed-ul-Hassan",
    homepage: null,
    language: "JavaScript",
    stars: 3,
    forks: 0
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const githubProjects = await fetchGitHubProjects("Moeed-ul-Hassan");
        if (githubProjects.length > 0) {
          setProjects(githubProjects);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    if (projectsRef.current && !loading) {
      // Project cards stagger animation
      const projectCards = document.querySelectorAll('.project-card');
      
      gsap.from(projectCards, {
        scrollTrigger: {
          trigger: '#projects',
          start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  }, [loading, projects]);

  // Function to get random technology tags based on the project language
  const getTechnologyTags = (language: string | null) => {
    const baseTags = [language || "HTML"];
    const possibleTags = ["Tailwind CSS", "GSAP", "Chart.js", "Three.js", "API Integration", "Responsive Design", "WebGL"];
    
    // Add 1-2 random tags
    const additionalTagsCount = Math.floor(Math.random() * 2) + 1;
    const shuffledTags = [...possibleTags].sort(() => 0.5 - Math.random());
    
    return [...baseTags, ...shuffledTags.slice(0, additionalTagsCount)];
  };

  return (
    <section id="projects" className="section min-h-screen py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">My <span className="gradient-text">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Showcasing some of my recent work. Each project represents my passion for creating engaging web experiences.</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={projectsRef}>
            {projects.map((project) => {
              const tags = getTechnologyTags(project.language);
              return (
                <div key={project.id} className="project-card bg-dark-light rounded-xl overflow-hidden border border-gray-800">
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/30 to-secondary/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className={`text-5xl ${project.language === "JavaScript" ? "fab fa-js" : 
                                             project.language === "TypeScript" ? "fab fa-js-square" : 
                                             project.language === "HTML" ? "fab fa-html5" : 
                                             project.language === "CSS" ? "fab fa-css3-alt" : 
                                             "fas fa-code"} text-white opacity-30`}></i>
                    </div>
                    {project.id === projects[0].id && (
                      <div className="absolute top-0 right-0 bg-accent text-dark font-semibold text-xs px-3 py-1">Featured</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-poppins mb-2">{project.name}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors duration-300 flex items-center">
                        <i className="fas fa-code mr-1"></i> View Code
                      </a>
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors duration-300 flex items-center">
                          <i className="fas fa-external-link-alt mr-1"></i> Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a href="https://github.com/Moeed-ul-Hassan" target="_blank" rel="noopener noreferrer" className="bg-dark-light hover:bg-dark border border-gray-700 px-6 py-3 rounded-full inline-flex items-center transition-colors duration-300">
            <i className="fab fa-github mr-2"></i> View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
