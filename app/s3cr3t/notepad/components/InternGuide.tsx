'use client';

const internGuideStyles = `
  .intern-wrapper {
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

  .intern-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(11, 12, 16, 0.96) 0%, rgba(11, 12, 16, 0.88) 100%);
    z-index: -1;
  }

  .intern-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 0;
  }

  .intern-h1 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 2.2em;
    text-align: center;
    text-shadow: 0 0 10px rgba(102, 252, 241, 0.5);
    margin-bottom: 5px;
    color: #66FCF1;
  }

  .intern-subtitle {
    text-align: center;
    color: #e0e2e4;
    margin-bottom: 40px;
    font-size: 1.1em;
  }

  .intern-card {
    background: rgba(11, 12, 16, 0.6);
    border: 1px solid #45A29E;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 25px;
    backdrop-filter: blur(5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.4);
  }

  .intern-card h2 {
    margin-top: 0;
    border-bottom: 1px solid rgba(69, 162, 158, 0.3);
    padding-bottom: 10px;
    font-size: 1.4em;
    color: #66FCF1;
    font-family: 'Share Tech Mono', monospace;
  }

  .intern-card p {
    margin-top: 0;
    color: #c5c6c7;
    line-height: 1.6;
  }

  .intern-card p + p {
    margin-top: 15px;
  }

  .intern-strong {
    color: #ffffff;
  }

  .intern-pro-tip {
    border-left: 4px solid #66FCF1;
    background: rgba(102, 252, 241, 0.05);
    padding: 15px;
    margin-top: 20px;
    font-style: italic;
    color: #e0e2e4;
  }
`;

export const InternGuide = () => {
  return (
    <>
      <style>{internGuideStyles}</style>
      <div className="intern-wrapper"></div>
      <div className="intern-overlay"></div>
      <div className="intern-container">
        <header>
          <h1 className="intern-h1">Landing a High School Internship</h1>
          <div className="intern-subtitle">Actionable Steps for Students to Gain Real-World Experience</div>
        </header>

        <div className="intern-card">
          <h2>&gt; 1. Prepare Your Materials</h2>
          <p>Before you start reaching out, you need to show what you bring to the table. Create a professional, one-page resume.</p>
          <p>Even if you lack formal work experience, you can highlight your education, GPA, extracurricular activities, technical skills, and most importantly, <span className="intern-strong">personal projects</span>. A functional app or website you built yourself is often more impressive than a generic part-time job.</p>
        </div>

        <div className="intern-card">
          <h2>&gt; 2. Leverage Your Network</h2>
          <p>The "hidden job market" is real. Start by informing the adults in your life that you are actively searching for an internship.</p>
          <p>Talk to your teachers, guidance counselors, family friends, and neighbors. They may work at a company that needs a tech-savvy high schooler, or they might be able to introduce you to local connections.</p>
        </div>

        <div className="intern-card">
          <h2>&gt; 3. Cold Email & Call Organizations</h2>
          <p>Do not wait for an internship to be posted. Many local businesses, non-profits, and even university professors do not actively advertise high school internships, but they would gladly accept help from a driven student.</p>
          <p>Research organizations in your field of interest and email them directly. Keep it brief: state who you are, what skills you offer, and ask for a short chat about potential opportunities.</p>
        </div>

        <div className="intern-card">
          <h2>&gt; 4. Utilize Online Platforms</h2>
          <p>Treat your internship hunt like a real job search. Set up a professional profile on platforms like <span className="intern-strong">LinkedIn</span> to connect with local professionals.</p>
          <p>Search job boards like Glassdoor and Indeed using keywords like "High School Intern." Look into specialized platforms like StandOut Search, designed for high school opportunities.</p>
        </div>

        <div className="intern-card">
          <h2>&gt; 5. Consider Formal Programs</h2>
          <p>Many large tech companies, research institutions, and government agencies have structured, formal internship programs specifically built for high schoolers.</p>
          <p>These are highly competitive and have strict deadlines. Research these early and treat the application process with the same seriousness as a college application.</p>
        </div>

        <div className="intern-pro-tip">
          <span className="intern-strong">Pro Tip:</span> Rejection is part of the process. You might send out 30 cold emails and only get 2 replies. Focus on your perseverance—the goal is to find just one organization willing to give you a chance!
        </div>
      </div>
    </>
  );
};
