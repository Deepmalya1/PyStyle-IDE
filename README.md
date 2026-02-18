# PyStyle - Python IDE


PyStyle is a lightweight, modern Python IDE built with Electron. Designed specifically for Python development, it offers a clean interface with code editing, file management, and script execution capabilities.

## Features

- **Code Editor**: Full-featured code editor powered by CodeMirror with Python syntax highlighting
- **Theme**: Beautiful Monokai dark theme for comfortable coding
- **File Operations**: Open and save Python files (.py) with ease
- **Run Python Scripts**: Execute Python scripts directly from the IDE
- **Output Panel**: View stdout and stderr output in a dedicated panel
- **Keyboard Shortcuts**: Quick access to common actions
- **Modern UI**: Sleek, transparent interface with Tailwind CSS styling

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save file |
| `Ctrl + O` | Open file |
| `Ctrl + R` | Run Python script |
| `Ctrl + Q` | Quit application |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (v3.x) installed and in system PATH

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PyStyle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application in development mode:
   ```bash
   npm start
   ```

### Building for Production

To create a distributable package:

```bash
npm run build
```

This will generate executable files in the `dist` folder:
- Windows: `.exe` installer (NSIS)
- macOS: `.dmg` disk image
- Linux: `.AppImage` and `.deb` packages

## Project Structure

```
PyStyle/
├── build/                 # Application icons
│   ├── icon.ico          # Windows icon
│   └── icon.icns         # macOS icon
├── dist/                 # Built application (after build)
├── node_modules/         # Dependencies
├── code-editing.js       # Frontend editor logic
├── index.html            # Main HTML file
├── main.js               # Electron main process
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
├── preload.js            # Electron preload script
└── styles.css            # Application styles
```

## Technical Details

### Technologies Used

- **Electron** (v33.2.1) - Cross-platform desktop framework
- **CodeMirror** (v5.65.4) - Code editor component
- **Tailwind CSS** (v2.2.19) - Utility-first CSS framework
- **electron-builder** - Application packaging

### Architecture

- **Main Process** (`main.js`): Handles window management, IPC communication, and file operations
- **Renderer Process**: The frontend UI with CodeMirror editor
- **Preload Script** (`preload.js`): Secure bridge between main and renderer processes

### Key Functions

- **File Operations**: Open/Save dialogs for Python files
- **Script Execution**: Spawns Python process to run scripts
- **Global Shortcuts**: System-wide keyboard shortcuts

## Known Limitations

- Early access version - some bugs may be present
- Requires Python to be installed on the system to run scripts
- File must be saved before running (no unsaved execution)

## Author

**Deepmalya Acharya** (Akio)

## Version

1.0.0

## License

MIT License

---

<p align="center">Made with ❤️ for Python developers</p>
