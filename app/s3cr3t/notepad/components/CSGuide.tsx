'use client';

const csGuideStyles = `
  .cs-guide-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-size: cover;
    background-position: center;
    z-index: -2;
  }

  .cs-guide-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(11, 12, 16, 0.96) 0%, rgba(11, 12, 16, 0.88) 100%);
    z-index: -1;
  }

  .cs-guide-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 0;
  }

  .cs-guide-h1 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 2.2em;
    text-align: center;
    text-shadow: 0 0 10px rgba(102, 252, 241, 0.5);
    margin-bottom: 5px;
    color: #66FCF1;
  }

  .cs-guide-subtitle {
    text-align: center;
    color: #e0e2e4;
    margin-bottom: 40px;
    font-size: 1.1em;
  }

  .cs-guide-card {
    background: rgba(11, 12, 16, 0.6);
    border: 1px solid #45A29E;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 25px;
    backdrop-filter: blur(5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.4);
  }

  .cs-guide-card h2 {
    margin-top: 0;
    border-bottom: 1px solid rgba(69, 162, 158, 0.3);
    padding-bottom: 10px;
    font-size: 1.4em;
    color: #66FCF1;
    font-family: 'Share Tech Mono', monospace;
  }

  .cs-guide-card p {
    margin: 0;
    color: #c5c6c7;
    line-height: 1.6;
  }

  .cs-guide-card p + p {
    margin-top: 15px;
  }

  .cs-guide-card ul {
    padding-left: 20px;
  }

  .cs-guide-card li {
    margin-bottom: 10px;
    color: #c5c6c7;
  }

  .cs-guide-strong {
    color: #ffffff;
  }

  .cs-guide-pro-tip {
    border-left: 4px solid #66FCF1;
    background: rgba(102, 252, 241, 0.05);
    padding: 15px;
    margin-top: 20px;
    font-style: italic;
    color: #e0e2e4;
  }

  .back-btn {
    display: inline-block;
    padding: 8px 16px;
    background: #1a1a1a;
    color: #66FCF1;
    border: 1px solid #45A29E;
    border-radius: 4px;
    cursor: pointer;
    font-family: Share Tech Mono, monospace;
    font-size: 12px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    background: #45A29E;
    color: #0B0C10;
  }

  @media (min-width: 641px) {
    .back-btn {
      display: none;
    }
  }
`;

export const CSGuide = ({ onBack }: { onBack?: () => void }) => {
  return (
    <>
      <style>{csGuideStyles}</style>
      <div className="cs-guide-wrapper"></div>
      <div className="cs-guide-overlay"></div>
      <div className="cs-guide-container">
        {onBack && <button className="back-btn" onClick={onBack}>← Back</button>}
        <header>
          <h1 className="cs-guide-h1">Building a Competitive CS Profile</h1>
          <div className="cs-guide-subtitle">A Roadmap for High School Students Aiming for Top Global Universities</div>
        </header>

        <div className="cs-guide-card">
          <h2>&gt; The Core Philosophy: Impact Over Quantity</h2>
          <p>Top international universities are not looking for a laundry list of 10 different coding clubs. They want to see students who use technology to solve real-world problems. The key is progression: moving from learning, to building, to creating measurable impact.</p>
          <p><span className="cs-guide-strong">Remember:</span> Computer Science is applied math. Excelling in advanced mathematics is just as important as knowing how to code.</p>
        </div>

        <div className="cs-guide-card">
          <h2>&gt; Tier 1: Exploration & Foundations (Grades 8-9)</h2>
          <ul>
            <li><span className="cs-guide-strong">Online Courses:</span> Take free introductory courses like Harvard's CS50 or basic web development bootcamps.</li>
            <li><span className="cs-guide-strong">Join or Start a Club:</span> Join a school robotics team (e.g., VEX Robotics). <em>If your school lacks a Coding, AI, or Game Design club, create one to demonstrate early leadership!</em></li>
            <li><span className="cs-guide-strong">Foundational Competitions:</span> Participate in accessible challenges like the American Math Olympiad (AMO) or junior science olympiads.</li>
          </ul>
        </div>

        <div className="cs-guide-card">
          <h2>&gt; Tier 2: Building & Application (Grades 10-11)</h2>
          <ul>
            <li><span className="cs-guide-strong">Personal Projects:</span> Build an app, website, or tool from scratch to solve a real-world problem.</li>
            <li><span className="cs-guide-strong">Competitive Programming:</span> Step up to rigorous programming contests like the USA Computing Olympiad (USACO).</li>
            <li><span className="cs-guide-strong">Open Source Contributions:</span> Contribute code to public projects on platforms like GitHub.</li>
          </ul>
        </div>

        <div className="cs-guide-card">
          <h2>&gt; Tier 3: Real-World Impact & Research (Grades 11-12)</h2>
          <ul>
            <li><span className="cs-guide-strong">Internships & Technical Volunteering:</span> Seek internships at local tech companies. Offer to build robust apps or databases for local organizations.</li>
            <li><span className="cs-guide-strong">Research Projects:</span> Work with a mentor or university professor on academic CS research (AI, Machine Learning, Cybersecurity).</li>
            <li><span className="cs-guide-strong">Community Infrastructure:</span> Architect full-stack solutions. <em>Example: Replacing scattered spreadsheets with a custom platform for a national robotics tournament.</em></li>
          </ul>
          <div className="cs-guide-pro-tip">
            <span className="cs-guide-strong">Pro Tip:</span> Making an app "work" on your computer is easy. The real learning happens when your code breaks in production right before a massive launch. Colleges want to see resilience!
          </div>
        </div>
      </div>
    </>
  );
};
