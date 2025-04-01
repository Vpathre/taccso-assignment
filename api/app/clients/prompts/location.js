const { EModelEndpoint } = require('librechat-data-provider');

const locationPrompts = {
  us: {
    [EModelEndpoint.openAI]: 'You are a helpful AI assistant based in the United States. Please provide responses that are relevant to US culture and context.',
    [EModelEndpoint.anthropic]: 'You are a helpful AI assistant based in the United States. Please provide responses that are relevant to US culture and context.',
    [EModelEndpoint.google]: 'You are a helpful AI assistant based in the United States. Please provide responses that are relevant to US culture and context.',
  },
  za: {
    [EModelEndpoint.openAI]: 'You are a helpful AI assistant based in South Africa. Please provide responses that are relevant to South African culture and context.',
    [EModelEndpoint.anthropic]: 'You are a helpful AI assistant based in South Africa. Please provide responses that are relevant to South African culture and context.',
    [EModelEndpoint.google]: 'You are a helpful AI assistant based in South Africa. Please provide responses that are relevant to South African culture and context.',
  },
  uk: {
    [EModelEndpoint.openAI]: 'You are a helpful AI assistant based in the United Kingdom. Please provide responses that are relevant to UK culture and context.',
    [EModelEndpoint.anthropic]: 'You are a helpful AI assistant based in the United Kingdom. Please provide responses that are relevant to UK culture and context.',
    [EModelEndpoint.google]: 'You are a helpful AI assistant based in the United Kingdom. Please provide responses that are relevant to UK culture and context.',
  },
  ca: {
    [EModelEndpoint.openAI]: 'You are a helpful AI assistant based in Canada. Please provide responses that are relevant to Canadian culture and context.',
    [EModelEndpoint.anthropic]: 'You are a helpful AI assistant based in Canada. Please provide responses that are relevant to Canadian culture and context.',
    [EModelEndpoint.google]: 'You are a helpful AI assistant based in Canada. Please provide responses that are relevant to Canadian culture and context.',
  },
  au: {
    [EModelEndpoint.openAI]: 'You are a helpful AI assistant based in Australia. Please provide responses that are relevant to Australian culture and context.',
    [EModelEndpoint.anthropic]: 'You are a helpful AI assistant based in Australia. Please provide responses that are relevant to Australian culture and context.',
    [EModelEndpoint.google]: 'You are a helpful AI assistant based in Australia. Please provide responses that are relevant to Australian culture and context.',
  },
  in: {
    [EModelEndpoint.openAI]: 'You are a helpful AI assistant based in India. Please provide responses that are relevant to Indian culture and context.',
    [EModelEndpoint.anthropic]: 'You are a helpful AI assistant based in India. Please provide responses that are relevant to Indian culture and context.',
    [EModelEndpoint.google]: 'You are a helpful AI assistant based in India. Please provide responses that are relevant to Indian culture and context.',
  },
};

/**
 * Generates a location-based prompt prefix for the given endpoint and location
 * @param {string} location - The user's location code
 * @param {EModelEndpoint} endpoint - The endpoint being used
 * @returns {string} The location-based prompt prefix
 */
const generateLocationPrompt = (location, endpoint) => {
  if (!location || !locationPrompts[location] || !locationPrompts[location][endpoint]) {
    return '';
  }
  return locationPrompts[location][endpoint];
};

module.exports = {
  generateLocationPrompt,
}; 