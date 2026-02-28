"use client";
import React, { useEffect } from "react";

const NotepadPage = () => {
  useEffect(() => {
    // Dynamically load the Instagram embed script only on this page
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style>{`
        .notepad-secret-body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .notepad-secret-container {
          width: 100%;
          max-width: 540px;
          padding: 16px;
        }
      `}</style>
      <div className="notepad-secret-body">
        <div className="notepad-secret-container">
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DU3tGvXjf6i/"
            data-instgrm-version="14"
            style={{
              background: "#FFF",
              border: 0,
              borderRadius: 3,
              boxShadow:
                "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
              margin: 1,
              maxWidth: 540,
              minWidth: 326,
              padding: 0,
              width: "100%",
            }}
          ></blockquote>
        </div>
      </div>
    </>
  );
};

export default NotepadPage;
