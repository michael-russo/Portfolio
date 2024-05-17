// src/components/Header.tsx

import React from "react";
import { Link } from "react-router-dom";

const ProjectsHeader: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/projects/chess">Chess</Link>
          </li>
          <li>
            <Link to="/projects/webcam">Face Controller</Link>
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
