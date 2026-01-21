import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Fade out and complete after logo animation
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Main Content */}
      <div className="splash-content">
        {/* Logo */}
        <div className="splash-logo">
          <svg viewBox="0 0 80 80" fill="none">
            {/* Brain outline */}
            <path
              d="M40 8C24 8 12 18 12 28c0 5 2.5 10 5 13.5C14 44.5 12 48 12 52c0 8 7.5 15 15 15 4 0 7.5-1.5 10-4 2.5 2.5 6 4 10 4 7.5 0 15-7 15-15 0-4-2.5-8.5-5-11 2.5-3.5 5-8.5 5-13.5 0-10-10-20-22-20z"
              stroke="url(#splashBrainGradient)"
              strokeWidth="2.5"
              fill="none"
              className="brain-path"
            />
            {/* Code brackets inside brain */}
            <path
              d="M27 32l-6 8 6 8"
              stroke="url(#splashCodeGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="code-bracket-left"
            />
            <path
              d="M53 32l6 8-6 8"
              stroke="url(#splashCodeGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="code-bracket-right"
            />
            {/* Slash in middle */}
            <path
              d="M35 48l10-20"
              stroke="url(#splashCodeGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="code-slash"
            />
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="splashBrainGradient" x1="12" y1="8" x2="68" y2="72">
                <stop offset="0%" stopColor="#1E88E5" />
                <stop offset="50%" stopColor="#0D47A1" />
                <stop offset="100%" stopColor="#1E88E5" />
              </linearGradient>
              <linearGradient id="splashCodeGradient" x1="20" y1="25" x2="60" y2="55">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name */}
        <div className="splash-brand">
          <span className="splash-brand-main">BrainyTech</span>
          <span className="splash-brand-sub">Vibe Model Switcher 4 GLM</span>
        </div>

        {/* Version */}
        <div className="splash-version">v1.0.0</div>
      </div>
    </div>
  );
};

export default SplashScreen;
