"use client";

import { useState, useEffect } from "react";

export default function Loading() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((v) => (v + 1) % 3);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="durxan-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading DURXAN"
    >
      <div className="durxan-loader-inner">
        <div className="durxan-loader-mark">
          <div className="durxan-loader-ring durxan-loader-ring--outer" />
          <div className="durxan-loader-ring durxan-loader-ring--mid" />
          <div className="durxan-loader-ring durxan-loader-ring--inner" />

          <div className="durxan-loader-icon">
            {/* Robotics */}
            <svg
              className={active === 0 ? "active" : ""}
              viewBox="0 0 60 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="15" y="8" width="30" height="28" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <rect x="10" y="38" width="40" height="36" rx="4" stroke="currentColor" strokeWidth="1.6" />
              <line x1="20" y1="74" x2="20" y2="88" stroke="currentColor" strokeWidth="1.6" />
              <line x1="40" y1="74" x2="40" y2="88" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="23" cy="20" r="1.8" fill="currentColor" />
              <circle cx="37" cy="20" r="1.8" fill="currentColor" />
            </svg>

            {/* Autonomous — drone */}
            <svg
              className={active === 1 ? "active" : ""}
              viewBox="0 0 100 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M38 22 L62 22 L70 30 L62 38 L38 38 L30 30 Z" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="50" cy="30" r="4" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="50" cy="30" r="1.6" fill="currentColor" />
              <line x1="38" y1="22" x2="18" y2="12" stroke="currentColor" strokeWidth="1.6" />
              <line x1="62" y1="22" x2="82" y2="12" stroke="currentColor" strokeWidth="1.6" />
              <line x1="38" y1="38" x2="18" y2="48" stroke="currentColor" strokeWidth="1.6" />
              <line x1="62" y1="38" x2="82" y2="48" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="14" cy="10" r="6" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="86" cy="10" r="6" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="14" cy="50" r="6" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="86" cy="50" r="6" stroke="currentColor" strokeWidth="1.4" />
            </svg>

            {/* Software — node graph */}
            <svg
              className={active === 2 ? "active" : ""}
              viewBox="0 0 100 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="50" y1="45" x2="20" y2="20" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
              <line x1="50" y1="45" x2="80" y2="20" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
              <line x1="50" y1="45" x2="20" y2="70" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
              <line x1="50" y1="45" x2="80" y2="70" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
              <line x1="50" y1="45" x2="50" y2="8" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
              <circle cx="50" cy="45" r="8" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="50" cy="45" r="2.2" fill="currentColor" />
              <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="80" cy="20" r="5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="20" cy="70" r="5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="80" cy="70" r="5" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="50" cy="8" r="5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        </div>

        <div className="durxan-loader-wordmark">DURXAN</div>
        <div className="durxan-loader-sub">
          LOADING <span>·</span> INTELLIGENCE, ENGINEERED FOR THE REAL WORLD
        </div>
      </div>
    </div>
  );
}