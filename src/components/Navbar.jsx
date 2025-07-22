import React from "react";

export default function Navbar({ theme, setTheme }) {
  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-content">
        <span className="navbar-title">Text Analyzer</span>
        <button
          className="theme-toggle-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </nav>
  );
}