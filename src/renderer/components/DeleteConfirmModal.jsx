import React from 'react';
import useAppStore from '../store/useAppStore';

const DeleteConfirmModal = () => {
  const { deletingProfile, setDeletingProfile, deleteProfile, activeProfile } = useAppStore();

  if (!deletingProfile) return null;

  const isActive = activeProfile?.id === deletingProfile.id;

  const handleConfirm = async () => {
    await deleteProfile(deletingProfile.id);
    setDeletingProfile(null);
  };

  const handleCancel = () => {
    setDeletingProfile(null);
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </div>

        <h2 className="delete-modal-title">Delete Profile</h2>

        <p className="delete-modal-message">
          Are you sure you want to delete <strong>"{deletingProfile.name}"</strong>?
        </p>

        {isActive && (
          <div className="delete-modal-warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
            <span>This is the currently active profile</span>
          </div>
        )}

        <p className="delete-modal-subtext">
          This action cannot be undone. The profile settings will be permanently removed.
        </p>

        <div className="delete-modal-actions">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
