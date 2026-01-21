import React from 'react';
import useAppStore from '../store/useAppStore';
// Force refresh - maximize button added

const TitleBar = () => {
  const { setIsSettingsModalOpen, setIsAddModalOpen, profiles } = useAppStore();

  const handleMinimize = () => window.electronAPI?.minimizeWindow();
  const handleMaximize = () => window.electronAPI?.maximizeWindow();
  const handleClose = () => window.electronAPI?.closeWindow();

  return (
    <div className="title-bar">
      <div className="title-bar-left">
        <div className="title-bar-logo">
          {/* Custom BrainyTech Logo - Brain + Code Symbol */}
          <svg viewBox="0 0 32 32" fill="none">
            {/* Brain outline */}
            <path
              d="M16 4C10 4 6 8 6 12c0 2 1 4 2 5.5C7 18.5 6 20 6 22c0 3 3 6 6 6 1.5 0 3-0.5 4-1.5 1 1 2.5 1.5 4 1.5 3 0 6-3 6-6 0-2-1-3.5-2-4.5 1-1.5 2-3.5 2-5.5 0-4-4-8-10-8z"
              stroke="url(#brainGradient)"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Code brackets inside brain */}
            <path
              d="M11 13l-2 3 2 3"
              stroke="url(#codeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 13l2 3-2 3"
              stroke="url(#codeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Slash in middle */}
            <path
              d="M14 19l4-8"
              stroke="url(#codeGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="brainGradient" x1="6" y1="4" x2="26" y2="28">
                <stop offset="0%" stopColor="#1E88E5" />
                <stop offset="100%" stopColor="#0D47A1" />
              </linearGradient>
              <linearGradient id="codeGradient" x1="9" y1="10" x2="23" y2="22">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="title-bar-title">Vibe Model Switcher 4 GLM</span>
      </div>

      <div className="title-bar-right">
        {/* Add Profile Button - Only show when profiles exist */}
        {profiles.length > 0 && (
          <button
            className="add-profile-nav-btn"
            onClick={() => setIsAddModalOpen(true)}
            title="Add New Profile"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Add Profile</span>
          </button>
        )}

        <button
          className="settings-btn"
          onClick={() => setIsSettingsModalOpen(true)}
          title="Settings"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>

        <button className="title-bar-btn" onClick={handleMinimize} title="Minimize">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
          </svg>
        </button>

        <button className="title-bar-btn" onClick={handleMaximize} title="Maximize">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        </button>

        <button className="title-bar-btn close" onClick={handleClose} title="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
