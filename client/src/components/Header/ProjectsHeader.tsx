// src/components/Header.tsx

import React from "react";
import { Link } from "react-router-dom";

const ProjectsHeader: React.FC = () => {
  return (
    <header>
      <h2>Projects</h2>
      <nav>
        <ul>
          <li>
            <Link to="/projects/chess">Chess</Link>
          </li>
          <li>
            <Link to="/projects/face-controller">Face Controller</Link>
          </li>
          <li>
            <Link to="/projects/stock-bot">Stock Bot</Link>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
    </header>
  );
};

export default ProjectsHeader;
