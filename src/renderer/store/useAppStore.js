import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // Settings
  settings: null,
  isSettingsModalOpen: false,

  // Profiles
  profiles: [],
  activeProfile: null,

  // UI State
  isLoading: true,
  isAddModalOpen: false,
  editingProfile: null,
  viewingProfile: null,
  deletingProfile: null,
  isAboutModalOpen: false,

  // Actions
  setSettings: (settings) => set({ settings }),
  setIsSettingsModalOpen: (isOpen) => set({ isSettingsModalOpen: isOpen }),

  setProfiles: (profiles) => set({ profiles }),
  setActiveProfile: (profile) => set({ activeProfile: profile }),

  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
  setEditingProfile: (profile) => set({ editingProfile: profile }),
  setViewingProfile: (profile) => set({ viewingProfile: profile }),
  setDeletingProfile: (profile) => set({ deletingProfile: profile }),
  setIsAboutModalOpen: (isOpen) => set({ isAboutModalOpen: isOpen }),

  // Initialize app
  initialize: async () => {
    try {
      set({ isLoading: true });

      // Get settings
      const settings = await window.electronAPI.getSettings();
      set({ settings });

      // If no settings, show settings modal
      if (!settings) {
        set({ isSettingsModalOpen: true, isLoading: false });
        return;
      }

      // Get profiles
      const profiles = await window.electronAPI.getAllProfiles();
      set({ profiles });

      // Get active profile
      const activeProfile = await window.electronAPI.getActiveProfile();
      set({ activeProfile });

      set({ isLoading: false });
    } catch (error) {
      console.error('Failed to initialize:', error);
      set({ isLoading: false });
    }
  },

  // Refresh profiles
  refreshProfiles: async () => {
    const profiles = await window.electronAPI.getAllProfiles();
    const activeProfile = await window.electronAPI.getActiveProfile();
    set({ profiles, activeProfile });
  },

  // Switch profile
  switchProfile: async (profileId) => {
    try {
      const result = await window.electronAPI.switchProfile(profileId);
      if (result.success) {
        await get().refreshProfiles();
        return { success: true };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create profile
  createProfile: async (name, color) => {
    try {
      await window.electronAPI.createProfile(name, color);
      await get().refreshProfiles();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create profile with custom settings content
  createProfileWithSettings: async (name, color, settingsContent) => {
    try {
      const result = await window.electronAPI.createProfileWithSettings(name, color, settingsContent);
      if (result.success) {
        await get().refreshProfiles();
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Import current settings as profile
  importCurrentAsProfile: async (name, color) => {
    try {
      const result = await window.electronAPI.importCurrentAsProfile(name, color);
      if (result.success) {
        await get().refreshProfiles();
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update profile
  updateProfile: async (id, name, color) => {
    try {
      await window.electronAPI.updateProfile(id, name, color);
      await get().refreshProfiles();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete profile
  deleteProfile: async (id) => {
    try {
      await window.electronAPI.deleteProfile(id);
      await get().refreshProfiles();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save settings
  saveSettings: async (claudePath) => {
    try {
      const settings = await window.electronAPI.setSettings(claudePath);
      set({ settings, isSettingsModalOpen: false });
      await get().refreshProfiles();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
}));

export default useAppStore;
