# 🎙️ Vox Media Alternative

A front-end alternative of the Vox Media website featuring an interactive audio player with synchronized transcript. Built with HTML, CSS, and JavaScript.

The most recent build is available at [Vox Media Alternative Web Site](https://jclavo.github.io/vox_media_clone/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage](#usage)
  - [Adding Audio](#adding-audio)
  - [Editing Transcripts](#editing-transcripts)
- [CI/CD](#cicd)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Vox Media Alternative** is a static web application that replicates the look and feel of the [Vox Media](https://www.voxmedia.com) website. Its core feature is a podcast/audio player that displays a synchronized transcript — as the audio plays, the corresponding lines in the transcript are highlighted in real time, providing an accessible and engaging listening experience.

---

## Features

- 🎧 **HTML5 Audio Player** — native browser controls for play, pause, seek, and volume.
- 📝 **Synchronized Transcript** — transcript lines highlight automatically as the audio progresses.
- ✏️ **Editable Timestamps** — easily customize the transcript timing via `scripts/script.js`.
- 🎨 **Scroll Animation** — smooth entrance animations powered by the [Sal.js](https://mciastek.github.io/sal/) library.
- 📱 **Responsive Layout** — adapts to different screen sizes through custom CSS.
- ⚙️ **GitHub Actions CI/CD** — automated workflow for continuous integration.

---

## Project Structure

```
vox_media_clone/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipeline configuration
├── audio/
│   └── episode1.mp3        # Audio file(s) for the player
├── css/
│   ├── styles.css          # Main stylesheet
│   └── dist/
│       └── sal.css         # Sal.js animation library styles
├── scripts/
│   ├── script.js           # Core app logic: timestamp mapping & transcript sync
│   └── dist/
│       └── sal.js          # Sal.js animation library (minified)
├── transcripts/            # Transcript source files
└── index.html              # Application entry point
```

---

## Getting Started

### Prerequisites

This project is a static website — no server-side runtime or package manager is required to run it. You only need:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended to avoid CORS issues with audio files)

**Optional tools for development:**

- [Git](https://git-scm.com/) — for cloning the repository

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Jclavo/vox_media_clone.git
cd vox_media_clone
```

2. **No dependencies to install** — the project uses pre-built vendor files already included in the `scripts/dist/` and `css/dist/` folders.

---

### Running Locally

Because the app loads audio files, it's best served from a local HTTP server rather than opened directly as a file (`file://`).

**VS Code Live Server extension:**

Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## Usage

### Adding Audio

1. Place your `.mp3` file inside the `audio/` folder.
2. Update the `<source>` tag in `index.html` to point to your file:

```html
<audio id="podcast-audio" controls>
  <source src="audio/your-episode.mp3" type="audio/mp3">
  Your browser does not support the audio element.
</audio>
```

### Editing Transcripts

The transcript is driven by a timestamps array in `transcripts/your-file-with-transcriptions.csv`. Each entry maps a time (in seconds) to a line of text.

Each line follows the pattern `type|time|text` or `type|time|text|position` — simple, readable, and easy to parse.

```csv
section|0|Intro
line|1|Music starts.|center
line|6|Welcome to the podcast episode.|left
line|10|Today we talk about media and storytelling.|right

section|16|First topic:
line|1|Background.|center
line|6|Context.|center
```

Each row is split by | into its fields
- **`type`** — represents a block of parragraphs `section` or an standalone parragraph `line`.
- **`time`** — the timestamp (in seconds) at which this line should become active.
- **`text`** — the transcript line displayed to the user.
- **`position`** — (optional), only for parragraphs and there are 3 options: `left`, `center` or `right`.

As the audio plays, the script automatically highlights the current line and scrolls it into view.

---

## CI/CD

This project includes a GitHub Actions workflow located in `.github/workflows/`. The pipeline runs automatically on pushes and pull requests to the `master` branch, performing automated checks to ensure code quality and integration.

To view or modify the workflow, edit the YAML files inside `.github/workflows/`.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and native audio element |
| CSS3 | Styling and responsive layout |
| JavaScript (ES6+) | Transcript synchronization logic |
| [Sal.js](https://mciastek.github.io/sal/) | Scroll animation library |
| GitHub Actions | CI/CD automation |

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them with clear messages:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. Push your branch and open a Pull Request against `master`.

Please ensure your changes don't break existing functionality before submitting.

---

## Version
v0.1.0

## License

This project is open source. Please refer to the repository for license details.

> **Disclaimer:** This is an unofficial clone created for educational and portfolio purposes only. It is not affiliated with or endorsed by Vox Media, Inc.