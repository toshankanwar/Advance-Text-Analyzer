import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TextAnalyzer from "./components/TextAnalyzer";
import AboutSection from "./components/AboutSection";

import "./App.css";


function App() {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`app-root ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="main-content">
        <TextAnalyzer theme={theme} />
        <AboutSection theme={theme} />
      </main>
      <Footer theme={theme} />
    </div>
  );
}

export default App;