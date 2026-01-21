import React, { useState, useEffect } from 'react';
import useAppStore from '../store/useAppStore';

const SettingsModal = () => {
  const { settings, isSettingsModalOpen, setIsSettingsModalOpen, saveSettings, initialize } = useAppStore();

  const [claudePath, setClaudePath] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (settings?.claude_path) {
      setClaudePath(settings.claude_path);
    }
    setError('');
    setSuccess('');
  }, [settings, isSettingsModalOpen]);

  const handleBrowse = async () => {
    const path = await window.electronAPI.selectFolder();
    if (path) {
      setClaudePath(path);
      validatePath(path);
    }
  };

  const validatePath = async (path) => {
    setIsValidating(true);
    setError('');
    setSuccess('');

    const result = await window.electronAPI.validatePath(path);

    if (result.valid) {
      if (result.hasSettingsFile) {
        setSuccess('Valid path with existing settings.json');
      } else {
        setSuccess('Valid path (no settings.json found yet)');
      }
    } else {
      setError(result.error);
    }

    setIsValidating(false);
  };

  const handlePathChange = (e) => {
    const path = e.target.value;
    setClaudePath(path);
    if (path.length > 3) {
      validatePath(path);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!claudePath.trim()) {
      setError('Claude path is required');
      return;
    }

    setIsSubmitting(true);

    const validation = await window.electronAPI.validatePath(claudePath);
    if (!validation.valid) {
      setError(validation.error);
      setIsSubmitting(false);
      return;
    }

    const result = await saveSettings(claudePath.trim());

    if (result.success) {
      await initialize();
    } else {
      setError(result.error || 'Failed to save settings');
    }

    setIsSubmitting(false);
  };

  const handleClose = () => {
    // Don't allow close if no settings configured (first run)
    if (!settings) {
      return;
    }
    setIsSettingsModalOpen(false);
  };

  if (!isSettingsModalOpen) return null;

  // First run - show welcome setup screen
  const isFirstRun = !settings;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className={`modal ${isFirstRun ? 'setup-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
        {isFirstRun ? (
          <>
            {/* Welcome Header */}
            <div className="setup-header">
              <div className="setup-logo">
                <svg viewBox="0 0 80 80" fill="none">
                  <path
                    d="M40 8C24 8 12 18 12 28c0 5 2.5 10 5 13.5C14 44.5 12 48 12 52c0 8 7.5 15 15 15 4 0 7.5-1.5 10-4 2.5 2.5 6 4 10 4 7.5 0 15-7 15-15 0-4-2.5-8.5-5-11 2.5-3.5 5-8.5 5-13.5 0-10-10-20-22-20z"
                    stroke="url(#setupBrainGradient)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path d="M27 32l-6 8 6 8" stroke="url(#setupCodeGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M53 32l6 8-6 8" stroke="url(#setupCodeGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M35 48l10-20" stroke="url(#setupCodeGradient)" strokeWidth="2.5" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="setupBrainGradient" x1="12" y1="8" x2="68" y2="72">
                      <stop offset="0%" stopColor="#1E88E5" />
                      <stop offset="100%" stopColor="#0D47A1" />
                    </linearGradient>
                    <linearGradient id="setupCodeGradient" x1="20" y1="25" x2="60" y2="55">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="100%" stopColor="#FFA000" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h1 className="setup-title">Welcome to BrainyTech</h1>
              <p className="setup-subtitle">Vibe Model Switcher 4 GLM</p>
            </div>

            <div className="setup-content">
              <p className="setup-description">
                Let's get started! First, we need to know where your Claude CLI config folder is located.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', marginRight: '6px', verticalAlign: 'middle' }}>
                      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                    </svg>
                    Claude Config Folder
                  </label>
                  <div className="form-input-group">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="C:\Users\username\.claude"
                      value={claudePath}
                      onChange={handlePathChange}
                    />
                    <button type="button" className="browse-btn" onClick={handleBrowse}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      Browse
                    </button>
                  </div>
                  {isValidating && <p className="form-success"><span className="validating-dot"></span> Validating...</p>}
                  {error && <p className="form-error"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>{error}</p>}
                  {success && !error && <p className="form-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', marginRight: '4px', verticalAlign: 'middle' }}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>{success}</p>}
                </div>

                <div className="setup-hint">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <span>Usually located at <code>C:\Users\[username]\.claude</code></span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary setup-btn"
                  disabled={isSubmitting || isValidating || !claudePath.trim()}
                >
                  {isSubmitting ? (
                    <><span className="btn-spinner"></span> Setting up...</>
                  ) : (
                    <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px', marginRight: '8px' }}><path d="M5 12h14M12 5l7 7-7 7" /></svg> Get Started</>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            {/* Regular Settings Modal */}
            <div className="modal-header">
              <h2 className="modal-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                Settings
              </h2>
              <button className="modal-close" onClick={handleClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px', marginRight: '6px', verticalAlign: 'middle' }}>
                    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                  </svg>
                  Claude Config Path
                </label>
                <div className="form-input-group">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="C:\Users\username\.claude"
                    value={claudePath}
                    onChange={handlePathChange}
                  />
                  <button type="button" className="browse-btn" onClick={handleBrowse}>
                    Browse
                  </button>
                </div>
                {isValidating && <p className="form-success">Validating...</p>}
                {error && <p className="form-error">{error}</p>}
                {success && !error && <p className="form-success">{success}</p>}
              </div>

              <div className="setup-hint" style={{ marginBottom: '20px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <span>This folder contains Claude CLI's settings.json file</span>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || isValidating}
                >
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
