// src/components/Contact.tsx

import React from "react";
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <p>
        You can reach me at{" "}
        <a href="mailto:youremail@example.com">youremail@example.com</a>.
      </p>
    </section>
  );
};

export default Contact;
