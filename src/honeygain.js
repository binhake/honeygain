const config = require('./config');
const { writeLog } = require('./logger');

let currentToken = config.token;

/**
 * Authenticates with Honeygain API to obtain a fresh JWT access token.
 * @returns {Promise<string>} The new access token
 */
async function loginAndGetToken() {
    writeLog('Authenticating with Honeygain to obtain a new token...');
    try {
        const response = await fetch('https://dashboard.honeygain.com/api/v1/users/tokens', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
            },
            body: JSON.stringify({
                email: config.email,
                password: config.password
            })
        });

        const data = await response.json();
        if (response.ok && data && data.data && data.data.access_token) {
            currentToken = data.data.access_token;
            writeLog('Authentication successful! Access token updated.');
            return currentToken;
        } else {
            throw new Error(data?.message || `HTTP response error: ${response.status}`);
        }
    } catch (error) {
        writeLog(`Authentication failed: ${error.message}`);
        throw error;
    }
}

/**
 * Executes an HTTP request to Honeygain API with authorization headers and automatic 401 retry.
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} url - Target API URL
 * @param {object|null} body - Request payload object
 * @param {boolean} retryOn401 - Whether to re-authenticate on 401 Unauthorized response
 * @returns {Promise<object>} API JSON response data
 */
async function makeRequest(method, url, body = null, retryOn401 = true) {
    const headers = {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
    };

    if (currentToken) {
        headers['Authorization'] = `Bearer ${currentToken}`;
    }
    if (body) {
        headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(body) : undefined
        });

        if (response.status === 401 && retryOn401) {
            writeLog('Token expired or invalid (401). Attempting re-authentication...');
            await loginAndGetToken();
            return await makeRequest(method, url, body, false);
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data?.message || `HTTP Error ${response.status}`);
        }
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Checks Honeygain Lucky Pot status and claims the reward if eligible.
 * @returns {Promise<boolean>} True if already claimed or claimed successfully, False otherwise
 */
async function checkAndClaim() {
    writeLog('Checking Honeygain Lucky Pot status...');
    try {
        const resData = await makeRequest('GET', 'https://dashboard.honeygain.com/api/v1/contest_winnings');
        
        if (!resData || !resData.data) {
            writeLog(`Invalid response data: ${JSON.stringify(resData)}`);
            return false;
        }

        const { progress_bytes, max_bytes, winning_credits } = resData.data;
        writeLog(`Shared bandwidth progress: ${progress_bytes}/${max_bytes} bytes.`);

        if (winning_credits !== null) {
            writeLog(`Today's Lucky Pot reward already claimed (${winning_credits} credits).`);
            return true;
        }

        if (progress_bytes < max_bytes) {
            writeLog(`Not eligible yet. Additional bandwidth required (${progress_bytes}/${max_bytes} bytes).`);
            return false;
        }

        writeLog('Eligibility criteria met! Claiming daily Lucky Pot reward...');
        const claimResData = await makeRequest('POST', 'https://dashboard.honeygain.com/api/v1/contest_winnings');
        
        if (claimResData && claimResData.data && claimResData.data.credits) {
            writeLog(`Success! Claimed ${claimResData.data.credits} credits from daily Lucky Pot.`);
            return true;
        } else {
            writeLog(`Opened pot successfully but credit amount unknown: ${JSON.stringify(claimResData)}`);
            return false;
        }

    } catch (error) {
        writeLog(`Error during check/claim process: ${error.message}`);
        return false;
    }
}

module.exports = {
    loginAndGetToken,
    makeRequest,
    checkAndClaim
};
