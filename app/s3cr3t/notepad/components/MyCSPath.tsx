'use client';

const myCSPathStyles = `
  .mypath-wrapper {
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

  .mypath-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(11, 12, 16, 0.96) 0%, rgba(11, 12, 16, 0.88) 100%);
    z-index: -1;
  }

  .mypath-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 0;
  }

  .mypath-h1 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 2.2em;
    text-align: center;
    text-shadow: 0 0 10px rgba(102, 252, 241, 0.5);
    margin-bottom: 5px;
    color: #66FCF1;
  }

  .mypath-subtitle {
    text-align: center;
    color: #e0e2e4;
    margin-bottom: 40px;
    font-size: 1.1em;
  }

  .mypath-timeline {
    position: relative;
  }

  .mypath-card {
    background: rgba(11, 12, 16, 0.6);
    border: 1px solid #45A29E;
    border-left: 4px solid #66FCF1;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 25px;
    backdrop-filter: blur(5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.4);
  }

  .mypath-card h2 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 1.4em;
    border: none;
    padding: 0;
    color: #66FCF1;
    font-family: 'Share Tech Mono', monospace;
  }

  .mypath-role {
    font-family: 'Share Tech Mono', monospace;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 15px;
    display: block;
    opacity: 0.8;
    font-size: 0.95em;
  }

  .mypath-card p {
    margin: 0;
    color: #c5c6c7;
    line-height: 1.6;
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

export const MyCSPath = ({ onBack }: { onBack?: () => void }) => {
  return (
    <>
      <style>{myCSPathStyles}</style>
      <div className="mypath-wrapper"></div>
      <div className="mypath-overlay"></div>
      <div className="mypath-container">
        {onBack && <button className="back-btn" onClick={onBack}>← Back</button>}
        <header>
          <h1 className="mypath-h1">My Computer Science Journey</h1>
          <div className="mypath-subtitle">From learning to code to building production-ready infrastructure</div>
        </header>

        <div className="mypath-timeline">
          <div className="mypath-card">
            <h2>Mongolian Robot Association</h2>
            <span className="mypath-role">Lead Developer</span>
            <p>Engineered a centralized, full-stack digital platform from the ground up to handle national tournament registrations and secure fee processing, eliminating manual bottlenecks.</p>
          </div>
          <div className="mypath-card">
            <h2>Erxes LLC</h2>
            <span className="mypath-role">Front-End Engineer Intern</span>
            <p>Developed CRM and facility booking platforms, and implemented secure authentication protocols to resolve interface bugs for a district government portal.</p>
          </div>
          <div className="mypath-card">
            <h2>Misheel Orshikh LLC</h2>
            <span className="mypath-role">Software Engineer Intern</span>
            <p>Collaborated on a frontend dashboard for an IoT electric metering system, programmed real-time telemetry charts, and contributed to a complete homepage UI redesign.</p>
          </div>
          <div className="mypath-card">
            <h2>Mongol Aspiration International School</h2>
            <span className="mypath-role">Lead Web Developer</span>
            <p>Architected and launched a dynamic, custom Content Management System (CMS) to fully replace the administration's legacy website infrastructure.</p>
          </div>
          <div className="mypath-card">
            <h2>Study Simple</h2>
            <span className="mypath-role">Head of Web Developers</span>
            <p>Migrated a static webpage into a custom full-stack educational platform, complete with integrated study tools and a resource marketplace for students.</p>
          </div>
          <div className="mypath-card">
            <h2>Passion Project Club</h2>
            <span className="mypath-role">Web Development Lead</span>
            <p>Led a student development team, conducting rigorous code reviews and teaching industry standards like React and Git so members could confidently build their own projects.</p>
          </div>
        </div>
      </div>
    </>
  );
};
