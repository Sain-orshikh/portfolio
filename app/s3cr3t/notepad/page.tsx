"use client";
import React, { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { CSGuide } from "./components/CSGuide";
import { MyCSPath } from "./components/MyCSPath";
import { InternGuide } from "./components/InternGuide";

const NotepadPage = () => {
  const [currentView, setCurrentView] = useState("home");

  useEffect(() => {
    // Keyboard shortcuts: 1, 2, 3, h for home, space for home
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "1") setCurrentView("csguide");
      if (e.key === "2") setCurrentView("mycspath");
      if (e.key === "3") setCurrentView("internguide");
      if (e.key.toLowerCase() === "h" || e.key === " ") setCurrentView("home");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "csguide":
        return <CSGuide />;
      case "mycspath":
        return <MyCSPath />;
      case "internguide":
        return <InternGuide />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #0B0C10;
          color: #c5c6c7;
          line-height: 1.6;
        }

        .notepad-nav {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          gap: 10px;
          background: rgba(0, 0, 0, 0.8);
          padding: 15px 20px;
          border-radius: 8px;
          border: 1px solid #45A29E;
        }

        .nav-btn {
          padding: 8px 16px;
          background: #1a1a1a;
          color: #66FCF1;
          border: 1px solid #45A29E;
          border-radius: 4px;
          cursor: pointer;
          font-family: Share Tech Mono, monospace;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .nav-btn:hover,
        .nav-btn.active {
          background: #45A29E;
          color: #0B0C10;
          box-shadow: 0 0 10px rgba(102, 252, 241, 0.3);
        }
      `}</style>

      {renderView()}

      <div className="notepad-nav">
        <button
          className={`nav-btn ${currentView === "home" ? "active" : ""}`}
          onClick={() => setCurrentView("home")}
          title="Press H or click"
        >
          🏠 Home
        </button>
        <button
          className={`nav-btn ${currentView === "csguide" ? "active" : ""}`}
          onClick={() => setCurrentView("csguide")}
          title="Press 1 or click"
        >
          1. CS Roadmap
        </button>
        <button
          className={`nav-btn ${currentView === "mycspath" ? "active" : ""}`}
          onClick={() => setCurrentView("mycspath")}
          title="Press 2 or click"
        >
          2. My Journey
        </button>
        <button
          className={`nav-btn ${currentView === "internguide" ? "active" : ""}`}
          onClick={() => setCurrentView("internguide")}
          title="Press 3 or click"
        >
          3. Internship Guide
        </button>
      </div>
    </>
  );
};

export default NotepadPage;
