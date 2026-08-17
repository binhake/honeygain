const { printBanner, printSeparator, writeLog } = require('./logger');
const { checkAndClaim } = require('./honeygain');

/**
 * Executes a single claim attempt suitable for GitHub Actions / Cron jobs.
 */
async function runSingleClaim() {
    printBanner();
    printSeparator();
    writeLog('Running single check & claim cycle via GitHub Actions...');
    
    try {
        const isCompleted = await checkAndClaim();
        if (isCompleted) {
            writeLog('GitHub Actions execution completed successfully.');
            process.exit(0);
        } else {
            writeLog('GitHub Actions execution finished: Claim pending (bandwidth threshold not met yet).');
            process.exit(0);
        }
    } catch (error) {
        writeLog(`GitHub Actions execution failed: ${error.message}`);
        process.exit(1);
    }
}

runSingleClaim();
