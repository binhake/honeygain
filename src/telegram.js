const config = require('./config');

/**
 * Sends an HTML-formatted notification message to a Telegram chat via Bot API.
 * Skips silently if Telegram configuration is missing.
 * @param {string} message - HTML formatted message payload
 * @returns {Promise<boolean>} True if sent successfully, False otherwise
 */
async function sendTelegramNotification(message) {
    const { telegramBotToken, telegramChatId } = config;

    if (!telegramBotToken || !telegramChatId) {
        return false;
    }

    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            })
        });

        const data = await response.json();
        if (response.ok && data.ok) {
            return true;
        } else {
            console.error('[Telegram] Failed to send notification:', data?.description || response.statusText);
            return false;
        }
    } catch (error) {
        console.error('[Telegram] Error sending message:', error.message);
        return false;
    }
}

module.exports = {
    sendTelegramNotification
};
