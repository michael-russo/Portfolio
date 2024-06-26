// src/Routes.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { About, Chess, Contact, Projects, WebcamGame } from "./components";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/portfolio" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/chess" element={<Chess />} />
        <Route path="/projects/webcam" element={<WebcamGame />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
