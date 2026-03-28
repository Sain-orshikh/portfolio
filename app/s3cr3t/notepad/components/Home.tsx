'use client';

const homeStyles = `
  .home-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .home-bg-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/computer%20science.webp');
    background-size: cover;
    background-position: center;
    z-index: -2;
  }

  .home-bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(11, 12, 16, 0.95) 0%, rgba(11, 12, 16, 0.75) 100%);
    z-index: -1;
  }

  .home-header {
    text-align: center;
    margin-bottom: 60px;
    margin-top: 40px;
  }

  .home-h1 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 2.8em;
    color: #66FCF1;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(102, 252, 241, 0.5);
    min-height: 1.2em;
  }

  .home-cursor {
    display: inline-block;
    width: 12px;
    height: 1em;
    background-color: #66FCF1;
    vertical-align: bottom;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .home-subtitle {
    font-size: 1.2em;
    color: #e0e2e4;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    width: 100%;
    margin-bottom: auto;
  }

  .home-card {
    background: rgba(11, 12, 16, 0.6);
    border: 1px solid #45A29E;
    border-radius: 8px;
    padding: 30px;
    text-decoration: none;
    color: #ffffff;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background: none;
    font-family: inherit;
  }

  .home-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #66FCF1;
    transition: width 0.3s ease;
    z-index: -1;
    opacity: 0.1;
  }

  .home-card:hover {
    transform: translateY(-5px);
    border-color: #66FCF1;
    box-shadow: 0 10px 20px rgba(102, 252, 241, 0.15);
  }

  .home-card:hover::before {
    width: 100%;
    opacity: 0.05;
  }

  .home-card-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.5em;
    color: #66FCF1;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .home-card-desc {
    color: #c5c6c7;
    font-size: 1em;
    line-height: 1.6;
    margin: 0;
  }
`;

export const Home = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  return (
    <>
      <style>{homeStyles}</style>
      <div className="home-bg-image"></div>
      <div className="home-bg-overlay"></div>
      <div className="home-container">
        <header className="home-header">
          <h1 className="home-h1">
            <span className="home-cursor"></span> Welcome to the CS Hub_
          </h1>
          <p className="home-subtitle">A strategic roadmap for high school students aiming to engineer the future.</p>
        </header>

        <div className="home-grid">
          <button className="home-card" onClick={() => onNavigate('csguide')}>
            <h2 className="home-card-title">01. The CS Roadmap</h2>
            <p className="home-card-desc">Discover the tiered extracurricular strategy top global universities look for, from foundational math to real-world impact.</p>
          </button>

          <button className="home-card" onClick={() => onNavigate('mycspath')}>
            <h2 className="home-card-title">02. My Journey</h2>
            <p className="home-card-desc">View my path from learning basic code to building production-ready digital infrastructure for national organizations.</p>
          </button>

          <button className="home-card" onClick={() => onNavigate('internguide')}>
            <h2 className="home-card-title">03. Internship Guide</h2>
            <p className="home-card-desc">Actionable steps for high schoolers to network, cold email, and land highly competitive technical internships.</p>
          </button>
        </div>
      </div>
    </>
  );
};
