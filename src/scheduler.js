const config = require('./config');
const { writeLog, printBanner, printSeparator } = require('./logger');
const { checkAndClaim } = require('./honeygain');

/**
 * Calculates remaining milliseconds until next target time (07:01 AM UTC+7).
 * @returns {number} Delay in milliseconds
 */
function getMsUntilNext7_01AM() {
    const now = new Date();
    const target = new Date(now);
    target.setHours(7, 1, 0, 0);

    if (now >= target) {
        target.setDate(target.getDate() + 1);
    }
    return target.getTime() - now.getTime();
}

/**
 * Runs scheduler iteration and schedules next execution based on status.
 */
async function runScheduler() {
    printSeparator();
    writeLog('Starting check cycle...');
    const isCompleted = await checkAndClaim();

    if (isCompleted) {
        const msUntilNext = getMsUntilNext7_01AM();
        const hours = (msUntilNext / (1000 * 60 * 60)).toFixed(2);
        writeLog(`Completed today's check-in. Next run scheduled at 07:01 AM tomorrow (~${hours} hours).`);
        setTimeout(runScheduler, msUntilNext);
    } else {
        writeLog(`Check-in pending (insufficient bandwidth or network issue). Retrying in 15 minutes...`);
        setTimeout(runScheduler, config.retryIntervalMs);
    }
}

/**
 * Initializes and starts the background auto check-in scheduler loop.
 */
async function startAutoCheckin() {
    printBanner();
    writeLog('Starting Honeygain auto check-in scheduler (24/7 background mode)...');
    await runScheduler();
}

module.exports = {
    getMsUntilNext7_01AM,
    runScheduler,
    startAutoCheckin
};
