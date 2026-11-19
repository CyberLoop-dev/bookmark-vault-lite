<div align="center">

![Bookmark Vault Lite banner](https://capsule-render.vercel.app/api?type=waving&color=0:#4338ca,100:#0f766e&height=170&section=header&text=Bookmark%20Vault%20Lite&fontSize=34&fontColor=ffffff)

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&pause=1000&color=0f766e&center=true&vCenter=true&width=720&lines=Your%20bookmarks%20stay%20in%20your%20browser%3BImport%2C%20search%2C%20tag%20and%20export" alt="Typing SVG" />

[![MIT](https://img.shields.io/badge/license-MIT-0f766e.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Stars](https://img.shields.io/github/stars/CyberLoop-dev/bookmark-vault-lite?style=flat)](https://github.com/CyberLoop-dev/bookmark-vault-lite/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/CyberLoop-dev/bookmark-vault-lite)](https://github.com/CyberLoop-dev/bookmark-vault-lite/commits/main)

**A calm, offline-first home for browser bookmarks.**

<img src="assets/illustration.svg" alt="Bookmark Vault Lite illustration" width="560" />

</div>

## 🧭 Overview

Bookmark Vault Lite imports the standard Netscape bookmark HTML format, stores entries in browser localStorage, and lets you search, tag, add, remove, and export bookmarks without an account or backend.

## ✨ Features

- 🔒 Bookmarks remain in browser localStorage.
- 📥 Import an exported browser bookmark HTML file.
- 🔎 Search titles, URLs, and tags instantly.
- 🏷️ Add tags to keep collections organized.
- 📤 Export a portable Netscape bookmark HTML file.

## 🖥️ Demo

Open the app, import a browser bookmark export, then search or tag the saved links. All actions run in the browser; no upload endpoint exists.

## 🚀 Quick Start

```bash
 git clone https://github.com/CyberLoop-dev/bookmark-vault-lite.git
 cd bookmark-vault-lite
 npm install
 npm start
```

## 🧱 Tech Stack

- ⚛️ React 18
- 🟦 TypeScript
- ⚡ Vite
- 💾 Browser localStorage and File APIs

## 🗂️ Folder Structure

```text
bookmark-vault-lite/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/main.tsx
├── src/App.tsx
├── src/style.css
├── assets/illustration.svg
└── README.md
```

## 🛣️ Roadmap

- - [x] Netscape HTML import and export
- - [x] Search, tags, add and remove
- - [ ] Optional JSON backup format

## 🤝 Contributing

Keep bookmark data local-only. Add import fixtures and test duplicate URL handling before changing the storage format.

## 📄 License

Released under the [MIT License](LICENSE).

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:#0f766e,100:#4338ca&height=100&section=footer)

</div>
