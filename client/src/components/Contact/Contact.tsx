// src/components/Contact.tsx

import React from "react";
import "./Contact.css";
import Header from "../Header/Header";
import HouseFlyImage from "./house_fly.jpeg";

const Contact: React.FC = () => {
  const img = new Image();

  const scriptUrl = import.meta.url;

  // Extract the directory from the URL
  img.src = HouseFlyImage;

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

        <div>
          {/* Render the img element */}
          <img src={img.src} alt="House Fly" />
        </div>
      </main>
    </div>
  );
};

export default Contact;
