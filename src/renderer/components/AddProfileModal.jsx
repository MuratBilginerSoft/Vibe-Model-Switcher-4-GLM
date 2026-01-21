import React, { useState, useEffect } from 'react';
import useAppStore from '../store/useAppStore';

const COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#EF4444', // Red
  '#F97316', // Orange
  '#EAB308', // Yellow
  '#22C55E', // Green
  '#14B8A6', // Teal
  '#06B6D4', // Cyan
  '#6366F1', // Indigo
];

const AddProfileModal = () => {
  const {
    isAddModalOpen,
    setIsAddModalOpen,
    editingProfile,
    setEditingProfile,
    createProfileWithSettings,
    updateProfile,
    importCurrentAsProfile,
    profiles,
  } = useAppStore();

  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [settingsSource, setSettingsSource] = useState('current'); // 'current', 'paste', 'empty'
  const [jsonContent, setJsonContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!editingProfile;
  const isOpen = isAddModalOpen || isEditing;
  const isFirstProfile = profiles.length === 0;

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name);
      setColor(editingProfile.color);
      setSettingsSource('current');
      setJsonContent('');
    } else {
      setName('');
      setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
      setSettingsSource(isFirstProfile ? 'current' : 'paste');
      setJsonContent('');
    }
    setError('');
  }, [editingProfile, isAddModalOpen, isFirstProfile]);

  const handleClose = () => {
    setIsAddModalOpen(false);
    setEditingProfile(null);
  };

  const validateJson = (str) => {
    if (!str.trim()) return false;
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Profile name is required');
      return;
    }

    // Validate JSON if paste mode
    if (!isEditing && settingsSource === 'paste') {
      if (!jsonContent.trim()) {
        setError('Please paste your settings.json content');
        return;
      }
      if (!validateJson(jsonContent)) {
        setError('Invalid JSON format');
        return;
      }
    }

    setIsSubmitting(true);
    setError('');

    try {
      let result;

      if (isEditing) {
        result = await updateProfile(editingProfile.id, name.trim(), color);
      } else if (settingsSource === 'current') {
        result = await importCurrentAsProfile(name.trim(), color);
      } else if (settingsSource === 'paste') {
        result = await createProfileWithSettings(name.trim(), color, jsonContent);
      } else {
        // empty - create without settings
        result = await createProfileWithSettings(name.trim(), color, null);
      }

      if (result.success) {
        handleClose();
      } else {
        setError(result.error || 'Failed to save profile');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? 'Edit Profile' : 'New Profile'}
          </h2>
          <button className="modal-close" onClick={handleClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Profile Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Claude Opus, GLM-4..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          {!isEditing && (
            <div className="form-group">
              <label className="form-label">Settings Source</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="settingsSource"
                    value="current"
                    checked={settingsSource === 'current'}
                    onChange={() => setSettingsSource('current')}
                  />
                  <span>Use current settings.json</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="settingsSource"
                    value="paste"
                    checked={settingsSource === 'paste'}
                    onChange={() => setSettingsSource('paste')}
                  />
                  <span>Paste JSON content</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="settingsSource"
                    value="empty"
                    checked={settingsSource === 'empty'}
                    onChange={() => setSettingsSource('empty')}
                  />
                  <span>Empty (configure later)</span>
                </label>
              </div>
            </div>
          )}

          {!isEditing && settingsSource === 'paste' && (
            <div className="form-group">
              <label className="form-label">Settings JSON</label>
              <textarea
                className="form-input form-textarea"
                placeholder='Paste your settings.json content here...'
                value={jsonContent}
                onChange={(e) => setJsonContent(e.target.value)}
                rows={6}
              />
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                Paste the content from your other account's settings.json file
              </p>
            </div>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfileModal;
