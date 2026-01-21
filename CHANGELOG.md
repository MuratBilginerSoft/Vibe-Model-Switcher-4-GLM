# Changelog

All notable changes to Vibe Model Switcher 4 GLM will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-21

### Added

#### Core Features
- **Profile Management System**: Create, edit, and delete Claude CLI configuration profiles
- **One-Click Profile Switching**: Instantly switch between different Claude configurations
- **Quick Switch Mode**: When exactly 2 profiles exist, switch between them with a single click using the center icon
- **Settings Import**: Import existing `settings.json` configurations into new profiles
- **Profile Colors**: Assign custom colors to profiles for easy visual identification

#### User Interface
- **Modern Glassmorphism Design**: Sleek, dark navy theme with glass-effect components
- **Animated Splash Screen**: BrainyTech branded startup screen with logo animation
- **Custom Title Bar**: Frameless window with integrated controls
- **Active Profile Display**: Clear indication of currently active profile with status badge
- **Profile Cards**: Horizontal card layout with avatar, name, status, and action buttons
- **Empty State**: Elegant empty state with animated icon when no profiles exist

#### Modals
- **Add Profile Modal**: Create new profiles with name, color selection, and import options
- **View Profile Modal**: View profile settings content with copy-to-clipboard functionality
- **Edit Profile Modal**: Modify profile name and color
- **Delete Confirmation Modal**: Safe deletion with warning for active profiles
- **Settings Modal**: Configure Claude CLI path with folder browser
- **About Modal**: Application information, features, and company contact details

#### Technical
- **SQLite Database**: Local storage using better-sqlite3 for profiles and settings
- **Electron IPC**: Secure communication between main and renderer processes
- **Zustand State Management**: Lightweight and efficient state management
- **Vite Build System**: Fast development and optimized production builds

### Technical Stack
- **Frontend**: React 19, Zustand
- **Backend**: Electron 32
- **Database**: better-sqlite3
- **Build Tools**: Vite 6, electron-builder
- **Platform**: Windows

---

## Future Releases

### Planned Features
- Profile export/import functionality
- Keyboard shortcuts for quick switching
- System tray integration
- Auto-start with Windows option
- Profile backup and restore
- Multi-language support

---

*Developed by Brainy Tech Solutions*
