// src/components/Contact.tsx

import React from "react";
import "./Chess.css";
import Header from "../../Header/Header";
import ProjectsHeader from "../../Header/ProjectsHeader";

const Chess: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <ProjectsHeader />
      <main>
        <section id="chess">
          <h2>Contact</h2>
          <p>
            You can reach me at{" "}
            <a href="mailto:youremail@example.com">youremail@example.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Chess;
