// src/components/Contact.tsx

import React from "react";
import "./Contact.css";
import Header from "../Header/Header";

const Contact: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <section id="contact">
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

export default Contact;
