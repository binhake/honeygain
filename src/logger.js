const fs = require('fs');
const config = require('./config');
const pkg = require('../package.json');

/**
 * Formats current date and time to DD/MM/YYYY HH:mm:ss format.
 * @returns {string} Formatted timestamp string
 */
function getFormattedTimestamp() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

/**
 * Writes a formatted timestamped log message to stdout and log file.
 * @param {string} message - The message to record
 */
function writeLog(message) {
    const timestamp = getFormattedTimestamp();
    const logLine = `[${timestamp}] ${message}\n`;
    console.log(logLine.trim());
    try {
        fs.appendFileSync(config.logFile, logLine, 'utf8');
    } catch (err) {
        console.error('Failed to write log file:', err.message);
    }
}

/**
 * Prints project ASCII banner and author credentials.
 */
function printBanner() {
    console.log(`
======================================================
        Honeygain Auto Pot Claimer v${pkg.version}
        Author: Binhake ツ
        GitHub: https://github.com/binhake/honeygain
======================================================
`);
}

/**
 * Prints a visual separator line between check execution cycles.
 */
function printSeparator() {
    writeLog('------------------------------------------------------');
}

module.exports = {
    writeLog,
    printBanner,
    printSeparator
};
