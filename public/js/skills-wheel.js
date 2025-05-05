// Interactive Skills Wheel/Chart
document.addEventListener('DOMContentLoaded', function() {
    // Create the skills wheel section if the skills section exists
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        addSkillsWheel();
    }
    
    function addSkillsWheel() {
        // Create the skills wheel container
        const wheelContainer = document.createElement('div');
        wheelContainer.className = 'skills-wheel-container';
        
        // Add the HTML content
        wheelContainer.innerHTML = `
            <h3 class="gradient-text">Skills Galaxy</h3>
            <p class="wheel-description">An interactive visualization of my technical skills and proficiency levels</p>
            
            <div class="skills-wheel">
                <div class="skills-wheel-outer">
                    <canvas id="skills-wheel-canvas" width="500" height="500"></canvas>
                </div>
                <div class="skills-wheel-inner">
                    <span class="skills-center-text">Skills</span>
                </div>
            </div>
            
            <div class="skills-legend">
                <div class="legend-item">
                    <span class="legend-color" style="background-color: #6c63ff;"></span>
                    <span class="legend-name">Front-end</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background-color: #44d7b6;"></span>
                    <span class="legend-name">3D Technologies</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background-color: #ff6584;"></span>
                    <span class="legend-name">Design</span>
                </div>
                <div class="legend-item">
                    <span class="legend-color" style="background-color: #ffc75f;"></span>
                    <span class="legend-name">Back-end</span>
                </div>
            </div>
        `;
        
        // Skills data structure
        const skillsData = [
            { name: 'HTML', value: 95, color: '#6c63ff', category: 'Front-end' },
            { name: 'CSS', value: 95, color: '#6c63ff', category: 'Front-end' },
            { name: 'JavaScript', value: 90, color: '#6c63ff', category: 'Front-end' },
            { name: 'Three.js', value: 85, color: '#44d7b6', category: '3D Technologies' },
            { name: 'GSAP', value: 88, color: '#44d7b6', category: '3D Technologies' },
            { name: 'UI/UX', value: 80, color: '#ff6584', category: 'Design' },
            { name: 'Responsive Design', value: 92, color: '#6c63ff', category: 'Front-end' },
            { name: 'React', value: 82, color: '#6c63ff', category: 'Front-end' },
            { name: 'Node.js', value: 78, color: '#ffc75f', category: 'Back-end' },
            { name: 'WebGL', value: 75, color: '#44d7b6', category: '3D Technologies' },
            { name: '3D Modeling', value: 70, color: '#44d7b6', category: '3D Technologies' },
            { name: 'Figma', value: 85, color: '#ff6584', category: 'Design' }
        ];
        
        // Find the technical skills section
        const technicalSkills = skillsSection.querySelector('.technical-skills');
        
        if (technicalSkills) {
            // Add the wheel container after the skill bars
            technicalSkills.appendChild(wheelContainer);
            
            // Add styles for the skills wheel
            addSkillsWheelStyles();
            
            // Initialize the skills wheel once the container is added to the DOM
            setTimeout(() => {
                initSkillsWheel(skillsData);
            }, 100);
        }
    }
    
    function addSkillsWheelStyles() {
        // Create a style element
        const style = document.createElement('style');
        
        style.innerHTML = `
            .skills-wheel-container {
                margin-top: 4rem;
                text-align: center;
            }
            
            .wheel-description {
                color: var(--color-text-secondary);
                margin-bottom: 2rem;
                max-width: 500px;
                margin-left: auto;
                margin-right: auto;
            }
            
            .skills-wheel {
                position: relative;
                width: 500px;
                height: 500px;
                margin: 0 auto;
                perspective: 1000px;
            }
            
            .skills-wheel-outer {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                transform-style: preserve-3d;
                animation: float-wheel 8s infinite ease-in-out;
            }
            
            @keyframes float-wheel {
                0%, 100% { transform: translateY(0) rotateX(0deg); }
                50% { transform: translateY(-10px) rotateX(5deg); }
            }
            
            .skills-wheel-inner {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, var(--color-primary), var(--color-secondary));
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 0 30px rgba(108, 99, 255, 0.5),
                            inset 0 0 20px rgba(255, 255, 255, 0.2);
                z-index: 2;
            }
            
            .skills-center-text {
                color: var(--color-white);
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 0.9rem;
            }
            
            .skills-legend {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 1.5rem;
                margin-top: 2rem;
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .legend-color {
                display: block;
                width: 12px;
                height: 12px;
                border-radius: 3px;
            }
            
            .legend-name {
                color: var(--color-text-secondary);
                font-size: 0.9rem;
            }
            
            /* Make responsive */
            @media (max-width: 600px) {
                .skills-wheel {
                    width: 300px;
                    height: 300px;
                }
                
                .skills-wheel-inner {
                    width: 60px;
                    height: 60px;
                }
                
                .skills-center-text {
                    font-size: 0.7rem;
                }
            }
        `;
        
        // Append to head
        document.head.appendChild(style);
    }
    
    function initSkillsWheel(skillsData) {
        const canvas = document.getElementById('skills-wheel-canvas');
        
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 20;
        
        // Define gradient background
        const bgGradient = ctx.createRadialGradient(
            centerX, centerY, radius * 0.4,
            centerX, centerY, radius * 1.2
        );
        bgGradient.addColorStop(0, 'rgba(28, 32, 51, 0.8)');
        bgGradient.addColorStop(1, 'rgba(19, 23, 34, 0.5)');
        
        // Calculate positions for each skill
        const totalSkills = skillsData.length;
        const angleIncrement = (2 * Math.PI) / totalSkills;
        
        // Create interactive elements
        let hoveredSkill = null;
        let animation = null;
        
        // Function to draw the wheel
        function drawWheel() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw background circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = bgGradient;
            ctx.fill();
            ctx.strokeStyle = 'rgba(108, 99, 255, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw grid circles
            const gridCircles = 5;
            for (let i = 1; i <= gridCircles; i++) {
                const gridRadius = (radius / gridCircles) * i;
                ctx.beginPath();
                ctx.arc(centerX, centerY, gridRadius, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Draw grid lines
            for (let i = 0; i < totalSkills; i++) {
                const angle = i * angleIncrement;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(
                    centerX + radius * Math.cos(angle),
                    centerY + radius * Math.sin(angle)
                );
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
            // Draw skill nodes
            for (let i = 0; i < totalSkills; i++) {
                const skill = skillsData[i];
                const angle = i * angleIncrement;
                const distanceFromCenter = (skill.value / 100) * radius;
                
                const x = centerX + distanceFromCenter * Math.cos(angle);
                const y = centerY + distanceFromCenter * Math.sin(angle);
                
                // Draw connecting line
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = skill === hoveredSkill 
                    ? 'rgba(255, 255, 255, 0.8)' 
                    : 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = skill === hoveredSkill ? 2 : 1;
                ctx.stroke();
                
                // Draw node
                const nodeRadius = skill === hoveredSkill ? 10 : 6;
                ctx.beginPath();
                ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
                
                // Create gradient for node
                const nodeGradient = ctx.createRadialGradient(
                    x, y, 0,
                    x, y, nodeRadius
                );
                nodeGradient.addColorStop(0, skill.color);
                nodeGradient.addColorStop(1, skill === hoveredSkill 
                    ? skill.color 
                    : adjustColorOpacity(skill.color, 0.7));
                
                ctx.fillStyle = nodeGradient;
                ctx.fill();
                
                // Add shadow to node
                if (skill === hoveredSkill) {
                    ctx.shadowColor = skill.color;
                    ctx.shadowBlur = 15;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
                
                // Draw skill name
                const textDistance = radius + 15;
                const textX = centerX + textDistance * 0.85 * Math.cos(angle);
                const textY = centerY + textDistance * 0.85 * Math.sin(angle);
                
                ctx.save();
                ctx.translate(textX, textY);
                
                // Adjust text alignment based on position
                if (textX < centerX - 10) {
                    ctx.textAlign = 'right';
                } else if (textX > centerX + 10) {
                    ctx.textAlign = 'left';
                } else {
                    ctx.textAlign = 'center';
                }
                
                if (textY < centerY) {
                    ctx.textBaseline = 'bottom';
                } else {
                    ctx.textBaseline = 'top';
                }
                
                ctx.fillStyle = skill === hoveredSkill ? skill.color : 'rgba(255, 255, 255, 0.7)';
                ctx.font = skill === hoveredSkill ? 'bold 14px Arial' : '12px Arial';
                ctx.fillText(skill.name, 0, 0);
                
                // Draw skill value when hovered
                if (skill === hoveredSkill) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillText(`${skill.value}%`, 0, textY < centerY ? -20 : 20);
                }
                
                ctx.restore();
            }
            
            // Draw skill area
            ctx.beginPath();
            for (let i = 0; i < totalSkills; i++) {
                const skill = skillsData[i];
                const angle = i * angleIncrement;
                const distanceFromCenter = (skill.value / 100) * radius;
                
                const x = centerX + distanceFromCenter * Math.cos(angle);
                const y = centerY + distanceFromCenter * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            
            ctx.closePath();
            
            // Create gradient fill
            const areaGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );
            areaGradient.addColorStop(0, 'rgba(108, 99, 255, 0.3)');
            areaGradient.addColorStop(0.5, 'rgba(68, 215, 182, 0.2)');
            areaGradient.addColorStop(1, 'rgba(255, 101, 132, 0.1)');
            
            ctx.fillStyle = areaGradient;
            ctx.globalAlpha = 0.5;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Handle mouse interactions
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            let foundHoveredSkill = null;
            
            // Check if mouse is over any skill node
            for (let i = 0; i < totalSkills; i++) {
                const skill = skillsData[i];
                const angle = i * angleIncrement;
                const distanceFromCenter = (skill.value / 100) * radius;
                
                const x = centerX + distanceFromCenter * Math.cos(angle);
                const y = centerY + distanceFromCenter * Math.sin(angle);
                
                const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                
                if (distance <= 15) {
                    foundHoveredSkill = skill;
                    break;
                }
            }
            
            if (hoveredSkill !== foundHoveredSkill) {
                hoveredSkill = foundHoveredSkill;
                drawWheel();
                
                // Change cursor
                canvas.style.cursor = hoveredSkill ? 'pointer' : 'default';
            }
        });
        
        // Handle mouse leave
        canvas.addEventListener('mouseleave', function() {
            hoveredSkill = null;
            drawWheel();
            canvas.style.cursor = 'default';
        });
        
        // Handle animation
        function animateWheel() {
            const time = Date.now() * 0.001;
            
            // Subtle movement of skill points
            for (let i = 0; i < skillsData.length; i++) {
                const skill = skillsData[i];
                const originalValue = skill.originalValue || skill.value;
                
                if (!skill.originalValue) {
                    skill.originalValue = skill.value;
                }
                
                // Add a small oscillation to skill values
                const oscillation = Math.sin(time + i * 0.5) * 2;
                skill.value = Math.min(100, Math.max(originalValue - 2, originalValue + oscillation));
            }
            
            drawWheel();
            animation = requestAnimationFrame(animateWheel);
        }
        
        // Start animation
        animateWheel();
        
        // Cleanup on page leave
        window.addEventListener('beforeunload', () => {
            if (animation) {
                cancelAnimationFrame(animation);
            }
        });
        
        // Utility function to adjust color opacity
        function adjustColorOpacity(color, opacity) {
            // If it's a hex color, convert to rgba
            if (color.startsWith('#')) {
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            }
            
            // If it's already rgba, just adjust opacity
            if (color.startsWith('rgba')) {
                return color.replace(/[\d\.]+\)$/, `${opacity})`);
            }
            
            // For other formats like rgb, convert to rgba
            if (color.startsWith('rgb')) {
                return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
            }
            
            return color;
        }
    }
});