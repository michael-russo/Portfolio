import React from "react";

import "./App.css";
import { Header } from "./components";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <p> Todo </p>
      </main>
    </div>
  );
};

export default App;
