import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header>
      <h1>Michael Russo's Portfolio</h1>
      <nav>
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
