import React, { useEffect } from 'react';
import useAppStore from './store/useAppStore';
import TitleBar from './components/TitleBar';
import ProfileCard from './components/ProfileCard';
import AddProfileModal from './components/AddProfileModal';
import SettingsModal from './components/SettingsModal';
import ViewProfileModal from './components/ViewProfileModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import AboutModal from './components/AboutModal';
import './styles/App.css';

const App = () => {
  const {
    isLoading,
    profiles,
    activeProfile,
    setIsAddModalOpen,
    setIsAboutModalOpen,
    initialize,
    switchProfile,
  } = useAppStore();

  // Quick switch handler - switch to the other profile when there are exactly 2
  const handleQuickSwitch = async () => {
    if (profiles.length !== 2 || !activeProfile) return;
    const otherProfile = profiles.find(p => p.id !== activeProfile.id);
    if (otherProfile) {
      await switchProfile(otherProfile.id);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  if (isLoading) {
    return (
      <div className="app">
        <TitleBar />
        <div className="loading">
          <div className="loading-spinner"></div>
          <span className="loading-text">Loading...</span>
        </div>
        <SettingsModal />
      </div>
    );
  }

  return (
    <div className="app">
      <TitleBar />

      <div className="main-content">
        {/* Active Profile Display */}
        <div className="active-profile-display">
          {activeProfile ? (
            <>
              <div className="active-profile-avatar" style={{ background: activeProfile.color }}>
                {activeProfile.name.charAt(0)}
              </div>
              <div className="active-profile-info">
                <span className="active-profile-label">Active Profile</span>
                <span className="active-profile-name">{activeProfile.name}</span>
              </div>
              <div className="active-profile-indicator">
                <span className="active-dot"></span>
                <span>Active</span>
              </div>
            </>
          ) : (
            <div className="no-active-profile">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <span>No active profile selected</span>
            </div>
          )}
        </div>

        {/* Profile Grid */}
        {profiles.length === 0 ? (
          <div className="empty-state-glass">
            <div className="empty-glass-content">
              <div className="empty-glass-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <div className="empty-glass-icon-glow"></div>
              </div>

              <h3 className="empty-glass-title">No Profiles Yet</h3>
              <p className="empty-glass-text">
                Create your first profile to start switching<br />
                between different Claude configurations.
              </p>

              <button
                className="empty-glass-btn"
                onClick={() => setIsAddModalOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>Create First Profile</span>
              </button>
            </div>

            {/* Decorative elements */}
            <div className="empty-glass-decoration">
              <div className="empty-glass-ring empty-glass-ring-1"></div>
              <div className="empty-glass-ring empty-glass-ring-2"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="profile-grid">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>

            {/* Quick Switch Icon - Only show when exactly 2 profiles */}
            {profiles.length === 2 && activeProfile && (
              <div className="quick-switch-container">
                <button className="quick-switch-icon" onClick={handleQuickSwitch} title={`Switch to ${profiles.find(p => p.id !== activeProfile.id)?.name}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <span className="footer-version">v1.0.0</span>
        <button className="about-btn" onClick={() => setIsAboutModalOpen(true)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>About Brainy Tech</span>
        </button>
      </footer>

      {/* Modals */}
      <AddProfileModal />
      <SettingsModal />
      <ViewProfileModal />
      <DeleteConfirmModal />
      <AboutModal />
    </div>
  );
};

export default App;
