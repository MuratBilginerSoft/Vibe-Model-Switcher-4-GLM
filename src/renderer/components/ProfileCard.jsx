import React from 'react';
import useAppStore from '../store/useAppStore';

const ProfileCard = ({ profile }) => {
  const { activeProfile, switchProfile, setEditingProfile, setViewingProfile, setDeletingProfile } = useAppStore();

  const isActive = activeProfile?.id === profile.id;
  const initial = profile.name.charAt(0);

  const handleSwitch = async (e) => {
    e.stopPropagation();
    if (!isActive) {
      await switchProfile(profile.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditingProfile(profile);
  };

  const handleView = (e) => {
    e.stopPropagation();
    setViewingProfile(profile);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setDeletingProfile(profile);
  };

  return (
    <div className={`profile-card ${isActive ? 'active' : ''}`} onClick={handleView}>
      {/* Avatar - Left */}
      <div
        className="profile-avatar"
        style={{ backgroundColor: profile.color }}
      >
        {initial}
      </div>

      {/* Profile Info - Middle */}
      <div className="profile-info">
        <div className="profile-name">{profile.name}</div>
        <div className={`profile-status ${isActive ? 'active' : ''}`}>
          <span className="profile-status-dot"></span>
          {isActive ? 'Active Profile' : 'Ready to switch'}
        </div>
      </div>

      {/* Actions - Right */}
      <div className="profile-actions">
        <button className="profile-action-btn" onClick={handleView} title="View Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <button className="profile-action-btn" onClick={handleEdit} title="Edit Profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
        <button className="profile-action-btn delete" onClick={handleDelete} title="Delete Profile">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>

      {/* Switch Button */}
      <button className="switch-btn" onClick={handleSwitch}>
        {isActive ? 'Current' : 'Activate'}
      </button>
    </div>
  );
};

export default ProfileCard;
