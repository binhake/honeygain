# 🐝 Honeygain Auto Pot Claimer

<p align="center">
  <a href="https://nodejs.org/"  target="_blank"><img src="https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg" alt="Node Version"></a>
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20macOS-blue.svg" alt="Platform">
  <a href="https://github.com/binhake/honeygain/releases/tag/v1.0.0"><img src="https://img.shields.io/badge/Release-v1.0.0-orange.svg" alt="Release"></a>
</p>

An automated, lightweight 24/7 daily Lucky Pot claimer script for Honeygain.

> **Created with ❤️ by [Binhake ツ](https://github.com/binhake)**

---

## ✨ Features

- 🤖 **24/7 Auto Claim**: Automatically checks bandwidth progress and claims daily Lucky Pot rewards.
- 🔒 **Secure Configuration**: Uses `.env` environment variables to protect your account credentials.
- ⚡ **Zero Dependencies**: Pure Node.js standard modules — no external `npm` packages required.
- 🕒 **Clean Logging**: Timestamped output (`DD/MM/YYYY HH:mm:ss`) with visual cycle separators and log file persistence.
- 📦 **Modular Design**: Clean `src/` modular architecture for high maintainability.

---

## 📋 Requirements

- **Node.js**: `>= 18.0.0` (Supports native `fetch` API)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/binhake/honeygain.git
cd honeygain
```

### 2. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your Honeygain email and password:
```env
HONEYGAIN_EMAIL=your_email@example.com
HONEYGAIN_PASSWORD=your_password_here
HONEYGAIN_TOKEN=
```

### 3. Run the application
```bash
npm start
```
*Or directly with node:*
```bash
node main
```

---

## 📂 Project Structure

```text
Honeygain/
├── .env.example       # Example environment variables template
├── .env               # Local configuration file (ignored by git)
├── .gitignore         # Ignores sensitive files and logs
├── main.js            # Main application entry point
├── package.json       # Project metadata and scripts
└── src/
    ├── config.js      # Environment loader & configuration settings
    ├── logger.js      # Formatted timestamp logger & console banner
    ├── honeygain.js   # Honeygain API authentication & claim logic
    └── scheduler.js   # 24/7 background scheduler and interval timer
```
