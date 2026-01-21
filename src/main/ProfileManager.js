const fs = require('fs');
const path = require('path');

class ProfileManager {
  constructor(database) {
    this.database = database;
  }

  getSettingsFilePath() {
    const settings = this.database.getSettings();
    if (!settings || !settings.claude_path) {
      return null;
    }
    return path.join(settings.claude_path, 'settings.json');
  }

  validatePath(claudePath) {
    try {
      // Check if directory exists
      if (!fs.existsSync(claudePath)) {
        return { valid: false, error: 'Directory does not exist' };
      }

      // Check if it's a directory
      const stats = fs.statSync(claudePath);
      if (!stats.isDirectory()) {
        return { valid: false, error: 'Path is not a directory' };
      }

      // Check if settings.json exists (optional, might not exist yet)
      const settingsPath = path.join(claudePath, 'settings.json');
      const hasSettingsFile = fs.existsSync(settingsPath);

      return {
        valid: true,
        hasSettingsFile,
        settingsPath,
      };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }

  readCurrentSettings() {
    const settingsPath = this.getSettingsFilePath();

    if (!settingsPath) {
      return { success: false, error: 'Claude path not configured' };
    }

    try {
      if (!fs.existsSync(settingsPath)) {
        return { success: false, error: 'settings.json does not exist' };
      }

      const content = fs.readFileSync(settingsPath, 'utf-8');
      return { success: true, content };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  writeSettings(content) {
    const settingsPath = this.getSettingsFilePath();

    if (!settingsPath) {
      return { success: false, error: 'Claude path not configured' };
    }

    try {
      fs.writeFileSync(settingsPath, content, 'utf-8');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  switchProfile(profileId) {
    try {
      // 1. Get the current active profile and save its settings
      const currentActive = this.database.getActiveProfile();
      if (currentActive) {
        const currentSettings = this.readCurrentSettings();
        if (currentSettings.success) {
          this.database.updateProfileSettings(currentActive.id, currentSettings.content);
        }
      }

      // 2. Get the target profile
      const targetProfile = this.database.getProfile(profileId);
      if (!targetProfile) {
        return { success: false, error: 'Profile not found' };
      }

      // 3. Write the target profile's settings to file
      if (targetProfile.settings_content) {
        const writeResult = this.writeSettings(targetProfile.settings_content);
        if (!writeResult.success) {
          return writeResult;
        }
      }

      // 4. Update active status in database
      this.database.setActiveProfile(profileId);

      return { success: true, profile: this.database.getProfile(profileId) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  importCurrentAsProfile(name, color) {
    try {
      const currentSettings = this.readCurrentSettings();

      if (!currentSettings.success) {
        // Create profile without settings content
        const profile = this.database.createProfile(name, color, null);
        this.database.setActiveProfile(profile.id);
        return { success: true, profile };
      }

      // Create profile with current settings
      const profile = this.database.createProfile(name, color, currentSettings.content);
      this.database.setActiveProfile(profile.id);

      return { success: true, profile };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = ProfileManager;
