"use client";
import React, { useEffect, useRef, useState } from "react";
import { birthdayConfig } from "@/src/data/birthday-config";

const BirthdayPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(true);
  const [config] = useState(birthdayConfig);

  // Sound effect generator using Web Audio API
  const audioContext = useRef<AudioContext | null>(null);

  // Initialize and resume audio context on user gesture
  useEffect(() => {
    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    const resumeAudioOnGesture = () => {
      if (audioContext.current && audioContext.current.state === "suspended") {
        audioContext.current.resume();
      }
      // Hide toast and remove listeners after first gesture
      setShowToast(false);
      document.removeEventListener("click", resumeAudioOnGesture);
      document.removeEventListener("touchstart", resumeAudioOnGesture);
      document.removeEventListener("keypress", resumeAudioOnGesture);
    };

    initAudio();
    
    // Add listeners for first user gesture
    document.addEventListener("click", resumeAudioOnGesture);
    document.addEventListener("touchstart", resumeAudioOnGesture);
    document.addEventListener("keypress", resumeAudioOnGesture);

    return () => {
      document.removeEventListener("click", resumeAudioOnGesture);
      document.removeEventListener("touchstart", resumeAudioOnGesture);
      document.removeEventListener("keypress", resumeAudioOnGesture);
    };
  }, []);

  const playTypewriterSound = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContext.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.start(now);
    osc.stop(now + 0.05);
  };

  const playRevealChime = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContext.current;
    const now = ctx.currentTime;

    // Play a celebratory ascending beep
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.3);

      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.3);
    });
  };

  const playCelebrationSound = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContext.current;
    const now = ctx.currentTime;

    // Play a celebratory chord
    const frequencies = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

      osc.start(now);
      osc.stop(now + 0.5);
    });
  };

  // Separate effect for clock - runs once and never clears
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const sysTime = document.getElementById("sys-time");
      if (sysTime) {
        const now = new Date();
        sysTime.innerText = now.toLocaleTimeString();
      }
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    };
  }, []);

  useEffect(() => {
    // Initialize sequence once config is fetched
    const sequenceStarted = containerRef.current?.hasAttribute('data-sequence-started');
    if (sequenceStarted) return;
    if (containerRef.current) {
      containerRef.current.setAttribute('data-sequence-started', 'true');
    }

    // Helper: Sleep
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    // Helper: Typewriter effect
    const typeLine = async (
      text: string,
      speed = 40,
      delayAfter = 400
    ) => {
      const typingText = document.getElementById("typing-text");
      const outputContainer = document.getElementById("output-container");

      if (!typingText || !outputContainer) return;

      typingText.innerHTML = "";
      for (let i = 0; i < text.length; i++) {
        typingText.innerHTML +=
          text.charAt(i) === " " ? "&nbsp;" : text.charAt(i);
        playTypewriterSound();
        await sleep(speed);
      }

      const div = document.createElement("div");
      div.className = "line";
      div.innerHTML = typingText.innerHTML;
      outputContainer.appendChild(div);

      typingText.innerHTML = "";
      await sleep(delayAfter);
    };

    // Progress Bar Animation
    const runProgressBar = (duration: number) => {
      const progressWrapper = document.getElementById("progress-wrapper");
      if (!progressWrapper) return Promise.resolve();

      progressWrapper.style.display = "block";
      return new Promise<void>((resolve) => {
        const startTime = performance.now();

        const update = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          let progress = elapsed / duration;
          if (progress > 1) progress = 1;

          const percentage = Math.floor(progress * 100);
          const progressFill = document.getElementById("progress-fill");
          const progressText = document.getElementById("progress-text");
          const progressStatus = document.getElementById("progress-status");

          if (progressFill)
            progressFill.style.width = percentage + "%";
          if (progressText) progressText.innerText = percentage + "%";
          if (progressStatus) progressStatus.innerText = percentage + "%";

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            resolve();
          }
        };
        requestAnimationFrame(update);
      });
    };

    // Matrix Rain Background
    const initMatrix = () => {
      const canvas = document.getElementById(
        "matrix-canvas"
      ) as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops: number[] = Array(Math.floor(columns)).fill(1);

      const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        requestAnimationFrame(draw);
      };
      draw();
    };

    // Confetti Celebration Effect
    const triggerConfetti = () => {
      const canvas = document.getElementById(
        "confetti-canvas"
      ) as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      interface Particle {
        x: number;
        y: number;
        r: number;
        dx: number;
        dy: number;
        color: string;
        tilt: number;
        tiltAngle: number;
        tiltAngleInc: number;
      }

      const particles: Particle[] = [];
      const colors = ["#0f0", "#0ff", "#ff0", "#f0f", "#fff"];

      for (let i = 0; i < 150; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2 + 100,
          r: Math.random() * 6 + 2,
          dx: Math.random() * 20 - 10,
          dy: Math.random() * -20 - 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10,
          tiltAngle: 0,
          tiltAngleInc: Math.random() * 0.07 + 0.05,
        });
      }

      let animationId: number;

      const drawConfetti = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach((p) => {
          p.tiltAngle += p.tiltAngleInc;
          p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
          p.x += Math.sin(p.tiltAngle) * 2;
          p.dy += 0.2;
          p.x += p.dx;
          p.y += p.dy;

          if (p.y <= canvas.height) active = true;

          ctx.beginPath();
          ctx.lineWidth = p.r;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
          ctx.stroke();
        });

        if (active) {
          animationId = requestAnimationFrame(drawConfetti);
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          cancelAnimationFrame(animationId);
        }
      };
      drawConfetti();
    };

    // Main Sequence Logic
    const runSequence = async () => {
      initMatrix();
      await sleep(1000);

      await typeLine("Initializing Human OS...", 30, 600);
      await typeLine("Connecting to birthday servers...", 30, 800);
      await typeLine("Scanning age database...", 20, 1000);
      await typeLine(`Current version detected: v${config.oldVersion}`, 40, 1000);
      await typeLine("Preparing upgrade package...", 30, 600);

      const progressPromise = runProgressBar(5000);

      await typeLine("Installing Wisdom Module...", 40, 800);
      await typeLine("Installing Charisma Patch...", 40, 800);
      await typeLine("Installing Humor Expansion...", 40, 800);
      await typeLine("Applying Experience Points...", 40, 500);

      await progressPromise;

      await sleep(500);
      await typeLine("Upgrade Complete.", 30, 400);
      await typeLine("Human OS successfully updated.", 30, 400);
      await typeLine(`New Version v${config.newVersion} Installed.`, 30, 800);

      const activeLine = document.getElementById("active-line");
      if (activeLine) activeLine.style.display = "none";

      const revealContainer = document.getElementById("reveal-container");
      if (revealContainer) revealContainer.style.display = "block";

      const nameSlot = document.getElementById("name-slot");
      if (nameSlot) nameSlot.innerText = config.friendName;

      const versionSlot = document.getElementById("version-slot");
      if (versionSlot) versionSlot.innerText = config.newVersion;

      playRevealChime();
      await sleep(300);
      playCelebrationSound();
      triggerConfetti();

      await sleep(2000);
      const btnContainer = document.getElementById("btn-container");
      if (btnContainer) btnContainer.style.display = "block";
    };

    // Setup button handler
    const diagBtn = document.getElementById("diag-btn") as HTMLButtonElement;
    if (diagBtn) {
      diagBtn.addEventListener("click", async () => {
        // If already complete, return to home
        if (diagBtn.innerText === "Diagnostics Complete") {
          window.location.href = "/";
          return;
        }

        diagBtn.disabled = true;
        diagBtn.innerText = "Running...";

        const activeLine = document.getElementById("active-line");
        if (activeLine) activeLine.style.display = "block";

        await typeLine("> Executing post-install diagnostics...", 30, 800);
        await typeLine("System diagnostics complete.", 30, 500);
        await typeLine("Result: Certified Awesome Human.", 30, 500);
        await typeLine("Have an amazing birthday.", 40, 1000);

        diagBtn.disabled = false;
        diagBtn.innerText = "Diagnostics Complete";
        diagBtn.style.cursor = "pointer";
        if (activeLine) activeLine.style.display = "none";
      });
    }

    // Start the sequence
    runSequence();

    // Cleanup
    return () => {};
  }, [config]);

  return (
    <>
      <style>{`
        :root {
          --term-green: #0f0;
          --term-glow: 0 0 10px rgba(0, 255, 0, 0.7);
          --term-bg: rgba(5, 15, 5, 0.85);
          --cyan: #0ff;
        }

        @keyframes fadeInOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: #020202;
          color: var(--term-green);
          font-family: 'Courier New', Courier, monospace;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          user-select: none;
        }

        #matrix-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0.25;
        }

        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.2)
          );
          background-size: 100% 4px;
          z-index: 10;
          pointer-events: none;
        }

        #confetti-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 20;
          pointer-events: none;
        }

        .terminal {
          position: relative;
          z-index: 5;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          margin: 0 auto;
          background: var(--term-bg);
          border: 2px solid var(--term-green);
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 15px rgba(0, 255, 0, 0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          min-height: 400px;
          max-height: 90vh;
          backdrop-filter: blur(4px);
          overflow: hidden;
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed var(--term-green);
          padding-bottom: 10px;
          margin-bottom: 20px;
          font-size: 0.9em;
          opacity: 0.8;
          gap: 10px;
          min-width: 0;
        }

        .terminal-header span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .terminal-header span:last-child {
          flex-shrink: 0;
        }

        #output-container {
          flex-grow: 1;
          overflow-y: auto;
          text-shadow: var(--term-glow);
          line-height: 1.6;
          font-size: 1.1em;
          scrollbar-width: none;
          -ms-overflow-style: none;
          min-height: 0;
        }

        #output-container::-webkit-scrollbar {
          display: none;
        }

        .line {
          margin-bottom: 5px;
        }

        .cursor {
          display: inline-block;
          width: 10px;
          height: 1.2em;
          background-color: var(--term-green);
          vertical-align: bottom;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .progress-wrapper {
          display: none;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .progress-bar-container {
          width: 100%;
          height: 25px;
          border: 2px solid var(--term-green);
          border-radius: 4px;
          position: relative;
          box-shadow: var(--term-glow);
        }

        .progress-fill {
          height: 100%;
          width: 0%;
          background-color: var(--term-green);
          box-shadow: 0 0 10px var(--term-green);
          transition: width 0.1s linear;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          mix-blend-mode: difference;
          font-weight: bold;
        }

        .reveal-container {
          display: none;
          text-align: center;
          margin-top: 20px;
          animation: flicker 2s forwards;
        }

        .birthday-title {
          color: var(--cyan);
          font-size: 2.5em;
          text-shadow: 0 0 15px var(--cyan);
          margin-bottom: 10px;
          font-weight: bold;
        }

        .birthday-subtitle {
          font-size: 1.3em;
          color: var(--term-green);
          text-shadow: var(--term-glow);
        }

        @keyframes flicker {
          0% { opacity: 0; }
          10% { opacity: 1; }
          20% { opacity: 0; }
          30% { opacity: 1; }
          40% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .btn-container {
          text-align: center;
          margin-top: 30px;
          display: none;
        }

        .btn {
          background: transparent;
          color: var(--term-green);
          border: 2px solid var(--term-green);
          padding: 10px 20px;
          font-family: inherit;
          font-size: 1em;
          cursor: pointer;
          box-shadow: var(--term-glow);
          transition: all 0.3s ease;
          text-transform: uppercase;
        }

        .btn:hover {
          background: var(--term-green);
          color: #000;
          box-shadow: 0 0 20px var(--term-green);
        }
      `}</style>

      <div ref={containerRef}>
        <canvas id="matrix-canvas"></canvas>
        <div className="scanlines"></div>
        <canvas id="confetti-canvas"></canvas>

        {/* Sound Notification Toast */}
        {showToast && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 100,
              padding: "12px 24px",
              background: "rgba(5, 15, 5, 0.95)",
              border: "2px solid #0f0",
              borderRadius: "8px",
              color: "#0f0",
              fontSize: "14px",
              fontFamily: "'Courier New', monospace",
              textShadow: "0 0 10px rgba(0, 255, 0, 0.7)",
              animation: "fadeInOut 4s ease-in-out forwards",
              cursor: "pointer",
            }}
            onClick={() => setShowToast(false)}
          >
            Click anywhere to hear sound (beep warning!!!)
          </div>
        )}

        <div className="terminal">
          <div className="terminal-header">
            <span>root@human-os:~</span>
            <span id="sys-time">00:00:00</span>
          </div>

          <div id="output-container"></div>

          <div
            id="active-line"
            style={{
              textShadow: "var(--term-glow)",
              fontSize: "1.1em",
              marginBottom: "5px",
            }}
          >
            <span id="typing-text"></span>
            <span className="cursor"></span>
          </div>

          <div className="progress-wrapper" id="progress-wrapper">
            <div>
              System Upgrade Status: <span id="progress-status">0%</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-fill" id="progress-fill"></div>
              <div className="progress-text" id="progress-text">
                0%
              </div>
            </div>
          </div>

          <div className="reveal-container" id="reveal-container">
            <div className="birthday-title">
              🎉 HAPPY BIRTHDAY <span id="name-slot"></span> 🎉
            </div>
            <div className="birthday-subtitle">
              Human OS v<span id="version-slot"></span> Activated
            </div>
          </div>

          <div className="btn-container" id="btn-container">
            <button className="btn" id="diag-btn">
              Run Diagnostics
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthdayPage;
