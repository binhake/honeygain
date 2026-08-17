/**
 * Honeygain Auto Pot Claimer
 * Entry point for daily Lucky Pot automatic claiming background service.
 */

const { startAutoCheckin } = require('./src/scheduler');

// Initialize background scheduler
startAutoCheckin();
