// src/components/Projects.tsx

import React from "react";
import "./Projects.css";

const Projects: React.FC = () => {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="project">
        <h3>Project One</h3>
        <p>A brief description of Project One.</p>
      </div>
      <div className="project">
        <h3>Project Two</h3>
        <p>A brief description of Project Two.</p>
      </div>
    </section>
  );
};

export default Projects;
