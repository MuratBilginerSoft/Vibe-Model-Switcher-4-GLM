import React, { useState } from 'react';
import useAppStore from '../store/useAppStore';

const ViewProfileModal = () => {
  const { viewingProfile, setViewingProfile, switchProfile, activeProfile } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!viewingProfile) return null;

  const isActive = activeProfile?.id === viewingProfile.id;
  const jsonContent = viewingProfile.settings_content || '';

  // Try to format JSON nicely
  let formattedJson = jsonContent;
  try {
    if (jsonContent) {
      formattedJson = JSON.stringify(JSON.parse(jsonContent), null, 2);
    }
  } catch {
    // Keep original if not valid JSON
  }

  const handleClose = () => {
    setViewingProfile(null);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (jsonContent) {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitch = async () => {
    if (!isActive) {
      await switchProfile(viewingProfile.id);
      handleClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="view-modal-title">
            <div
              className="view-modal-avatar"
              style={{ backgroundColor: viewingProfile.color }}
            >
              {viewingProfile.name.charAt(0)}
            </div>
            <div>
              <h2 className="modal-title">{viewingProfile.name}</h2>
              <span className={`view-modal-status ${isActive ? 'active' : ''}`}>
                {isActive ? 'Active Profile' : 'Inactive'}
              </span>
            </div>
          </div>
          <button className="modal-close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="view-modal-content">
          <div className="view-modal-label">
            <span>Settings JSON Content</span>
            {jsonContent && (
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {jsonContent ? (
            <pre className="json-viewer">{formattedJson}</pre>
          ) : (
            <div className="json-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>No settings content saved for this profile</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          {!isActive && (
            <button className="btn btn-primary" onClick={handleSwitch}>
              Switch to this Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfileModal;
