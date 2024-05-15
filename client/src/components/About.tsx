import React from "react";
import "./About.css";
import Header from "./Header";

const About: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <section id="about">
          <h2>About Me</h2>
          <p>
            Hello! I am a software engineer with a passion for developing
            innovative programs. I've got experience in a variety of languages
            and frameworks, and I'm always eager to learn more.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
