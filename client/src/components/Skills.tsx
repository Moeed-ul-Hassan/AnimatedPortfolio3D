import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
}

const SkillBar = ({ name, percentage, color }: SkillBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: 0 },
        {
          width: `${percentage}%`,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
          }
        }
      );
    }
  }, [percentage]);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold">{name}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-dark-light rounded-full">
        <div 
          ref={barRef}
          className={`h-full rounded-full ${color}`}
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const technicalSkillsRef = useRef<HTMLDivElement>(null);
  const softSkillsRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="skills" className="section py-20 bg-gradient-to-b from-dark to-dark-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-3">My <span className="gradient-text">Skills</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Here's a more detailed breakdown of my technical expertise and soft skills that I bring to every project.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Technical Skills */}
          <div ref={technicalSkillsRef}>
            <h3 className="text-2xl font-bold font-poppins mb-6 gradient-text">Technical Skills</h3>
            
            <SkillBar name="HTML & CSS" percentage={95} color="bg-primary" />
            <SkillBar name="JavaScript" percentage={90} color="bg-primary" />
            <SkillBar name="Three.js" percentage={85} color="bg-primary" />
            <SkillBar name="GSAP Animations" percentage={88} color="bg-primary" />
            <SkillBar name="React" percentage={82} color="bg-primary" />
            <SkillBar name="Responsive Design" percentage={95} color="bg-primary" />
            <SkillBar name="UI/UX Design" percentage={80} color="bg-primary" />
          </div>
          
          {/* Soft Skills & Additional Information */}
          <div ref={softSkillsRef}>
            <h3 className="text-2xl font-bold font-poppins mb-6 gradient-text">Software & Tools</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-dark p-4 rounded-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-2">
                  <i className="fas fa-code text-3xl text-accent"></i>
                </div>
                <h4 className="text-lg font-semibold text-center">VS Code</h4>
                <p className="text-gray-400 text-sm text-center">Primary IDE</p>
              </div>
              
              <div className="bg-dark p-4 rounded-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-2">
                  <i className="fab fa-figma text-3xl text-accent"></i>
                </div>
                <h4 className="text-lg font-semibold text-center">Figma</h4>
                <p className="text-gray-400 text-sm text-center">UI Design</p>
              </div>
              
              <div className="bg-dark p-4 rounded-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-2">
                  <i className="fab fa-git-alt text-3xl text-accent"></i>
                </div>
                <h4 className="text-lg font-semibold text-center">Git</h4>
                <p className="text-gray-400 text-sm text-center">Version Control</p>
              </div>
              
              <div className="bg-dark p-4 rounded-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-2">
                  <i className="fas fa-cube text-3xl text-accent"></i>
                </div>
                <h4 className="text-lg font-semibold text-center">Blender</h4>
                <p className="text-gray-400 text-sm text-center">3D Modeling</p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold font-poppins mb-6 gradient-text">Soft Skills</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-accent mr-3"></i>
                <span>Problem Solving & Critical Thinking</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-accent mr-3"></i>
                <span>Communication & Collaboration</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-accent mr-3"></i>
                <span>Time Management & Organization</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-accent mr-3"></i>
                <span>Attention to Detail</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-accent mr-3"></i>
                <span>Adaptability & Learning Attitude</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;