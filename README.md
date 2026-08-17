<h1 align="center">🐝 Honeygain Auto Pot Claimer</h1>

<p align="center">
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-%3E%3D18.0.0-brightgreen.svg" alt="Node Version"></a>
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20macOS-blue.svg" alt="Platform">
  <a href="https://github.com/binhake/honeygain/releases/tag/v1.2.0"><img src="https://img.shields.io/badge/Release-v1.2.0-orange.svg" alt="Release"></a>
</p>

An automated, lightweight 24/7 daily Lucky Pot claimer script for Honeygain. Supports running locally, in background, or 100% free on GitHub Actions Cloud.

> **Created with ❤️ by [Binhake ツ](https://github.com/binhake)**

---

## ✨ Features

- 🤖 **24/7 Auto Claim**: Automatically checks bandwidth progress and claims daily Lucky Pot rewards.
- ☁️ **GitHub Actions Cloud Mode**: Runs automatically on GitHub Cloud every day — zero computer uptime required!
- 📲 **Telegram Notifications**: Get instant push notifications on your phone via Telegram Bot whenever a Lucky Pot is claimed.
- 🔒 **Secure Configuration**: Uses `.env` or GitHub Secrets to protect your account credentials.
- ⚡ **Zero Dependencies**: Pure Node.js standard modules — no external `npm` packages required.
- 🕒 **Clean Logging**: Timestamped output (`DD/MM/YYYY HH:mm:ss`) with visual cycle separators and log file persistence.
- 📦 **Modular Design**: Clean `src/` modular architecture for high maintainability.

---

## 📋 Requirements

- **Node.js**: `>= 18.0.0` (Supports native `fetch` API)

---

## ☁️ Cloud Setup (GitHub Actions - Recommended)

Run 100% free on GitHub servers without keeping your PC powered on:

1. **Fork or Clone** this repository to your GitHub account.
2. Open your repository on GitHub and navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret** and add two required secrets (and optional Telegram secrets):
   - `HONEYGAIN_EMAIL`: Your Honeygain account email.
   - `HONEYGAIN_PASSWORD`: Your Honeygain account password.
   - *(Optional)* `TELEGRAM_BOT_TOKEN`: Your Telegram Bot API token.
   - *(Optional)* `TELEGRAM_CHAT_ID`: Your Telegram Chat ID.
4. **Done!** The workflow automatically triggers every day at **07:05 AM (UTC+7)**.
   - *Optional:* You can manually trigger a claim test anytime under the **Actions** tab by clicking **Honeygain Auto Claimer** > **Run workflow**.

---

## 💻 Local Setup (PC / Server)

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
Open `.env` and fill in your details:
```env
# Honeygain Account Configuration
HONEYGAIN_EMAIL=your_email@example.com
HONEYGAIN_PASSWORD=your_password_here
HONEYGAIN_TOKEN=

# Telegram Notification Configuration (Optional)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
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

## 📱 Setting Up Telegram Notifications (Optional)

Get instant push notifications when your daily Lucky Pot is claimed:

1. **Get Bot Token**: Open Telegram, search for [@BotFather](https://t.me/BotFather), send `/newbot`, and follow the steps to create a bot. Copy the HTTP API token.
2. **Get Your Chat ID**: Open Telegram, search for [@userinfobot](https://t.me/userinfobot), and press `/start` to get your `Id`.
3. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to your `.env` file or GitHub Repository Secrets.

---

## 📂 Project Structure

```text
Honeygain/
├── .github/
│   └── workflows/
│       └── honeygain.yml  # GitHub Actions automated daily workflow
├── .env.example           # Example environment variables template
├── .env                   # Local configuration file (ignored by git)
├── .gitignore             # Ignores sensitive files and logs
├── main.js                # Main application entry point (24/7 scheduler)
├── package.json           # Project metadata and npm scripts
└── src/
    ├── action.js          # Single-run execution entry point for GitHub Actions
    ├── config.js          # Environment loader & configuration settings
    ├── honeygain.js       # Honeygain API authentication & claim logic
    ├── logger.js          # Formatted timestamp logger & console banner
    ├── scheduler.js       # 24/7 background scheduler and interval timer
    └── telegram.js        # Telegram Bot API notification module
```
