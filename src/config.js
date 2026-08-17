const fs = require('fs');
const path = require('path');

/**
 * Automatically loads environment variables from a local .env file.
 */
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const equalIdx = trimmed.indexOf('=');
                if (equalIdx > 0) {
                    const key = trimmed.substring(0, equalIdx).trim();
                    const value = trimmed.substring(equalIdx + 1).trim();
                    if (!process.env[key]) {
                        process.env[key] = value;
                    }
                }
            }
        });
    }
}

loadEnv();

const config = {
    email: process.env.HONEYGAIN_EMAIL || '',
    password: process.env.HONEYGAIN_PASSWORD || '',
    token: process.env.HONEYGAIN_TOKEN || '',
    logFile: path.join(__dirname, '..', 'honeygain_checkin_log.txt'),
    checkIntervalMs: 30 * 60 * 1000, // 30 minutes
    retryIntervalMs: 15 * 60 * 1000  // 15 minutes
};

module.exports = config;
