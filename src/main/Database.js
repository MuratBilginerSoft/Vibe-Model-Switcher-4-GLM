const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

class DatabaseManager {
  constructor() {
    this.db = null;
  }

  initialize() {
    const userDataPath = app.getPath('userData');

    // Use different database for development vs production
    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const dbName = isDev ? 'vibe-model-switcher-dev.db' : 'vibe-model-switcher.db';
    const dbPath = path.join(userDataPath, dbName);

    console.log('Database path:', dbPath, '(isDev:', isDev, ')');

    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');

    this.createTables();

    return this;
  }

  createTables() {
    // Settings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        claude_path TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Profiles table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT DEFAULT '#3B82F6',
        is_active INTEGER DEFAULT 0,
        settings_content TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        last_used_at TEXT
      )
    `);

    // Create index
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_profiles_is_active ON profiles(is_active)
    `);
  }

  // Settings methods
  getSettings() {
    const stmt = this.db.prepare('SELECT * FROM settings WHERE id = 1');
    return stmt.get();
  }

  setSettings(claudePath) {
    const existing = this.getSettings();

    if (existing) {
      const stmt = this.db.prepare('UPDATE settings SET claude_path = ? WHERE id = 1');
      stmt.run(claudePath);
    } else {
      const stmt = this.db.prepare('INSERT INTO settings (id, claude_path) VALUES (1, ?)');
      stmt.run(claudePath);
    }

    return this.getSettings();
  }

  // Profile methods
  getAllProfiles() {
    const stmt = this.db.prepare('SELECT * FROM profiles ORDER BY created_at DESC');
    return stmt.all();
  }

  getProfile(id) {
    const stmt = this.db.prepare('SELECT * FROM profiles WHERE id = ?');
    return stmt.get(id);
  }

  getActiveProfile() {
    const stmt = this.db.prepare('SELECT * FROM profiles WHERE is_active = 1');
    return stmt.get();
  }

  createProfile(name, color, settingsContent = null) {
    const stmt = this.db.prepare(`
      INSERT INTO profiles (name, color, settings_content)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(name, color, settingsContent);
    return this.getProfile(result.lastInsertRowid);
  }

  updateProfile(id, name, color) {
    const stmt = this.db.prepare(`
      UPDATE profiles
      SET name = ?, color = ?
      WHERE id = ?
    `);

    stmt.run(name, color, id);
    return this.getProfile(id);
  }

  updateProfileSettings(id, settingsContent) {
    const stmt = this.db.prepare(`
      UPDATE profiles
      SET settings_content = ?
      WHERE id = ?
    `);

    stmt.run(settingsContent, id);
    return this.getProfile(id);
  }

  setActiveProfile(id) {
    // First, deactivate all profiles
    this.db.prepare('UPDATE profiles SET is_active = 0').run();

    // Then, activate the selected profile
    const stmt = this.db.prepare(`
      UPDATE profiles
      SET is_active = 1, last_used_at = datetime('now')
      WHERE id = ?
    `);

    stmt.run(id);
    return this.getProfile(id);
  }

  deleteProfile(id) {
    const stmt = this.db.prepare('DELETE FROM profiles WHERE id = ?');
    stmt.run(id);

    return true;
  }

  close() {
    if (this.db) {
      this.db.close();
    }
  }
}

module.exports = DatabaseManager;
