# Vibe Model Switcher 4 GLM

Profile/model settings manager for Claude CLI (Vibe Coding). Quickly switch between different Claude configurations.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)
![Electron](https://img.shields.io/badge/electron-32.3.3-47848F)

## Features

- **Profile Management**: Create profiles for different Claude configurations
- **One-Click Switch**: Instantly switch between profiles
- **Quick Switch**: Switch to the other profile with one click when you have exactly 2 profiles
- **Settings Import**: Import your existing `settings.json` into a profile
- **Colorful Profiles**: Assign custom colors to each profile
- **Modern UI**: Sleek glassmorphism design
- **Splash Screen**: Animated startup screen

## Requirements

- Node.js 18+
- npm or yarn
- Windows operating system

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nicatbayram/Vibe-Model-Switcher-4-GLM.git
cd Vibe-Model-Switcher-4-GLM
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 4. Packaging (Create installable .exe)

```bash
npm run package:win
```

The installer will be created in the `release` folder.

## Usage

### Initial Setup

1. Open the application
2. Click the **settings** (gear) icon in the top right
3. Select your Claude configuration folder:
   - Default location: `%APPDATA%\Claude\` or `~/.claude/`
   - This folder should contain the `settings.json` file

### Creating a Profile

1. Click the **"+ Add Profile"** button
2. Two options are available:
   - **Import Current**: Import your current Claude settings into the new profile
   - **Create Empty**: Create an empty profile
3. Choose a profile name and color
4. Click **Create** to create the profile

### Switching Profiles

- Click on a profile card to switch to that profile
- If you have 2 profiles, you can use the **quick switch** icon in the center
- The active profile is indicated with a green dot

### Profile Management

Each profile card has:
- **Eye icon**: View profile settings
- **Pencil icon**: Edit profile name/color
- **Trash icon**: Delete profile

## Technical Details

### Technologies

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Zustand |
| Backend | Electron 32 |
| Database | better-sqlite3 |
| Build | Vite 6, electron-builder |

### Project Structure

```
src/
├── main/               # Electron main process
│   ├── main.js         # Main application logic
│   ├── Database.js     # SQLite database management
│   └── ProfileManager.js # Profile operations
├── preload/            # Preload script (IPC bridge)
├── renderer/           # React frontend
│   ├── App.jsx         # Main component
│   ├── components/     # UI components
│   ├── store/          # Zustand state management
│   └── styles/         # CSS styles
└── splash/             # Startup screen
```

### Database

The application uses SQLite database:

**Tables:**
- `settings`: Claude configuration path
- `profiles`: Profile information and settings content

**Location:**
- Development: `%APPDATA%/vibe-model-switcher/vibe-model-switcher-dev.db`
- Production: `%APPDATA%/vibe-model-switcher/vibe-model-switcher.db`

## Troubleshooting

### "Claude path not configured" error
- Select the Claude configuration folder from settings

### "settings.json does not exist" error
- Run Claude CLI at least once
- Make sure you selected the correct folder

### Profile switching not working
- Make sure Claude CLI is closed
- Check write permissions

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Developer

**Brainy Tech Solutions**

---

*This application is an independent tool for Claude CLI users and has no official affiliation with Anthropic.*

---

# Vibe Model Switcher 4 GLM (Türkçe)

Claude CLI (Vibe Coding) için profil/model ayar yöneticisi. Farklı Claude yapılandırmaları arasında hızlıca geçiş yapmanızı sağlar.

## Özellikler

- **Profil Yönetimi**: Farklı Claude yapılandırmaları için profiller oluşturun
- **Tek Tıkla Geçiş**: Profiller arasında anında geçiş yapın
- **Hızlı Geçiş**: 2 profil varken tek tıkla diğer profile geçin
- **Ayar İçe Aktarma**: Mevcut `settings.json` ayarlarınızı profile aktarın
- **Renkli Profiller**: Her profile özel renk atayın
- **Modern Arayüz**: Cam efektli (glassmorphism) şık tasarım
- **Splash Ekranı**: Animasyonlu açılış ekranı

## Gereksinimler

- Node.js 18+
- npm veya yarn
- Windows işletim sistemi

## Kurulum

### 1. Depoyu klonlayın

```bash
git clone https://github.com/nicatbayram/Vibe-Model-Switcher-4-GLM.git
cd Vibe-Model-Switcher-4-GLM
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Uygulamayı çalıştırın

**Geliştirme modunda:**
```bash
npm run dev
```

**Üretim modunda:**
```bash
npm start
```

### 4. Paketleme (Kurulabilir .exe oluşturma)

```bash
npm run package:win
```

Oluşturulan kurulum dosyası `release` klasöründe bulunur.

## Kullanım

### İlk Kurulum

1. Uygulamayı açın
2. Sağ üstteki **ayarlar** (dişli) ikonuna tıklayın
3. Claude yapılandırma klasörünü seçin:
   - Varsayılan konum: `%APPDATA%\Claude\` veya `~/.claude/`
   - Bu klasörde `settings.json` dosyası bulunmalıdır

### Profil Oluşturma

1. **"+ Add Profile"** butonuna tıklayın
2. İki seçenek sunulur:
   - **Import Current**: Mevcut Claude ayarlarınızı yeni profile aktar
   - **Create Empty**: Boş profil oluştur
3. Profil adı ve renk seçin
4. **Create** ile profili oluşturun

### Profil Değiştirme

- Profil kartına tıklayarak o profile geçiş yapın
- 2 profiliniz varsa, ortadaki **hızlı geçiş** ikonunu kullanabilirsiniz
- Aktif profil yeşil nokta ile gösterilir

### Profil Yönetimi

Her profil kartında:
- **Göz ikonu**: Profil ayarlarını görüntüle
- **Kalem ikonu**: Profil adı/rengini düzenle
- **Çöp kutusu ikonu**: Profili sil

## Teknik Detaylar

### Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 19, Zustand |
| Backend | Electron 32 |
| Veritabanı | better-sqlite3 |
| Build | Vite 6, electron-builder |

### Proje Yapısı

```
src/
├── main/               # Electron ana süreç
│   ├── main.js         # Ana uygulama mantığı
│   ├── Database.js     # SQLite veritabanı yönetimi
│   └── ProfileManager.js # Profil işlemleri
├── preload/            # Preload script (IPC bridge)
├── renderer/           # React frontend
│   ├── App.jsx         # Ana bileşen
│   ├── components/     # UI bileşenleri
│   ├── store/          # Zustand state yönetimi
│   └── styles/         # CSS stilleri
└── splash/             # Açılış ekranı
```

### Veritabanı

Uygulama SQLite veritabanı kullanır:

**Tablolar:**
- `settings`: Claude yapılandırma yolu
- `profiles`: Profil bilgileri ve ayar içerikleri

**Konum:**
- Geliştirme: `%APPDATA%/vibe-model-switcher/vibe-model-switcher-dev.db`
- Üretim: `%APPDATA%/vibe-model-switcher/vibe-model-switcher.db`

## Sorun Giderme

### "Claude path not configured" hatası
- Ayarlardan Claude yapılandırma klasörünü seçin

### "settings.json does not exist" hatası
- Claude CLI'ı en az bir kez çalıştırın
- Doğru klasörü seçtiğinizden emin olun

### Profil geçişi çalışmıyor
- Claude CLI'ın kapalı olduğundan emin olun
- Yazma izinlerini kontrol edin

## Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Geliştirici

**Brainy Tech Solutions**

---

*Bu uygulama Claude CLI kullanıcıları için bağımsız bir araçtır ve Anthropic ile resmi bir bağlantısı yoktur.*
